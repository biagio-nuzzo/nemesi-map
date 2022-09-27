import React from "react";
import ReactApexChart from "react-apexcharts";
import Style from "./TreeChart.module.css";
import Button from "@mui/material/Button";

const TreeChart = (props) => {

  function colorhandler(color) {
    for (let i = 0; i < props.metacolor.length; i++) {
      if (color.id === props.metacolor[i].cod_met) {
        return props.metacolor[i].color;
      }
    }
  }

  const series = [];
  var options = {};

  if (props.monthData && props.monthData !== undefined) {
    options = {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: "Concentrazione metaboliti",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },  
      xaxis: {
        categories: props.monthData.options.xaxis.categories,
      }
    }
    props.monthData.series.forEach((element) => {
      series.push({
        name: element.name,
        data: element.data,
      });
    });
  }

  if (props.elNumber === 2) {
    return (
      <React.Fragment>
        <div
          style={{
            marginTop: "25px",
            paddingLeft: "10px",
            marginBottom: "25px",
            height: 400,
            width: "100%",
          }}
        >
          {props.monthData &&
            props.monthData !== undefined ? (
              <ReactApexChart
                type="line"
                stacked="false"
                width="100%"
                height="420"
                options={options}
                series={series}
              />
            ) : (
              <div
                className={Style.mapDescriptionContainer}
                style={{
                  width: "100%",
                  paddingLeft: "5px",
                  paddingRigth: "5px",
                }}
              >
                Seleziona un metabolita valido per visualizzare il grafico
              </div>
            )
          }
        </div>
        <Button
          variant="outlined"
          color="primary"
          style={{
            marginLeft: "25px",
            marginBottom: "25px",
            height: "40px",
            width: "250px",
          }}
          onClick={() => {
            props.setElNumber(1);
          }}
        >
          Visualizza la tabella
        </Button>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default TreeChart;
