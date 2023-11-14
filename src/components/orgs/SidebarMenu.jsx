import React, { useState } from "react";

function SidebarMenu() {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`w-64 bg-gray-800 text-white h-screen ${
        isCollapsed ? "hidden" : "block"
      }`}
    >
      <div className="p-4">
        {/* Your Sidebar Content */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleCollapse}
        >
          <span className="text-xl">{isCollapsed ? "▶" : "◀"}</span>
          <span>{isCollapsed ? "" : "Collapse"}</span>
        </div>
        <div className="mt-4">
          {/* Sidebar items with icons and text */}
          <div className="flex items-center space-x-2">
            {/* Icon */}
            <span className="text-xl">&#128640;</span>
            {/* Text */}
            <span>Item 1</span>
          </div>
          {/* Add more sidebar items as needed */}
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
