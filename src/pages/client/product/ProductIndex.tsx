import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductComponent from '../../../components/ProductComponent';
import { ProductType } from '../../../Types';

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const {_id} = useParams();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const getProducts = () => {
    axios.get(`${pathname}`)
      .then(({ data }) => {
        if(_id) {
          let productsData = data.data.filter((product :ProductType) => product._id !== _id);
          setProducts(productsData);
        }else {
          setProducts(data.data);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getProducts();
  }, [_id]);

  return (
    <>
      {
        loading ? <h1>loading...</h1> :
          <ProductComponent route={pathname} title={pathname} products={products} />
      }
    </>
  );
}

export default Product;
