import React, { useEffect, useState } from 'react';
import GeneralButton from '../Ui_kits/GeneralButton';
import InventoryProductTableRow from './InventoryProductTableRow';
import CollapseableForm from './CollapseableForm';

const InventoryProductTable = ({ products,categoryID }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [singleProductsArray, setSingleProductsArray] = useState([]);

  useEffect(() => {
    const tempSingleProductsArray = Object.keys(products)
      .filter(key => key !== 'categoryID') // Ignore the 'id' field
      .map(key => ({
        productID: key,
        ...products[key],
      }));

    setSingleProductsArray(tempSingleProductsArray);
    // console.log(products);
  }, [products]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[95%] m-auto bg-gray-300 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold text-gray-800">{products.categoryID}</h2>
        <GeneralButton onClick={toggleExpanded} variant="primary" size="small">
          {isExpanded ? 'Cancel' : 'Add Product'}
        </GeneralButton>
      </div>

      {/* Collapsible Form */}
      <CollapseableForm isExpanded={isExpanded} categoryID={categoryID} setIsExpanded={setIsExpanded} />

      {/* {show table of each products} */}
      {/* <p className="text-black">{JSON.stringify(products)}</p> */}
      {/* <p className="text-black">{JSON.stringify(singleProductsArray)}</p> */}

      <br />
      {singleProductsArray &&
        Array.isArray(singleProductsArray) &&
        singleProductsArray.map(singleProduct => (
          <div className="my-3" key={singleProduct.productID}>

              <InventoryProductTableRow categoryID={categoryID} singleProduct={singleProduct} />
          </div>
        ))}
    </div>
  );
};

export default InventoryProductTable;
