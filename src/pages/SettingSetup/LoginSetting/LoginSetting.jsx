

import React, { useState } from "react";
import { FaCog, FaDatabase, FaGlobe, FaLock, FaServer } from "react-icons/fa";
import OtpLoginSettings from "./Logi/OtpLoginSettings";
import AdminLoginPage from "./LoginUrl/AdminLoginPage";
;



// Sample component imports (replace with actual components)


const LoginSetups = () => {
  const [activeSection, setActiveSection] = useState("otpSetting"); // State to track active section

  // Function to handle section button click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="content container-fluid snipcss-KUtWb">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <FaCog /> System Setup
        </h2>
      </div>
      {/* Top Navbar for sections */}
      <div className="inline-page-menu my-4">
        <ul className="list-unstyled flex gap-3">
          <li className={activeSection === "otpSetting" ? "active" : ""}>
            <button onClick={() => handleSectionClick("otpSetting")}>
            OTP & Login Attempts
            </button>
          </li>
          <li className={activeSection === "loginUrl" ? "active" : ""}>
            <button onClick={() => handleSectionClick("loginUrl")}>
            Login Url
            </button>
          </li>
    
          {/* Add more buttons for additional sections as needed */}
        </ul>
      </div>

      {/* Conditional rendering of section content */}
      <div className="card">
        {activeSection === "otpSetting" && <OtpLoginSettings />}
        {activeSection === "loginUrl" && <AdminLoginPage />}
      
       
        {/* Add more conditional rendering for additional sections */}

      </div>
    </div>
  );
};

export default LoginSetups;
