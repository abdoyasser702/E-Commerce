import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1170px] mx-auto mb-36 px-2"
    >
      <div className="flex text-sm text-gray-400 my-16 text-center justify-center md:text-start lg:justify-start">
        {t("nav.home")} /{" "}
        <span className="text-black">{t("error.404_error")}</span>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-medium text-4xl text-center md:text-7xl lg:text-[110px]">
          {t("error.404_not_found")}
        </h2>
        <p className="mt-4 md:mt-5 lg:mt-10 text-center">
          {t("error.page_not_found")}
        </p>
        <div className="flex justify-center mt-5 md:mt-20">
          <Link to="/">
            <Button value={t("error.back_to_home")} variant="primary"></Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default ErrorPage;
