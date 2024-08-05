import { TfiWorld } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import { imagePath } from '../services/ImageService'

const ProductComponent = ({products, title, route} : any) => {
  return (
<div className="px-32">
        <h1 className='text-2xl mb-10 capitalize text-center'>{title.replace(/-/g,' ')}</h1>
            <div className="flex w-full flex-wrap gap-3">
                {
                    products && products.map((product : any) => (
                        <Link key={product._id} to={`/${route}/${product._id}`} className="w-[24%] mx-auto rounded border h-[400px]">
                            <img className="h-[60%] w-full" src={imagePath(product.images[1])} alt="" />
                            <div className="p-3 my-auto">
                            <h1 className="text-lg mb-2 font-medium">{product.name}</h1>
                            <span className='flex float-right text-sm'><TfiWorld className='my-auto mr-2 text-emerald-400' /> {product.count} in stock</span>
                            {
                                                        product.discount > 0 ?
                                                            (
                                                                <><p className="text-xl font-bold">${(product.price - (product.price * product.discount / 100)).toFixed(2)}</p><p className='text-black/70 text-xs'><span className="line-through mr-2">${product.price.toFixed(2)}</span><span>-{product.discount}%</span></p></>
                                                            ) : <p className="text-xl font-bold">${product.price}</p>
                                                    }
                            </div>
                        </Link>
                    ))
                }
            </div>
    </div>  )
}

export default ProductComponent