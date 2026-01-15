import React from "react";
import googleLogo from "../assets/HomeImages/NewsletterGoogle.png";
import amazonLogo from "../assets/HomeImages/NewsletterAmazon.png";
import philipsLogo from "../assets/HomeImages/NewsletterPhilips.png";
import toshibaLogo from "../assets/HomeImages/NewsletterToshiba.png";
import samsungLogo from "../assets/HomeImages/NewsletterSamsung.png";

const logos = [googleLogo, amazonLogo, philipsLogo, toshibaLogo, samsungLogo];

const Newsletter = () => {
  return (
    <section className="bg-[#1B6392] py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        
        {/* Responsive Text Size */}
        <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-blue-200 text-sm mb-8">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        {/* Form Container: Stays relative for desktop context */}
        <form className="relative max-w-md mx-auto mb-12">
          
          {/* Input: Full width padding on mobile, reduced padding on desktop to make room for button */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-white p-4 pr-4 sm:pr-32 rounded-sm focus:outline-none"
          />
          
          {/* Button: 
               1. Mobile (default): w-full (full width), mt-3 (margin top), relative (in flow).
               2. Desktop (sm): absolute (inside input), mt-0, w-auto, right-1.
          */}
          <button
            type="submit"
            className="relative sm:absolute right-1 top-1/2 sm:transform sm:-translate-y-1/2 w-full mt-3 sm:mt-0 sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 transition cursor-pointer"
          >
            SUBSCRIBE &rarr;
          </button>
        </form>

        {/* Logos: Flex wrap so they drop to next line on small screens */}
        <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="company logo"
              className="w-10 sm:w-16 h-auto object-contain opacity-70"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Newsletter;