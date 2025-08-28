import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function SignUp() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const CreateAccountHandler = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-between mx-auto max-w-[1350px] gap-5 pt-16 pb-10 px-10 md:pb-36 lg:flex-row lg:gap-0"
    >
      <div className="max-[500px]:w-[300px] max-[1080px]:w-[500px] max-[1180px]:w-[600px] max-[1280px]:w-[700px]">
        <img src="./assets/beatsnoop.png" alt={t("signup.shopping_cart_alt")} />
      </div>
      <article className="max-w-[370px]">
        <h2 className="font-medium text-4xl text-center lg:text-start">
          {t("signup.create_account_title")}
        </h2>
        <p className="mt-6 mb-12 text-center lg:text-start">
          {t("signup.enter_details")}
        </p>
        <form
          onSubmit={CreateAccountHandler}
          className="flex flex-col mx-auto gap-10 max-w-[300px] md:max-w-[400px]"
        >
          <input
            type="text"
            placeholder={t("signup.name_placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 pb-2"
          />
          <input
            type="text"
            placeholder={t("signup.email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 pb-2"
          />
          <input
            type="password"
            placeholder={t("signup.password_placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 pb-2"
          />
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="text-[#FAFAFA] bg-[#DB4444] font-medium py-4 px-12 rounded-[4px] w-full max-w-[300px] md:max-w-[400px]"
            >
              {t("signup.create_account_button")}
            </button>
          </div>
        </form>
        <div className="flex gap-4 justify-center mt-8">
          <p>{t("signup.already_have_account")}</p>
          <Link
            to="/LogIn"
            className="font-medium border-b border-gray-600 cursor-pointer"
          >
            {t("signup.log_in_link")}
          </Link>
        </div>
      </article>
    </motion.section>
  );
}

export default SignUp;
