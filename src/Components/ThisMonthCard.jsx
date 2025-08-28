import cardData from "../card.json";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function ThisMonthCard() {
  const { t } = useTranslation();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const viewDetails = (id) => {
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
    navigate(`/product/${id}`);
  };
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 min-[1135px]:grid-cols-4 min-[1135px]:gap-8 px-4">
        {cardData.products_group_2.map((cardMonth) => {
          const isLiked = wishlist.find((item) => item.id === cardMonth.id);
          return (
            <div key={cardMonth.id} className="min-w-[270px] flex-shrink-0">
              <div className="bg-[#F5F5F5] relative w-[270px] h-[270px] rounded-[4px] hover:bg-[#E8E8E8] transition-colors duration-300">
                <div className="flex justify-center items-center pt-16">
                  <img
                    src={cardMonth.image}
                    alt={t("product_image_alt", { name: cardMonth.name })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(cardMonth)}
                    className={`p-2 rounded-full absolute right-2 top-3 ${
                      isLiked ? "bg-[#DB4444]" : " bg-[#FFFFFF]"
                    }`}
                  >
                    <img src="./assets/Love.png" alt={t("wishlist_icon_alt")} />
                  </button>
                  <button
                    onClick={() => viewDetails(cardMonth.id)}
                    className="bg-[#FFFFFF] p-2 rounded-full absolute right-[6px] top-14"
                  >
                    <img
                      src="./assets/QuickViewIcon.png"
                      alt={t("quick_view_icon_alt")}
                    />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-[#000000] font-medium">{cardMonth.name}</h3>
                <div className="flex gap-2">
                  <p className="text-[#DB4444] font-medium">
                    ${cardMonth.price_after}
                  </p>
                  <p className="text-gray-500 font-medium line-through">
                    {cardMonth.price_before !== null
                      ? `$${cardMonth.price_before}`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={cardMonth.rating_image}
                    alt={t("rating_image_alt")}
                  />
                  <p className="font-semibold text-sm text-gray-600">
                    ({cardMonth.rating_count})
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThisMonthCard;
