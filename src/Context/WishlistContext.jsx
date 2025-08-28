import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const toggleWishlist = (card) => {
    setWishlist((prev) => {
      //Delete Card
      if (prev.find((item) => item.id === card.id)) {
        return prev.filter((item) => item.id !== card.id);
      }
      //Add Card
      return [...prev, card];
    });
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook
export const useWishlist = () => useContext(WishlistContext);
