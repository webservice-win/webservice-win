import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer/footer";
import Navbar from "../components/shared/navbar/Navbar";
import SidebarMenu from "../components/shared/sidebarMenu/SidebarMenu";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

// import MobileMenu from "../components/home/MobileMenu";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [isStickerOpen, setIsStickerOpen] = useState(true);

  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // const hideCommonComponents = isMobile && location.pathname === "/register";

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <SidebarMenu open={open} setOpen={setOpen} />

      {/* Content Area */}
      <div
        className={`flex-1 h-screen overflow-y-auto duration-300 ${
          !open ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <Navbar open={open} setOpen={setOpen} />
        <div className="mt-[62px] md:mt-16 bg-gray-700">
          <Outlet />
        </div>
        <Footer />
        {/* {!hideCommonComponents && <MobileMenu />} */}
      </div>

      {/* sticker */}
      {isStickerOpen && (
        <div className="absolute bottom-11 md:bottom-3 left-2 md:left-8 z-50">
          <div className="flex justify-end">
            <button
              onClick={() => setIsStickerOpen(false)}
              className="text-white text-xl md:text-2xl"
            >
              <IoIosCloseCircle />
            </button>
          </div>
          <img
            className="w-24 md:w-40"
            src="https://img.d4040p.com/upload/footerH5FloatBanner/image_202063.gif"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
