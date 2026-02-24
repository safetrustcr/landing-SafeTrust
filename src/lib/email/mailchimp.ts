import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function subscribeToNewsletter(
  email: string,
  name?: string
): Promise<{ id: string }> {
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!audienceId) {
    throw new Error('MAILCHIMP_AUDIENCE_ID is not configured');
  }

  const response = await mailchimp.lists.addListMember(audienceId, {
    email_address: email.toLowerCase(),
    status: 'pending',
    merge_fields: name ? { FNAME: name } : undefined,
  });

  return { id: response.id };
}
