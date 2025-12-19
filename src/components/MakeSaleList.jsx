
import MakeSaleCard from "./MaleSaleCard";

const MakeSaleList = ({ products, cart, actionLoadingId }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <MakeSaleCard
          key={product._id}
          product={product}          // ✅ PASS PRODUCT
          cart={cart}
          actionLoadingId={actionLoadingId}
        />
      ))}
    </div>
  );
};
export default MakeSaleList