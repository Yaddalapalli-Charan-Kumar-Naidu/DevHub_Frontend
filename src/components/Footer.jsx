import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900/90 backdrop-blur border-t border-blue-900/40 shadow-lg px-4 py-5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        {/* Branding */}
        <div className="text-base md:text-lg font-mono font-semibold text-blue-200 select-none">
          Dev Hub © {new Date().getFullYear()}
        </div>
        {/* Social Links */}
        <div className="flex gap-6 md:gap-5 mt-2 md:mt-0">
          <a
            href="https://github.com/Yaddalapalli-Charan-Kumar-Naidu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1"
            aria-label="GitHub"
          >
            <FaGithub size={26} />
          </a>
          <a
            href="https://www.linkedin.com/in/charan-kumar-naidu-yaddalapalli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={26} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
