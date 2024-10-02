import React from "react";
import BussniesWallet from "./BussniesWallet";

import Adminwallet from "./AdminWallet/Adminwallet";
// import OrderStatic from "./AdminWallet/OrderStatic/OrderStatic";
import OrderStatistic from "./AdminWallet/OrderStatic/OrderStatistic/OrderStatistic";
import TopCustomersSection from "./AdminWallet/adminCard/TopCustomerCard";
import TopProductSection from "./ProductAdmin/ProductAdmin";

const WelcomePage = () => {
  return (
    <div className="grid  grid-cols-12 bg-[#F9F9FB]">
      <div className="col-span-12">
        <div className="bg-[#F9F9FB]  px-5 md:py-5 mt-5 w-[100%]">
          <h1 className="text-[1.3rem] font-bold">Welcome Admin</h1>
          <p className="text-[.9rem] text-gray-400">
            Monitor your business analytics and statistics.
          </p>
        </div>
        <BussniesWallet />
        <Adminwallet />
        <OrderStatistic />
        <TopCustomersSection />
        <TopProductSection />
      </div>
    </div>
  );
};

export default WelcomePage;
