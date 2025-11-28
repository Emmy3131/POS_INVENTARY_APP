import { FaPlus } from "react-icons/fa"

const MakeSaleCard = ({ img, name, price, icon, description,}) => {
  return (
    <div className="flex flex-cols-1 sm:flex-cols-2 md:flex-cols-3 lg:flex-cols-4">

      <div>
        <img src={img} alt={name}
          className="w-full h-40 object-cover rounded-lg mb-4 shadow-md" />
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>

        <div className="flex justify-between items-center gap-2">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <div className="flex gap-2">
            <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
              {icon = <FaPlus />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MakeSaleCard