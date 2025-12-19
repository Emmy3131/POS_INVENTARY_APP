import { SiPolkadot } from "react-icons/si";

const Loader =({size = 7, type='spinner'})=>{
  return (
  <div className="inline-block">
    <SiPolkadot className={`animate-spin duration-100 h-${size} w-${size}`}/>
  </div>); 
}

export default Loader;