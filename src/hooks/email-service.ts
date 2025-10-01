import { EmailServiceResponse, FormData } from "@/types/contact-form-types";

const emailService = {
  sendEmail: async (formData: FormData): Promise<EmailServiceResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.1) {
      console.log("Email sent successfully:", formData);
      return {
        success: true,
        message: "Your message has been sent successfully!",
      };
    } else {
      throw new Error("Failed to send email. Please try again.");
    }
  },
};

export default emailService;
