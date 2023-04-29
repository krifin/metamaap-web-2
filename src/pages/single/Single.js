import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbardashboard from "../../components/navbar/Navbardashboard";
import Chart from "../../components/chart/Chart";
import List from "../../components/list/List";
import "./single.scss";
import { Link } from "react-router-dom";

const Single = () => {
  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbardashboard /> */}
        <div className="top">
          <div className="left">
            <h1 className="title">Company Details</h1>
            <Link to="/users/userId/new" style={{ textDecoration: "none" }}>
          <span className="editButton">Edit</span>
        </Link>
            {/* <span className="editButton">Edit</span> */}

            <div className="item">
              <div >
              <img src="/img1.jpg" alt="" className="itemImg" />
              <h4>Banner Image</h4>
              </div>
              <div >
              <img src="/metaverse_world.png" alt="" className="itemImg" />
              <h4>Portfolio Image</h4>
              </div>
              <div className="details">
                <h1 className="itemTitle">CryptoVoxels</h1>
                <div className="detailItem">
                  <span className="itemkey">Email: </span>
                  <span className="itemValue">cryptvoxels@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone: </span>
                  <span className="itemValue">+4 123-234-45</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Address: </span>
                  <span className="itemValue">Melwook Str. 24 Liverpool</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Country: </span>
                  <span className="itemValue">United Kingdom</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="Users Spending ( Last 6 Months )" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default Single;