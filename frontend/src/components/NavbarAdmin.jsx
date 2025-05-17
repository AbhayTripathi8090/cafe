// import { Link, useNavigate } from "react-router-dom";

// const NavbarAdmin = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-800/60 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-md">
//       <div className="space-x-6 text-lg font-medium">
//         <Link to="/" className="hover:text-purple-400 transition duration-200">
//           Home
//         </Link>
//         <Link
//           to="/meals"
//           className="hover:text-purple-400 transition duration-200"
//         >
//           Meals
//         </Link>
//         <Link
//           to="/orders"
//           className="transition-transform duration-200 transform hover:scale-110 hover:text-purple-400"
//         >
//           Orders
//         </Link>
//       </div>

//       <div className="space-x-4 text-lg font-medium">
//         {token ? (
//           <button
//             onClick={logout}
//             className=" border-2 border-gray-600 rounded-md py-1 hover:border-gray-800 transition hover:bg-gray-700 text-white px-4 py-1 rounded transition duration-500 hover:cursor-pointer"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="hover:text-purple-400 transition duration-200"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="hover:text-purple-400 transition duration-200"
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavbarAdmin;
import { Link, useNavigate } from "react-router-dom";

const NavbarAdmin = ({ onLogout }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    onLogout?.();  // Notify App that logout happened
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800/60 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-purple-400 transition duration-200">
          Home
        </Link>
        <Link
          to="/meals"
          className="hover:text-purple-400 transition duration-200"
        >
          Meals
        </Link>
        <Link
          to="/orders"
          className="transition-transform duration-200 transform hover:scale-110 hover:text-purple-400"
        >
          Orders
        </Link>
      </div>

      <div className="space-x-4 text-lg font-medium">
        {token ? (
          <button
            onClick={logout}
            className=" border-2 border-gray-600 rounded-md py-1 hover:border-gray-800 transition hover:bg-gray-700 text-white px-4 py-1 rounded transition duration-500 hover:cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-purple-400 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-purple-400 transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarAdmin;
