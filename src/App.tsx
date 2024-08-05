import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import SearchResult from './components/SearchResult';
import NavBar from './layouts/client/NavBar';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AdminSetting from './pages/admin/AdminSetting';
import AdminProductCreate from './pages/admin/product/ProductCreate';
import AdminProductEdit from './pages/admin/product/ProductEdit';
import AdminProductIndex from './pages/admin/product/ProductIndex';
import AdminProductShow from './pages/admin/product/ProductShow';
import AdminSliderCreate from './pages/admin/slider/SliderCreate';
import AdminSliderEdit from './pages/admin/slider/SliderEdit';
import AdminSliderIndex from './pages/admin/slider/SliderIndex';
import Register from './pages/auth/Register';
import Home from './pages/client/Home';
import ProductDetial from './pages/client/product/ProductDetail';
import Product from './pages/client/product/ProductIndex';
import ConfirmAuth from './pages/ConfirmAuth';
import { getRole } from './services/RoleService';
import { getAuthToken } from './services/TokenService';

function App() {
  const isAuthenticated = getAuthToken();
  const isAdmin = getRole() === "admin";
  const [searchValue,setSearchValue] = useState<string>();
  const [searchData,setSearchData] = useState<object[]>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showNav,setShowNav] = useState(true);
  const handleScroll = () => {
    if (window.scrollY < scrollPosition) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
    setScrollPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  },[scrollPosition])
  const handleSearch = (e:FormEvent) => {
    e.preventDefault();
    axios.get(`products/search/?value=${searchValue}`)
    .then(({data}) => 
      {
        if(data.condition) {
          setSearchData(data.data);
        }
      }
    ).catch(error => console.log(error))
  }
  const router = createBrowserRouter([
    {
      path: '/',
        element: <><NavBar showNav={showNav} setSearchValue={setSearchValue} handleSearch={handleSearch} />{searchData ? <SearchResult setSearchData={setSearchData} searchData={searchData}/> : <Home/>}</>,
    },
    {
      path: '/products',
      element: <Product/>
    },
    {
      path: '/latest-products',
      element: <Product/>
    },
    {
      path: '/best-selling-products',
      element: <Product/>
    },
    {
      path: '/latest-products/:_id',
      element: <ProductDetial/>
    },
    {
      path: '/products/:_id',
      element: <ProductDetial/>
    },
    {
      path: '/best-selling-products/:_id',
      element: <ProductDetial/>
    },
    {
      path : '/register',
      element : !isAuthenticated ? <Register/> : <Navigate to={"/"}/>
    },
    {
      path : '/api/auth/confirmation/:token',
      element: <ConfirmAuth/>
    },
    {
      path : '/admin',
      element : isAuthenticated && isAdmin ? <AdminDashboard/> : <Navigate to={"/"}/>,
      children : [
        {
          path : '',
          element : <AdminHome/>
        },
        {
          path : 'sliders',
          element : <AdminSliderIndex/>
        },
        {
          path : 'sliders/create',
          element : <AdminSliderCreate/>
        },
        {
          path : 'sliders/edit/:_id',
          element : <AdminSliderEdit/>
        },
        {
          path : 'products',
          element : <AdminProductIndex/>
        },
        {
          path : 'products/create',
          element : <AdminProductCreate/>
        },
        {
          path : 'products/edit/:_id',
          element : <AdminProductEdit/>
        },
        {
          path : 'products/:_id',
          element : <AdminProductShow/>
        }, 
        {
          path : 'settings',
          element : <AdminSetting/>
        }
      ]
    },
  ])
  return (
    <div className='App'>
    <RouterProvider router={router} />
  </div>  );
}

export default App;
