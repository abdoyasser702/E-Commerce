import cardData from "../card.json";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function OurProductsCard() {
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
        {cardData.products_group_3.map((product) => {
          const isLiked = wishlist.find((item) => item.id === product.id);
          return (
            <div key={product.id} className="min-w-[270px] flex-shrink-0">
              <div className="bg-[#F5F5F5] relative w-[270px] h-[270px] rounded-[4px] hover:bg-[#E8E8E8] transition-colors duration-300">
                <div className="flex justify-between px-3 pt-3">
                  {product.isNew ? (
                    <p className="text-[#FAFAFA] bg-[#00FF66] rounded-md px-3 py-[2px] h-[30px]">
                      {t("new_label")}
                    </p>
                  ) : null}
                </div>
                <div className="flex justify-center items-center pt-6">
                  <img
                    src={product.image}
                    alt={t("product_image_alt", { name: product.name })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2 rounded-full absolute right-2 top-3 ${
                      isLiked ? "bg-[#DB4444]" : "bg-[#FFFFFF]"
                    }`}
                  >
                    <img src="./assets/Love.png" alt={t("wishlist_icon_alt")} />
                  </button>
                  <button
                    onClick={() => viewDetails(product.id)}
                    className="bg-[#FFFFFF] p-2 rounded-full absolute right-[6px] top-14"
                  >
                    <img
                      src="./assets/QuickViewIcon.png"
                      alt={t("quick_view_icon_alt")}
                    />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 items-center lg:items-start">
                <h3 className="text-[#000000] font-medium">{product.name}</h3>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    <p className="text-[#DB4444] font-medium">
                      ${product.price_after}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={product.rating_image}
                      alt={t("rating_image_alt")}
                    />
                    <p className="font-semibold text-sm text-gray-600">
                      ({product.rating_count})
                    </p>
                  </div>
                </div>
                {product.colors && product.colors.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="border-2 border-[#000000] rounded-full"
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-[#F5F5F5]"
                          style={{ backgroundColor: color }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OurProductsCard;
