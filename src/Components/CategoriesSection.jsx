import categories from "../categories.json";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function CategoriesSection() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (categoryTitle) => {
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
    navigate(`/category/${categoryTitle}`);
  };

  return (
    <motion.section
      className="flex flex-col gap-6 border-b max-w-[1170px] mx-auto pb-16 mt-[70px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-4 min-[1135px]:justify-start">
        <img src="./assets/RedRectangle.png" alt={t("red_rectangle_alt")} />
        <h3 className="text-[#DB4444] font-semibold">{t("categories")}</h3>
      </div>

      <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-20">
        <h2 className="flex mx-auto text-center font-semibold text-4xl md:text-start min-[1135px]:mx-0">
          {t("browse_by_category")}
        </h2>
        <div className="mr-10 hidden min-[1135px]:flex min-[1135px]:gap-2">
          <button
            onClick={handleScrollLeft}
            className="bg-[#F5F5F5] rounded-full p-4"
          >
            <img src="./assets/BlackLeftArrow.png" alt={t("left_arrow_alt")} />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-[#F5F5F5] rounded-full p-4"
          >
            <img
              src="./assets/BlackRightArrow.png"
              alt={t("right_arrow_alt")}
            />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 min-[1135px]:flex min-[1135px]:overflow-x-auto min-[1135px]:scrollbar-hide min-[1135px]:gap-8 px-4"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.title)}
            className="flex flex-col border px-14 py-8 items-center max-w-[170px] rounded-md hover:bg-[#DB4444] hover:text-[#FAFAFA] duration-200"
          >
            <img
              src={category.image}
              alt={t("category_image_alt", { name: category.alt })}
            />
            <h2>{category.title}</h2>
          </button>
        ))}
      </div>
    </motion.section>
  );
}

export default CategoriesSection;
