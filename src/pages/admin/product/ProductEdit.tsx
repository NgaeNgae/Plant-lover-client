import axios from 'axios';
import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import PreviewImage from '../../../components/PreviewImage';
import { imagePath } from '../../../services/ImageService';

interface Product {
    name?: string;
    price?: number;
    count?: number;
    discount?: number;
    description?: string;
    images?: any;
  }
 const ProductEdit= () => {
  const {_id} = useParams();
    const [previewImages,setPreviewImages] = useState<any[]>();
    const [product,setProduct] = useState<Product>({});
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", product.name || '');
        formData.append("price", String(product.price));
        formData.append("count", String(product.count));
        formData.append("discount", String(product.discount));
        formData.append("description", product.description || '');
        if (product.images) {
            for (let image of product.images) {
              formData.append(`images`, image);
            }
          }
        axios.patch(`admin/products/${_id}`,formData).then((response) => navigate('/admin/products'))
        .catch((error) => console.log(error));
    }
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };
    
      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setProduct({ ...product, [name]: files });
        let previewImgs = []
        if (files) {
            for (let i = 0; i < files.length; i++) {
              previewImgs.push(window.URL.createObjectURL(files[i]));
            }
            setPreviewImages(previewImgs);
          }
      };
    const getCurrentData = () => {
        axios.get(`admin/products/${_id}`).then((({data}) => {
            if(data.condition) {
                console.log(data.data);
                setProduct(data.data);
                let images : string[] = [];
                data.data.images.forEach((data: string) => {
                    images.push(imagePath(data));
                });
                setPreviewImages(images);
            }
        }))
    }
    useEffect(() => {
        getCurrentData();
    },[])
    return (
        <>
            {
                previewImages && product ?
                <div className='w-[90%] rounded-md shadow-sm my-5 p-10 mx-auto border-gray-100 border'>
                <h1 className='text-3xl w-full mb-6 text-center  text-emerald-400'>Product Edit Page</h1>
                {
                        previewImages ? (
                            <PreviewImage previewImage={previewImages}/>
                        ) : null
                    }
                <form onSubmit={handleSubmit} className='justify-between flex flex-wrap'>
                    <div className='w-[100%] my-5'>
                        <label htmlFor="images" className='block'>Images</label>
                        <input className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-emerald-400 hover:file:bg-violet-100  w-full bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' type="file" name="images" onChange={handleFileChange} multiple accept='image/*' />
                    </div>
                    <div className='w-[40%] my-5'>
                        <label htmlFor="name" className='block'>Name</label>
                        <input className='w-full bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' name="name" defaultValue={product.name} required type="text" onChange={handleInputChange} />
                    </div>
                    <div className='w-[40%] relative my-5'>
                        <label htmlFor="price" className='block'>Price</label>
                        <span className='inline absolute bottom-2 left-0'>$</span>
                        <input className='w-full bg-transparent outline-none px-2 pl-4 py-1.5 border-b border-gray-400' type="number" defaultValue={product.price} required min={1} name="price" onChange={handleInputChange} />
                    </div>
                    <div className='w-[40%] my-5'>
                        <label htmlFor="count" className='block'>Count</label>
                        <input className='w-full  bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' type="number" defaultValue={product.count} required min={1} name="count" onChange={handleInputChange}/>
                    </div>
                    <div className='w-[40%] my-5'>
                        <label htmlFor="discount" className='block'>Discount</label>
                        <input className='w-full  bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' type="number" defaultValue={product.discount} required step={10} min={0} max={90} name="discount" onChange={handleInputChange}/>
                    </div>
                    <div className='w-[100%] my-5'>
                        <label htmlFor="description" className='block'>Description</label>
                        <textarea rows={6} required defaultValue={product.description} name="description" className='w-full bg-transparent outline-none px-2 py-1.5 border-b border-gray-400' onChange={handleInputChange}/>
                    </div>
                    <button className='border w-full mx-auto text-center text-emerald-400 font-medium border-emerald-400 rounded-md py-1'><AiOutlinePlus className='mr-2 mb-1 inline' />Add Product</button>
                </form>
            </div> : null
            }
        </>
    )
}
export default ProductEdit;