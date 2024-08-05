import axios from "axios"
import { useEffect, useState } from "react"
import {FaChevronRight} from "react-icons/fa"
import { Link } from "react-router-dom";
import { ProductType } from "../Types";
import ProductComponent from "./ProductComponent";

const LatestProduct = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [products,setProducts] = useState<ProductType[]>();
    const getLatestProduct = () => {
        axios.get('latest-products-for-homepage')
        .then(({data}) => setProducts(data.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
    useEffect(() => {
        getLatestProduct()
    },[])
  return (
    <>
        {
            loading ? <h1>loading ...</h1> :
            <div>
              <ProductComponent route="latest-products" title="Latest Product" products={products}/>
              <Link to={"/latest-products"}>
              <button className="px-20 mx-auto my-5 py-2 bg-gray-200 flex rounded-full shadow-lg transform active:scale-90 transition-transform">View More <span className="my-auto ml-2"><FaChevronRight/></span></button>
              </Link>
            </div>
        }
    </>
  )
}

export default LatestProduct