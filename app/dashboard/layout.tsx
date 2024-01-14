import React, { ReactNode } from 'react';
import Footer from '../ui/dashboard/Footer';
import Header from '../ui/dashboard/header/Header';
import Menu from '../ui/dashboard/Menu/Menu';
import ContentContainer from '../ui/dashboard/ContentContainer';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Menu />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </>
  );
}
