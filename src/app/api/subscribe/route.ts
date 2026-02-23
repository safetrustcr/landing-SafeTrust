import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/validation/email';
import { subscribeToNewsletter } from '@/lib/email/mailchimp';

interface SubscribeBody {
  email: string;
  name?: string;
  agreedToNewsletter: boolean;
  recaptchaToken?: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return false;

  const params = new URLSearchParams({ secret: secretKey, response: token });
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await response.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    let body: SubscribeBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const { email, name, agreedToNewsletter, recaptchaToken } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!agreedToNewsletter) {
      return NextResponse.json(
        { error: 'Newsletter consent is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!recaptchaToken || typeof recaptchaToken !== 'string') {
      return NextResponse.json(
        { error: 'Verification required' },
        { status: 400 }
      );
    }

    const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      );
    }

    await subscribeToNewsletter(email.trim(), name?.trim());

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Subscription failed';
    const isMailchimpError = message.includes('already a list member') || message.includes('invalid');
    const isAlreadySubscribed = message.includes('already a list member') ||
      message.includes('Member Exists');
    const isInvalidEmail = message.includes('looks fake or invalid');
    if (isMailchimpError) {
      if (isAlreadySubscribed) {
        return NextResponse.json(
          { error: 'This email is already subscribed.' },
          { status: 409 }
        );
      }

      if (isInvalidEmail) {
        return NextResponse.json(
          { error: 'This email address appears to be invalid.' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Subscription failed. Please try again later.' },
      { status: 500 }
    );
  }
}
