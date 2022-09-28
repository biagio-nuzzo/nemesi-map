import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Style from "./TreeChart.module.css";
import Button from "@mui/material/Button";

import axios from "axios";

import { TailSpin } from "react-loading-icons";

const TreeChart = (props) => {
  const state = {
    options: {},
    series: [],
  };

  const metabolitList = [];
  var metabolites = "";

  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    const getMonthData = async (value, state) => {
      if (value.length > 0) {
        props.setIsLoading(true);
        await axios
          .get(
            "http://nemesi-project.it/api/v1/monthly-data/?metabolites=" + value
          )
          .then((response) => {
            if (value.length === 1 && response.data.length === 0) {
              setMonthData(null);
              props.setIsLoading(false);
            }
            state = {
              options: {
                chart: {
                  type: "line",
                  height: 420,
                  zoom: {
                    enabled: false,
                  },
                },
                markers: {
                  size: 5,
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
                grid: {
                  row: {
                    colors: ["#f3f3f3", "transparent"],
                    opacity: 0.5,
                  },
                },
                yaxis: {
                  title: {
                    text: "Concentrazione metaboliti",
                  },
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100],
                  },
                },
                xaxis: {
                  categories: response.data.options.xaxis.categories,
                },
              },
              series: response.data.series,
            };
            setMonthData(state);
            props.setIsLoading(false);
          })
          .catch((error) => {
            console.log(error.response);
          })
          .finally(() => {
            props.setIsLoading(false);
          });
      } else {
        if (monthData !== null) {
          setMonthData(null);
          props.setIsLoading(false);
        }
      }
    };

    if (props.monthDataMetabolites !== null) {
      if (props.monthDataMetabolites !== undefined) {
        props.monthDataMetabolites.map((metabolite) => {
          metabolitList.push(metabolite.metabolit__id);
        });
        metabolites = metabolitList.join(",");
        getMonthData(metabolites, state);
      }
    }
  }, [props.monthDataMetabolites]);

  if (props.elNumber === 2) {
    return (
      <React.Fragment>
        <div
          style={{
            paddingTop: "25px",
            paddingLeft: "10px",
            marginBottom: "25px",
            height: 400,
            width: "100%",
          }}
        >
          {monthData !== null ? (
            <ReactApexChart
              type="line"
              height="420"
              options={monthData.options ? monthData.options : {}}
              series={monthData.series ? monthData.series : []}
            />
          ) : props.isLoading ? (
            <div
              className={Style.loadingContainer}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <TailSpin stroke="#000" strokeOpacity={1} />
            </div>
          ) : (
            <div
              className={Style.mapDescriptionContainer}
              style={{
                width: "100%",
                paddingLeft: "5px",
                paddingRigth: "5px",
              }}
            >
              Seleziona un albero per visualizzare il grafico
            </div>
          )}
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
