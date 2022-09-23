import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { refreshTokens } from '../../../../store/actions/user-action';
import { getUserState } from '../../../../store/slices/user-slice';
import { useAppDispatch } from '../../../../store/store';
import { SiteNav } from '../../nav/SiteNav';
const { Item } = SiteNav;

const SiteHeader = () => {
  const { user } = useSelector(getUserState);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (!user?.accessToken) {
  //     dispatch(refreshTokens());
  //   }
  // }, [dispatch, user?.accessToken]);

  return (
    <>
      <SiteNav
        logoSrc="/nav-logo.svg"
        overlayLogoSrc="/nav-logo-different.svg"
        loginRegisterHref="/login"
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
