import React, { useState } from "react";
import { imgurl } from "../../utils/imgurl";
import { useNavigate, useParams } from "react-router-dom";
import { FiShoppingCart, FiStar, FiUser, FiCalendar } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Icon ngôi sao
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBooksByIdQuery } from "../../redux/features/books/booksAPI";

// Component hiển thị số sao
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBooksByIdQuery(id); // Sửa lỗi chính tả isLoanding
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Giả lập dữ liệu Reviews (Sau này có API thì thay thế)
  const [reviews] = useState([
    {
      user: "Nguyễn Văn A",
      rating: 5,
      comment: "Sách rất hay, đóng gói cẩn thận!",
      date: "20/11/2025",
    },
    {
      user: "Trần Thị B",
      rating: 4.5,
      comment: "Nội dung lôi cuốn, nhưng giao hàng hơi chậm.",
      date: "21/11/2025",
    },
  ]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleBuyBook = (product) => {
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  if (isLoading)
    return <div className="text-center py-10 text-lg">Đang tải dữ liệu...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Có lỗi xảy ra khi tải thông tin sách!
      </div>
    );

  return (
    <div className="max-w-screen-xl mx-auto px-0 lg:px-4 py-10">
      {/* --- PHẦN 1: CHI TIẾT SẢN PHẨM --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row gap-2 lg:gap-8 p-6 md:p-10">
          <div className="block lg:hidden">
            <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">
              {book?.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {book?.title}
            </h1>

            {/* Rating & Sold Info */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <StarRating rating={4.5} />{" "}
                {/* Giả sử rating là 4.5, thay bằng book.rating nếu có */}
                <span className="text-gray-500 font-medium ml-2">
                  (4.5 sao)
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Đã bán: 1.2k</span>
            </div>
          </div>
          {/* Cột trái: Hình ảnh */}
          <div className="w-full md:w-1/3 flex justify-center items-start">
            <div className="relative w-full max-w-[350px] shadow-2xl rounded-lg overflow-hidden border">
              <img
                src={`${imgurl(book?.coverImage)}`}
                alt={book?.title}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Cột phải: Thông tin */}
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="hidden lg:block">
              <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">
                {book?.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {book?.title}
              </h1>

              {/* Rating & Sold Info */}
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1">
                  <StarRating rating={4.5} />{" "}
                  {/* Giả sử rating là 4.5, thay bằng book.rating nếu có */}
                  <span className="text-gray-500 font-medium ml-2">
                    (4.5 sao)
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">Đã bán: 1.2k</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-600 mb-6 leading-relaxed">
              <p>
                <span className="font-bold text-gray-900">Mô tả: </span>
                {book?.description}
              </p>
            </div>

            {/* Meta Info */}
            <div className="space-y-2 mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="flex items-center gap-2 text-gray-700">
                <FiUser className="text-blue-500" />
                <span className="font-semibold">Tác giả:</span>{" "}
                {book?.author || "Admin"}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FiCalendar className="text-green-500" />
                <span className="font-semibold">Ngày xuất bản:</span>{" "}
                {new Date(book?.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>

            {/* Price & Action */}
            <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
              {/* Nếu có giá thì hiển thị ở đây */}
              <div className="text-3xl font-bold text-red-600 mr-4">
                ${book?.newPrice || "19.99"}
                {book?.oldPrice && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    ${book.oldPrice}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleAddToCart(book)}
                className="btn flex items-center justify-center"
              >
                <span>Thêm vào </span>
                <FiShoppingCart className="text-xl" />
              </button>

              <button
                onClick={() => handleBuyBook(book)}
                className="btn-primary"
              >
                <span>Mua</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHẦN 2: ĐÁNH GIÁ & BÌNH LUẬN --- */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Đánh giá sản phẩm
        </h3>

        {/* List Reviews */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                {review.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-800">{review.user}</h4>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="mb-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md text-sm">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Box (Mock) */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-semibold mb-3">Viết đánh giá của bạn</h4>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="3"
            placeholder="Chia sẻ cảm nghĩ của bạn về cuốn sách này..."
          ></textarea>
          <button className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
