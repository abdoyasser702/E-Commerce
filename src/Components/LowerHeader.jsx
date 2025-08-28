import { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function LowerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState(null);
  const location = useLocation();
  const userMenuRef = useRef(null);
  const { wishlist } = useWishlist();
  const { cartList } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setHasAccount(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const clickOutsideHandler = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.contact"), path: "/Contact" },
    { name: t("nav.about"), path: "/About" },
    { name: t("nav.signup"), path: "/SignUp" },
  ];

  const signOutHandler = () => {
    const result = confirm(t("confirm.signout"));
    if (!result) return;

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserMenuOpen(false);
        navigate("/SignUp");
      })
      .catch((error) => {
        alert("Sign out error", error);
      });
  };

  const handleViewAllClick = () => {
    if (!auth.currentUser) {
      toast.dismiss();
      toast.error(
        <div>
          {t("today_section.login_required")}{" "}
          <Link to="/SignUp" className="underline text-blue-600">
            {t("login.log_in_button")}
          </Link>
        </div>,
        {
          position: "top-center",
          duration: 3000,
          style: {
            background: "#FFFFFF",
            color: "#DB4444",
            fontSize: "16px",
            padding: "10px 20px",
          },
        }
      );
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4 border pb-6 items-center justify-around pt-6 lg:flex-row lg:gap-0 lg:pt-12">
      <div className="flex gap-5">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl"
        >
          ☰
        </button>
        <h2 className="text-[#000000] font-bold text-2xl">Exclusive</h2>
      </div>
      <nav className="hidden sm:block">
        <ul className="flex flex-col items-center gap-4 text-base text-[#000000] sm:flex-row sm:gap-12">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`inline-block ${
                    isActive
                      ? "border-b border-black"
                      : "hover:border-b hover:border-gray-800 duration-300 hover:scale-110"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <SearchInput />
        <div className="flex gap-6 items-center">
          <Link
            onClick={handleViewAllClick}
            to={auth.currentUser ? "/WishList" : "#"}
          >
            <div className="relative">
              <img src="../assets/Love.png" alt="Heart-Icon" />
              {wishlist.length > 0 && auth.currentUser && (
                <span className="absolute flex items-center justify-center w-[10px] h-[10px] text-[8px] -top-[4px] -right-[4px] bg-[#DB4444] rounded-full">
                  {wishlist.length}
                </span>
              )}
            </div>
          </Link>
          <Link
            onClick={handleViewAllClick}
            to={auth.currentUser ? "/Cart" : "#"}
          >
            <div className="relative">
              <img src="../assets/CartBuy.png" alt="Cart-Icon" />
              {cartList.length > 0 && auth.currentUser && (
                <span className="absolute flex items-center justify-center w-[10px] h-[10px] text-[8px] -top-[2px] -right-[2px] bg-[#DB4444] rounded-full">
                  {cartList.length}
                </span>
              )}
            </div>
          </Link>
          {hasAccount && (
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <img src="../assets/user.png" alt="User Icon" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#000000b8] text-white rounded shadow-lg py-2 z-50">
                  <Link
                    to="/MyAccount"
                    className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-700"
                  >
                    <img src="./assets/Whiteuser.png" alt="User Icon" />
                    <p className="whitespace-nowrap">{t("menu.my_account")}</p>
                  </Link>
                  <Link
                    to="/CheckOut"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                  >
                    <img src="./assets/iconOrder.png" alt="Bag Icon" />
                    <p>{t("menu.my_order")}</p>
                  </Link>
                  <Link
                    to="/Cart"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                  >
                    <img src="./assets/WhiteCart.png" alt="Cancel Icon" />
                    <p>{t("menu.my_cart")}</p>
                  </Link>
                  <Link
                    to="/Wishlist"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                  >
                    <img src="./assets/IconReviews.png" alt="Reviews Icon" />
                    <p>{t("menu.my_wishlist")}</p>
                  </Link>
                  <button
                    onClick={signOutHandler}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                  >
                    <img src="./assets/IconLogout.png" alt="LogOut Icon" />{" "}
                    {t("menu.logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out sm:hidden
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="text-xl font-bold text-black">{t("menu.menu")}</h3>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold"
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-6 text-base text-black">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`inline-block ${
                    isActive
                      ? "border-b border-black"
                      : "hover:border-b hover:border-gray-800 duration-300 hover:scale-110"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LowerHeader;
