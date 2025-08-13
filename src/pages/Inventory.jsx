import React, { useEffect } from 'react';
import GeneralButton from '../Ui_kits/GeneralButton';
import useFetchProducts from '../hooks/useFetchProducts';
import InventoryProductTable from '../components/InventoryProductTable';

const Inventory = () => {
  //fetch products with real-time listener
  const { products: hookProducts, setupProductsListener, removeProductsListener } = useFetchProducts();
  

  useEffect(() => {
    // Set up real-time listener for products
    const unsubscribe = setupProductsListener();
    
    // Cleanup listener when component unmounts
    return () => removeProductsListener(unsubscribe);
  }, [setupProductsListener, removeProductsListener]);

  useEffect(() => {
    // console.log(hookProducts);
  }, [hookProducts]);

  const addNewCategory = async () => {
    console.log('Button Clicked');

    //TODO: add a new product to the database
  };

  return (
    <div className="font-GeneralText">
      <div className="top  text-black p-[15px]">
        <h1 className="text-3xl m-1">All products category</h1>
        <GeneralButton onClick={addNewCategory}>Add Category</GeneralButton>

      </div>

      {hookProducts &&
        Array.isArray(hookProducts) &&
        hookProducts.map(products => (
          <div className="my-6" key={products.categoryID}>
            <InventoryProductTable products={products} categoryID={products.categoryID} />
          </div>
        ))}
    </div>
  );
};

export default Inventory;
