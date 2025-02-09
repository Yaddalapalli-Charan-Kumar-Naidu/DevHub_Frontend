import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 text-center absolute bottom-0 min-w-screen">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="text-lg font-semibold">Dev Hub © {new Date().getFullYear()}</div>

        {/* Social Links */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a
            href="https://github.com/Yaddalapalli-Charan-Kumar-Naidu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/charan-kumar-naidu-yaddalapalli"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
