import { Link } from "react-router-dom";
import Button from "./Button";
import ThisMonthCard from "./ThisMonthCard";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function ThisMonthSection() {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const endDate = useRef(
    new Date(
      localStorage.getItem("endDate2") || Date.now() + 5 * 24 * 60 * 60 * 1000
    )
  );

  useEffect(() => {
    const updateInitialTime = () => {
      const now = new Date();
      const difference = endDate.current - now;

      if (difference <= 0) {
        endDate.current = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
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
        endDate.current = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        setTimeLeft({ days: 5, hours: 0, minutes: 0, seconds: 0 });
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

      localStorage.setItem("endDate2", endDate.current.toISOString());

      requestAnimationFrame(updateTimer);
    };

    const animationFrameId = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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
      className="flex flex-col gap-6 max-w-[1170px] mx-auto pb-16 mt-[70px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-4 min-[1135px]:justify-start">
        <img src="./assets/RedRectangle.png" alt={t("red_rectangle_alt")} />
        <h3 className="text-[#DB4444] font-semibold">{t("this_month")}</h3>
      </div>
      <div className="flex items-center gap-4 flex-col text-center md:text-start md:justify-around md:flex-row md:gap-0 min-[1135px]:justify-between">
        <h2 className="font-semibold text-4xl">{t("best_selling_products")}</h2>
        <Link
          onClick={handleViewAllClick}
          to={auth.currentUser ? "/BestProductsPage" : "#"}
        >
          <Button value={t("view_all")} variant="primary"></Button>
        </Link>
      </div>
      <ThisMonthCard></ThisMonthCard>
      <div className="flex flex-col-reverse bg-[#000000] gap-4 py-10 mx-auto items-center max-w-[340px] mt-6 min-[1135px]:flex-row min-[1135px]:justify-around min-[1135px]:py-[69px] min-[1135px]:ml-5 min-[1135px]:mt-10 md:max-w-[650px] min-[1135px]:max-w-[1170px]">
        <div className="text-[#FAFAFA] flex flex-col gap-8 items-center text-center lg:my-auto lg:pl-16 lg:text-left lg:items-start">
          <p className="text-[#00FF66] font-semibold">{t("categories")}</p>
          <h2 className="text-5xl font-semibold leading-[60px]">
            {t("enhance_music_experience")}
          </h2>
          <div>
            <div className="flex font-medium text-xs gap-6 pl-[3px]">
              <div className="flex flex-col items-center rounded-full py-[14px] px-[7px] text-[#000000] bg-[#FFFFFF]">
                <span className="font-semibold">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </span>
                <p className="min-w-12 flex justify-center">{t("hours")}</p>
              </div>
              <div className="flex flex-col items-center rounded-full py-[14px] px-[7px] text-[#000000] bg-[#FFFFFF]">
                <span className="font-semibold">
                  {timeLeft.days.toString().padStart(2, "0")}
                </span>
                <p className="min-w-12 flex justify-center">{t("days")}</p>
              </div>
              <div className="flex flex-col items-center rounded-full py-[14px] px-[7px] text-[#000000] bg-[#FFFFFF]">
                <span className="font-semibold">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <p className="min-w-12 flex justify-center">{t("minutes")}</p>
              </div>
              <div className="flex flex-col items-center rounded-full py-[14px] px-[7px] text-[#000000] bg-[#FFFFFF]">
                <span className="font-semibold">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
                <p className="min-w-12 flex justify-center">{t("seconds")}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center text-center mb-4 min-[1135px]:text-left min-[1135px]:mb-0">
            <Link
              onClick={handleViewAllClick}
              to={auth.currentUser ? "/AllProductPage" : "#"}
            >
              <Button value={t("buy_now")} variant="secondary"></Button>
            </Link>
          </div>
        </div>
        <div className="min-[1135px]:pr-[60px]">
          <img
            src="./assets/Sub.png"
            alt={t("speaker_image_alt")}
            className="w-[220px] lg:w-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}

export default ThisMonthSection;
