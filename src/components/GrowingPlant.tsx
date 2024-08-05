import background from '../assets/GrowingPlantBackground.jpg';
const GrowingPlant = () => {
  return (
    <div style={{ backgroundImage : `url(${background})` }} className='bg-black w-full h-[400px] object-right object-none'>
      <div className='w-1/2 text-white font-medium pl-32 gap-y-4 flex h-full content-center items-center flex-wrap'>
        <h1 className='w-full text-3xl'>Growing Plants</h1>
        <p className='w-full'>Sign up to our newsletter and get expert gardening tips, advice, and inspiration. Start creating your own green oasis today.</p>
        {/* <button className="px-12 py-2 border border-white flex rounded-full shadow-lg transform active:scale-90 transition-transform">View More</button> */}
      </div>
    </div>
  )
}

export default GrowingPlant