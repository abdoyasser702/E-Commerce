import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect } from "react";

function ReturnDetailsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-gray-800"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
        {t("return_details.title")}
      </h1>
      <p className="text-base sm:text-lg mb-4 leading-relaxed">
        {t("return_details.intro")}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">
        {t("return_details.eligibility_title")}
      </h2>
      <ul className="list-disc list-inside flex flex-col gap-2 text-base sm:text-lg">
        <li>{t("return_details.eligibility_1")}</li>
        <li>{t("return_details.eligibility_2")}</li>
        <li>{t("return_details.eligibility_3")}</li>
        <li>{t("return_details.eligibility_4")}</li>
      </ul>
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">
        {t("return_details.process_title")}
      </h2>
      <ol className="list-decimal list-inside flex flex-col gap-2 text-base sm:text-lg">
        <li>{t("return_details.process_1")}</li>
        <li>{t("return_details.process_2")}</li>
        <li>{t("return_details.process_3")}</li>
        <li>{t("return_details.process_4")}</li>
      </ol>
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">
        {t("return_details.refunds_title")}
      </h2>
      <p className="text-base sm:text-lg mb-4 leading-relaxed">
        {t("return_details.refunds_intro")}
      </p>
      <ul className="list-disc list-inside flex flex-col gap-2 text-base sm:text-lg">
        <li>{t("return_details.refunds_1")}</li>
        <li>{t("return_details.refunds_2")}</li>
      </ul>
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">
        {t("return_details.exchanges_title")}
      </h2>
      <p className="text-base sm:text-lg mb-4 leading-relaxed">
        {t("return_details.exchanges_intro")}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">
        {t("return_details.help_title")}
      </h2>
      <p className="text-base sm:text-lg leading-relaxed">
        {t("return_details.help_text")}{" "}
        <Link to="/contact" className="underline text-blue-600">
          {t("return_details.contact_link")}
        </Link>
        .
      </p>
    </motion.div>
  );
}

export default ReturnDetailsPage;
