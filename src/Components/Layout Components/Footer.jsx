import React from 'react'

function Footer() {
  return (
    <footer id='footer' className="bg-[#111] text-gray-300 px-6 md:px-16 py-12">
      {/* Top Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12 py-12">
        {/* Eurus Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">TrekTrove</h3>
          <p className="text-sm leading-relaxed">
            We believe every adventure begins with the right gear — find all your travel essentials here.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-3 text-sm">

            <li>Backpacks</li>
            <li>Travel Pillows</li>
            <li>Jackets</li>
            <li>Adapters & Chargers</li>
            <li>Water Bottles</li>
            <li>Luggage & Organizers</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li>Shipping Policy</li>
            <li>Privacy Policy</li>
            <li>Return & Refund</li>
            <li>Terms & Conditions</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>About Us</li>
            <li>Blog / Travel Tips</li>
            <li>Promotions</li>
            <li>Our Promise</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Find us on</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span>✕</span> Twitter
            </li>
            <li className="flex items-center gap-2">
              <span>f</span> Facebook
            </li>
            <li className="flex items-center gap-2">
              <span>⦿</span> Pinterest
            </li>
            <li className="flex items-center gap-2">
              <span>◎</span> Instagram
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 text-sm">


        {/* Center - Copyright */}
        <p className="text-gray-400 mb-4 md:mb-0">
          © 2025, TrekTrove. All rights reserved.
        </p>


      </div>
    </footer>
  );
}

export default Footer;

