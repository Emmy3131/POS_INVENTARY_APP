import { FaPlus } from "react-icons/fa"
import Loader from "../components/Loader"
import { useState } from "react";

const MakeSaleCard = ({ product, cart, actionLoadingId }) => {
  if (!product) return null; // 🛡 safety

  const { _id, name, description, price, coverImage } = product;
  const isLoading = actionLoadingId === _id;

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-[250px]">
      <img
        src={coverImage}
        alt={name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-lg">${price}</span>

        <button
          onClick={() => cart(product)}
          disabled={isLoading}
          className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center
          hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? <Loader size={4} /> : <FaPlus className="text-white" />}
        </button>
      </div>
    </div>
  );
};

export default MakeSaleCard;