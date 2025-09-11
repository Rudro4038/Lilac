import React from 'react';
import FAQ from '../components/FAQ';
import FAQnQuestions from '../components/FAQnQuestions';
import ProductCase from '../components/ProductCase';

const Home = () => {
  return (
    <div className="bg-[#90165942] min-h-screen">
      <div className="bg-fixed bg-gradient-to-tr from-[#729b8c] via-[#879176] to-[#907767] rounded-b-4xl pb-4">

        <div className="h-auto w-full bg-[#90165929] rounded-b-2xl overflow-hidden">
          <img src="cover_photo.png" alt="" className='' />
        </div>


        <div className="h-[200px] sm:h-[300px] w-[95%] sm:w-[70%] m-auto my-4 sm:my-8 bg-[#90165929] rounded-b-2xl">Content</div>
        <div className="h-auto w-[95%] sm:w-[80%] m-auto my-4 sm:my-8 rounded-b-2xl">
          <ProductCase/>
        </div>
      </div>
    </div>
  );
};

export default Home;
