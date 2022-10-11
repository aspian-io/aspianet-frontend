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
        <Item href="/#home" isActive={true}>
          Home
        </Item>
        <Item href="/#services" isActive={false}>
          Services
        </Item>
        <Item href="/#blog" isActive={false}>
          Blog
        </Item>
        <Item href="/#portfolio" isActive={false}>
          Portfolio
        </Item>
        <Item href="/#team" isActive={false}>
          Team
        </Item>
        <Item href="/#testimonials" isActive={false}>
          Testimonials
        </Item>
        <Item href="/#contact" isActive={false}>
          Contact
        </Item>
      </SiteNav>
    </>
  );
};

export default SiteHeader;
