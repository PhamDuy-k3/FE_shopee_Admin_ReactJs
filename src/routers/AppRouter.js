import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../views/admin/index/Dashborad/dashbroad";
import User from "../views/admin/index/user/user";
import Products from "../views/admin/index/products/products";
import IndexAdmin from "../views/admin/index/indexAdmin";
import { Index as AuthLayout } from "../views/auth";
import { Index as LoginPage } from "../views/auth/login/page";
import AddUser from "../views/admin/index/user/addUser";
import UpdateUser from "../views/admin/index/user/updateUser";
import AddProduct from "../views/admin/index/products/addProduct";
import UpdateProduct from "../views/admin/index/products/updateProduct";
import ChatRealTime from "../views/admin/index/chat/chat";
import CartOder from "../views/admin/index/orderConfirmation/orderConfirmation";
import CartOderPaymentConfirmation from "../views/admin/index/paymentConfirmation/paymentConfirmation";
import Revenue from "../views/admin/index/revenue/revenue";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexAdmin />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "/users",
        children: [
          {
            index: true,
            element: <User />,
          },
          {
            path: "/users/create",
            element: <AddUser />,
          },
          {
            path: "/users/update/:userId",
            element: <UpdateUser />,
          },
        ],
      },
      {
        path: "/products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "/products/create",
            element: <AddProduct />,
          },
          {
            path: "/products/update/:productId",
            element: <UpdateProduct />,
          },
        ],
      },
      {
        path: "/chat",
        children: [
          {
            index: true,
            element: <ChatRealTime />,
          },
        ],
      },
      {
        path: "/orderConfirmation",
        children: [
          {
            index: true,
            element: <CartOder />,
          },
        ],
      },
      {
        path: "/paymentConfirmation",
        children: [
          {
            index: true,
            element: <CartOderPaymentConfirmation />,
          },
        ],
      },
      {
        path: "/Revenue",
        children: [
          {
            index: true,
            element: <Revenue />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
