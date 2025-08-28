import OurProductsSection from "../Components/OurProductsSection";
import SideMenu from "../Components/SideMenu";
import ThisMonthSection from "../Components/ThisMonthSection";
import TodaySection from "../Components/TodaySection";
import CategoriesSection from "../Components/CategoriesSection";
import FeaturedSection from "../Components/FeaturedSection";
function Home() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TodaySection></TodaySection>
      <CategoriesSection></CategoriesSection>
      <ThisMonthSection></ThisMonthSection>
      <OurProductsSection></OurProductsSection>
      <FeaturedSection></FeaturedSection>
    </div>
  );
}

export default Home;
