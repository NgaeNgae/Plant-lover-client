import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import { SwiperSlide,Swiper } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { imagePath } from "../../../services/ImageService"
import { TfiWorld } from "react-icons/tfi"
import { AiOutlinePlus } from "react-icons/ai"
import Product from "./ProductIndex"
 const ProductDetial = () => {
  const {_id} = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product,setProduct] = useState<any>();
  const [loading,setLoading] = useState<boolean>(true);
  const getProduct = () => {
    axios.get(`get-product/${_id}`)
    .then((({data}) => {
    if(data.condition) {
      setProduct(data.data)
    }
  }
    ))
    .catch(error => error)
    .finally(() => setLoading(false));
  }
  useEffect(() => {
    getProduct();
  },[_id]);
  return (
    <>
      {loading ? <h1>loading</h1>

      :
    <div className="border gap-5 flex m-10">
    <div className="w-[50%] gap-2 flex h-[400px]">
    <Swiper
        onSwiper={setThumbsSwiper}
        direction={'vertical'}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[30%] bg-black mySwiper"
      >
 {product && product.images.map((image : string,index : number) => 
        (
          <SwiperSlide key={index}>
        <img className="w-[100%] h-[100%]" src={imagePath(image)} alt="" />
      </SwiperSlide>
        )
      )}
      </Swiper>
    <Swiper
    className="w-[70%]"
    modules={[Navigation,Thumbs, FreeMode]}
    slidesPerView={1}
    loop={true}
    navigation
    freeMode={true}
    thumbs={{ swiper: thumbsSwiper }}
    >
      {product && product.images.map((image : string,index : number) => 
        (
          <SwiperSlide key={index}>
        <img className="h-[400px] w-full" src={imagePath(image)} alt="" />
      </SwiperSlide>
        )

      )}
      </Swiper>
    </div>
      <div className="w-1/2 grid my-5 gap-5 place-content-start">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <div>
        <h1>Description</h1>
        <p>{product.description}</p>
        </div>
        <p>Price - ${product.price.toFixed(2)}</p>
        <span className='flex float-right'><TfiWorld className='my-auto mr-2 text-emerald-400' /> {product.count} in stock</span>
        <div className='flex gap-10'>
                  <button className='flex my-auto border text-blue-400 font-medium text-sm border-blue-400 px-3 rounded py-1'><AiOutlinePlus className="my-auto text-lg"/>Add to cart</button>
                </div>      </div>
  </div>
      }
    <Product/>
    </>
    
  )
}

export default ProductDetial