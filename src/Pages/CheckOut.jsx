import Button from "../Components/Button";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect } from "react";

function CheckoutPage() {
  const { t } = useTranslation();
  const { cartList, setCartList } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    streetAdress: "",
    apartment: "",
    city: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const onSelectHandler = (method) => {
    if (method !== "cash") {
      setError(t("checkout.cash_only_error"));
    } else {
      setError("");
    }
    setPaymentMethod("cash");
  };

  const subtotal = (cartList || []).reduce(
    (sum, item) => sum + item.price_after * item.quantity,
    0
  );

  const total = subtotal - discount;

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    if (cartList.length === 0) {
      alert(t("checkout.empty_cart_alert"));
      return;
    }
    alert(t("checkout.order_success"));

    setFormData({
      name: "",
      companyName: "",
      streetAdress: "",
      apartment: "",
      city: "",
      email: "",
      phone: "",
    });
    setCartList([]);
    setDiscount(0);
    setCoupon("");
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.streetAdress.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "";

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "DISCOUNT10") {
      const discountValue = subtotal * 0.1; // 10%
      setDiscount(discountValue);
      alert(t("checkout.coupon_success"));
    } else {
      setDiscount(0);
      alert(t("checkout.coupon_invalid"));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto py-10 px-4 mb-10 md:mb-36"
    >
      <div className="text-sm text-gray-400 my-16 text-center min-[1235px]:text-start">
        {t("nav.home")} / {t("footer.my_account")} / {t("cart.product")} /{" "}
        {t("footer.cart")} /
        <span className="text-black">{t("checkout.checkout")}</span>
      </div>
      <h2 className="text-4xl font-medium mb-6 text-center min-[1235px]:text-start">
        {t("checkout.billing_details")}
      </h2>
      <div className="flex flex-col min-[1235px]:flex-row gap-44">
        <div className="flex justify-center min-[1235px]:justify-start px-2">
          <form className="flex flex-col gap-8">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-gray-400">
                {t("checkout.first_name")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="name"
                type="text"
                value={formData.name}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
                required
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block mb-2 text-gray-400">
                {t("checkout.company_name")}
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label
                htmlFor="streetAddress"
                className="block mb-2 text-gray-400"
              >
                {t("checkout.street_address")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="streetAddress"
                name="streetAdress"
                type="text"
                value={formData.streetAdress}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
                required
              />
            </div>
            <div>
              <label htmlFor="apartment" className="block mb-2 text-gray-400">
                {t("checkout.apartment")}
              </label>
              <input
                id="apartment"
                name="apartment"
                type="text"
                value={formData.apartment}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-gray-400">
                {t("checkout.city")} <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-gray-400">
                {t("checkout.phone_number")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-400">
                {t("checkout.email_address")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={changeHandler}
                className="w-[330px] md:w-[470px] p-3 rounded bg-[#F5F5F5]"
                required
              />
            </div>
            <label className="flex items-center gap-4 w-[330px] md:w-[470px]">
              <input type="checkbox" /> {t("checkout.save_info")}
            </label>
          </form>
        </div>

        <div className="flex flex-col w-[328px] mx-auto min-[1235px]:mx-0 md:w-[530px] pr-4">
          <div className="pb-4">
            {cartList.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={t("product_image_alt", { name: item.name })}
                    className="w-10 h-10"
                  />
                  <span>{item.name}</span>
                </div>
                <span>${item.price_after}</span>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <div className="flex justify-between border-b pb-4">
                <span>{t("cart.subtotal")}</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between border-b py-4">
                <span>{t("checkout.discount")}</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("cart.total")}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  className="accent-black"
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "card"}
                  onChange={() => onSelectHandler("card")}
                />{" "}
                {t("checkout.bank")}
              </label>
              <div className="flex gap-2">
                <button>
                  <img src="./assets/bkash.png" alt={t("checkout.bkash_alt")} />
                </button>
                <button>
                  <img src="./assets/Visa.png" alt={t("checkout.visa_alt")} />
                </button>
                <button>
                  <img
                    src="./assets/Mastercard.png"
                    alt={t("checkout.mastercard_alt")}
                  />
                </button>
                <button>
                  <img src="./assets/Nagad.png" alt={t("checkout.nagad_alt")} />
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                className="accent-black"
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cash"}
                onChange={() => {
                  onSelectHandler("cash");
                }}
              />
              {t("checkout.cash_on_delivery")}
            </label>
            {error && <p className="text-red-500 text-xl">{error}</p>}
          </div>

          <div className="flex flex-col items-center md:flex-row gap-4 mt-8">
            <input
              type="text"
              placeholder={t("cart.coupon_placeholder")}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border border-[#000000] px-4 py-2 rounded w-[300px] h-14"
            />
            <div className="flex justify-center">
              <Button
                onClick={handleApplyCoupon}
                variant="primary"
                value={t("cart.apply_coupon")}
              ></Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-8">
            <Button
              variant="primary"
              value={t("checkout.place_order")}
              type="button"
              onClick={onClickHandler}
              disabled={!isFormValid}
            ></Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CheckoutPage;
