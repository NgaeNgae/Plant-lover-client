import axios from 'axios';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react';
import { imagePath } from '../services/ImageService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Slider = () => {
    let [sliders,setSliders] = useState<any>();
    let [loading,setLoading] = useState(true);
  const getSliders = () => {
    axios.get('get-sliders')
    .then(({data}) => setSliders(data.data))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }
  useEffect(() => {
    getSliders()
  },[])
  return (
    <div>
         <Swiper
    className="absolute top-[-68px]"
    modules={[Navigation, Pagination,Autoplay]}
    slidesPerView={1}
    loop={true}
    navigation
    pagination={{ clickable: true }}
  >
{loading ? <h1>Loading...</h1> : 
sliders && sliders.map((slider : any) =>
  (
    slider.image && 
    <SwiperSlide className='relative mb-8' key={slider._id}>
            <div className='bg-black'>
            <img className="opacity-50 h-[650px] w-full" alt={slider.title} src={imagePath(slider.image)} />
            </div>
            <div className='mx-auto text-white w-full mt-80 absolute top-0 tracking-wider gap-10 p-9 text-center'>
            <h1 className='text-6xl max-sm:text-4xl font-semibold'>{slider.title} </h1>
            <h3 className='text-xl font-extralight my-3'>{slider.description}</h3>
            </div>
    </SwiperSlide>
  )
)
        } 
       </Swiper>
    </div>
  )
}

export default Slider