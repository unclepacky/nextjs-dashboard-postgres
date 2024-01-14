import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="">
      <div className="flex">
        <span> Navbar for the website : </span>
        <ul>
          <Link href="/dashboard">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
