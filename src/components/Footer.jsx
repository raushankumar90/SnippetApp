import { FaGithub, FaTwitter, FaLinkedin, FaRegCopyright } from "react-icons/fa6";
import { Link } from "react-router"; // per your setup, not react-router-dom

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-400 py-10 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-white">🚀 Snippet Manager</h2>
          <p className="text-sm mt-2">Your personal hub for clean, reusable code.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/features" className="hover:text-white transition">Features</Link>
          <Link to="/snippets" className="hover:text-white transition">Snippets</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </nav>

        {/* Social Media Icons as Internal Links */}
        <div className="flex gap-4 text-xl">
          <Link to="/social/github" className="hover:text-white">
            <FaGithub />
          </Link>
          <Link to="/social/twitter" className="hover:text-white">
            <FaTwitter />
          </Link>
          <Link to="/social/linkedin" className="hover:text-white">
            <FaLinkedin />
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm flex items-center justify-center gap-1 text-gray-500">
        <FaRegCopyright className="text-base" />
        <span>{new Date().getFullYear()} Snippet Manager. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
