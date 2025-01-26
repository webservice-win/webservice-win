import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Contextapi } from "../../context/Appcontext";
import logo from "../../assets/logo.png";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdSupportAgent } from "react-icons/md";
import { RiPageSeparator } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineWeb } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { SiSololearn } from "react-icons/si";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { MdOutlinePayments } from "react-icons/md";
const Dashboardleftside = () => {
  const { activesidebar, setactivesidebar } = useContext(Contextapi);
  const [activesubmenu, setactivesubmenu] = useState(false);
  const [activesubmenu2, setactivesubmenu2] = useState(false);
  const [activesubmenu3, setactivesubmenu3] = useState(false);
  const [activesubmenu4, setactivesubmenu4] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // State to track active submenus
  const [submenuStates, setSubmenuStates] = useState({
    customer: false,
    pricePlan: false,
    users: false,
    support: false,
    accordion: false,
    settings: false,
    pages: false,
  });

  // Update submenu states based on current location

  useEffect(() => {
    const currentPath = location.pathname;

    // Update submenu states based on the current path
    setSubmenuStates((prevState) => {
      return {
        ...prevState,
        customer: currentPath.includes("/websites") ? true : prevState.customer,
        pricePlan: currentPath.includes("/courses")
          ? true
          : prevState.pricePlan,
        users: currentPath.includes("/videos") ? true : prevState.users,
        support: currentPath.includes("/reviews") ? true : prevState.support,
        accordion: currentPath.includes("/accordion")
          ? true
          : prevState.accordion,
        settings: currentPath.includes("/settings") ? true : prevState.settings,
        pages: currentPath.includes("/pages") ? true : prevState.pages,
      };
    });
  }, [location]);
  // Logout function
  const logoutfunction = () => {
    let confirm_box = confirm("Are you sure?");
    if (confirm_box) {
      localStorage.removeItem("admin_info");
      navigate("/");
    }
  };

  // Close sidebar
  const closesidebar = () => setactivesidebar(false);
  return (
    <>
      <section
        className={
          activesidebar
            ? "w-[100%] bg-[#338585] xl:block hidden border-r-[1px] border-[#eee] h-[100%]  relative transition-all duration-300  top-0 left-[-100%]"
            : "w-[100%] h-[100%] border-r-[1px] border-[#eee]  transition-all xl:block hidden duration-300  bg-[#338585] relative left-0 top-0 overflow-y-auto no-scrollbar"
        }
      >
        <div className="w-full h-[100vh] overflow-y-auto no-scrollbar xl:px-[6px] 2xl:px-[20px]">
          <div className="logo w-full h-[10vh] flex justify-start items-center p-[13px]">
            <img className="w-[130px] " src={logo} alt="" />
          </div>
          <div>
            <ul className="sellerheader pt-[10px] ">
              <li className="mb-[10px]">
                <NavLink
                  to="/dashboard"
                  className="hover:bg-indigo-500  hover:text-white flex group text-white rounded-[6px] justify-start items-center gap-[10px] px-[13px] py-[10px] tr text-[15px] font-[500]"
                >
                  <RiDashboardLine className="icon text-[20px] text-white group-hover:text-white" />{" "}
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="flex justify-start items-center transition-all text-white duration-300 gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white">
                    <RiShoppingCartLine className="text-[22px]"/>  <NavLink to="/orders">Orders</NavLink>
                    </li>
              <li>
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      customer: !submenuStates.customer,
                    })
                  }
                  className={
                    submenuStates.customer
                      ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] text-black w-full"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between group-hover:text-white text-white text-[15px] font-[500] items-center gap-[10px]">
                    <MdOutlineWeb className="text-[22px] group-hover:text-white" />
                    Websites
                  </span>
                  {submenuStates.customer ? (
                    <IoIosArrowDown className="text-[20px]  text-white group-hover:text-white" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] group-hover:text-white text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.customer
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul className="pl-[10px]">
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-category">
                        Add Category
                      </NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-technology">
                        Add Technology
                      </NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-website">Add Website</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/websites-list">
                        Website List
                      </NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-brand">Add Provider</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/payment">Payment</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/our-site">Our Site</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-member">Add Member</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/member-list">Member List</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-tutorial">Add Tutorial</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/tutorial-list">Tutorial List</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/add-achievement">
                        Add Acievement
                      </NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/websites/achievement-list">
                        Acievement List
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      pricePlan: !submenuStates.pricePlan,
                    })
                  }
                  className={
                    submenuStates.pricePlan
                      ? "flex justify-between items-center transition-all duration-300 gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] hover:bg-indigo-500 group hover:text-white transition-all duration-300 px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white  text-[15px] font-[500]">
                    <SiSololearn className="text-[22px] font-[500] group-hover:text-white" />
                    Courses
                  </span>
                  {submenuStates.pricePlan ? (
                    <IoIosArrowDown className="text-[20px]  group-hover:text-white text-white" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.pricePlan
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul className="pl-[10px]">
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/courses/add-course">Add Course</NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/courses/courses-list">Courses List</NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/courses/admissions-list">Admission</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      accordion: !submenuStates.accordion,
                    })
                  }
                  className={
                    submenuStates.accordion
                      ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                    <TfiLayoutAccordionSeparated className="text-[22px] font-[500] group-hover:text-white" />
                    Accordion
                  </span>
                  {submenuStates.accordion ? (
                    <IoIosArrowDown className="text-[20px] group-hover:text-white text-white" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.accordion
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/accordion/add-accordion">
                        Add Accordion
                      </NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/accordion/accordion-list">
                        Accordion List
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      users: !submenuStates.users,
                    })
                  }
                  className={
                    submenuStates.users
                      ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                    <MdOutlineVideoLibrary className="text-[22px] font-[500] group-hover:text-white" />
                    Videos
                  </span>
                  {submenuStates.users ? (
                    <IoIosArrowDown className="text-[20px] group-hover:text-white text-white" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.users
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/videos/add-video">Add Video</NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/videos/videos-list">Videos List</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                {" "}
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      support: !submenuStates.support,
                    })
                  }
                  className={
                    submenuStates.support
                      ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                    <RiFeedbackLine className="text-[22px] font-[500]" />
                    Reviews
                  </span>
                  {submenuStates.support ? (
                    <IoIosArrowDown className="text-[20px] group-hover:text-white text-neutral-400" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] group-hover:text-white text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.support
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/reviews/add-video-review">
                        Video Review
                      </NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/reviews/video-reviews-list">
                        Video Reviews List
                      </NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/reviews/add-feedback">Add Feedback</NavLink>
                    </li>
                    <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="/reviews/feedback-list">
                        Feedback List
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Settings Submenu */}
              <li>
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      settings: !submenuStates.settings,
                    })
                  }
                  className={
                    submenuStates.settings
                      ? "flex justify-between items-center transition-all duration-300 gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] hover:bg-indigo-500 group hover:text-white transition-all duration-300 px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                    <LuSettings className="text-[22px] group-hover:text-white" />
                    Settings
                  </span>
                  {submenuStates.settings ? (
                    <IoIosArrowDown className="text-[20px] text-white group-hover:text-white" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.settings
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul className="pl-[10px]">
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="">Profile</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="">Tearms & Condition</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="">Privacy Policy</NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Pages Submenu */}
              <li>
                <button
                  onClick={() =>
                    setSubmenuStates({
                      ...submenuStates,
                      pages: !submenuStates.pages,
                    })
                  }
                  className={
                    submenuStates.pages
                      ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                      : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                  }
                >
                  <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                    <RiPageSeparator className="text-[22px] group-hover:text-white" />{" "}
                    Components
                  </span>
                  {submenuStates.pages ? (
                    <IoIosArrowDown className="text-[20px] text-white group-hover:text-white" />
                  ) : (
                    <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                  )}
                </button>
                <div
                  className={
                    submenuStates.pages
                      ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                      : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                  }
                >
                  <ul className="pl-[10px]">
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="">Header</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="">About</NavLink>
                    </li>
                    <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                      <NavLink to="">Footer</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex justify-start items-center transition-all text-white duration-300 gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white">
                    <MdOutlinePayments className="text-[22px]"/>  <NavLink to="/payment-setting">Payment Setting</NavLink>
                    </li>
              {/* Existing Menu Items */}
            </ul>
          </div>
        </div>
      </section>
      <section
        className={
          activesidebar
            ? " z-[10453530000] bg-[#338585] w-[60%] xl:hidden block h-[100%] fixed transition-all duration-300 shadow-boxshadow5 border-r-[1px] border-[#eee]  top-0 left-0"
            : "z-[100000] w-[100%] h-[100%] transition-all xl:hidden block duration-300 bg-[#338585] fixed left-[-100%] top-0 shadow-boxshadow5 border-r-[1px] border-[#eee]"
        }
      >
        <div
          onClick={closesidebar}
          className="cursor-pointer close absolute top-[10px] right-[30px]"
        >
          <button className="text-[25px] hover:text-[#FF5200] transition-all duration-200">
            <IoClose />
          </button>
        </div>
        <div className="logo w-full h-[10vh] flex justify-center items-center">
          <img
            className="w-[100px] lg:w-[120px] xl:w-[130px] 2xl:w-[150px] "
            src={logo}
            alt=""
          />
        </div>
        <div>
          <ul className="sellerheader pt-[10px] ">
            <li className="mb-[10px]">
              <NavLink
                to="/dashboard"
                className="hover:bg-indigo-500  hover:text-white flex group text-white rounded-[6px] justify-start items-center gap-[10px] px-[13px] py-[10px] tr text-[15px] font-[500]"
              >
                <RiDashboardLine className="icon text-[20px] text-white group-hover:text-white" />{" "}
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    customer: !submenuStates.customer,
                  })
                }
                className={
                  submenuStates.customer
                    ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] text-black w-full"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between group-hover:text-white text-white text-[15px] font-[500] items-center gap-[10px]">
                  <MdOutlineWeb className="text-[22px] group-hover:text-white" />
                  Websites
                </span>
                {submenuStates.customer ? (
                  <IoIosArrowDown className="text-[20px]  text-white group-hover:text-white" />
                ) : (
                  <IoIosArrowForward className="text-[20px] group-hover:text-white text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.customer
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul className="pl-[10px]">
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/add-category">Add Category</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/add-technology">
                      Add Technology
                    </NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/add-website">Add Website</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/websites-list">Website List</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/add-brand">Add Provider</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/payment">Payment</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/our-site">Our Site</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/add-member">Add Member</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/member-list">Member List</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/add-achievement">
                      Add Acievement
                    </NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/websites/achievement-list">
                      Acievement List
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    pricePlan: !submenuStates.pricePlan,
                  })
                }
                className={
                  submenuStates.pricePlan
                    ? "flex justify-between items-center transition-all duration-300 gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] hover:bg-indigo-500 group hover:text-white transition-all duration-300 px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white  text-[15px] font-[500]">
                  <SiSololearn className="text-[22px] font-[500] group-hover:text-white" />
                  Courses
                </span>
                {submenuStates.pricePlan ? (
                  <IoIosArrowDown className="text-[20px]  group-hover:text-white text-white" />
                ) : (
                  <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.pricePlan
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul className="pl-[10px]">
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/courses/add-course">Add Course</NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/courses/courses-list">Courses List</NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/courses/admissions-list">Admission</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    accordion: !submenuStates.accordion,
                  })
                }
                className={
                  submenuStates.accordion
                    ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                  <TfiLayoutAccordionSeparated className="text-[22px] font-[500] group-hover:text-white" />
                  Accordion
                </span>
                {submenuStates.accordion ? (
                  <IoIosArrowDown className="text-[20px] group-hover:text-white text-white" />
                ) : (
                  <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.accordion
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/accordion/add-accordion">
                      Add Accordion
                    </NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/accordion/accordion-list">
                      Accordion List
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    users: !submenuStates.users,
                  })
                }
                className={
                  submenuStates.users
                    ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                  <MdOutlineVideoLibrary className="text-[22px] font-[500] group-hover:text-white" />
                  Videos
                </span>
                {submenuStates.users ? (
                  <IoIosArrowDown className="text-[20px] group-hover:text-white text-white" />
                ) : (
                  <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.users
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/videos/add-video">Add Video</NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/videos/videos-list">Videos List</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              {" "}
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    support: !submenuStates.support,
                  })
                }
                className={
                  submenuStates.support
                    ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                  <RiFeedbackLine className="text-[22px] font-[500]" />
                  Reviews
                </span>
                {submenuStates.support ? (
                  <IoIosArrowDown className="text-[20px] group-hover:text-white text-neutral-400" />
                ) : (
                  <IoIosArrowForward className="text-[20px] group-hover:text-white text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.support
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/reviews/add-video-review">
                      Video Review
                    </NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/reviews/video-reviews-list">
                      Video Reviews List
                    </NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/reviews/add-feedback">Add Feedback</NavLink>
                  </li>
                  <li className="py-[8px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="/reviews/feedback-list">Feedback List</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            {/* Settings Submenu */}
            <li>
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    settings: !submenuStates.settings,
                  })
                }
                className={
                  submenuStates.settings
                    ? "flex justify-between items-center transition-all duration-300 gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] hover:bg-indigo-500 group hover:text-white transition-all duration-300 px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                  <LuSettings className="text-[22px] group-hover:text-white" />
                  Settings
                </span>
                {submenuStates.settings ? (
                  <IoIosArrowDown className="text-[20px] text-white group-hover:text-white" />
                ) : (
                  <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.settings
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul className="pl-[10px]">
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="">Profile</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="">Tearms & Condition</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="">Privacy Policy</NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Pages Submenu */}
            <li>
              <button
                onClick={() =>
                  setSubmenuStates({
                    ...submenuStates,
                    pages: !submenuStates.pages,
                  })
                }
                className={
                  submenuStates.pages
                    ? "flex justify-between transition-all duration-300 items-center gap-[10px] p-[13px] rounded-[6px] text-[15px] font-[500] w-full hover:bg-indigo-500 group hover:text-white"
                    : "mb-[10px] w-full flex justify-between items-center cursor-pointer rounded-[6px] transition-all duration-300 hover:bg-indigo-500 group hover:text-white px-[13px] py-[10px]"
                }
              >
                <span className="flex justify-between items-center group-hover:text-white gap-[10px] text-white text-[15px] font-[500]">
                  <RiPageSeparator className="text-[22px] group-hover:text-white" />{" "}
                  Components
                </span>
                {submenuStates.pages ? (
                  <IoIosArrowDown className="text-[20px] text-white group-hover:text-white" />
                ) : (
                  <IoIosArrowForward className="text-[20px] text-white group-hover:text-white transition-all duration-200" />
                )}
              </button>
              <div
                className={
                  submenuStates.pages
                    ? "h-auto overflow-hidden transition-all pl-[30px] duration-300"
                    : "submenu pl-[30px] h-0 overflow-hidden transition-all duration-300"
                }
              >
                <ul className="pl-[10px]">
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="">Header</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="">About</NavLink>
                  </li>
                  <li className="py-[12px] text-[15px] text-white list-disc font-[500]">
                    <NavLink to="">Footer</NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Existing Menu Items */}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Dashboardleftside;
