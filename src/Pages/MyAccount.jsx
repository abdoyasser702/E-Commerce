import { useEffect, useState } from "react";
import Button from "../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function MyAccountPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert(t("my_account.password_mismatch"));
      return;
    }
    localStorage.setItem("userProfile", JSON.stringify(formData));
    alert(t("my_account.profile_updated"));
    navigate("/");
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    localStorage.removeItem("userProfile");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col max-w-6xl mx-auto mb-36 px-4"
    >
      <div className="flex items-center justify-around min-[1080px]:justify-between">
        <div className="text-sm text-gray-400 my-16">
          {t("nav.home")} /{" "}
          <span className="text-black">{t("nav.my_account")}</span>
        </div>
        <p>
          {t("my_account.welcome")}{" "}
          {formData.firstName && (
            <span className="text-[#DB4444] text-sm">
              {formData.firstName}!
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col items-center gap-5 min-[1080px]:items-start min-[1080px]:flex-row min-[1080px]:gap-32">
        <div className="flex flex-col text-center min-[1080px]:text-start">
          <div>
            <h3 className="font-medium mb-4">
              {t("my_account.manage_account")}
            </h3>
            <ul className="flex flex-col gap-2 pl-9 max-[1080px]:pr-8">
              <Link to="/MyAccount">
                <li className="text-gray-500">{t("my_account.my_profile")}</li>
              </Link>
              <Link to="/Contact">
                <li className="text-gray-500">{t("nav.contact")}</li>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mt-6 mb-4">
              {t("my_account.my_orders")}
            </h3>
            <ul className="flex flex-col gap-2 pl-9 max-[1080px]:pr-8">
              <Link to="/Cart">
                <li className="text-gray-500">{t("my_account.my_cart")}</li>
              </Link>
              <Link to="/CheckOut">
                <li className="text-gray-500">{t("my_account.my_checkout")}</li>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mt-6 mb-4">
              {t("my_account.wishlist")}
            </h3>
            <ul className="flex flex-col gap-2 pl-9 max-[1080px]:pr-8">
              <Link to="/WishList">
                <li className="text-gray-500">{t("my_account.my_wishlist")}</li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="flex-1 bg-[#FFFFFF] py-10 px-20 rounded max-w-[400px] min-[500px]:max-w-[450px] md:max-w-[800px] shadow-[0_0_10px_rgba(0,0,0,0.05)]">
          <h2 className="text-lg font-semibold text-[#DB4444] mb-6">
            {t("my_account.edit_profile")}
          </h2>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-col-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">
                  {t("my_account.first_name")}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded py-3 px-4"
                />
              </div>
              <div>
                <label className="block mb-2">
                  {t("my_account.last_name")}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded py-3 px-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">{t("my_account.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded py-3 px-4"
                />
              </div>
              <div>
                <label className="block mb-2">{t("my_account.address")}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded py-3 px-4"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-end gap-8">
              <button
                type="button"
                className="text-[#000000]"
                onClick={handleCancel}
              >
                {t("my_account.cancel")}
              </button>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  value={t("my_account.save_changes")}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default MyAccountPage;
