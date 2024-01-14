import React, { ReactNode } from 'react';
import Navbar from '../ui/website/Navbar';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
