 import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 import 'bootstrap/dist/css/bootstrap.min.css';
 import "@fortawesome/fontawesome-free/css/all.min.css";
 
 import 'slick-carousel/slick/slick.css';
 import 'slick-carousel/slick/slick-theme.css';
 

 import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import NotFound from './Pages/NotFound/NotFound'
import Register from './Pages/Register/Register'
import Cart from './Pages/Cart/Cart';
import WishList from './Pages/WishList/WishList';
import Login from './Pages/Login/Login';
import ProductDetails from './Pages/ProdcutDetails/ProductDetails';
import Admin from './Pages/Admin/Admin';

  let x =  createBrowserRouter([
  {path:"",element:<Layout/>, children:[
      {index:true,element:<Home/>},
      {path:'about',element:<About/>},
      {path:'register',element:<Register/>},
      {path:"/product/:productId",element:<ProductDetails/>},
      {path:'login',element:<Login/>},
      {path:'cart',element:<Cart/>},
      {path:'wishlist',element:<WishList/>},
      {path:'admin',element:<Admin/>},

      {path:'*',element:<NotFound/>}
   
  ]}  
 ])
function App() {
   

  return  <RouterProvider router={x}>


  </RouterProvider>
}

export default App
