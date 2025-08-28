import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function SideMenu() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="border-r pr-11 pl-4 hidden min-[1135px]:block">
        <div className="flex flex-col gap-4 mt-10">
          <p>{t("menu.womens_fashion")}</p>
          <p>{t("menu.mens_fashion")}</p>
          <p>{t("menu.electronics")}</p>
          <p>{t("menu.home_lifestyle")}</p>
          <p>{t("menu.medicine")}</p>
          <p>{t("menu.sports_outdoor")}</p>
          <p>{t("menu.babys_toys")}</p>
          <p>{t("menu.groceries_pets")}</p>
          <p>{t("menu.health_beauty")}</p>
        </div>
      </nav>
      <div className="flex flex-col-reverse bg-[#000000] items-center w-full max-w-[300px] mt-6 min-[1135px]:flex-row min-[1135px]:justify-around min-[1135px]:ml-11 min-[1135px]:mt-10 md:max-w-[650px] min-[1135px]:max-w-[850px]">
        <div className="text-[#FAFAFA] flex flex-col gap-5 items-center text-center min-[1135px]:my-auto min-[1135px]:pl-16 min-[1135px]:text-left min-[1135px]:items-start">
          <div className="flex items-center gap-4">
            <img src="./assets/Apple-Icon.png" alt="Apple Icon" />
            <p>{t("iphone_series")}</p>
          </div>
          <h2 className="text-5xl font-semibold leading-[60px]">
            {t("discount_voucher")}
          </h2>
          <div className="flex gap-2 items-center text-center mb-4 min-[1135px]:text-left min-[1135px]:mb-0">
            <button
              onClick={() => {
                document.getElementById("OurProduct-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="underline"
            >
              {t("shop_now")}
            </button>
            <img
              src="./assets/RightArrow.png"
              className="w-5 h-5"
              alt="Right Arrow"
            />
          </div>
        </div>
        <div className="mt-4">
          <img
            src="./assets/Iphone14.png"
            alt={t("iphone_image_alt")}
            className="w-[220px] lg:w-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SideMenu;
