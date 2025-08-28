import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function LogIn() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logInHandler = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(t("login.login_success"), {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#DB4444",
          color: "#FFFFFF",
          fontSize: "16px",
          padding: "10px 20px",
        },
      });
      navigate("/");
    } catch (error) {
      toast.dismiss();
      toast.error(t("login.login_error"), {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#DB4444",
          color: "#FFFFFF",
          fontSize: "16px",
          padding: "10px 20px",
        },
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      className="flex flex-col items-center justify-between mx-auto max-w-[1350px] gap-5 pt-16 pb-10 px-10 md:pb-36 lg:flex-row lg:gap-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-[500px]:w-[300px] max-[1080px]:w-[500px] max-[1180px]:w-[600px] max-[1280px]:w-[700px]">
        <img src="./assets/beatsnoop.png" alt={t("login.shopping_cart_alt")} />
      </div>
      <article className="max-w-[370px]">
        <h2 className="font-medium text-4xl text-center lg:text-start">
          {t("login.log_in_title")}
        </h2>
        <p className="mt-6 mb-12 text-center lg:text-start">
          {t("login.enter_details")}
        </p>
        <form
          onSubmit={logInHandler}
          className="flex flex-col mx-auto gap-10 mb-10 max-w-[300px] md:max-w-[400px]"
        >
          <input
            type="text"
            placeholder={t("login.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 pb-2"
            aria-label={t("login.email_placeholder")}
          />
          <input
            type="password"
            placeholder={t("login.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 pb-2"
            aria-label={t("login.password_placeholder")}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-[#FAFAFA] bg-[#DB4444] font-medium py-4 px-12 rounded-[4px] w-full max-w-[300px] md:max-w-[400px]"
              aria-label={t("login.log_in_button")}
            >
              {t("login.log_in_button")}
            </button>
          </div>
        </form>
      </article>
    </motion.section>
  );
}

export default LogIn;
