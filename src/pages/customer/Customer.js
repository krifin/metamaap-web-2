import React from "react";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbardashboard from "./../../components/navbar/Navbardashboard";
import "./customer.scss";

const Customers = () => {
  return (
    <div className="customers">
      <Sidebar />
      <div className="customersContainer">
        {/* <Navbardashboard /> */}
        <Datatable />
      </div>
    </div>
  );
};

export default Customers;
