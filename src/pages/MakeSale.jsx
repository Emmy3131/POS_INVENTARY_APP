import { useState, useEffect } from "react";
import MakeSaleList from "../components/MakeSaleList";
import axios from "axios";
import { toast } from 'react-toastify'
import Loader from "../components/Loader"
import { useOutletContext } from "react-router-dom";

const MakeSale = () => {

  const baseUrl = 'https://pos-inventory-api.vercel.app';
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const {refreshCartCount} = useOutletContext();

  const fetchProducts = async () => {
    setIsFetchingProducts(true);
    try {
      const res = await axios.get(`${baseUrl}/api/v1/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setProducts(res.data.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    } finally {
      setIsFetchingProducts(false);
    }
  }

  useEffect(function () {

    fetchProducts();

  }, [])

  if (isFetchingProducts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={10} />
      </div>
    )
  }

  const handleAddToCart = async (product) => {

    try {
      setActionLoadingId(product._id)
      const cartItems = await axios.post(`${baseUrl}/api/v1/cart`, {
        productId: product._id,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success('Product added to cart successfully!');
      refreshCartCount()
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart.');
    } finally {
      setActionLoadingId(null)
    }

  }


  return (
    <div className="">

      <h1 className="text-2xl font-semibold bg-white p-2 rounded-xl mb-5 shadow">
        Make Sale
      </h1>

      <MakeSaleList products={products} cart={handleAddToCart} actionLoadingId={actionLoadingId} />

    </div>
  );
};

export default MakeSale;
