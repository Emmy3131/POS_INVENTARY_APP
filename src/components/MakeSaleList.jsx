
import MakeSaleCard from "./MaleSaleCard";

const MakeSaleList = ({ products, cart, actionLoadingId }) => {
  return (
    <div >
     <div className="flex flex-col lg:flex-row gap-4">
       {products.map((product) => (
        <MakeSaleCard
          key={product._id}
          product={product}          // ✅ PASS PRODUCT
          cart={cart}
          actionLoadingId={actionLoadingId}
        />
      ))}
     </div>
    </div>
  );
};
export default MakeSaleList