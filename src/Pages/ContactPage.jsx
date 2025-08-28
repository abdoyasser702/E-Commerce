import { useState, useEffect } from "react";
import Button from "../Components/Button";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    alert(t("contact.form_success"));
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1170px] mx-auto mb-36 px-4"
    >
      <div className="flex text-sm text-gray-400 my-16 text-center justify-center md:text-start lg:justify-start">
        {t("nav.home")} / <span className="text-black">{t("nav.contact")}</span>
      </div>
      <div className="flex flex-col gap-7 items-center lg:items-stretch lg:flex-row">
        <div className="flex flex-col bg-white w-[300px] p-6 rounded shadow-[0_0_10px_rgba(0,0,0,0.05)] md:w-[370px]">
          <div className="flex items-center mb-6 gap-4">
            <div className="bg-[#DB4444] rounded-full w-10 h-10 flex items-center justify-center">
              <img
                src="./assets/PhoneIcon.png"
                alt={t("contact.phone_icon_alt")}
              />
            </div>
            <h3 className="font-medium">{t("contact.call_to_us")}</h3>
          </div>
          <p className="text-sm mb-2">{t("contact.available_24_7")}</p>
          <p className="text-sm border-b pb-8">{t("contact.phone_number")}</p>
          <div className="flex items-center mb-6 gap-4 mt-8">
            <div className="bg-[#DB4444] rounded-full w-10 h-10 flex items-center justify-center">
              <img
                src="./assets/EmailIcon.png"
                alt={t("contact.email_icon_alt")}
              />
            </div>
            <h3 className="font-medium">{t("contact.write_to_us")}</h3>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm">{t("contact.form_instruction")}</p>
            <p className="text-sm">{t("contact.email_customer")}</p>
            <p className="text-sm">{t("contact.email_support")}</p>
          </div>
        </div>
        <div className="bg-white px-7 py-10 rounded shadow-[0_0_10px_rgba(0,0,0,0.05)]">
          <form className="flex flex-col gap-8" onSubmit={submitHandler}>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder={t("contact.name_placeholder")}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-none focus:outline-none"
                value={formData.name}
                onChange={changeHandler}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("contact.email_placeholder")}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-none focus:outline-none"
                value={formData.email}
                onChange={changeHandler}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={t("contact.phone_placeholder")}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-none focus:outline-none"
                value={formData.phone}
                onChange={changeHandler}
              />
            </div>
            <textarea
              name="message"
              placeholder={t("contact.message_placeholder")}
              className="w-full px-4 py-3 bg-[#F5F5F5] border-none focus:outline-none h-52 resize-none"
              value={formData.message}
              onChange={changeHandler}
              required
            ></textarea>
            <div className="flex justify-center lg:justify-end">
              <Button
                type="submit"
                value={t("contact.send_message")}
                variant="primary"
                onClick={handleViewAllClick}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactPage;
