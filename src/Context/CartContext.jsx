import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem("cartList");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product) => {
    setCartList((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const safeQuantity = Number(product.quantity) || 1;

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity: safeQuantity }];
    });

    const exists = cartList.find((item) => item.id === product.id);
    if (exists) {
      toast.success("Quantity updated in the cart ✅", {
        position: "top-center",
        id: "add-to-cart",
      });
    } else {
      toast.success("Product added to the cart ✅", {
        position: "top-center",
        id: "add-to-cart",
      });
    }
  };

  const removeFromCart = (productId) => {
    const conirmation = window.confirm(
      "Are you sure you want to update the quantity?"
    );
    if (!conirmation) return;
    setCartList((prev) => prev.filter((item) => item.id !== productId));
  };
  const updateCartQuantity = (productId, quantity) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        updateCartQuantity,
        addToCart,
        removeFromCart,
        setCartList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
