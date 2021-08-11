import React from "react";
import Chart from "chart.js";
import { PrintOrderContext } from "../context/PrintOrderContext";

export default function CardLineChart() {
  const { printOrders } = React.useContext(PrintOrderContext);
  React.useEffect(() => {
    const marchData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 2;
    });
    const aprilData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 3;
    });
    const mayData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 4;
    });
    const juneData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 5;
    });
    const julyData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 6;
    });
    const augustData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 7;
    });
    const septemberData = printOrders.filter((order) => {
      let orderMonth = new Date(order.created_at);
      return orderMonth.getMonth() === 8;
    });
    let dataArry = [
      marchData.length,
      aprilData.length,
      mayData.length,
      juneData.length,
      julyData.length,
      augustData.length,
      septemberData.length,
    ];
    var config = {
      type: "line",
      data: {
        labels: [
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: dataArry,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [printOrders]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">
                Order History
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
