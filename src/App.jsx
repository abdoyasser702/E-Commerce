import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import ContactPage from "./Pages/ContactPage";
import AboutPage from "./Pages/AboutPage";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import WishList from "./Pages/WishList";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/CheckOut";
import MyAccount from "./Pages/MyAccount";
import ErrorPage from "./Pages/ErrorPage";
import { WishlistProvider } from "./Context/WishlistContext";
import { CartProvider } from "./Context/CartContext";
import { SearchProvider } from "./Context/SearchContext";
import DetailedPage from "./Pages/DetailedPage";
import ReturnDetailsPage from "./Pages/ReturnDetailsPage";
import DiscountProductPage from "./Pages/DiscountProductPage";
import BestProductsPage from "./Pages/BestProductsPage";
import AllProductPage from "./Pages/AllProductPage";
import CategoryPage from "./Pages/CategoryPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import { Toaster } from "react-hot-toast";
import cardData from "./card.json";
import { AnimatePresence } from "framer-motion";

const allProducts = [
  ...cardData.products_group_1,
  ...cardData.products_group_2,
  ...cardData.products_group_3,
];

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" limit={5} />
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="font-poppins flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Contact" element={<ContactPage />} />
                    <Route path="/About" element={<AboutPage />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/LogIn" element={<LogIn />} />
                    <Route path="/WishList" element={<WishList />} />
                    <Route path="/Cart" element={<Cart />} />
                    <Route path="/CheckOut" element={<Checkout />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/MyAccount" element={<MyAccount />} />
                    <Route path="/product/:id" element={<DetailedPage />} />
                    <Route
                      path="/category/:categoryName"
                      element={<CategoryPage />}
                    />
                    <Route
                      path="/ReturnDetailsPage"
                      element={<ReturnDetailsPage />}
                    />
                    <Route
                      path="/DiscountProductPage"
                      element={<DiscountProductPage />}
                    />
                    <Route
                      path="/BestProductsPage"
                      element={<BestProductsPage />}
                    />
                    <Route
                      path="/AllProductPage"
                      element={<AllProductPage />}
                    />
                    <Route
                      path="/search"
                      element={<SearchResultsPage products={allProducts} />}
                    />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
