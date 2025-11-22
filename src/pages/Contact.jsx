import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // data ở đây chính là object { name, email, message } đã được validate
    console.log("Form Data:", data);

    // Giả lập gọi API thành công
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Chúng tôi sẽ sớm phản hồi liên hệ của bạn",
      showConfirmButton: false,
      timer: 1500,
    });
    reset(); // Reset form sau khi gửi thành công
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-0 lg:px-4 py-16 ">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Liên Hệ Với Chúng Tôi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Left Side: Contact Info - Giữ nguyên */}
        <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
          <h3 className="text-xl font-semibold mb-6">Thông tin liên lạc</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Địa chỉ</h4>
                <p className="text-gray-600">
                  123 Đường Sách, Phường Bến Nghé, Quận 1, TP. HCM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Điện thoại</h4>
                <p className="text-gray-600">+84 909 123 456</p>
                <p className="text-gray-600 text-sm">
                  Thứ 2 - Thứ 6: 8am - 5pm
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Email</h4>
                <p className="text-gray-600">support@qnbookstore.com</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="font-semibold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-sky-400 hover:text-white transition-all"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form với React Hook Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Gửi tin nhắn</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                {...register("name", { required: "Vui lòng nhập họ tên" })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Nhập tên của bạn"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 italic">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Địa chỉ email không hợp lệ",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Textarea Message */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tin nhắn
              </label>
              <textarea
                {...register("message", {
                  required: "Vui lòng nhập nội dung tin nhắn",
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-50 h-32 resize-none ${
                  errors.message ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Nội dung cần hỗ trợ..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 italic">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center lg:justify-end">
                <button
                type="submit"
                className="btn-primary"
                >
                Gửi ngay
                </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
