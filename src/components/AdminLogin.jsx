import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const AdminLogin = () => {
    const [message, setMessage] = useState("");
  
    const { register, handleSubmit, } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      const auth = response.data;
      if(auth.token) {
        localStorage.setItem('token',auth.token);
        setTimeout(() => {
          localStorage.removeItem('token');
          alert("Token has been expired, Please Login again");
          navigate("/")
        },3600 * 1000)
      }
      Swal .fire({
          position: "top-right",
          icon: "success",
          title: "Đăng nhập admin",
          showConfirmButton: false,
          timer: 1500,
        });
      
      navigate("/dashboard");
    } catch (error) {
      setMessage("Nhập đúng tên đăng nhập và mật khẩu");
      console.error(error);
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-50">
      <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard Login</h2>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
            {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
              placeholder="Nhập username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Password
            </label>
            <input
            {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3 ">{message}</p>
          )}
          <div className="flex justify-center">
            <button className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-gray-500 text-xs">&copy;2025 Book Store. All Rights reserved.</p>
      </div>
    </div>
    
  )
}

export default AdminLogin;
