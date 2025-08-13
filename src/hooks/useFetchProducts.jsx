import React, { useState, useCallback } from 'react';
import { db } from '../firebase/initFirebase';
import { get, ref, onValue } from 'firebase/database';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Real-time listener for products
  const setupProductsListener = useCallback(() => {
    const productsRef = ref(db, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      setLoading(false);
      
      if (snapshot.exists()) {
        const productsObject = snapshot.val();
        
        // Convert object of objects to array of objects
        const productsArray = Object.keys(productsObject).map(key => ({
          categoryID: key,
          ...productsObject[key]
          
        }));
        
        setProducts(productsArray);
        setError(false);
      } else {
        setProducts([]);
      }
    }, (error) => {
      console.error('Error fetching products:', error);
      setError(true);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // One-time fetch (keeping original functionality)
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const productsRef = ref(db, 'products');

      const snapshot = await get(productsRef);
      setLoading(false);

      if (snapshot.exists()) {
        // console.log(snapshot.val());
        const productsObject = snapshot.val();

        // Convert object of objects to array of objects
        const productsArray = Object.keys(productsObject).map(key => ({
          categoryID: key,
          ...productsObject[key]
        }));

        setProducts(productsArray);
        return productsArray;
      } else {
        console.log([]);
        setProducts([]);
        return [];
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
      return [];
    }
  }, []);

  // Cleanup function to remove listener
  const removeProductsListener = useCallback((unsubscribe) => {
    if (unsubscribe) {
      unsubscribe();
    }
  }, []);



  return { 
    products, 
    loading, 
    error, 
    getProducts, 
    setupProductsListener, 
    removeProductsListener 
  };
};

export default useFetchProducts;
