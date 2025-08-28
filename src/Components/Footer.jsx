import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    navigate("/MyAccount");
  };

  return (
    <footer className="relative bg-black text-white flex justify-center items-center flex-col h-[1300px] md:h-[650px] min-[1280px]:h-[440px]">
      <div className="container mx-auto px-4 grid grid-cols-1 gap-10 md:grid-cols-3 min-[1280px]:grid-cols-5 min-[1280px]:gap-20">
        <div className="flex flex-col text-center items-center min-[1280px]:text-start min-[1280px]:items-start">
          <h3 className="text-2xl font-bold mb-6">{t("footer.exclusive")}</h3>
          <p className="font-medium text-xl mb-6">{t("footer.subscribe")}</p>
          <p className="mb-4">{t("footer.discount_offer")}</p>
          <div className="relative flex items-center border border-gray-400 rounded-md p-3">
            <input
              type="email"
              placeholder={t("footer.email_placeholder")}
              className="bg-transparent outline-none flex-1 pr-8 text-sm sm:text-base"
              aria-label={t("footer.email_placeholder")}
            />
            <button
              onClick={handleViewAllClick}
              className="absolute right-3 z-10"
              aria-label={t("footer.email_arrow_alt")}
            >
              <img
                src="../assets/EmailArrow.png"
                alt={t("footer.email_arrow_alt")}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col text-center items-center min-[1280px]:items-start min-[1280px]:text-start">
          <h3 className="text-xl font-medium mb-6">{t("footer.support")}</h3>
          <p className="mb-4">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="mb-4">exclusive@gmail.com</p>
          <p>+88015-8888-9999</p>
        </div>
        <div className="flex flex-col items-center min-[1280px]:items-start">
          <h3 className="text-xl font-medium mb-6">{t("footer.account")}</h3>
          <p className="mb-4">{t("footer.my_account")}</p>
          <p className="mb-4">{t("footer.login_register")}</p>
          <p className="mb-4">{t("footer.cart")}</p>
          <p className="mb-4">{t("footer.wishlist")}</p>
          <p>{t("footer.shop")}</p>
        </div>
        <div className="flex flex-col items-center min-[1280px]:items-start">
          <h3 className="text-xl font-medium mb-6">{t("footer.quick_link")}</h3>
          <p className="mb-4">{t("footer.privacy_policy")}</p>
          <p className="mb-4">{t("footer.terms_of_use")}</p>
          <p className="mb-4">{t("footer.faq")}</p>
          <p>{t("footer.contact")}</p>
        </div>
        <div className="flex flex-col items-center min-[1280px]:items-start min-[1280px]:w-[200px]">
          <h3 className="text-xl font-medium mb-4">
            {t("footer.download_app")}
          </h3>
          <p className="text-xs text-gray-300 font-medium mb-2">
            {t("footer.app_discount")}
          </p>
          <div className="flex items-center gap-2 mb-6">
            <img src="../assets/Qrcode.png" alt={t("footer.qr_code_alt")} />
            <div className="flex flex-col gap-2">
              <img
                src="../assets/playstore.png"
                alt={t("footer.play_store_alt")}
              />
              <img
                src="../assets/appstore.png"
                alt={t("footer.app_store_alt")}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <a href="#">
              <img
                src="../assets/facebook.png"
                alt={t("footer.facebook_alt")}
              />
            </a>
            <a href="#">
              <img src="../assets/twitter.png" alt={t("footer.twitter_alt")} />
            </a>
            <a href="#">
              <img
                src="../assets/instagram.png"
                alt={t("footer.instagram_alt")}
              />
            </a>
            <a href="#">
              <img
                src="../assets/Linkedin.png"
                alt={t("footer.linkedin_alt")}
              />
            </a>
          </div>
        </div>
      </div>
      <p className="absolute bottom-0 text-gray-700 pb-4">
        {t("footer.copyright")}
      </p>
    </footer>
  );
}

export default Footer;
