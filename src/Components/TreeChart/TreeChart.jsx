import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Style from "./TreeChart.module.css";
import Button from "@mui/material/Button";

import axios from "axios";

const TreeChart = (props) => {

  const [monthData, setMonthData] = useState([]);

  useEffect(( ) => {
    const getMonthData = async (id) => {
      await axios
        .get("http://nemesi-project.it/api/v1/monthly-data/?tree=" + id)
        .then((response) => {
          if (response.data.length === 0) {
            setMonthData(null);
            props.setIsLoading(false);
          }
          const state = {
            options: {
              chart: {
                height: 420,
                type: "line",
                zoom: {
                  enabled: false,
                },
                animations: {
                  enabled: false
                }
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
              labels: [
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
              xaixs: {
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
      };

    if (props.treeSelected && props.treeSelected !== undefined){
      getMonthData(props.treeSelected.id);
    }
  }, [props.treeSelected]);

  if (props.elNumber === 2) {
    return (
      <React.Fragment>
        <div id="chart"
          style={{
            paddingTop: "25px",
            paddingLeft: "10px",
            marginBottom: "25px",
            height: 400,
            width: "100%",
          }}
        >
          {monthData && monthData !== undefined ? (
            <ReactApexChart
              type="line"
              height={420}
              options={monthData.options ? monthData.options : {}}
              series={monthData.series ? monthData.series : []}
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
