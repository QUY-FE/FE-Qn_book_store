import React from "react";
import {FiShoppingCart} from "react-icons/fi";
import { imgurl } from "../../utils/imgurl"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
const BookCard = ({book}) => {

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className=" rounded-lg transition-shadow duration-300 p-2">
      <div className=" flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-6">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`books/${book._id}`}>
            <img
              src={`${imgurl(book.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div className="flex flex-col">
          <Link to={`books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>
          {/* <p className="text-gray-600 mb-2">{book.description.length >= 80 ? `${book.description.slice(0,80)}...`: book.description}</p> */}
          <p className=" mb-2 text-lg text-red-400 font-bold">
            ${book.newPrice} <span className="line-through font-normal ml-2 italic text-sm text-black">${book.oldPrice}</span>
          </p>
          <button 
          onClick={() => handleAddToCart(book)}
          className="btn-primary flex items-center text-sm gap-1 ">
            <span className="text-sm w-20">Thêm vào</span>
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
