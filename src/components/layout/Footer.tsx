import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { navigate } from '../../hooks/useLocation';
import Logo from '../ui/Logo';

const Footer = () => {
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Equipping Christians with biblical knowledge and resources to grow in their faith.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={20} />} href="https://facebook.com" />
              <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" />
              <SocialLink icon={<Instagram size={20} />} href="https://instagram.com" />
              <SocialLink icon={<Youtube size={20} />} href="https://youtube.com" />
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink onClick={() => handleNavigation('/')}>Home</FooterLink>
              <FooterLink onClick={() => handleNavigation('/about')}>About Us</FooterLink>
              <FooterLink onClick={() => handleNavigation('/resources')}>Resources</FooterLink>
              <FooterLink onClick={() => handleNavigation('/article')}>Articles</FooterLink>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <FooterLink onClick={() => handleNavigation('/resources')}>Bible Study</FooterLink>
              <FooterLink onClick={() => handleNavigation('/resources')}>Concordance</FooterLink>
              <FooterLink onClick={() => handleNavigation('/resources')}>Devotionals</FooterLink>
              <FooterLink onClick={() => handleNavigation('/resources')}>Sermons</FooterLink>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Subscribe</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stay updated with our latest resources and articles.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-r-md transition-colors duration-200 flex items-center"
                >
                  <Mail size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Strongs. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 text-sm"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
  >
    {icon}
  </a>
);

const FooterLink = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
    >
      {children}
    </a>
  </li>
);

export default Footer;