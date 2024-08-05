import React from 'react'

const PreviewImage = ({previewImage} : any) => {
  return (
    <div className={previewImage.constructor === Array && previewImage.length > 1 ? 'w-[100%] flex justify-evenly flex-wrap' : 'w-[100%]'}>
        {previewImage.constructor === Array ? 
        (
            previewImage.map((image : string,i : number) => {
                return(
                    <img className='w-[200px] my-3 h-[150px] bg-black' src={image} key={i} alt="previewImage" />
                    )
            })
        ) :
        <img className='w-[200px] my-3 h-[150px] bg-black' src={previewImage} alt="previewImage" />
    }
    </div>
  )
}

export default PreviewImage