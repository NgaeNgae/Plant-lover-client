import LatestProduct from '../../components/LatestProduct';
import Footer from '../../components/Footer'
import BestSellingProduct from '../../components/BestSellingProduct';
import GrowingPlant from '../../components/GrowingPlant';
import AboutPlant from '../../components/AboutPlant';
import Slider from '../../components/Slider';
const Home = () => {
  return (
    <div className="gap-y-10 flex flex-col">
      <Slider/>
       <LatestProduct/>
       <GrowingPlant/>
       <BestSellingProduct/>
       <AboutPlant/>
       <Footer/>
    </div>
  )
}

export default Home