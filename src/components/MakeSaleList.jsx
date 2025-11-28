import { allProducts } from "./ProductList";
import MakeSaleCard from "./MaleSaleCard";

const MakeSaleList =()=>{
  return(
    <div>
       <div className="flex gap-7 flex-wrap">
        {allProducts.map((product, index) => (
          <MakeSaleCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}
export default MakeSaleList