import React from "react";
import ReactApexChart from "react-apexcharts";
import Style from "./TreeChart.module.css";

const TreeChart = (props) => {
  const options = {
    xaxis: {
      categories: [
        "GEN",
        "FEB",
        "MAR",
        "APR",
        "MAG",
        "GIU",
        "LUG",
        "AGO",
        "SET",
        "OTT",
        "NOV",
        "DIC",
      ],
    },
  };
  const series = [];
  //da definire la chiamata api per ottenere i dati
  if (props.tableData !== null) {
    props.tableData.forEach((element) => {
      const series = [
        {
          name: element.cod_met,
          data: [element.mz],
        },
      ];
    });
  }
  

  return (
    <div
      style={{
        paddingLeft: "10px",
        marginBottom: "25px",
        height: 400,
        width: "100%",
      }}
    >
      {props.tableData !== null ? (
        props.tableData !== undefined ? (
          <ReactApexChart
            type="line"
            stacked="false"
            options={options}
            series={series}
          />
        ) : (
          <div
            className={Style.mapDescriptionContainer}
            style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
          >
            Seleziona un metabolita valido per visualizzare il grafico
          </div>
        )
      ) : (
        <div
          className={Style.mapDescriptionContainer}
          style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
        >
          Seleziona un metabolita valido per visualizzare il grafico
        </div>
      )}
    </div>
  );
};

export default TreeChart;
