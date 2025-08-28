import { Link } from "react-router-dom";
import Button from "./Button";
import Card from "./Card";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function TodaySection() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const endDate = useRef(
    new Date(
      localStorage.getItem("endDate") || Date.now() + 3 * 24 * 60 * 60 * 1000
    )
  );

  useEffect(() => {
    const updateInitialTime = () => {
      const now = new Date();
      const difference = endDate.current - now;

      if (difference <= 0) {
        endDate.current = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        setTimeLeft({ days: 3, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    updateInitialTime();

    const updateTimer = () => {
      const now = new Date();
      const difference = endDate.current - now;

      if (difference <= 0) {
        endDate.current = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        setTimeLeft({ days: 3, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }

      localStorage.setItem("endDate", endDate.current.toISOString());

      requestAnimationFrame(updateTimer);
    };

    const animationFrameId = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

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
  };

  return (
    <motion.section
      className="flex flex-col gap-6 border-b max-w-[1170px] mx-auto pb-16 mt-[70px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-4 min-[1135px]:justify-start">
        <img src="./assets/RedRectangle.png" alt={t("red_rectangle_alt")} />
        <h3 className="text-[#DB4444] font-semibold">{t("todays")}</h3>
      </div>
      <div className="flex items-center justify-center min-[1135px]:justify-between">
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-20">
          <h2 className="font-semibold text-4xl">{t("flash_sales")}</h2>
          <div>
            <div className="flex font-medium text-xs gap-11 pl-[3px]">
              <p>{t("days")}</p>
              <p>{t("hours")}</p>
              <p>{t("minutes")}</p>
              <p>{t("seconds")}</p>
            </div>
            <div className="flex font-bold text-3xl gap-5">
              <p>{timeLeft.days.toString().padStart(2, "0")}</p>
              <span className="text-[#E07575]">:</span>
              <p>{timeLeft.hours.toString().padStart(2, "0")}</p>
              <span className="text-[#E07575]">:</span>
              <p>{timeLeft.minutes.toString().padStart(2, "0")}</p>
              <span className="text-[#E07575]">:</span>
              <p>{timeLeft.seconds.toString().padStart(2, "0")}</p>
            </div>
          </div>
        </div>
        <div className="mr-10 hidden min-[1135px]:flex min-[1135px]:gap-2">
          <button
            onClick={handleScrollLeft}
            className="bg-[#F5F5F5] rounded-full p-4"
            aria-label={t("left_arrow_alt")}
          >
            <img src="./assets/BlackLeftArrow.png" alt={t("left_arrow_alt")} />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-[#F5F5F5] rounded-full p-4"
            aria-label={t("right_arrow_alt")}
          >
            <img
              src="./assets/BlackRightArrow.png"
              alt={t("right_arrow_alt")}
            />
          </button>
        </div>
      </div>
      <Card scrollRef={scrollRef}></Card>
      <div className="flex justify-center">
        <Link
          to={auth.currentUser ? "/DiscountProductPage" : "#"}
          onClick={handleViewAllClick}
        >
          <Button value={t("view_all_products")} variant="primary" />
        </Link>
      </div>
    </motion.section>
  );
}

export default TodaySection;
