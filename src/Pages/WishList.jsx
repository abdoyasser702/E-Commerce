import { Link } from "react-router-dom";
import ThisMonthCard from "../Components/ThisMonthCard";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect } from "react";

function WishList() {
  const { t } = useTranslation();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const deleteWishlistHandler = (card) => {
    const confirmDelete = window.confirm(t("wishlist.confirm_delete"));
    if (confirmDelete) {
      toggleWishlist(card);
    }
  };

  const MoveAllToBagHandler = () => {
    if (wishlist.length === 0) {
      alert(t("wishlist.empty_wishlist_alert"));
      return;
    }
    wishlist.forEach((item) => {
      addToCart(item);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1170px] mx-auto mt-20 mb-10 md:mb-36 px-4"
    >
      <div className="flex items-center justify-between gap-4 flex-col sm:flex-row sm:gap-0">
        <h3 className="text-xl">
          {t("wishlist.title")} ({wishlist.length})
        </h3>

        <div>
          <button
            onClick={MoveAllToBagHandler}
            className="font-medium py-4 px-12 border border-[#00000080] rounded-[4px]"
          >
            {t("wishlist.move_all_to_bag")}
          </button>
        </div>
      </div>
      {wishlist.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-2xl font-medium text-[#FFFFFF] bg-blue-400 rounded px-4 py-2 mt-4">
            {t("wishlist.no_items")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 min-[1135px]:grid-cols-4 min-[1135px]:gap-8 px-4">
          {wishlist.map((item) => (
            <div key={item.id} className="mt-6">
              <div className="min-w-[270px] flex-shrink-0">
                <div className="bg-[#F5F5F5] relative w-[270px] h-[270px] rounded-[4px] hover:bg-[#E8E8E8] transition-colors duration-300">
                  <div className="flex justify-center items-center pt-16">
                    <img
                      src={item.image}
                      alt={t("product_image_alt", { name: item.name })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => deleteWishlistHandler(item)}
                      className="bg-[#FFFFFF] p-2 rounded-full absolute right-2 top-3"
                      title={t("wishlist.remove_icon_alt")}
                    >
                      <img
                        src="./assets/RemoveIcon.png"
                        alt={t("wishlist.remove_icon_alt")}
                      />
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="absolute left-0 right-0 bottom-0 text-[#FFFFFF] bg-[#000000] flex items-center gap-2 justify-center rounded-br rounded-bl"
                  >
                    <img
                      src="./assets/WhiteCart.png"
                      alt={t("wishlist.white_cart_alt")}
                    />
                    <p className="py-2">{t("wishlist.add_to_cart")}</p>
                  </button>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="text-[#000000] font-medium">{item.name}</h3>
                  <div className="flex gap-2">
                    <p className="text-[#DB4444] font-medium">
                      ${item.price_after}
                    </p>
                    <p className="text-gray-500 font-medium line-through">
                      {item.price_before !== null
                        ? `$${item.price_before}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <section className="flex flex-col gap-6 mx-auto pb-16 mt-[70px]">
        <div className="flex items-center justify-around gap-4 lg:justify-between flex-col sm:flex-row sm:gap-0">
          <div className="flex items-center justify-center gap-4 lg:justify-start">
            <img src="./assets/RedRectangle.png" alt={t("red_rectangle_alt")} />
            <h3 className="text-[#DB4444] font-semibold">
              {t("wishlist.just_for_you")}
            </h3>
          </div>
          <div>
            <Link to="/BestProductsPage">
              <button className="font-medium py-4 px-12 border border-[#00000080] rounded-[4px]">
                {t("wishlist.see_all")}
              </button>
            </Link>
          </div>
        </div>
        <ThisMonthCard></ThisMonthCard>
      </section>
    </motion.div>
  );
}

export default WishList;
