import React from "react";
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4 font-semibold">
            <li>
              <Link to={"/"} className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        <ul className="flex gap-6 mb-4 md:mb-0 font-medium">
          <li>
            <Link to="/Terms&policy" className="hover:text-primary">
              Terms & policy
            </Link>
          </li>
        </ul>
        <div className="flex gap-6">
          <a href="" target="_blank" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="" target="_blank" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="" target="_blank" className="hover:text-primary">
            <IoLogoInstagram size={24} />
          </a>
        </div>
      </div>
      <div className="container mx-auto py-6 text-sm text-gray-400 text-center lg:text-left">
        <a href="https://github.com/QUY-FE" target="_blank"> &copy; - { new Date().getFullYear() } QUY-FE [Quý Nguyễn] </a>
      </div>
    </footer>
  );
};

export default Footer;
