import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import Swal from "sweetalert2";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { getImgUrl } from "../../utils/getImgUrl"; // Nhớ import hàm lấy ảnh

const CheckOutPage = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  // const 
  // Tính tổng tiền
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const { currentUser } = UseAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };
    try {
      await createOrder(newOrder).unwrap();
      dispatch(clearCart());
      Swal.fire({
        title: "Thành công!",
        text: "Đơn hàng của bạn đã được đặt thành công.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Xem đơn hàng",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Failed to creating Order" + error);
      Swal.fire("Lỗi", "Không thể tạo đơn hàng, vui lòng thử lại!", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Thanh toán
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- CỘT TRÁI: FORM THÔNG TIN --- */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6 h-fit">
            <div className="mb-6 border-b pb-4">
              <h3 className="text-lg font-medium text-gray-900">Thông tin giao hàng</h3>
              <p className="text-sm text-gray-500">Vui lòng điền đầy đủ thông tin bên dưới.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Họ tên */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                  {...register("name", { required: "Vui lòng nhập họ tên" })}
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    defaultValue={currentUser?.email}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input
                    {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
                    type="number"
                    id="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  />
                   {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>
              </div>

              {/* Địa chỉ chi tiết */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ nhận hàng</label>
                <input
                  {...register("address", { required: "Vui lòng nhập địa chỉ" })}
                  type="text"
                  id="address"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                />
                 {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
              </div>

              {/* City, State, Country, Zip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Thành phố</label>
                  <input {...register("city", { required: true })} type="text" id="city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                   <label htmlFor="state" className="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                   <input {...register("state", { required: true })} type="text" id="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                   <label htmlFor="country" className="block text-sm font-medium text-gray-700">Quốc gia</label>
                   <input {...register("country", { required: true })} type="text" id="country" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                </div>
                <div>
                   <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
                   <input {...register("zipcode", { required: true })} type="text" id="zipcode" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                </div>
              </div>

              {/* Checkbox Terms */}
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  Tôi đồng ý với <Link to="/terms" className="text-blue-600 hover:underline">Điều khoản & Chính sách</Link>
                </label>
              </div>

              {/* Submit Button Mobile (ẩn trên desktop, hiện trên mobile nếu muốn, ở đây mình để nút chính ở sidebar) */}
              <div className="lg:hidden">
                 <button
                  type="submit"
                  disabled={!isChecked}
                  className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Đặt hàng (${totalPrice})
                </button>
              </div>
            </form>
          </div>

          {/* --- CỘT PHẢI: ORDER SUMMARY (LIST SẢN PHẨM) --- */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 sticky top-20">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-4">Đơn hàng của bạn</h3>
              
              {/* List Cart Items */}
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200 max-h-96 overflow-y-auto custom-scrollbar">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <li key={item._id} className="py-4 flex">
                        <div className="flex-shrink-0 w-16 h-20 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={getImgUrl(item.coverImage)}
                            alt={item.title}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3 className="line-clamp-2 text-sm">
                                <Link to={`/books/${item._id}`}>{item.title}</Link>
                              </h3>
                              <p className="ml-4 text-sm font-bold text-gray-600">${item.newPrice}</p>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500">Qty 1</p> {/* Nếu có field quantity thì thay vào đây */}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">Giỏ hàng trống</p>
                  )}
                </ul>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
                 <div className="flex justify-between text-sm text-gray-600">
                    <p>Tạm tính</p>
                    <p>${totalPrice}</p>
                 </div>
                 <div className="flex justify-between text-sm text-gray-600">
                    <p>Phí vận chuyển</p>
                    <p>$0.00</p>
                 </div>
                 <div className="flex justify-between text-base font-medium text-gray-900 border-t py-2 mt-2">
                    <p>Tổng cộng</p>
                    <p>${totalPrice}</p>
                 </div>
              </div>

              {/* Nút đặt hàng trên Desktop - Kích hoạt form bên trái */}
              <button
                onClick={handleSubmit(onSubmit)} // Trigger submit form từ bên ngoài
                disabled={!isChecked || cartItems.length === 0}
                className="btn-primary w-full"
              >
                Xác nhận đặt hàng
              </button>
              
              <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                <p>
                  hoặc{' '}
                  <Link to="/" className="text-blue-600 font-medium hover:text-blue-500">
                    Tiếp tục mua sắm<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;