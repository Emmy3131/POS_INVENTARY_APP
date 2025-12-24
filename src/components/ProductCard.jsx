import { FaTrash, FaEdit } from "react-icons/fa"
import Loader from "./Loader"
const ProductCard = ({
  _id,
  coverImage,
  name,
  price,
  icon,
  description,
  quantity,
  onDelete,
  isDeleting,
  onEdit,
  setIsEditing
}) => {

  const handleDeleteClick = () => {
    onDelete(_id);
  }
  const handleEditClick = () => {
    onEdit(_id);
    setIsEditing(true);
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col ">

      <div className="">
        <div className="m-auto w-[150px]">
          <img src={coverImage} alt={name}
          className=" object-cover shadow-md" />
        </div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <span className="text-md font-medium text-gray-600">Qty:{quantity}</span>

        <div className="flex justify-between items-center gap-2">
          <span className="text-xl font-bold text-gray-900">${price.toLocaleString()}</span>
          
          <div className="flex gap-2">
            <button onClick={handleEditClick} className="product-edit p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
              {icon = <FaEdit />}
            </button>
            <button onClick={handleDeleteClick} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
              {isDeleting ? <Loader size={5} /> : <FaTrash />}
               
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductCard