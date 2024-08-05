/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { imagePath } from '../../../services/ImageService';
import { TfiWorld } from 'react-icons/tfi'
import PageHeader from '../../../components/PageHeader'
import PagePagination from '../../../components/PagePagination';
interface product {
    name: string
    price: number
    count: number
    description: string
    discount: number
    images: string[]
    _id: string
}
export default function ProductIndex() {
    let [products, setProducts] = useState<product[]>();
    let [totalProductCount, setTotalProductCount] = useState<number>(0);
    let [finish, setFinish] = useState<boolean>(false);
    let [search, setSearch] = useState<string>('');
    let [totalpages, setTotalpages] = useState<number[]>();
    let [currentPage, setCurrentPage] = useState<number>(1);
    let [limit, setLimit] = useState<number>(8);
    const getProducts = () => {
        axios.get(`admin/products/?search=${search}&limit=${limit}&page=${currentPage}`, {
        }).then(({ data }) => {
            if (data.condition) {
                setProducts(data.data.result);
                    setTotalProductCount(data.data.totalCount);
                    let total = Math.ceil(data.data.totalCount / limit);
                    setTotalpages([]);
                    for (let i = 1; i <= total; i++) {
                        setTotalpages(totalpages => totalpages ? [...totalpages, i] : [i]);
                    }
                    setFinish(true);
            } else {
                alert("something went wrong");
            }
        }).catch((err) => console.log(err))
    }
    const handleSearchProducts = (e : any) => {
        setSearch(e.target.value);
        if(e.key === 'Enter') {
                getProducts();
        }
    }
    useEffect(() => {
            getProducts();
    }, [currentPage, limit]);
    return (
        <>
        <PageHeader createPageLink={"/admin/products/create"} name={"Product"} totalCount={totalProductCount} searchData={handleSearchProducts}/>
            <main className='p-3'>
                {
                    finish && products ?
                        (
                            <div className='flex pb-4 flex-wrap justify-around'>
                                {
                                    products.map((product) => {
                                        return (
                                            <Link to={"/admin/products/" + product._id} key={product._id} className='w-[24%] h-[30rem] my-3 shadow-[0px_0px_10px_14px_#edf2f7] border-4 p-1 border-gray-200/70'>
                                                <img className='w-full h-[60%]' src={imagePath(product.images[0])} alt="" />
                                                <div className='h-[30%] p-3'>
                                                    <span className='flex float-right'><TfiWorld className='my-auto mr-2 text-emerald-400' /> {product.count} in stock</span>
                                                    {
                                                        product.discount > 0 ?
                                                            (
                                                                <p><span className='inline text-black/70 line-through'>${product.price}</span> <span>${(product.price - (product.price * product.discount / 100)).toFixed(2)}</span></p>
                                                            ) : <span className='flex'>${product.price}</span>
                                                    }
                                                    <p>{product.name}</p>
                                                    <p className='line-clamp-3 indent-4 text-sm break-all text-start'>{product.description}</p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        )
                        : "Loading"
                }
                {totalpages ? (
                 <PagePagination currentPage={currentPage} totalpages={totalpages} limit={limit} setCurrentPage={setCurrentPage} setLimit={setLimit}/>
                ): null}
            </main>
        </>
    )
}
