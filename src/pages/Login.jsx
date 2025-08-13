import React from 'react';
import SignUp from '../components/SignUp';

const Login = () => {
  return (
    <div>
      <div className="w-full bg-tranparent my-[20px]  flex">
        <div className="w-[60%] "></div>
        <div className="w-[40%] ">
          <SignUp></SignUp>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
