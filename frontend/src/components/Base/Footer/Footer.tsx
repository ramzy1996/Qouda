import { CSSProperties } from 'react';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

type FooterProps = {
  className?: string;
  style?: CSSProperties;
};

const Footer = ({ className, style }: FooterProps) => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer
      className={`bg-neutral-900 text-center text-secondaryColor w-full relative ${className}`}
      style={style}
    >
      <div className="px-6 pt-6 w-full">
        <div className="mb-6 flex justify-center">
          {[
            { href: 'https://web.facebook.com/Ramzyrox', Icon: FaFacebookF },
            {
              href: 'https://www.instagram.com/ramzy_ahamed',
              Icon: FaInstagram,
            },
            {
              href: 'https://www.linkedin.com/in/ramzyahamed/',
              Icon: FaLinkedin,
            },
            { href: 'https://github.com/ramzy1996', Icon: FaGithub },
          ].map(({ href, Icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="m-1 h-9 w-9 flex items-center justify-center rounded-full border-2 border-secondaryColor transition duration-150 ease-in-out hover:bg-black focus:outline-none"
            >
              <Icon className="mx-auto h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <div
        className="p-4 text-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © {year} Copyright: Ramzy Ahmed
      </div>
    </footer>
  );
};

export default Footer;
