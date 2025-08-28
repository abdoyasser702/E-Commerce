import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function FeaturedSection() {
  const { t } = useTranslation();

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
        <h3 className="text-[#DB4444] font-semibold">{t("featured")}</h3>
      </div>
      <h2 className="flex justify-center font-semibold text-4xl min-[1135px]:justify-start mb-9">
        {t("new_arrival")}
      </h2>
      <div className="flex flex-col items-center justify-center gap-7 min-[1135px]:flex-row min-[1135px]:items-stretch">
        <div className="relative bg-[#000000] rounded-[4px] flex flex-col justify-end w-[340px] min-[1135px]:w-[570px]">
          <img src="./assets/PC5.png" alt={t("playstation_image_alt")} />
          <div className="flex flex-col gap-4 absolute bottom-0 pl-6 pb-8 text-[#FAFAFA]">
            <h2 className="font-semibold text-2xl">{t("playstation_title")}</h2>
            <p className="text-[14px]">{t("playstation_description")}</p>
            <button
              onClick={() => {
                document.getElementById("OurProduct-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="text-start underline font-medium"
            >
              {t("shop_now")}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4 rounded-[4px] justify-end pl-6 pb-6 text-[#FAFAFA] bg-[#0D0D0D] w-[340px] min-[1135px]:w-[570px] h-[284px]">
            <h2 className="font-semibold text-2xl">
              {t("womens_collections_title")}
            </h2>
            <p className="text-[14px]">{t("womens_collections_description")}</p>
            <button
              onClick={() => {
                document.getElementById("OurProduct-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="text-start underline font-medium"
            >
              {t("shop_now")}
            </button>
          </div>
          <div className="flex flex-col mx-auto gap-7 md:flex-row">
            <div className="relative flex items-center justify-center rounded-[4px] bg-[#000000eb] w-[270px] h-[284px]">
              <img src="./assets/Speakers.png" alt={t("speakers_image_alt")} />
              <div className="flex flex-col gap-2 absolute bottom-0 left-5 pb-8 text-[#FAFAFA]">
                <h2 className="font-semibold text-2xl">
                  {t("speakers_title")}
                </h2>
                <p className="text-[14px]">{t("speakers_description")}</p>
                <button
                  onClick={() => {
                    document
                      .getElementById("OurProduct-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="text-start underline font-medium"
                >
                  {t("shop_now")}
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center rounded-[4px] bg-[#000000eb] w-[270px] h-[284px]">
              <img src="./assets/Perfume.png" alt={t("perfume_image_alt")} />
              <div className="flex flex-col gap-2 absolute bottom-0 left-5 pb-8 text-[#FAFAFA]">
                <h2 className="font-semibold text-2xl">{t("perfume_title")}</h2>
                <p className="text-[14px]">{t("perfume_description")}</p>
                <button
                  onClick={() => {
                    document
                      .getElementById("OurProduct-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="text-start underline font-medium"
                >
                  {t("shop_now")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center mt-28 md:flex-row min-[1135px]:gap-[88px] min-[1135px]:mb-36">
        <div className="flex flex-col text-center items-center">
          <div className="border-8 border-[#B0B0B0] rounded-full">
            <div className="bg-[#000000] rounded-full p-2">
              <img
                src="./assets/delivery-icon.png"
                alt={t("delivery_icon_alt")}
              />
            </div>
          </div>
          <h3 className="font-semibold text-xl mt-6 mb-2">
            {t("free_delivery_title")}
          </h3>
          <p className="text-[14px]">{t("free_delivery_description")}</p>
        </div>
        <div className="flex flex-col text-center items-center">
          <div className="border-8 border-[#B0B0B0] rounded-full">
            <div className="bg-[#000000] rounded-full p-2">
              <img
                src="./assets/CustomerService.png"
                alt={t("service_icon_alt")}
              />
            </div>
          </div>
          <h3 className="font-semibold text-xl mt-6 mb-2">
            {t("customer_service_title")}
          </h3>
          <p className="text-[14px]">{t("customer_service_description")}</p>
        </div>
        <div className="flex flex-col text-center items-center">
          <div className="border-8 border-[#B0B0B0] rounded-full">
            <div className="bg-[#000000] rounded-full p-2">
              <img src="./assets/secureIcon.png" alt={t("security_icon_alt")} />
            </div>
          </div>
          <h3 className="font-semibold text-xl mt-6 mb-2">
            {t("money_back_title")}
          </h3>
          <p className="text-[14px]">{t("money_back_description")}</p>
        </div>
      </div>
      <div className="flex justify-center min-[1135px]:justify-end">
        <button
          onClick={() => {
            document.getElementById("Header")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="flex justify-center bg-[#F5F5F5] p-3 rounded-full w-[46px]"
        >
          <img src="./assets/UpArrow.png" alt={t("up_arrow_alt")} />
        </button>
      </div>
    </motion.section>
  );
}

export default FeaturedSection;
