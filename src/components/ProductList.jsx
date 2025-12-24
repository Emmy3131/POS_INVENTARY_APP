import ProductCard from "./ProductCard"


const ProductsList = ({products, onDelete, isDeleting, onEdit, setIsEditing}) => { 
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} onDelete ={onDelete} isDeleting={isDeleting} onEdit = {onEdit} setIsEditing ={setIsEditing}/>
        ))}
      </div>
    </div>
  )
}
export default ProductsList