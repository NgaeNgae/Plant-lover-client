import axios from 'axios';
import { useState,ChangeEvent, FormEvent } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import PreviewImage from '../../../components/PreviewImage';

interface Slider {
  title?: string,
  description?: string,
  order_by?: number,
  image?: any,
  status?: boolean
}
const SliderCreate = () => {
  const [slider,setSlider] = useState<Slider>({});
  const navigate = useNavigate();
  const [previewImage,setPreviewImage] = useState<string>();
  const [checkbox,setCheckbox] = useState<boolean>(true);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", String(slider.title));
    formData.append("order_by", String(slider?.order_by));
    formData.append("status", String(checkbox));
    formData.append("description", String(slider.description));
    formData.append("image",slider.image);
    axios.post('admin/sliders',formData).then((response) => navigate("/admin/sliders"))
    .catch((error) => console.log(error));
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSlider({ ...slider, [name]: value });
  };
  const handleCheckboxChange = (    
    e: ChangeEvent<HTMLInputElement>
    ) => {
      setCheckbox(!checkbox);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
        setSlider({ ...slider, [name]: files?.[0] });
        setPreviewImage(window.URL.createObjectURL(files[0]));
      }
  };

  return (
    <div className='w-[90%] rounded-md shadow-sm my-5 p-10 mx-auto border-gray-100 border'>
                  <h1 className='text-3xl w-full mb-6 text-center  text-emerald-400'>Slider Create Page</h1>
      {previewImage && (
        <PreviewImage previewImage={previewImage}/>
      )}
      <form onSubmit={handleSubmit} className='justify-between flex flex-wrap'>
                <div className='w-[100%] my-5'>
                    <label htmlFor="image" className='block'>Images</label>
                    <input className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-emerald-400 hover:file:bg-violet-100  w-full bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' type="file" required name="image" onChange={handleFileChange} accept='image/*' />
                </div>
                <div className='w-[40%] my-5'>
                    <label htmlFor="title" className='block'>Title</label>
                    <input className='w-full bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' name="title" required type="text" onChange={handleInputChange} />
                </div>
                <div className='w-[10%] flex-wrap flex my-5'>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" name="status" checked={checkbox} onChange={handleCheckboxChange}
      />
                </div>
                <div className='w-[40%] my-5'>
                    <label htmlFor="order_by" className='block'>Order By</label>
                    <input className='w-full  bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' type="number" required min={1} name="order_by" onChange={handleInputChange}/>
                </div>
                <div className='w-[100%] my-5'>
                    <label htmlFor="description" className='block'>Description</label>
                    <textarea rows={6} required name="description" className='w-full bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' onChange={handleInputChange}/>
                </div>
                <button className='border w-full mx-auto text-center text-emerald-400 font-medium border-emerald-400 rounded-md py-1'><AiOutlinePlus className='mr-2 mb-1 inline' />Add Slider</button>
            </form>
    </div>
  )
}

export default SliderCreate