import React, { useState } from "react";
import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksAPI";

// Import Swiper styles & Modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; // Thêm css cho pagination
import { Navigation, Mousewheel, Keyboard, Pagination } from 'swiper/modules'; // Thêm Pagination

const categories = [
  { category: "ALL", title: "Tất cả" },
  { category: "Business", title: "Kinh doanh" },
  { category: "Fiction", title: "Khoa học viễn tưởng" },
  { category: "Horror", title: "Kinh dị" },
  { category: "Technology", title: "Công nghệ" }
];

const TopSeller = () => {
  
  // Khởi tạo mặc định là 'ALL' thay vì undefined
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks =
    selectedCategory === "ALL"
      ? books
      : books.filter(
          (book) => book.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Nổi bật</h2>
      
      {/* Filter Dropdown */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none cursor-pointer"
        >
          {categories.map((item, index) => (
            
            <option key={index} value={item.category}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={30}
        navigation={true} // Bật navigation (mũi tên)
        pagination={{ clickable: true }} // Bật pagination (chấm tròn)
        modules={[Navigation, Mousewheel, Keyboard, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))
        ) : (
          // Xử lý trường hợp không có sách nào
          <div className="text-gray-500">Không tìm thấy sách nào thuộc danh mục này.</div>
        )}
      </Swiper>
    </div>
  );
};

export default TopSeller;