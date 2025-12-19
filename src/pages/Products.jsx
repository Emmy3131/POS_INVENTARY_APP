import { useEffect, useState } from "react"
import ProductsList from "../components/ProductList"
import { FaPlus } from "react-icons/fa"
import InputField from "../components/InputField"
import SelectField from "../components/SelectField"
import Modal from "../components/Modal"
// import axios from "axios"
import { toast } from 'react-toastify'
import Loader from "../components/Loader"
import axios from "../lib/axios"




const Products = () => {
  const [errors, setErrors] = useState({});
  const [addProduct, setAddProduct] = useState(false)
  const [products, setProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProdduct, setCurrentProduct] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = () => {
    setAddProduct(true)
  }
  const handleCancelProductAdd = () => {
    setAddProduct(false)
  }
  const handleCancelEditProduct = () => {
    setIsEditing(false)
  }



  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      // Logic to submit the new product
      const formData = new FormData(e.target);
      const res = await axios.post(`api/v1/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      })

      if (res.data.status === 'success') {
        setAddProduct(false);
        toast.success('Product added successfully');
        setProducts([...products, res.data.data.product]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      toast.error(`Failed to add product. ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchProducts = async () => {
    setIsFetchingProducts(true);
    try {
      const res = await axios.get(`api/v1/products`);

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

  const handleDeleteProduct = async (id) => {
    setIsDeleting(true);
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) {
      setIsDeleting(false);
      return;
    }
    try {
      const res = await axios.delete(`api/v1/products/${id}`);
      if (res.status === 204) {
        toast.success('Product deleted successfully');
        setProducts(products.filter(product => product._id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  }

  if (isFetchingProducts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={10} />
      </div>
    )
  }

  const handleEditProduct = (id) => {
    const product = products.find(product => product._id === id);
    if (product) {
      setCurrentProduct(product);
    }
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const formData = new FormData(e.target);
      const res = await axios.patch(`/api/v1/products/${currentProdduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.status === 'success') {
        setIsEditing(false);
        toast.success('Product updated successfully');
        const updatedProducts = products.map(product =>
          product._id === currentProdduct._id ? res.data.data.product : product
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      toast.error(`Failed to update product. ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div>
      <div className="flex justify-between mb-6 rounded-md shadow-md px-6 items-center">
        <div>
          <h2 className="text-xl font-semibold ">Products</h2>
        </div>
        <div>
          <button onClick={() => handleAddProduct()}
            className="bg-green-500 text-white px-4 py-2 rounded-xl shadow font-bold hover:bg-black ml-4 my-2 flex justify-between items-center gap-2">
            <FaPlus />Add Product
          </button>
        </div>
      </div>


      <ProductsList
        products={products}
        onDelete={handleDeleteProduct}
        isDeleting={isDeleting}
        onEdit={handleEditProduct}
        setIsEditing={setIsEditing}
      />

      <Modal isOpen={addProduct} title="Add New Product">
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h2>
          <p className="text-gray-500 mb-4">Fill The Space Below</p>

          <form onSubmit={handleSubmitProduct} className="space-y-4 " en>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <InputField
                label="Product Name"
                placeholder="product name"
                name="name"
                error={errors.name}
              />

              <InputField
                label="sku"
                placeholder="product sku"
                error={errors.description}
                name="sku"
              />

              <InputField
                label="Price"
                placeholder="product price"
                type="number"
                error={errors.price}
                name="price"
              />
              <SelectField
                label='Category'
                options={[
                  { value: 'phones', label: 'Phones' },
                  { value: 'accessories', label: 'Accessories' },
                  { value: 'gadgets', label: 'Gadgets' },
                ]}
                error={errors.category}
                name='category'
              />
              <InputField
                label="Product Quantity"
                placeholder="product quantity"
                type="number"
                error={errors.quantity}
                name="quantity"
              />
              <InputField
                label="Product image"
                type="file"
                error={errors.coverImage}
                name="coverImage"
              />
            </div>


            <div className="flex justify-end space-x-4 pt-4">
              <button onClick={() => handleCancelProductAdd()} id="addProductCardCancelBtn" type="button"
                className="px-4 py-2 rounded-full  bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                Cancel
              </button>

              <div id='prductBtnContainer'>
                <button
                  disabled={isLoading}

                  className="flex items-center  space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">＋</span>
                  <span>Add product</span>
                  {isLoading && <Loader size={5} />}
                </button>
              </div>
            </div>
          </form>
        </>
      </Modal>


      <Modal isOpen={isEditing} title="Add New Product">
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit product here</h2>


          <form onSubmit={handleEditProductSubmit} className="space-y-4 ">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <InputField
                label="Product Name"
                placeholder="product name"
                name="name"
                error={errors.name}
                isRequired={false}
                value={currentProdduct.name || ''}

              />

              <InputField
                label="sku"
                placeholder="product sku"
                error={errors.description}
                name="sku"
                value={currentProdduct.sku || ''}

              />

              <InputField
                label="Price"
                placeholder="product price"
                type="number"
                error={errors.price}
                name="price"
                value={currentProdduct.price || ''}

              />
              <SelectField
                label='Category'
                options={[
                  { value: 'phones', label: 'Phones' },
                  { value: 'accessories', label: 'Accessories' },
                  { value: 'gadgets', label: 'Gadgets' },
                ]}
                error={errors.category}
                name='category'
                value={currentProdduct.category || ''}
              />
              <InputField
                label="Product Quantity"
                placeholder="product quantity"
                type="number"
                error={errors.quantity}
                name="quantity"
                value={currentProdduct.quantity || ''}

              />
              <InputField
                label="Product image"
                type="file"
                error={errors.coverImage}
                isRequired={false}
                name="coverImage"
              />
            </div>


            <div className="flex justify-end space-x-4 pt-4">
              <button onClick={() => handleCancelEditProduct()} type="button"
                className="px-4 py-2 rounded-full  bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                Cancel
              </button>

              <div id='prductBtnContainer'>
                <button
                  disabled={isLoading}

                  className="flex items-center  space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg">＋</span>
                  <span>Save Changes</span>
                  {isLoading && <Loader size={5} />}
                </button>
              </div>
            </div>
          </form>
        </>
      </Modal>

    </div>
  )
}
export default Products
