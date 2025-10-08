import { ContactForm } from "@/components/contact/ContactForm";
import Navbar from "@/components/navigation/Navbar";
import React from "react";

const ContactUs = () => {
  return (
    <div>
      <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden">
        <Navbar />
        <ContactForm/>
      </div>
    </div>
  );
};

export default ContactUs;
