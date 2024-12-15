// app/components/Header.js
import Link from 'next/link';
import Image from 'next/image'; // Import Image component for optimized images

export default function Header() {
  return (
    <header className="bg-white text-black p-4"> {/* Changed bg-blue-600 to bg-white and text-white to text-black */}
      <nav className="flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image 
            src="/logo.png" // Replace with the path to your logo
            alt="Logo"
            width={150} // Adjust width as needed
            height={150} // Adjust height as needed
            className="mr-2" // Margin to the right of the logo
          />
          <div className="text-lg font-bold text-black"></div> {/* Changed text-white to text-black */}
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-4 text-black">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">About</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}