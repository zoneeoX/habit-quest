import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./pages/Hero/Hero.jsx";
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Navbar />
    <RouterProvider router={router} />
  </Provider>
);
