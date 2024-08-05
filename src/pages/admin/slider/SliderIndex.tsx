import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineDelete ,AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader';
import PagePagination from '../../../components/PagePagination';
import { imagePath } from '../../../services/ImageService';
interface Slider{
  _id : string,
  title : string,
  image : string,
  order_by : number,
  description : string,
  deleted : boolean,
  status : boolean,
}
const SliderIndex = () => {
  let [sliders,setSliders] = useState<Slider[]>();
  let [totalSliderCount,setTotalSliderCount] = useState<number>();
  let [finish,setFinish] = useState<boolean>(false);
  let [search, setSearch] = useState<string>('');
  let [totalpages, setTotalpages] = useState<number[]>([]);
  let [currentPage, setCurrentPage] = useState<number>(1);
  let [limit, setLimit] = useState<number>(5);

  const getSliders = () => {
    axios.get(`admin/sliders/?search=${search}&limit=${limit}&page=${currentPage}`).then(({data}) => {
      if(data.condition) {
        setSliders(data.data.result);
        setTotalSliderCount(data.data.totalCount);
        let total = Math.ceil(data.data.totalCount / limit);
        setTotalpages([]);
        for (let i = 1; i <= total; i++) {
            setTotalpages(totalpages => totalpages ? [...totalpages, i] : [i]);
        }
        setFinish(true);
      }
    })
    .catch((error) => console.log(error));
  }
  const handleDeleteSlider = (_id : string) => {
    axios.delete(`admin/sliders/${_id}`)
    .then(() => {
        setSliders(sliders?.filter(slider => slider._id !== _id));
    })
    .catch(error => console.log(error))
  }
  const handleSearchSliders = (e : any) => {
    setSearch(e.target.value);
    if(e.key === 'Enter') {
            getSliders();
    }
}
  useEffect(() => {
    getSliders();
  },[]);
  return (
    <div className='p-3'>
            <PageHeader createPageLink={"/admin/sliders/create"} name={"Slider"} totalCount={totalSliderCount} searchData={handleSearchSliders}/>
      {
        sliders && finish ? (
          <div className='flex gap-2 mt-5 pb-4 flex-wrap'>
          {sliders.map((slider) => {
            return (
              <div key={slider._id} className='w-[24%] pb-2 h-[25rem] shadow-[0px_0px_1px_1px_#edf2f7]'>
                <img className='w-full h-[60%]' src={imagePath(slider.image)} alt="" />
                <div className='h-[30%] p-3'>
                    <p><span>No- {slider.order_by}</span> <span className={slider.status ? 'float-right text-emerald-400' : 'float-right text-red-400'}>{slider.status ? "apply" : "cancel"}</span></p>
                    <p className='block'>{slider.title}</p>
                    <p className='line-clamp-2 indent-4 text-sm break-all text-start'>{slider.description}</p>
                </div>
                <div className='flex justify-center gap-10'>
                <button onClick={() => handleDeleteSlider(slider._id)} className='flex my-auto border text-red-400 font-medium text-sm border-red-400 px-3 rounded py-1'><AiOutlineDelete className="my-auto text-lg" />Delete</button>
                  <Link to={`/admin/sliders/edit/${slider._id}`} className='flex my-auto border text-blue-400 font-medium text-sm border-blue-400 px-3 rounded py-1'><AiOutlineEdit className="my-auto text-lg"/>Edit</Link>
                </div>
              </div>
            )
          })}
          </div>
        ) : <div>Loading...</div>
      }
    {
      totalpages ? 
      <PagePagination currentPage={currentPage} totalpages={totalpages} limit={limit} setCurrentPage={setCurrentPage} setLimit={setLimit}/>
      : null
    }
    </div>
  )
}

export default SliderIndex