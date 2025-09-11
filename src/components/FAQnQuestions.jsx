import React from 'react';
import FAQ from './FAQ';
import FurtherQuery from './FurtherQuery';

const FAQnQuestions = () => {
    return (
        <div className='flex flex-col md:flex-row w-[85%] max-w-6xl m-auto gap-4 relative my-[50px] '>
            <div className="min-w-[280px] w-full md:w-[65%]">
                <FAQ/>
            </div>
            <div className="min-w-[280px] w-[35%] sticky top-8 self-start h-[500px]">
                <FurtherQuery/>
            </div>
        </div>
    );
};

export default FAQnQuestions;