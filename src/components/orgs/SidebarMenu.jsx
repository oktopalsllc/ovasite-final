import React, { useState } from "react";

function SidebarMenu() {
  const [activeLink, setActiveLink] = useState("projects");
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${
        isCollapsed ? "" : "w-96"
      } bg-[#001333] text-white max-h-full overflow-y-scroll`}
    >
      <div className="p-0">
        {/* Your Sidebar Content */}
        <div
          className="flex items-center space-x-2 cursor-pointer p-6 border-b border-white"
          onClick={toggleCollapse}
        >
          <span className="text-xl">
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                />
              </svg>
            )}
          </span>
          <span className="ml-6">{isCollapsed ? "" : "Collapse"}</span>
        </div>
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
              onClick={() => setActiveLink("teams")}
              className="flex items-center space-x-4 cursor-pointer"
            >
              {/* Icon */}
              <span className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
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

            {/* Item */}
            <div
              onClick={() => setActiveLink("subscriptions")}
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
          </div>

          <div className="flex flex-col">
            <div className="space-y-6">
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

              {/* Item */}
              <div
                onClick={() => setActiveLink("logout")}
                className="flex items-center space-x-4 cursor-pointer"
              >
                {/* Icon */}
                <span className="text-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
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
    </div>
  );
}

export default SidebarMenu;
