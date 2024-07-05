import React, { useEffect, useState } from "react";
import { getProductBySearch, getdasboardReportdata } from "../../server/app";
import CountUp from "react-countup";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCartX, BsClipboard2Data } from "react-icons/bs";
import { TiWarningOutline } from "react-icons/ti";

export const Dashboard = () => {
  const [allItem, setallItem] = useState([]);
  const [total, settotal] = useState(0);
  const [todayrep, settodayrep] = useState();
  const [outofstock, setoutofstock] = useState(0);
  const [reqstock, setreqstock] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const username = localStorage.getItem("username");

  useEffect(() => {
    getProductBySearch(`product/getProductBySearch`, setallItem, settotal);
    getdasboardReportdata("reports/", settodayrep);
  }, []);

  useEffect(() => {
    if (allItem.length) {
      const outOfStockCount = allItem.filter(
        (item) => item.quantity === 0
      ).length;
      setoutofstock(outOfStockCount);
    }

    if (allItem.length) {
      const reqStockCount = allItem.filter(
        (item) => item.quantity > 0 && item.quantity < 10
      ).length;
      setreqstock(reqStockCount);
    }

    let totalamt = 0;
    allItem.forEach((item) => {
      totalamt += item.quantity * item.netRate;
    });
    setTotalAmount(totalamt);
  }, [allItem]);

  return (
    <div className=" w-full h-full p-5">
      <div className=" w-full flex justify-between space-x-5">
        {username === "sithikali1977@gmail.com" || username === "siraj1977@gmail.com"  ? (
          <div className=" w-[240px] flex justify-between items-center bg-white rounded-lg shadow-lg p-4">
            <div>
              <Typography variant="h6" color="blue-gray">
                Total Net Wroth
              </Typography>
              <CountUp
                end={totalAmount}
                duration={2}
                separator=","
                className="text-[28px] font-bold"
              />
            </div>
            <div className=" text-[35px]">
              <h1 className=" text-[#ffa528]">
                <FaBalanceScaleLeft />
              </h1>
            </div>
          </div>
        ):("")}

        <div
          className={`${
            username === "sithikali1977@gmail.com" || username === "siraj1977@gmail.com" ? "w-[240px]" : "w-[300px]"
          } flex justify-between items-center bg-white rounded-lg shadow-lg p-4`}
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Products
            </Typography>
            <CountUp
              end={total}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#3b4ac2]">
              <AiOutlineProduct />
            </h1>
          </div>
        </div>

        <div
          className={`${
            username === "sithikali1977@gmail.com" || username === "siraj1977@gmail.com" ? "w-[240px]" : "w-[300px]"
          } flex justify-between items-center bg-white rounded-lg shadow-lg p-4`}
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Today Reports
            </Typography>
            <CountUp
              end={todayrep}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#2a8952]">
              <BsClipboard2Data />
            </h1>
          </div>
        </div>

        <div
          className={`${
            username === "sithikali1977@gmail.com" || username === "siraj1977@gmail.com" ? "w-[240px]" : "w-[300px]"
          } flex justify-between items-center bg-white rounded-lg shadow-lg p-4`}
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Required Stock
            </Typography>
            <CountUp
              end={reqstock}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#ffa528]">
              <TiWarningOutline />
            </h1>
          </div>
        </div>

        <div
          className={`${
            username === "sithikali1977@gmail.com" || username === "siraj1977@gmail.com" ? "w-[240px]" : "w-[300px]"
          } flex justify-between items-center bg-white rounded-lg shadow-lg p-4`}
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Out of Stock
            </Typography>
            <CountUp
              end={outofstock}
              duration={2}
              separator=","
              className="text-[28px] font-bold"
            />
          </div>
          <div className=" text-[40px]">
            <h1 className=" font-semibold text-[#ff2727]">
              <BsCartX />
            </h1>
          </div>
        </div>
      </div>

      <div className=" w-full flex mt-10 space-x-10">
        <div className="w-1/2 h-[450px] bg-white rounded-md p-4 overflow-y-auto ">
          <h1 className="font-medium pb-2">Out of Stocks</h1>
          <div className=" w-full flex justify-between items-center mb-4">
            <p className=" w-1/2 font-bold">Name</p>
            <p className="w-1/2 font-bold text-center">Mrp</p>
          </div>
          <div className="space-y-2">
            {allItem.length > 0 && (
              <div>
                {allItem.filter((item) => item.quantity === 0).length > 0 ? (
                  allItem.map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-md">
                      {item.quantity === 0 && (
                        <div className="w-full flex justify-between items-center border-b pb-2 mt-2">
                          <p className="w-1/2">{item.productName}</p>
                          <p className="w-1/2 font-medium text-[#2a8952] text-center">
                            {item.mrp}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="w-full h-full flex justify-center items-center font-semibold text-[#ff2727] mt-32">
                    No out of Stocks.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-1/2 h-[450px] bg-white rounded-md p-4 overflow-y-auto ">
          <h1 className="font-medium pb-2">Required Stocks</h1>
          <div className=" w-full flex justify-between items-center mb-4">
            <p className=" w-1/2 font-bold">Name</p>
            <p className=" w-1/4 font-bold text-center">Quantity</p>
            <p className=" w-1/4 font-bold">Mrp</p>
          </div>
          {allItem.length > 0 && (
            <div className="space-y-2">
              {allItem.filter((item) => item.quantity > 0 && item.quantity < 10)
                .length > 0 ? (
                allItem.map((item, index) => (
                  <div key={index} className="bg-gray-100 rounded-md">
                    {item.quantity > 0 && item.quantity < 10 && (
                      <div className="w-full flex justify-between items-center border-b pb-2">
                        <p className="w-1/2">{item.productName}</p>
                        <p className="w-1/4 text-[#ff2727] font-medium text-center">
                          {item.quantity}
                        </p>
                        <p className="w-1/4">{item.mrp}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="w-full h-full flex justify-center items-center font-semibold text-[#ff2727] mt-32">
                  There is no required stocks.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
