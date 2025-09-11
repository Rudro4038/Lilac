import React from 'react';
import { useParams } from 'react-router-dom'; // 1. Import useParams
import ProductCaseForSingleCategory from '../components/ProductCaseForSingleCategory';
import FAQnQuestions from '../components/FAQnQuestions';

const Category = () => {
    const { categoryName } = useParams(); // 2. Get the parameter from the URL
    // console.log(categoryName); // This will now log "moneybags"
    
    return (
        <div className='w-[90%] m-auto'>
            {/* 3. Pass the categoryName to the component that needs it */}
            <ProductCaseForSingleCategory category={categoryName} />

            <FAQnQuestions/>
        </div>
    );
};

export default Category;