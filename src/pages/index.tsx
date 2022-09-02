import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { getUserState, userActions } from '../store/slices/userSlice';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailSubscribe from '../components/mini-projects/email-subscribe/EmailSubscribe';
import PricingGrids from '../components/mini-projects/pricing-grids/PricingGrids';
import ProductModal from '../components/mini-projects/product-modal/ProductModal';
import ImageGallery from '../components/mini-projects/image-gallery/ImageGallery';
import Button from '../components/common/Button';
import Input, { IInputHandle, InputTypeEnum } from '../components/common/Input';

const Home: NextPage = () => {
  const { setUserName, setPassword } = userActions;
  const dispatch = useDispatch();
  const { username, password } = useSelector(getUserState);
  const inputRef = useRef<IInputHandle>(null);

  useEffect(() => {
    inputRef.current?.focus();
  
  }, [])
  

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setUserName(e.target.value));
  }
  return (
    <>
      <Button
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
      />
      {/* <EmailSubscribe /> */}
      {/* <PricingGrids /> */}
      {/* <ProductModal /> */}
      {/* <ImageGallery /> */}
    </>
  );
};

export default Home;
