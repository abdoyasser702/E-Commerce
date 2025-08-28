import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function UpperHeader() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleViewAllClick = () => {
    toast.dismiss();
    if (!auth.currentUser) {
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
    navigate("/AllProductPage");
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-sm h-auto py-2 bg-black text-[#FAFAFA] min-[1135px]:h-12 min-[1135px]:flex-row min-[1135px]:gap-4">
      <div className="flex flex-col items-center gap-1 min-[1135px]:flex-row min-[1135px]:gap-2 text-center">
        <p>{t("summer_sale")}</p>
        <button
          onClick={handleViewAllClick}
          className="underline font-semibold cursor-pointer"
          aria-label={t("shop_now")}
        >
          {t("shop_now")}
        </button>
      </div>
      <div className="mt-2 min-[1135px]:mt-0 min-[1135px]:absolute min-[1135px]:right-36">
        <select
          className="bg-black text-white px-3 py-1 text-xs min-[1135px]:text-sm"
          defaultValue={i18n.language}
          onChange={handleLanguageChange}
          aria-label={t("language_selector")}
        >
          <option value="en">English</option>
          <option value="gr">German</option>
        </select>
      </div>
    </div>
  );
}

export default UpperHeader;
