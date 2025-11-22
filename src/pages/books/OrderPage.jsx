import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { UseAuth } from "../../context/AuthContext";
import { getImgUrl } from "../../utils/getImgUrl";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksAPI"; // Import API lấy sách

const OrderPage = () => {
  const { currentUser } = UseAuth();
  
  // 1. Lấy danh sách đơn hàng
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  // 2. Lấy danh sách TOÀN BỘ sách để tra cứu (nếu order chỉ trả về ID)
  const { data: books = [] } = useFetchAllBooksQuery();

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error fetching orders data...</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl py-16">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Lịch sử đơn hàng</h2>
      
      {orders.length === 0 ? (
        <div className="text-center bg-gray-50 p-10 rounded-lg text-gray-500">
            Bạn chưa có đơn hàng nào.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* --- Header: ID đơn hàng & Tổng tiền --- */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                   <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                     Đơn hàng #{index + 1}
                   </span>
                   <span className="text-xs text-gray-500 font-mono">ID: {order._id}</span>
                </div>
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Tổng tiền:</span> 
                    <span className="text-red-600 font-bold text-lg ml-2">${order.totalPrice}</span>
                </div>
              </div>

              {/* --- Body: Thông tin & Sản phẩm --- */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cột trái: Thông tin nhận hàng */}
                <div className="md:col-span-1 space-y-3 text-sm text-gray-600 border-r border-gray-100 pr-4">
                    <h4 className="font-bold text-gray-800 border-b pb-2 mb-2">Thông tin nhận hàng</h4>
                    <p><span className="font-semibold">Tên:</span> {order.name}</p>
                    <p><span className="font-semibold">Email:</span> {order.email}</p>
                    <p><span className="font-semibold">SĐT:</span> {order.phone}</p>
                    <div>
                        <span className="font-semibold">Địa chỉ:</span>
                        <p className="mt-1 pl-2 border-l-2 border-gray-200">
                            {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                        </p>
                    </div>
                </div>

                {/* Cột phải: Danh sách sản phẩm (Logic xử lý ID/Object) */}
                <div className="md:col-span-2">
                    <h4 className="font-bold text-gray-800 border-b pb-2 mb-3">Sản phẩm đã mua</h4>
                    <ul className="space-y-4">
                        {order.productIds.map((item) => {
                            // LOGIC QUAN TRỌNG:
                            // Kiểm tra item là Object (đã populate) hay String (chỉ là ID)
                            const product = typeof item === 'object' ? item : books.find(b => b._id === item);

                            // Nếu không tìm thấy sản phẩm (có thể đã bị xóa khỏi DB)
                            if (!product) return <li key={item} className="text-gray-400 italic text-sm">- Sản phẩm không còn tồn tại -</li>;

                            return (
                                <li key={product._id} className="flex items-start gap-4">
                                    {/* Ảnh sản phẩm */}
                                    <div className="w-16 h-20 flex-shrink-0 border rounded overflow-hidden bg-gray-100">
                                        <img 
                                            src={getImgUrl(product.coverImage)} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Tên và Giá */}
                                    <div className="flex-1">
                                        <h5 className="font-medium text-gray-900 line-clamp-2">
                                            {product.title}
                                        </h5>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Category: {product.category}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700 mt-1">
                                            ${product.newPrice}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;