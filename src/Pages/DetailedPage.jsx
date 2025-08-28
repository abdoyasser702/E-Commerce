import Button from "../Components/Button";
import { useParams, Link, useNavigate } from "react-router-dom";
import productData from "../card.json";
import { useState, useEffect } from "react";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function DetailedPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = parseInt(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (postalCode === "12345") {
      setResult(t("detailed.delivery_available"));
    } else {
      setResult(t("detailed.delivery_not_available"));
    }
  };

  const allProducts = [
    ...productData.products_group_1,
    ...productData.products_group_2,
    ...productData.products_group_3,
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = allProducts.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col gap-5 mb-10">
        <p className="text-center text-2xl font-semibold mt-20 text-blue-400">
          {t("detailed.product_not_found")}
        </p>
        <Link to="/">
          <div className="flex items-center justify-center">
            <Button
              value={t("detailed.back_to_home")}
              variant="primary"
            ></Button>
          </div>
        </Link>
      </div>
    );
  }

  const isLiked = wishlist.find((item) => item.id === product.id);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const increament = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreament = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const addToCartHandler = () => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
  };

  const sameCategoryProducts = allProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1170px] mx-auto mb-36 px-4"
    >
      <div className="flex text-sm text-gray-400 my-16 text-center justify-center md:text-start lg:justify-start">
        {t("nav.home")} / {t("detailed.gaming_category")} /{" "}
        <span className="text-black">{product.name}</span>
      </div>
      <section className="flex flex-col items-center lg:items-stretch lg:flex-row gap-7 mb-36">
        <div className="flex flex-col md:flex-row lg:flex-col gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex justify-center py-[22px] rounded w-[170px] h-[138px] bg-[#F5F5F5] hover:bg-[#E8E8E8] transition-colors duration-300"
            >
              <img
                className="object-contain"
                src={product.image}
                alt={t("product_image_alt", { name: product.name })}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center rounded bg-[#F5F5F5] w-[340px] md:w-[500px] hover:bg-[#E8E8E8] transition-colors duration-300">
          <img
            src={product.image}
            alt={t("product_image_alt", { name: product.name })}
          />
        </div>
        <div className="w-full max-w-md md:pl-10">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <img src={product.rating_image} alt={t("rating_image_alt")} />
            <span className="text-gray-600 text-sm">
              {product.rating_count}
            </span>
            <span className="text-gray-600 px-2">|</span>
            <span className="text-[#00FF66] text-sm">
              {t("detailed.in_stock")}
            </span>
          </div>
          <div className="flex items-center justify-center mb-6 md:justify-start">
            <span className="text-2xl">${product.price_after}</span>
          </div>
          <p className="text-sm pb-6 border-b text-center md:text-start">
            {t(`products.details.${product.id}`)}
          </p>
          <div className="flex items-center justify-center gap-6 mb-6 mt-6 md:justify-start">
            <p className="text-xl mb-2">
              {product.colors.length !== 0 ? t("detailed.colours") : ""}
            </p>
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-1">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#000000] rounded-full"
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-[#F5F5F5]"
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-6">
            <p className="text-xl mb-2">{t("detailed.size")}</p>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-[6px] flex justify-center rounded w-8 border text-sm font-medium 
            ${
              selectedSize === size
                ? "bg-[#DB4444] text-white"
                : "bg-white text-black"
            }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-10 gap-4">
            <div className="border rounded">
              <button
                onClick={decreament}
                className="px-3 py-1 border-r rounded-l hover:bg-[#E8E8E8] transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                -
              </button>
              <span className="px-6 py-1">{quantity}</span>
              <button
                onClick={increament}
                className="px-3 py-1 border-l rounded-r text-white bg-[#DB4444] hover:bg-[#b73131] transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                +
              </button>
            </div>
            <Link to="/Cart">
              <button
                onClick={addToCartHandler}
                className="bg-[#DB4444] h-[34px] text-white px-4 rounded hover:bg-[#b73131] transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                {t("detailed.buy_now")}
              </button>
            </Link>
            <button
              onClick={() => toggleWishlist(product)}
              className={`border p-[6px] rounded ${
                isLiked ? "bg-[#DB4444]" : "bg-[#FFFFFF]"
              }`}
              title={t("wishlist_icon_alt")}
            >
              <img src="../assets/Love.png" alt={t("wishlist_icon_alt")} />
            </button>
          </div>
          <div>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 border border-b-0 text-center md:text-start h-40 md:h-[75px] rounded-t">
              <div className="flex items-center">
                <img
                  src="../assets/blackdelivery.png"
                  alt={t("delivery_icon_alt")}
                />
              </div>
              <div>
                <p className="font-medium">{t("detailed.free_delivery")}</p>
                <a
                  onClick={() => setIsOpen(true)}
                  className="text-xs font-medium underline cursor-pointer"
                >
                  {t("detailed.enter_postal_code")}
                </a>
                {isOpen && (
                  <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                    >
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                      <h2 className="text-lg font-bold mb-4">
                        {t("detailed.check_delivery")}
                      </h2>
                      <p className="text-base mb-4">
                        {t("detailed.check_delivery_instruction")}
                      </p>
                      <form onSubmit={handleCheck} className="flex gap-2">
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder={t("detailed.postal_code_placeholder")}
                          className="flex-1 border px-3 py-2 rounded"
                        />
                        <button
                          type="submit"
                          className="bg-[#DB4444] text-white px-4 rounded"
                        >
                          {t("detailed.check_button")}
                        </button>
                      </form>
                      {result && (
                        <p className="mt-4 text-sm font-medium text-gray-700">
                          {result}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center p-4 gap-4 border text-center md:text-start h-32 md:h-16 rounded-b">
              <div className="flex items-center">
                <img
                  src="../assets/Icon-return.png"
                  alt={t("detailed.return_icon_alt")}
                />
              </div>
              <div>
                <p className="font-medium">{t("detailed.return")}</p>
                <p className="text-xs font-medium">
                  {t("detailed.return_policy")}{" "}
                  <Link
                    to="/ReturnDetailsPage"
                    className="cursor-pointer underline"
                  >
                    {t("detailed.details_link")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center gap-4 min-[1120px]:justify-start">
        <img src="../assets/RedRectangle.png" alt={t("red_rectangle_alt")} />
        <h3 className="text-[#DB4444] font-semibold">
          {t("detailed.related_items")}
        </h3>
      </div>
      {sameCategoryProducts.length > 0 ? (
        <section className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 min-[1120px]:grid-cols-4 min-[1120px]:gap-8 px-4">
            {sameCategoryProducts.map((card) => {
              const isLiked = wishlist.find((item) => item.id === card.id);
              return (
                <div key={card.id} className="min-w-[270px] flex-shrink-0">
                  <div className="bg-[#F5F5F5] relative w-[270px] h-[270px] rounded-[4px] hover:bg-[#E8E8E8] transition-colors duration-300">
                    <div className="flex justify-between px-3 pt-3">
                      {card.discount && (
                        <p className="text-[#FAFAFA] bg-[#DB4444] rounded-md px-3 py-[2px] h-[30px]">
                          {card.discount}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-center items-center pt-6">
                      <img
                        src={card.image}
                        alt={t("product_image_alt", { name: card.name })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className={`p-2 rounded-full absolute right-2 top-3 ${
                          isLiked ? "bg-[#DB4444]" : "bg-[#FFFFFF]"
                        }`}
                        onClick={() => toggleWishlist(card)}
                        title={t("wishlist_icon_alt")}
                      >
                        <img
                          src="../assets/Love.png"
                          alt={t("wishlist_icon_alt")}
                        />
                      </button>
                      <button
                        onClick={() => navigate(`/product/${card.id}`)}
                        className="bg-[#FFFFFF] p-2 rounded-full absolute right-[6px] top-14"
                        title={t("quick_view_icon_alt")}
                      >
                        <img
                          src="../assets/QuickViewIcon.png"
                          alt={t("quick_view_icon_alt")}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-[#000000] font-medium">{card.name}</h3>
                    <div className="flex gap-2">
                      <p className="text-[#DB4444] font-medium">
                        {card.price_after}
                      </p>
                      <p className="text-gray-500 font-medium line-through">
                        {card.price_before}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={card.rating_image}
                        alt={t("rating_image_alt")}
                      />
                      <p className="font-semibold text-sm text-gray-600">
                        ({card.rating_count})
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center mt-5">
          <p className="text-2xl font-semibold">
            {t("detailed.no_related_items")}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default DetailedPage;
