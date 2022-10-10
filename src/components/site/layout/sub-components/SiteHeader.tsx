import React from 'react';
import { SiteNav } from '../../nav/SiteNav';
const { Item } = SiteNav;

const SiteHeader = () => {
  return (
    <>
      <SiteNav
        logoSrc="/nav-logo.svg"
        overlayLogoSrc="/nav-logo-different.svg"
        loginRegisterHref="/auth/login"
        loginRegisterLabel={'Login/Register'}
      >
        <Item href="#" isActive={true}>
          Home
        </Item>
        <Item href="#" isActive={false}>
          Service
        </Item>
        <Item href="#" isActive={false}>
          Blog
        </Item>
        <Item href="#" isActive={false}>
          Portfolio
        </Item>
        <Item href="#" isActive={false}>
          Team
        </Item>
        <Item href="#" isActive={false}>
          Testimonials
        </Item>
        <Item href="#" isActive={false}>
          Contact
        </Item>
      </SiteNav>
    </>
  );
};

export default SiteHeader;
