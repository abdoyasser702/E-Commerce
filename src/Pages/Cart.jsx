import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect } from "react";

const CartPage = () => {
  const { t } = useTranslation();
  const { cartList, updateCartQuantity, removeFromCart } = useCart();
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);

  const subtotal = (cartList || []).reduce(
    (sum, item) => sum + item.price_after * item.quantity,
    0
  );

  const handleUpdateCart = () => {
    if (cartList.length === 0) {
      alert(t("cart.empty_cart_alert"));
      return;
    }
    setShowRemoveButtons(!showRemoveButtons);
  };

  const applyCouponHandler = () => {
    alert(t("cart.apply_coupon_alert"));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="text-sm text-gray-400 my-16">
        {t("nav.home")} / <span className="text-black">{t("footer.cart")}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-0 items-center place-items-center py-6 rounded-[4px] shadow-[0_0_10px_rgba(0,0,0,0.15)]">
        <span>{t("cart.product")}</span>
        <span>{t("cart.price")}</span>
        <span>{t("cart.quantity")}</span>
        <span>{t("cart.subtotal")}</span>
      </div>

      {cartList &&
        cartList.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-0 items-center place-items-center mt-10 py-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] relative"
          >
            <div className="flex items-center justify-center gap-4 w-48">
              <img
                src={item.image}
                alt={t("product_image_alt", { name: item.name })}
                className="w-14 h-14 object-contain"
              />
              <span>{item.name}</span>
            </div>
            <div>${item.price_after}</div>

            <div>
              <select
                value={item.quantity}
                onChange={(e) => updateCartQuantity(item.id, e.target.value)}
                className="border px-3 py-[10px] rounded"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {String(num + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div>${item.price_after * item.quantity}</div>

            {showRemoveButtons && (
              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute -right-3 -top-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                title={t("cart.remove_item")}
              >
                x
              </button>
            )}
          </div>
        ))}
      <div className="flex flex-col gap-4 md:flex-row md:gap-0 items-center md:items-start justify-between font-medium mt-4">
        <Link to="/WishList">
          <button className="border px-12 py-4 rounded-[4px] max-w-[220px]">
            {t("cart.return_to_shop")}
          </button>
        </Link>
        {cartList.length > 0 && (
          <button
            className="border px-12 py-4 rounded-[4px] max-w-[280px]"
            onClick={handleUpdateCart}
          >
            {showRemoveButtons
              ? t("cart.hide_remove_options")
              : t("cart.update_cart")}
          </button>
        )}
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between mt-10 md:mt-20 gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t("cart.coupon_placeholder")}
            className="border px-4 py-2 rounded w-[300px] h-14"
          />
          <div className="flex justify-center">
            <Button
              onClick={applyCouponHandler}
              variant="primary"
              value={t("cart.apply_coupon")}
            ></Button>
          </div>
        </div>

        <div className="border border-[#000000] py-8 px-6 w-[300px] md:w-[470px] mb-10 md:mb-36">
          <h2 className="font-semibold mb-4">{t("cart.cart_total")}</h2>
          <div className="flex justify-between border-b py-4">
            <span>{t("cart.subtotal")}</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between border-b py-4">
            <span>{t("cart.shipping")}</span>
            <span>{t("cart.free_shipping")}</span>
          </div>
          <div className="flex justify-between py-4">
            <span>{t("cart.total")}</span>
            <span>${subtotal}</span>
          </div>
          {cartList.length > 0 && (
            <div className="flex justify-center">
              <Link to="/CheckOut">
                <Button
                  variant="primary"
                  value={t("cart.proceed_to_checkout")}
                ></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
