import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { imgurl } from "../../utils/imgurl";
import { useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";
const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const dispatch = useDispatch();
  const handleRemovefromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearAllCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng</h1>
          <div className="ml-3 flex h-7 items-center ">
            {cartItems.length === 0 ? (
              <div></div>
            ) : (
              <button
                onClick={handleClearAllCart}
                type="button"
                className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  "
              >
                <span className="">Xoá toàn bộ</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product?._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt=""
                        src={`${imgurl(product?.coverImage)}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to="/">{product?.title}</Link>
                          </h3>
                          <p className="sm:ml-4">${product?.newPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Thể loại: </strong> {product.category}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <p className="text-gray-500">
                          <strong>Số lượng: </strong> 1
                        </p>

                        <div className="flex">
                          <button
                            onClick={() => handleRemovefromCart(product)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-lg font-medium text-gray-600">
                <p>Không có sản phẩm nào ._.</p>
                <Link to="/">
                  <button
                    type="button"
                    className="underline font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                  >
                    mua ngay
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Tổng tiền</p>
          <p>${totalPrice ? totalPrice : 0}</p>
        </div>
        {/* <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p> */}
        <div className="mt-6">
        </div>
        <div className="mt-6 flex items-center justify-end gap-4 ">
          <Link to="/">
            <button
              type="button"
              className="btn"
            >
              Quay lại mua sắm
            </button>
          </Link>
          <Link
            to={cartItems.length > 0 ? "/checkout" : ""}
            className="btn-primary"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
