import { ref, update, remove } from 'firebase/database';
import { db } from '../firebase/initFirebase';

const InventoryProductUpdate = () => {
  const updateProduct = async (categoryID, productID, formData) => {
    // console.log(formData);
    
    try {

      const productPath = `products/${categoryID}/${productID}`;
      const productRef = ref(db, productPath);
      
      // Prepare the data to update (remove productID from formData since it's in the path)
      const { productID: _, ...updateData } = formData;
      
      await update(productRef, updateData);
      
      // console.log(`Product ${productID} in category ${categoryID} updated successfully`);
      return { success: true, message: 'Product updated successfully' };
      
    } catch (error) {
      // console.error('Error updating product:', error);
      return { success: false, message: error.message };
    }
    
  };

  const deleteProduct = async (categoryID, productID) => {
    try {
      // Create the path to the specific product
      const productPath = `products/${categoryID}/${productID}`;
      const productRef = ref(db, productPath);
      
      // Delete the product from the database
      await remove(productRef);
      
      // console.log(`Product ${productID} in category ${categoryID} deleted successfully`);
      return { success: true, message: 'Product deleted successfully' };
      
    } catch (error) {
      // console.error('Error deleting product:', error);
      return { success: false, message: error.message };
    }
  };

  return { updateProduct, deleteProduct };
};

export default InventoryProductUpdate;
