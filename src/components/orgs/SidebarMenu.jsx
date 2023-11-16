import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function SidebarMenu() {
  const [activeLink, setActiveLink] = useState("projects");
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`${
        isCollapsed ? "" : "w-96"
      } h-screen md:bg-navy_blue z-50 hidden lg:block`}
    >
      <div className="relative">
        {isCollapsed ? (
          <div
            onClick={toggleCollapse}
            className="grid place-content-center p-5 cursor-pointer"
          >
            <Image alt="Logo" src="/Logo.png" width={60} height={60} />
          </div>
        ) : (
          <div
            onClick={toggleCollapse}
            className="text-[#FF595A] text-[32px] font-extrabold grid place-content-center p-5 cursor-pointer"
          >
            Ovasite
          </div>
        )}
      </div>
      <div className={`bg-[#001333] text-white h-full`}>
        <div className="p-0">
          <div className="mt-4 p-6 flex flex-col justify-between h-screen">
            <div className="space-y-6">
              {/* Item */}
              <div
                onClick={() => setActiveLink("projects")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M6 14V34C6 35.0609 6.42143 36.0783 7.17157 36.8284C7.92172 37.5786 8.93913 38 10 38H38C39.0609 38 40.0783 37.5786 40.8284 36.8284C41.5786 36.0783 42 35.0609 42 34V18C42 16.9391 41.5786 15.9217 40.8284 15.1716C40.0783 14.4214 39.0609 14 38 14H26L22 10H10C8.93913 10 7.92172 10.4214 7.17157 11.1716C6.42143 11.9217 6 12.9391 6 14Z"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* Text */}
                {!isCollapsed && (
                  <span
                    className={`${
                      activeLink == "projects"
                        ? "text-[#FF595A] font-semibold"
                        : "text-ova_white"
                    } ml-[1rem]  text-lg `}
                  >
                    Project
                  </span>
                )}
              </div>

              {/* Item */}
              <div
                onClick={() => setActiveLink("organisations")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M34 40H44V36C43.9999 34.7531 43.6113 33.5371 42.8883 32.5213C42.1652 31.5054 41.1436 30.74 39.9655 30.3315C38.7874 29.923 37.5112 29.8918 36.3145 30.242C35.1178 30.5923 34.0599 31.3067 33.288 32.286M34 40H14M34 40V36C34 34.688 33.748 33.434 33.288 32.286M33.288 32.286C32.5453 30.4299 31.2635 28.8389 29.608 27.7182C27.9525 26.5976 25.9992 25.9986 24 25.9986C22.0008 25.9986 20.0475 26.5976 18.392 27.7182C16.7365 28.8389 15.4547 30.4299 14.712 32.286M14 40H4V36C4.00009 34.7531 4.38867 33.5371 5.11172 32.5213C5.83477 31.5054 6.85637 30.74 8.0345 30.3315C9.21263 29.923 10.4888 29.8918 11.6855 30.242C12.8822 30.5923 13.9401 31.3067 14.712 32.286M14 40V36C14 34.688 14.252 33.434 14.712 32.286M30 14C30 15.5913 29.3679 17.1174 28.2426 18.2426C27.1174 19.3679 25.5913 20 24 20C22.4087 20 20.8826 19.3679 19.7574 18.2426C18.6321 17.1174 18 15.5913 18 14C18 12.4087 18.6321 10.8826 19.7574 9.75736C20.8826 8.63214 22.4087 8 24 8C25.5913 8 27.1174 8.63214 28.2426 9.75736C29.3679 10.8826 30 12.4087 30 14ZM42 20C42 21.0609 41.5786 22.0783 40.8284 22.8284C40.0783 23.5786 39.0609 24 38 24C36.9391 24 35.9217 23.5786 35.1716 22.8284C34.4214 22.0783 34 21.0609 34 20C34 18.9391 34.4214 17.9217 35.1716 17.1716C35.9217 16.4214 36.9391 16 38 16C39.0609 16 40.0783 16.4214 40.8284 17.1716C41.5786 17.9217 42 18.9391 42 20ZM14 20C14 21.0609 13.5786 22.0783 12.8284 22.8284C12.0783 23.5786 11.0609 24 10 24C8.93913 24 7.92172 23.5786 7.17157 22.8284C6.42143 22.0783 6 21.0609 6 20C6 18.9391 6.42143 17.9217 7.17157 17.1716C7.92172 16.4214 8.93913 16 10 16C11.0609 16 12.0783 16.4214 12.8284 17.1716C13.5786 17.9217 14 18.9391 14 20Z"
                      stroke={`${activeLink == "teams" ? "#FF595A" : "white"}`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* Text */}
                {!isCollapsed && (
                  <span
                    className={`${
                      activeLink == "organisations"
                        ? "text-[#FF595A] font-semibold"
                        : "text-ova_white"
                    } ml-[1rem]  text-lg `}
                  >
                    Organisations
                  </span>
                )}
              </div>

              {/* Item */}
              <div
                onClick={() => setActiveLink("employees")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M6 14V34C6 35.0609 6.42143 36.0783 7.17157 36.8284C7.92172 37.5786 8.93913 38 10 38H38C39.0609 38 40.0783 37.5786 40.8284 36.8284C41.5786 36.0783 42 35.0609 42 34V18C42 16.9391 41.5786 15.9217 40.8284 15.1716C40.0783 14.4214 39.0609 14 38 14H26L22 10H10C8.93913 10 7.92172 10.4214 7.17157 11.1716C6.42143 11.9217 6 12.9391 6 14Z"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* Text */}
                {!isCollapsed && (
                  <span
                    className={`${
                      activeLink == "employees"
                        ? "text-[#FF595A] font-semibold"
                        : "text-ova_white"
                    } ml-[1rem]  text-lg `}
                  >
                    Employees
                  </span>
                )}
              </div>

              {/* Item */}
              <div
                onClick={() => setActiveLink("audit")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M13.875 11.7188C13.6687 11.7188 13.5 11.8875 13.5 12.0938V14.3438C13.5 14.55 13.6687 14.7188 13.875 14.7188H31.875C32.0812 14.7188 32.25 14.55 32.25 14.3438V12.0938C32.25 11.8875 32.0812 11.7188 31.875 11.7188H13.875ZM22.5 18.4688H13.875C13.6687 18.4688 13.5 18.6375 13.5 18.8438V21.0938C13.5 21.3 13.6687 21.4688 13.875 21.4688H22.5C22.7062 21.4688 22.875 21.3 22.875 21.0938V18.8438C22.875 18.6375 22.7062 18.4688 22.5 18.4688ZM20.25 39.9375H9.75V6.9375H36V21.9375C36 22.1437 36.1688 22.3125 36.375 22.3125H39C39.2062 22.3125 39.375 22.1437 39.375 21.9375V5.0625C39.375 4.23281 38.7047 3.5625 37.875 3.5625H7.875C7.04531 3.5625 6.375 4.23281 6.375 5.0625V41.8125C6.375 42.6422 7.04531 43.3125 7.875 43.3125H20.25C20.4563 43.3125 20.625 43.1437 20.625 42.9375V40.3125C20.625 40.1063 20.4563 39.9375 20.25 39.9375ZM40.875 35.8125H34.125V34.0969C36.2953 33.45 37.875 31.4438 37.875 29.0625C37.875 26.1609 35.5266 23.8125 32.625 23.8125C29.7234 23.8125 27.375 26.1609 27.375 29.0625C27.375 31.4391 28.9547 33.45 31.125 34.0969V35.8125H24.375C23.9625 35.8125 23.625 36.15 23.625 36.5625V43.6875C23.625 44.1 23.9625 44.4375 24.375 44.4375H40.875C41.2875 44.4375 41.625 44.1 41.625 43.6875V36.5625C41.625 36.15 41.2875 35.8125 40.875 35.8125ZM30.2812 29.0625C30.2812 27.7687 31.3312 26.7188 32.625 26.7188C33.9188 26.7188 34.9688 27.7687 34.9688 29.0625C34.9688 30.3563 33.9188 31.4062 32.625 31.4062C31.3312 31.4062 30.2812 30.3563 30.2812 29.0625ZM38.7188 41.5312H26.5312V38.7188H38.7188V41.5312Z"
                      fill={`${activeLink == "audit" ? "#FF595A" : "white"}`}
                    />
                  </svg>
                </span>
                {/* Text */}
                {!isCollapsed && (
                  <span
                    className={`${
                      activeLink == "audit"
                        ? "text-[#FF595A] font-semibold"
                        : "text-ova_white"
                    } ml-[1rem]  text-lg `}
                  >
                    Audit
                  </span>
                )}
              </div>
              {/* Item */}
              <div
                onClick={() => setActiveLink("support")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <path
                      d="M14.6667 7.84267V25.6533C14.6663 26.206 14.4709 26.7407 14.1149 27.1634C13.7589 27.5861 13.2651 27.8695 12.7206 27.9639C12.1761 28.0582 11.6158 27.9574 11.1383 27.6791C10.6609 27.4008 10.297 26.9629 10.1107 26.4427L7.24804 18.2427M7.24804 18.2427C6.11633 17.7615 5.18562 16.9054 4.61341 15.8169C4.0412 14.7284 3.86265 13.4756 4.10795 12.2705C4.35326 11.0655 5.00736 9.9822 5.95957 9.204C6.91178 8.4258 8.10361 8.00047 9.33337 8H11.776C17.2427 8 21.9427 6.35467 24 4V22.6667C21.9427 20.312 17.244 18.6667 11.776 18.6667H9.33337C8.61688 18.6677 7.90757 18.5226 7.24804 18.2427ZM24 17.3333C25.0609 17.3333 26.0783 16.9119 26.8285 16.1618C27.5786 15.4116 28 14.3942 28 13.3333C28 12.2725 27.5786 11.2551 26.8285 10.5049C26.0783 9.75476 25.0609 9.33333 24 9.33333"
                      stroke={`${
                        activeLink == "support" ? "#FF595A" : "white"
                      }`}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* Text */}
                {!isCollapsed && (
                  <div
                    className={`${
                      activeLink == "support"
                        ? "text-[#FF595A] font-semibold"
                        : "text-ova_white"
                    } ml-[1rem]  text-lg `}
                  >
                    Customer Support
                  </div>
                )}
              </div>

              {/* Item */}
              <div
                onClick={() => setActiveLink("logout")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M14.6667 21.3334L9.33333 16M9.33333 16L14.6667 10.6667M9.33333 16H28M21.3333 21.3334V22.6667C21.3333 23.7276 20.9119 24.745 20.1618 25.4951C19.4116 26.2453 18.3942 26.6667 17.3333 26.6667H8C6.93913 26.6667 5.92172 26.2453 5.17157 25.4951C4.42143 24.745 4 23.7276 4 22.6667V9.33337C4 8.27251 4.42143 7.25509 5.17157 6.50495C5.92172 5.7548 6.93913 5.33337 8 5.33337H17.3333C18.3942 5.33337 19.4116 5.7548 20.1618 6.50495C20.9119 7.25509 21.3333 8.27251 21.3333 9.33337V10.6667"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* Text */}
                {!isCollapsed && (
                  <span
                    className={`${
                      activeLink == "logout"
                        ? "text-[#FF595A] font-semibold"
                        : "text-ova_white"
                    } ml-[1rem]  text-lg `}
                  >
                    Logout
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SidebarMenu;
