import React from "react";
import { FaBookReader, FaUsers, FaAward } from "react-icons/fa";
import aboutImg from "../assets/work.jpeg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="md:w-1/2">
          <div className="w-20 h-1 bg-primary mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Chào mừng đến với <span className="text-yellow-500">Qn BookStore</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Chúng tôi tin rằng mỗi cuốn sách là một cánh cửa mở ra thế giới mới. 
            Tại Qn BookStore, sứ mệnh của chúng tôi không chỉ là bán sách, mà là 
            kết nối những tâm hồn yêu tri thức, lan tỏa văn hóa đọc và tạo ra 
            một cộng đồng học tập trọn đời.
          </p>
          <div className="flex gap-4">
             <Link to="/" className="btn-primary">
                Khám phá ngay
             </Link>
          </div>
        </div>
        <div className="md:w-1/2">
             {/* Placeholder ảnh, bạn có thể thay ảnh team hoặc cửa hàng */}
             <img 
                src={aboutImg} 
                alt="About Us" 
                className="rounded-lg shadow-2xl w-full object-cover h-[400px]"
             />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 rounded-xl p-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-md mb-4">
                    <FaBookReader className="text-4xl text-blue-500"/>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">50,000+</h3>
                <p className="text-gray-500 mt-2">Sách đã bán</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-md mb-4">
                    <FaUsers className="text-4xl text-green-500"/>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">12,000+</h3>
                <p className="text-gray-500 mt-2">Khách hàng thân thiết</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-md mb-4">
                    <FaAward className="text-4xl text-yellow-500"/>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">10+</h3>
                <p className="text-gray-500 mt-2">Năm kinh nghiệm</p>
            </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Tầm Nhìn & Sứ Mệnh</h3>
        <p className="text-gray-600 leading-relaxed">
            "Trở thành nền tảng cung cấp sách trực tuyến hàng đầu, nơi mọi độc giả 
            đều có thể tìm thấy cuốn sách yêu thích của mình một cách dễ dàng nhất, 
            với chi phí hợp lý nhất."
        </p>
      </div>
    </div>
  );
};

export default About;