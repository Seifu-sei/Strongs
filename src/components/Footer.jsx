export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white text-center p-4 mt-8 text-sm text-gray-600"
    >
      <div className="flex justify-center space-x-4 mb-2">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/share/p/1JGs2jzTfw/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <i className="fa-brands fa-facebook-f text-xl"></i>
        </a>

        {/* Twitter */}
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600"
        >
          <i className="fa-brands fa-x-twitter text-xl"></i>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700"
        >
          <i className="fa-brands fa-instagram text-xl"></i>
        </a>
      </div>

      <h1 className="mt-2">© 2025 Strongs. All rights reserved.</h1>
    </footer>
  );
}
