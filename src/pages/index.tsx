import type { NextPage } from 'next';
import { getUserState, userActions } from '../store/slices/user-slice';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/common/Button';
import Input, { IInputHandle, InputTypeEnum } from '../components/common/Input';
import { SiteNav } from '../components/site/nav/SiteNav';
const { Item } = SiteNav;

const HomePage: NextPage = () => {
  const { setUserName, setPassword } = userActions;
  const dispatch = useDispatch();
  const { username, password } = useSelector(getUserState);
  const inputRef = useRef<IInputHandle>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setUserName(e.target.value));
  }
  return (
    <>
      <SiteNav
        logoSrc="/nav-logo.svg"
        overlayLogoSrc="/nav-logo-different.svg"
        loginRegisterHref="/login"
        loginRegisterLabel="Login/Register"
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

      {/* <Button
        type="button"
        variant="primary"
        size="h-8"
        rounded="rounded-lg"
      >
        Test
      </Button>
      <Input
        type={InputTypeEnum.text}
        placeholderText="Firstname..."
        rounded="rounded-xl"
        size="h-11"
        ref={inputRef}
      /> */}
    </>
  );
};

export default HomePage;
