const Cart =({isCart, setIsCart})=>{
  return(
    <div>
     
        <div className="">
            <h2 className="text-xl font-bold mb-1">Your cart</h2>
            <div className="flex justify-between items-center w-[790px] mb-4">
              <p className="text-gray-500">Review your items and proceed to checkout</p>
              <button id="clearCartBtn"
                className=" bg-green-500 text-white p-2 rounded-lg font-semibold hover:bg-green-600">
                Clear Cart
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

              <div className="flex-1">
              
              <div class=" flex items-center bg-white shadow rounded-xl mb-4" >
                 
                  <div class="w-32 h-28 flex-shrink-0">
                    <img src="${item.productImage}" alt="${item.name}" class="object-cover w-full h-full rounded-lg"/>
                  </div>

                  
                  <div class="ml-4 flex-1">
                    <h3 class="font-semibold text-lg">Iphone</h3>
                    <p class="quantity text-gray-600 font-bold text-[19px] mt-1">Quantity: 1 </p>

                    <p class="text-lg font-semibold text-gray-900">₦$ 100000</p>
                  </div>

                
                  <div class="flex flex-col items-end">
                    <button class="mt-2 text-red-500 hover:text-red-700 text-xl">
                      <i class="fas fa-trash cart-trash"></i>
                    </button>

                  <div class=" bg-gray-400 rounded-lg p-1">
                  
                  <button class="text-red-500 hover:text-red-700 text-xl">
                    <i class="fas fa-minus"></i>
                  </button>

                  
                  <button class="text-blue-600 hover:text-green-700 text-xl">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>

                  </div>
                </div>
          
              </div>


              <div id="orderSummary" className=" w-full lg:w-[300px] bg-white shadow rounded-xl p-6 h-fit">
                <h3 className="text-lg font-semibold mb-4">Order summary</h3>
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Subtotal</span>
                  <span id="subTotal" className="font-semibold">₦0</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Tax</span>
                  <span id="tax" className="font-semibold">₦0</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-700">
                  <span>Discount</span>
                  <span id="discount" className="font-semibold text-green-500">₦0</span>
                </div>
                <hr className="my-2" />
                <div id="orderTotal" className="flex justify-between mb-6 text-gray-900 font-semibold">
                  <span>Order total</span>
                  <span>₦0</span>
                </div>
                <button id="checkOutBtn"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600">
                  Proceed to Payment
                </button>
              </div>
            </div>
         
        </div>
   
    </div>
  )
}
export default Cart