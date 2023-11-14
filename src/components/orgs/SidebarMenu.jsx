import React, { useState } from "react";

function SidebarMenu() {
  const [activeLink, setActiveLink] = useState("projects");
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${isCollapsed ? "" : "w-96"} bg-gray-800 text-white h-screen`}
    >
      <div className="p-4">
        {/* Your Sidebar Content */}
        <div
          className="flex items-center space-x-2 cursor-pointer p-3"
          onClick={toggleCollapse}
        >
          <span className="text-xl">{isCollapsed ? "▶" : "◀"}</span>
          <span>{isCollapsed ? "" : "Collapse"}</span>
        </div>
        <div className="mt-4 px-3 space-y-6">
          {/* Sidebar items with icons and text */}
          <div
            onClick={()=>setActiveLink("projects")}
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

          {/* Add more sidebar items as needed */}
          <div
            onClick={()=>setActiveLink("teams")}
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
                  activeLink == "teams"
                    ? "text-[#FF595A] font-semibold"
                    : "text-ova_white"
                } ml-[1rem]  text-lg `}
              >
                Teams
              </span>
            )}
          </div>

          {/* Add more sidebar items as needed */}
          <div
            onClick={()=>setActiveLink("subscriptions")}
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
                  activeLink == "subscriptions"
                    ? "text-[#FF595A] font-semibold"
                    : "text-ova_white"
                } ml-[1rem]  text-lg `}
              >
                Subscriptions
              </span>
            )}
          </div>

          {/* Add more sidebar items as needed */}
          <div
            onClick={()=>setActiveLink("audit")}
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
                  activeLink == "audit"
                    ? "text-[#FF595A] font-semibold"
                    : "text-ova_white"
                } ml-[1rem]  text-lg `}
              >
                Audit
              </span>
            )}
          </div>

          {/* Add more sidebar items as needed */}
          <div
            onClick={()=>setActiveLink("support")}
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
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
