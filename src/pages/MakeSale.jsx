import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sideBar";
import MakeSaleList from "../components/MakeSaleList";

const MakeSale = () => {


  return (
    <div className="">

      <h1 className="text-2xl font-semibold bg-white p-2 rounded-xl mb-5 shadow">
        Make Sale
      </h1>
      <MakeSaleList />


    </div>
  );
};

export default MakeSale;
