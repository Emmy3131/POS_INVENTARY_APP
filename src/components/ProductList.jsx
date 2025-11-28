import ProductCard from "./ProductCard"
import image1 from "./../assets/images/fruit-2.png"
import image2 from "./../assets/images/fruit-3.jfif"
import image3 from "./../assets/images/fruit-4.jfif"
import image5 from "./../assets/images/fruit-5.jpg"



  export const allProducts = [
    {
      img: image1,
      name: "Wooden Office Chair",
      price: "65,000",
      description: "Furniture",
      quantity: 4,
    },
    {
      img: image2,
      name: "Wooden Office Chair",
      price: "65,000",
      description: "Furniture",
      quantity: 4,
    },
    {
      img: image3,
      name: "Wooden Office Chair",
      price: "65,000",
      description: "Furniture",
      quantity: 4,
    },
    {
      img: image5,
      name: "Wooden Office Chair",
      price: "65,000",
      description: "Furniture",
      quantity: 4,
    },
    {
      img: image5,
      name: "Wooden Office Chair",
      price: "65,000",
      description: "Furniture",
      quantity: 4,
    },
    {
      img: image5,
      name: "Wooden Office Chair",
      price: "65,000",
      description: "Furniture",
      quantity: 4,
    },
  ]


const ProductsList = () => {
 
  return (
    <div>
      <div className="flex gap-7 flex-wrap">
        {allProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}
export default ProductsList