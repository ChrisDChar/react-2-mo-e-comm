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
        <h2 className="text-white text-3xl font-semibold mb-4">
          Subscribe to our newsletter
        </h2>
        <p className="text-blue-200 text-sm mb-8">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        <form className="relative max-w-md mx-auto mb-12">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-white p-4 pr-32 rounded-sm focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 transition cursor-pointer"
          >
            SUBSCRIBE &rarr;
          </button>
        </form>

        <div className="flex justify-center items-center gap-8">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="company logo"
              className="w-15 object-contain opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
