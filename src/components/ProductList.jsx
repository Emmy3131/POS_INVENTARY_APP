import ProductCard from "./ProductCard"


const ProductsList = ({products, onDelete, isDeleting, onEdit, setIsEditing}) => { 
  return (
    <div>
      <div className="flex gap-7 flex-wrap">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} onDelete ={onDelete} isDeleting={isDeleting} onEdit = {onEdit} setIsEditing ={setIsEditing}/>
        ))}
      </div>
    </div>
  )
}
export default ProductsList