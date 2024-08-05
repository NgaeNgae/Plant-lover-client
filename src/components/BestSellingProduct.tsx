import axios from "axios"
import { useEffect, useState } from "react"
import {FaChevronRight} from "react-icons/fa"
import { ProductType } from "../Types";
import { Link } from "react-router-dom"
import ProductComponent from "./ProductComponent";

const BestSellingProduct = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [products,setProducts] = useState<ProductType[]>();
    const getLatestProduct = () => {
        axios.get('best-selling-products-for-homepage')
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
                <ProductComponent route="best-selling-products" title="Best Selling Product" products={products}/>
                <Link to={"/best-selling-products"}>
                    <button className="px-20 mx-auto my-5 py-2 bg-gray-200 flex rounded-full shadow-lg transform active:scale-90 transition-transform">View More <span className="my-auto ml-2"><FaChevronRight/></span></button>            
                </Link> 
            </div>
        }
    </>
  )
}

export default BestSellingProduct