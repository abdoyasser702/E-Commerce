import { useSearch } from "../Context/SearchContext";
import { useNavigate, Link } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import Button from "../Components/Button";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function SearchResultsPage({ products }) {
  const { t } = useTranslation();
  const { query } = useSearch();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const viewDetails = (id) => {
    if (!auth.currentUser) {
      toast.dismiss();
      toast.error(
        <div>
          {t("today_section.login_required")}{" "}
          <Link to="/LogIn" className="underline text-blue-600">
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
    <motion.section
      className="mt-16 mb-16 max-w-[1170px] mx-auto px-4"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ duration: 0.5 }}
    >
      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 min-[650px]:grid-cols-2 justify-items-center gap-6 min-[1120px]:grid-cols-4 lg:gap-16 px-6">
            {filtered &&
              filtered.map((card) => {
                const isLiked = wishlist.find((item) => item.id === card.id);
                return (
                  <div key={card.id} className="min-w-[270px] flex-shrink-0">
                    <div className="bg-[#F5F5F5] relative w-[270px] h-[270px] rounded-[4px] hover:bg-[#E8E8E8] transition-colors duration-300">
                      <div className="flex justify-between px-3 pt-3">
                        {card.discount && (
                          <p className="text-[#FAFAFA] bg-[#DB4444] rounded-md px-3 py-[2px] h-[30px]">
                            {card.discount}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center items-center pt-6">
                        <img
                          src={card.image}
                          alt={t("product_image_alt", { name: card.name })}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          className={`p-2 rounded-full absolute right-2 top-3 ${
                            isLiked ? "bg-[#DB4444]" : "bg-[#FFFFFF]"
                          }`}
                          onClick={() => toggleWishlist(card)}
                          title={t("wishlist_icon_alt")}
                        >
                          <img
                            src="../assets/Love.png"
                            alt={t("wishlist_icon_alt")}
                          />
                        </button>
                        <button
                          onClick={() => viewDetails(card.id)}
                          className="bg-[#FFFFFF] p-2 rounded-full absolute right-[6px] top-14"
                          title={t("quick_view_icon_alt")}
                        >
                          <img
                            src="../assets/QuickViewIcon.png"
                            alt={t("quick_view_icon_alt")}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <h3 className="text-[#000000] font-medium">
                        {card.name}
                      </h3>
                      <div className="flex gap-2">
                        <p className="text-[#DB4444] font-medium">
                          {card.price_after}
                        </p>
                        <p className="text-gray-500 font-medium line-through">
                          {card.price_before}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src={card.rating_image}
                          alt={t("rating_image_alt")}
                        />
                        <p className="font-semibold text-sm text-gray-600">
                          ({card.rating_count})
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-center mb-5 mt-5">
            <Link to="/">
              <Button
                value={t("search_results.return_to_home")}
                variant="primary"
              ></Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-center mt-16 mb-5">
          <p className="text-3xl font-bold mb-5">
            {t("search_results.no_results")}
          </p>
          <Link to="/">
            <div className="mb-5">
              <Button
                value={t("search_results.return_to_home")}
                variant="primary"
              ></Button>
            </div>
          </Link>
        </div>
      )}
    </motion.section>
  );
}

export default SearchResultsPage;
