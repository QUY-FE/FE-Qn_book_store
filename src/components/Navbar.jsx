import  { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { IoSearchSharp, IoClose } from "react-icons/io5"; 
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { UseAuth } from "../context/AuthContext";
import { useFetchAllBooksQuery } from "../redux/features/books/booksAPI";
import { getImgUrl } from "../utils/getImgUrl";
import { SiGitbook } from "react-icons/si";
const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "My Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "Check out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(""); 

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = UseAuth();
  const { data: books = [] } = useFetchAllBooksQuery();

  const handleLogOut = () => {
    logout();
  };
  
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const filteredBooks = books.length > 0 && debouncedSearchValue 
    ? books.filter((book) => 
        book.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
      ) 
    : [];

  // Hàm xoá input
  const handleClearSearch = () => {
    setSearchValue("");
    setDebouncedSearchValue(""); 
  };

  return (
    <header className="fixed w-full mx-auto px-1 lg:px-4 py-2 z-50 bg-white border-2 border-b-gray-100">
      <nav className="max-w-screen-2xl mx-auto px-0 lg:px-4 flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/" className="flex items-center justify-center gap-1 px-2 leading-10 text-xl text-center bg-gradient-to-r from-orange-600 to-yellow-400 rounded-md font-bold">
            <SiGitbook size={22} color="black" />
            <span>Qn</span>
          </Link>

          {/* --- KHU VỰC TÌM KIẾM --- */}
          <div className="relative w-40 lg:w-[270px] space-x-2">
            <IoSearchSharp size={24} className="absolute inline-block left-3 inset-y-2 text-gray-500" />
            
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              className="bg-[#EAEAEA] w-full py-2 md:px-8 px-6 rounded-md focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Icon X để xoá search */}
            {searchValue.length > 0 && (
              <IoClose 
                onClick={handleClearSearch}
                size={24}
                className="absolute right-0 top-2 cursor-pointer text-gray-500 hover:text-black" 
              />
            )}

            {/* --- DROPDOWN KẾT QUẢ TÌM KIẾM --- */}
            {/* Hiển thị dropdown nếu searchValue có dữ liệu */}
            {searchValue.length > 0 && (
              <div className="absolute top-full w-full bg-white shadow-xl rounded-md mt-2 max-h-96 overflow-y-auto z-50 border border-gray-200">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Link 
                      key={book._id} 
                      to={`/books/${book._id}`} 
                      onClick={handleClearSearch} 
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b last:border-b-0"
                    >
                      <img 
                        src={getImgUrl(book.coverImage)} 
                        alt={book.title} 
                        className="w-10 h-14 object-cover rounded shadow-sm"
                      />
                      <div>
                        <p className="font-semibold text-sm text-gray-800 line-clamp-1">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author || "Unknown Author"}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  // Chỉ hiện thông báo "Không tìm thấy" khi đã debounce xong mà vẫn không có kết quả
                  debouncedSearchValue && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      Không tìm thấy sách nào!
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          {/* --- KẾT THÚC KHU VỰC TÌM KIẾM --- */}

        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatarImg}
                    alt="avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-600" : ""
                    } `}
                  />
                </button>
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          LogOut
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                <FaUserCircle className="size-6" />
              </Link>
            )}
          </div>
          
          <Link
            to="/cart"
            className="relative p-1 w-10 h-10 flex items-center hover:bg-black/10 rounded-full"
          >
            <FaShoppingCart size={24} />
            {cartItems.length > 0 ? (
              <p className="absolute top-0 right-1 px-1 text-xs rounded-lg bg-primary font-black">
                {cartItems.length}
              </p>
            ) : (
              <span className="absolute top-0 right-1 px-1 text-xs rounded-lg bg-primary font-black" >
                0
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;