"use client";

import React from "react";
import ContactHeader from "./ContactHeader";
import ContactSection from "./ContactSection";
import Team from "./Team";
import Story from "./Story";
import FAQ from "./FAQ";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/bg-orange-blue.png)",
          backgroundAttachment: "fixed",
          opacity: 0.9,
          zIndex: 0,
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10">
        <ContactHeader />
        <Story />
        <Team />
        <ContactSection />
        <FAQ />
      </div>
    </section>
  );
};

export default Contact;
