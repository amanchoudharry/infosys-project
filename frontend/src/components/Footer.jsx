import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0B5730] text-white pt-8 p-2">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Emergency and Mental Well-Being */}
        <div>
          <h2 className="font-bold text-lg mb-4">Emergency and <br /> Mental Well-Being</h2>
          <p className="text-sm font-light">
            Best website most widely used for emergency contact and to support
            the mental health and well-being provides various services.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h2 className="font-bold text-lg mb-4">PLATFORM</h2>
          <ul className="font-light">
            <li className="mb-2">For Users</li>
            <li className="mb-2">For Emergency</li>
            <li className="mb-2">For Patients</li>
            <li>Free for Everyone</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-bold text-lg mb-4">COMPANY</h2>
          <ul className="font-light">
            <li className="mb-2">Home</li>
            <li className="mb-2">About</li>
            <li className="mb-2">Resources</li>
            <li className="mb-2">Self Assessment</li>
            <li>Emergency Professional</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-bold text-lg mb-4">SUPPORT</h2>
          <ul className="font-light">
            <li className="mb-2">Help center</li>
            <li className="mb-2">Terms of service</li>
            <li>Status</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h2 className="font-bold text-lg mb-4">GET IN TOUCH</h2>
          <p className="mb-4">
            Questions or Feedback? <br /> We'd love to hear from you.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>© Copyrights 2024 Infosys Emergency & Mental Well-Being</p>
      </div>
    </footer>
  );
};

export default Footer;
