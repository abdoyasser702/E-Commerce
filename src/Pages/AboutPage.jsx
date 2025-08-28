import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect } from "react";

function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1170px] mx-auto mb-36 px-2"
    >
      <div className="text-sm text-gray-400 my-5 text-center md:text-start md:my-16">
        {t("nav.home")} /<span className="text-black">{t("nav.about")}</span>
      </div>
      <div className="flex flex-col items-center justify-between gap-[75px] md:flex-row">
        <div className="flex flex-col text-center items-center max-w-[470px] md:items-start md:text-start">
          <h1 className="font-semibold text-5xl">{t("about.our_story")}</h1>
          <p className="mb-6 mt-10">{t("about.description_1")}</p>
          <p>{t("about.description_2")}</p>
        </div>
        <div className="hidden w-[705px] max-[500px]:w-[300px] max-[1080px]:w-[500px] max-[1080px]:h-[500px] max-[1180px]:w-[600px] max-[1280px]:w-[705px] h-[610px] rounded bg-[#EB7EA8] md:block"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8 mb-8 justify-items-center md:mt-36 md:mb-36">
        <div className="flex flex-col text-center items-center border py-7 px-12 w-[270px] whitespace-nowrap rounded">
          <div className="border-8 border-[#B0B0B0] rounded-full">
            <div className="bg-[#000000] rounded-full p-2">
              <img src="./assets/shopIcon.png" alt={t("about.shop_icon_alt")} />
            </div>
          </div>
          <h3 className="font-bold text-3xl mt-6 mb-2">10.5k</h3>
          <p className="whitespace-normal">{t("about.sellers_active")}</p>
        </div>
        <div className="flex flex-col text-[#FFFFFF] text-center items-center bg-[#DB4444] border py-7 px-12 w-[270px] whitespace-nowrap rounded">
          <div className="border-8 border-red-400 rounded-full">
            <div className="bg-[#FFFFFF] rounded-full p-2">
              <img src="./assets/SaleIcon.png" alt={t("about.sale_icon_alt")} />
            </div>
          </div>
          <h3 className="font-bold text-3xl mt-6 mb-2">33k</h3>
          <p className="whitespace-normal">{t("about.monthly_sales")}</p>
        </div>
        <div className="flex flex-col text-center items-center border py-7 px-12 w-[270px] whitespace-nowrap rounded">
          <div className="border-8 border-[#B0B0B0] rounded-full">
            <div className="bg-[#000000] rounded-full p-2">
              <img
                src="./assets/ShoppingBag.png"
                alt={t("about.shopping_bag_icon_alt")}
              />
            </div>
          </div>
          <h3 className="font-bold text-3xl mt-6 mb-2">45.5k</h3>
          <p className="whitespace-normal">{t("about.customers_active")}</p>
        </div>
        <div className="flex flex-col text-center items-center border py-7 px-12 w-[270px] whitespace-nowrap rounded">
          <div className="border-8 border-[#B0B0B0] rounded-full">
            <div className="bg-[#000000] rounded-full p-2">
              <img
                src="./assets/MoneyBag.png"
                alt={t("about.money_bag_icon_alt")}
              />
            </div>
          </div>
          <h3 className="font-bold text-3xl mt-6 mb-2">25k</h3>
          <p className="whitespace-normal">{t("about.annual_sales")}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 gap-[30px] lg:mt-0 lg:flex-row">
        <div className="flex flex-col text-center items-center w-[300px] lg:w-[370px] lg:text-start lg:items-start">
          <div className="bg-[#F5F5F5] pt-10 px-[67px]">
            <img src="./assets/Tom.png" alt={t("about.tom_cruise_image_alt")} />
          </div>
          <div className="mt-8">
            <h3 className="font-medium text-3xl">Tom Cruise</h3>
            <p className="mt-2 mb-4">{t("about.founder_chairman")}</p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackTwitter.png"
                  alt={t("footer.twitter_alt")}
                />
              </a>
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackInstagram.png"
                  alt={t("footer.instagram_alt")}
                />
              </a>
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackLinkedin.png"
                  alt={t("footer.linkedin_alt")}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center items-center w-[300px] lg:w-[370px] lg:text-start lg:items-start">
          <div className="bg-[#F5F5F5] pt-10 pl-5 pr-6">
            <img
              src="./assets/Emma.png"
              alt={t("about.emma_watson_image_alt")}
            />
          </div>
          <div className="mt-8">
            <h3 className="font-medium text-3xl">Emma Watson</h3>
            <p className="mt-2 mb-4">{t("about.managing_director")}</p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackTwitter.png"
                  alt={t("footer.twitter_alt")}
                />
              </a>
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackInstagram.png"
                  alt={t("footer.instagram_alt")}
                />
              </a>
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackLinkedin.png"
                  alt={t("footer.linkedin_alt")}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-center items-center w-[300px] lg:w-[370px] lg:text-start lg:items-start">
          <div className="bg-[#F5F5F5] pt-10 pl-5 pr-6">
            <img
              src="./assets/Emma.png"
              alt={t("about.will_smith_image_alt")}
            />
          </div>
          <div className="mt-8">
            <h3 className="font-medium text-3xl">Will Smith</h3>
            <p className="mt-2 mb-4">{t("about.product_designer")}</p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackTwitter.png"
                  alt={t("footer.twitter_alt")}
                />
              </a>
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackInstagram.png"
                  alt={t("footer.instagram_alt")}
                />
              </a>
              <a href="#" className="cursor-pointer">
                <img
                  src="./assets/BlackLinkedin.png"
                  alt={t("footer.linkedin_alt")}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center mt-28 md:flex-row lg:gap-[88px] lg:mb-36">
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
    </motion.div>
  );
}

export default AboutPage;
