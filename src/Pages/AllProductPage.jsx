import cardData from "../card.json";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Context/WishlistContext";
import { motion } from "framer-motion";
import { useEffect } from "react";

function AllProductPage() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();

  const allProducts = [
    ...cardData.products_group_1,
    ...cardData.products_group_2,
    ...cardData.products_group_3,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 mb-16 max-w-[1170px] mx-auto px-4"
    >
      <div className="grid grid-cols-1 min-[650px]:grid-cols-2 justify-items-center gap-6 min-[1120px]:grid-cols-4 lg:gap-16 px-6">
        {allProducts &&
          allProducts.map((card) => {
            const isLiked = wishlist.find((item) => item.id === card.id);
            return (
              <div key={card.id} className="min-w-[270px] flex-shrink-0 ">
                <div className="bg-[#F5F5F5] relative w-[270px] h-[270px] rounded-[4px] hover:bg-[#E8E8E8] transition-colors duration-300">
                  <div className="flex justify-between px-3 pt-3">
                    {card.discount && (
                      <p className="text-[#FAFAFA] bg-[#DB4444] rounded-md px-3 py-[2px] h-[30px]">
                        {card.discount}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center items-center pt-6">
                    <img src={card.image} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      className={`p-2 rounded-full absolute right-2 top-3 ${
                        isLiked ? "bg-[#DB4444]" : "bg-[#FFFFFF]"
                      }`}
                      onClick={() => toggleWishlist(card)}
                    >
                      <img src="../assets/Love.png" />
                    </button>
                    <button
                      onClick={() => navigate(`/product/${card.id}`)}
                      className="bg-[#FFFFFF] p-2 rounded-full absolute right-[6px] top-14"
                    >
                      <img src="../assets/QuickViewIcon.png" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="text-[#000000] font-medium">{card.name}</h3>
                  <div className="flex gap-2">
                    <p className="text-[#DB4444] font-medium">
                      ${card.price_after}
                    </p>
                    <p className="text-gray-500 font-medium line-through">
                      {card.price_before !== null
                        ? `$${card.price_before}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={card.rating_image} />
                    <p className="font-semibold text-sm text-gray-600">
                      ({card.rating_count})
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </motion.section>
  );
}

export default AllProductPage;
