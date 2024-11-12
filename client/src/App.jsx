import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from 'axios'
import { UserContextProvider } from "./context/UserContext";
import AccountPage from "./pages/AccountPage";
import { ItemsForm } from "./components/ItemsForm";
import OneItemList from "./components/OneItemList";
import ShopPage from "./pages/ShopPage";
import { ItemContextProvider } from "./context/ItemContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartPage from "./pages/CartPage";
import DonatePage from './pages/DonatePage';
import SingleBookedItem from "./components/SingleBookedItem";
// import dotenv from 'dotenv'

axios.defaults.baseURL=import.meta.env.VITE_APP_SERVER_URL
axios.defaults.withCredentials=true

function App() {
  console.log(import.meta.env.VITE_APP_SERVER_URL)
  return (    
    <>
    
    <UserContextProvider>
      <ItemContextProvider>
    <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />}></Route>
        <Route path="/shop" element={<ShopPage />}></Route>
        <Route path="/account/:subpage?" element={<AccountPage />}></Route>
        <Route path="/account/:subpage/:action" element={<AccountPage />}></Route>
        <Route path="/account/:subpage/single/:id" element={<ItemsForm />}></Route>
        <Route path="/donate" element={<DonatePage />} ></Route>
        <Route path="/account/:subpage/pastorder/:id" element={<SingleBookedItem />} ></Route>
        <Route path="/items/book/:id" element={<OneItemList />  }></Route>
        <Route path="/cart"  element={<CartPage />}></Route>
      </Route>
    </Routes>
      </ItemContextProvider>
    </UserContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
