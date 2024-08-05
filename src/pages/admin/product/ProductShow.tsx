import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import { SwiperSlide,Swiper } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { imagePath } from "../../../services/ImageService"
import { TfiWorld } from "react-icons/tfi"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
 const ProductShow = () => {
  const {_id} = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product,setProduct] = useState<any>();
  const [loading,setLoading] = useState<boolean>(true);
  const getProduct = () => {
    axios.get(`admin/products/${_id}`)
    .then((({data}) => {
    if(data.condition) {
      setProduct(data.data)
    }
  }
    ))
    .catch(error => error)
    .finally(() => setLoading(false));
  }
  const handleDeleteProduct = (_id : string) => {
    axios.delete(`admin/products/${_id}`).then(() => {
      navigate('/admin/products');
    }).catch(error => console.log(error));
  }
  useEffect(() => {
    getProduct();
  },[]);
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
        spaceBetween={10}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[30%] mySwiper"
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
    preloadImages={false}
    slidesPerView={1}
    loop={true}
    onSwiper={(swiper :any) => console.log(product)}
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
      <div className="w-1/2">
      <span className='flex float-right'><TfiWorld className='my-auto mr-2 text-emerald-400' /> {product.count} in stock</span>
        <h1 className="mb-5">Name - {product.name}</h1>
        <h1>Description</h1>
        <p>{product.description}</p>
        <p>Price - {product.price}</p>
        <div className='flex justify-center gap-10'>
                <button onClick={() => handleDeleteProduct(product._id)} className='flex my-auto border text-red-400 font-medium text-sm border-red-400 px-3 rounded py-1'><AiOutlineDelete className="my-auto text-lg" />Delete</button>
                  <Link to={`/admin/products/edit/${product._id}`} className='flex my-auto border text-blue-400 font-medium text-sm border-blue-400 px-3 rounded py-1'><AiOutlineEdit className="my-auto text-lg"/>Edit</Link>
                </div>      </div>
  </div>
  
      }
    </>
    
  )
}

export default ProductShow