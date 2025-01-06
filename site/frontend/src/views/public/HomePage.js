
import React from 'react';
import LoginComponent from '../../components/LoginComponent/LoginComponent';

const HomePage = () => {
  return (
    <div className='flex justify-between items-center h-screen w-screen overflow-y-hidden'>
      <div className='hidden md:block md:w-3/5'>
        <img
          className='bg-cover h-full w-full'
          src={require("../../assets/images/bglogin.png")}
          alt='background' />
        <div className='bg-gradient-to-t from-emerald-800 to-transparent absolute top-0 left-0 h-full w-3/5 opacity-60'>
        </div>
      </div>
      <div className='w-full md:w-2/5  h-full'>
        <LoginComponent />
      </div>
    </div>
  );
};

export default HomePage;