import { useState } from "react"
import ProductsList from "../components/ProductList"
import { FaPlus } from "react-icons/fa"
import InputField from "../components/InputField"
import SelectField from "../components/SelectField"
import Modal from "../components/Modal"
import axios from "axios"


const Products = () => {
  const [errors, setErrors] = useState({});
  const [addProduct, setAddProduct] = useState(false)
  const handleAddProduct = () => {
    setAddProduct(true)
  }
  const handleCancelProductAdd = () => {
    setAddProduct(false)
  }
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjhlNGYyMTViMTFiYzAwMTJkNGM4MyIsImlhdCI6MTc2NDM0ODc2NywiZXhwIjoxNzcyMTI0NzY3fQ.Bsdb2gmKtm5czYLGAx3q9BF-PJdlDSbc0DN-N_C2d18';




  const baseUrl = 'https://pos-inventory-api.vercel.app';
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      // Logic to submit the new product

      const formData = new FormData(e.target);

      const res = await axios.post(`${baseUrl}/api/v1/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }

      })
      const data = await res.json();

      console.log(data)
    } catch (error) {
      console.error('Error adding product:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  }

    return (
      <div>



        <header class="flex justify-between items-center mb-3">
          <h1 class="text-2xl font-semibold bg-white p-2 px-4 rounded-xl shadow">Products</h1>
          <div>
            <button onClick={() => handleAddProduct()}
              class="bg-green-500 text-white px-4 py-2 rounded-xl flex justify-center items-center shadow font-bold hover:bg-black ml-4">
              <FaPlus />Add Product
            </button>
          </div>
        </header>

        <ProductsList />

        <Modal isOpen={addProduct} onClose={handleCancelProductAdd} title="Add New Product">
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h2>
            <p className="text-gray-500 mb-4">Fill The Space Below</p>

            <form onSubmit={handleSubmitProduct} className="space-y-4 ">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <InputField
                  label="Product Name"
                  placeholder="product name"
                  name="name"
                  error={errors.name}
                />

                <InputField
                  label="Description"
                  placeholder="product discription"
                  error={errors.description}
                />

                <InputField
                  label="Price"
                  placeholder="product price"
                  type="number"
                  error={errors.price}
                />
                <SelectField
                  label='Category'
                  options={[
                    { value: 'phones', label: 'Phones' },
                    { value: 'accessories', label: 'Accessories' },
                    { value: 'gadgets', label: 'Gadgets' },
                  ]}
                  error={errors.category}
                />
                <InputField
                  label="Product Quantity"
                  placeholder="product quantity"
                  type="number"
                  error={errors.quantity}
                />
                <InputField
                  label="Product image"
                  type="file"
                  error={errors.coverImage}
                />

                {/* <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select name="" id="productCategory"
                        className="w-full rounded-full shadow p-4 focus:outline-none hover:border hover:border-gray-700 transition-colors duration-1000 ease-in-out">
                        <option className="focus:border-0" value="">Select the product Category</option>
                        <option value="phones">Phones</option>
                        <option value="accessories">Accessories</option>
                        <option value="gadgets">Gadgets</option>
                      </select>

                    </div> */}


              </div>


              <div className="flex justify-end space-x-4 pt-4">
                <button onClick={() => handleCancelProductAdd()} id="addProductCardCancelBtn" type="button"
                  className="px-4 py-2 rounded-full  bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                  Cancel
                </button>

                <div id='prductBtnContainer'>
                  <button id="addProductBtn" type="submit"
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-md transition">
                    <span className="text-lg">＋</span>
                    <span>Add product</span>
                  </button>

                  <button id="editProductBtn" type="submit"
                    className="hidden items-center space-x-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 shadow-md transition">
                    <span className="text-lg">＋</span>
                    <span>Save Changes</span>
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
