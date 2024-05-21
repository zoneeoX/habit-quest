import React from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero/Hero.jsx";
import Register from "./pages/Register/Register";
import PostRegister from "./pages/PostRegister/PostRegister";
import Login from "./pages/Login/Login.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import CreateHabit from "./pages/CreateHabit/CreateHabit.jsx"

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/customize" element={<PostRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/new" element={<CreateHabit />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
};
