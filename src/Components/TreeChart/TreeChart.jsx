import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Style from "./TreeChart.module.css";
import Button from "@mui/material/Button";

import axios from "axios";

const TreeChart = (props) => {
  const [monthData, setMonthData] = useState(null);
  const [monthDataComparison, setMonthDataComparison] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedYearComparison, setSelectedYearComparison] = useState(null);
  const [yearsList, setYearsList] = useState([]);
  const [yearsListComparison, setYearsListComparison] = useState([]);

  const getMonthData = async (id, selectedYear) => {
    await axios
      .get(
        "http://nemesi-project.it/api/v1/monthly-data/?tree=" +
          id +
          "&year=" +
          selectedYear
      )
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
            },
            markers: {
              size: 5,
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 2,
              curve: "straight"
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
            xaixs: {},
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

  const getMonthDataComparison = async (id, selectedYear) => {
    await axios
      .get(
        "http://nemesi-project.it/api/v1/monthly-data/?tree=" +
          id +
          "&year=" +
          selectedYear
      )
      .then((response) => {
        if (response.data.length === 0) {
          setMonthDataComparison(null);
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
            xaixs: {},
          },
          series: response.data.series,
        };
        setMonthDataComparison(state);
        props.setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        props.setIsLoading(false);
      });
  };

  useEffect(() => {
    const getYears = async (id) => {
      await axios
        .get("http://nemesi-project.it/api/v1/tree-analysis-year/" + id + "/")
        .then((response) => {
          setYearsList(response.data.years);
          setYearsListComparison(response.data.years);
          setSelectedYear(response.data.years[response.data.years.length - 1]);
          if (response.data.years.length > 1) {
            setSelectedYearComparison(
              response.data.years[response.data.years.length - 2]
            );
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    if (props.treeSelected && props.treeSelected !== undefined) {
      getYears(props.treeSelected.id);
    }
  }, [props.treeSelected]);

  useEffect(() => {
    if (yearsList.length > 0) {
      if (props.treeSelected && props.treeSelected !== undefined) {
        getMonthData(props.treeSelected.id, selectedYear);
        if (yearsList.length > 1) {
          getMonthDataComparison(props.treeSelected.id, selectedYearComparison);
        }
      }
    }
  }, [yearsList]);

  if (props.elNumber === 2) {
    return (
      <React.Fragment>
        <div className={Style.menuYearsContainer}>
          <h3>Selezione anno per modificare il grafico</h3>
          <div className={Style.buttonsContainer}>
            {yearsList.map((year, index) => {
              return (
                <div
                  key={index}
                  className={Style.yearButton}
                  style={{
                    opacity: year === selectedYearComparison ? 0.5 : 1,
                    cursor:
                      year === selectedYearComparison
                        ? "not-allowed"
                        : "pointer",
                  }}
                  onClick={() => {
                    if (year !== selectedYearComparison) {
                      setMonthData(null);
                      setSelectedYear(year);
                      getMonthData(props.treeSelected.id, year);
                    }
                  }}
                >
                  {year}
                </div>
              );
            })}
          </div>
          <p style={{ marginLeft: "10px", marginTop: "10px" }}>
            Anno selezionato: {selectedYear}
          </p>
        </div>
        <div
          id="chart"
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
        <hr style={{ marginTop: "80px" }} />

        {props.treeSelected ? (
          yearsList.length > 1 ? (
            <>
              <div
                className={Style.menuYearsContainer}
                style={{ marginTop: "40px" }}
              >
                <h3>Selezione anno per creare il grafico di comparazione</h3>
                <div className={Style.buttonsContainer}>
                  {yearsListComparison.map((year, index) => {
                    return (
                      <div
                        key={index}
                        className={Style.yearButton}
                        style={{
                          opacity: year === selectedYear ? 0.5 : 1,
                          cursor:
                            year === selectedYear ? "not-allowed" : "pointer",
                        }}
                        onClick={() => {
                          if (year !== selectedYear) {
                            setMonthDataComparison(null);
                            setSelectedYearComparison(year);
                            getMonthDataComparison(props.treeSelected.id, year);
                          }
                        }}
                      >
                        {year}
                      </div>
                    );
                  })}
                </div>
                <p style={{ marginLeft: "10px", marginTop: "10px" }}>
                  Anno selezionato: {selectedYearComparison}
                </p>
              </div>
              <div
                id="chart"
                style={{
                  paddingTop: "25px",
                  paddingLeft: "10px",
                  marginBottom: "25px",
                  height: 400,
                  width: "100%",
                }}
              >
                {monthDataComparison && monthDataComparison !== undefined ? (
                  <ReactApexChart
                    type="line"
                    height={420}
                    options={
                      monthDataComparison.options
                        ? monthDataComparison.options
                        : {}
                    }
                    series={
                      monthDataComparison.series
                        ? monthDataComparison.series
                        : []
                    }
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
            </>
          ) : (
            <div
              className={Style.mapDescriptionContainer}
              style={{
                width: "100%",
                paddingLeft: "5px",
                paddingRigth: "5px",
              }}
            >
              Questo albero non ha altri anni di analisi. La comparazione non
              può essere effettuata.
            </div>
          )
        ) : (
          ""
        )}

        <Button
          variant="outlined"
          color="primary"
          style={{
            marginTop: "30px",
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
