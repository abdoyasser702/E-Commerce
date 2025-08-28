import { Link } from "react-router-dom";
import Button from "./Button";
import OurProductsCard from "./OurProductCard";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function OurProductsSection() {
  const { t } = useTranslation();

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

  return (
    <motion.section
      id="OurProduct-section"
      className="flex flex-col gap-6 max-w-[1140px] mx-auto pb-16 mt-[70px] scroll-mt-8 min-[1135px]:w-[1200px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-4 min-[1135px]:justify-start">
        <img src="./assets/RedRectangle.png" alt={t("red_rectangle_alt")} />
        <h3 className="text-[#DB4444] font-semibold">{t("our_products")}</h3>
      </div>
      <h2 className="flex justify-center font-semibold text-4xl text-center md:text-start min-[1135px]:justify-start">
        {t("explore_our_products")}
      </h2>
      <OurProductsCard></OurProductsCard>
      <div className="flex justify-center mt-9">
        <Link
          onClick={handleViewAllClick}
          to={auth.currentUser ? "/AllProductPage" : "#"}
        >
          <Button value={t("view_all_products")} variant="primary"></Button>
        </Link>
      </div>
    </motion.section>
  );
}

export default OurProductsSection;
