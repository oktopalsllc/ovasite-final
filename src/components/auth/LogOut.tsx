import { authService } from "@/services/auth-service/auth.service";
import React from "react";

function LogOut() {
  const handleLogout = async () => {
    await authService.logout();
  };
  return (
    <div>
      <button onClick={handleLogout} className="cursor-pointer">
        LogOut
      </button>
    </div>
  );
}

export default LogOut;
