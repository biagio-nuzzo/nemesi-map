import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Style from "./NavBar.module.css";
import Chip from "@mui/material/Chip";
import { TailSpin } from "react-loading-icons";

import axios from "axios";

const NavBar = (props) => {
  const getChartData = async (value, valuecolors) => {
    if (value.length > 0) {
      await axios
        .get(
          "http://nemesi-project.it/api/v1/cultivar-chart/?metabolites=" + value
        )
        .then((response) => {
          if (value.length === 1 && response.data.series.length === 0) {
            props.setChartDataMetabolitics(null);
            props.setIsLoading(false);
            return;
          }
          const state = {
            options: {
              colors: valuecolors,
              chart: {
                id: "basic-bar",
                type: "bar",
                height: 400,
                stacked: true,
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              xaxis: {
                categories: response.data.options.xaxis.categories,
              },
            },
            series: response.data.series,
          };
          props.setChartDataMetabolitics(state);
          props.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          props.setIsLoading(false);
        });
    } else {
      if (props.chartDataMetabolitics !== null) {
        props.setChartDataMetabolitics(null);
        props.setIsLoading(false);
      }
    }
  };

  const getTreeData = async (value, valuecolors) => {
    if (value.length > 0) {
      await axios
        .get("http://nemesi-project.it/api/v1/tree-chart/?metabolites=" + value)
        .then((response) => {
          if (value.length === 1 && response.data.series.length === 0) {
            props.setChartDataTree(null);
            props.setIsLoading(false);
            return;
          }
          const state = {
            options: {
              colors: valuecolors,
              chart: {
                id: "basic-bar",
                type: "bar",
                height: 400,
                stacked: true,
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              xaxis: {
                categories: response.data.options.xaxis.categories,
              },
            },
            series: response.data.series,
          };
          props.setChartDataTree(state);
          props.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          props.setIsLoading(false);
        });
    } else {
      if (props.chartDataTree !== null) {
        props.setChartDataTree(null);
        props.setIsLoading(false);
      }
    }
  };

  const getTableData = async (value) => {
    if (value.length > 0) {
      await axios
        .get("http://nemesi-project.it/api/v1/table-data/?metabolites=" + value)
        .then((response) => {
          if (value.length === 1 && response.data.length === 0) {
            props.setTableData(null);
            props.setIsLoading(false);
          }
          props.setTableData(response.data);
          props.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          props.setIsLoading(false);
        });
    } else {
      if (props.tableData !== null) {
        props.setTableData(null);
        props.setIsLoading(false);
      }
    }
  };

  const getMonthData = async (value) => {
    if (value.length > 0) {
      await axios
        .get("http://nemesi-project.it/api/v1/monthly-data/?metabolites=" + value)
        .then((response) => {
          if (value.length === 1 && response.data.length === 0) {
            props.setMonthData(null);
            props.setIsLoading(false);
          }
          props.setMonthData(response.data);
          props.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          props.setIsLoading(false);
        });
    } else {
      if (props.monthData !== null) {
        props.setMonthData(null);
        props.setIsLoading(false);
      }
    }
  };

  const mapTypeDict = {
    presence: {
      label: "Presenza di metaboliti",
      value: "presence",
    },
    concentration: {
      label: "Concentrazione di metaboliti",
      value: "concentration",
    },
  };

  const colorPool = [
    {
      color: "#a6cee3",
      state: "free",
    },
    {
      color: "#1f78b4",
      state: "free",
    },
    {
      color: "#b2df8a",
      state: "free",
    },
    {
      color: "#33a02c",
      state: "free",
    },
    {
      color: "#ff7f00",
      state: "free",
    },
    {
      color: "#cab2d6",
      state: "free",
    },
    {
      color: "#6a3d9a",
      state: "free",
    },
    {
      color: "#ffff99",
      state: "free",
    },
    {
      color: "#b15928",
      state: "free",
    },
    {
      color: "#fb9a99",
      state: "free",
    },
    {
      color: "#e31a1c",
      state: "free",
    },
    {
      color: "#fdbf6f",
      state: "free",
    },
  ];

  const concentrationColorPool = [
    "#D6181B", //red
    "#FDAE61", //yellow
    "#A6D96A", //green
  ];

  function colorhandler(metabolit) {
    if (props.mapType === "presence") {
      const tmpcolor = [];
      if (metabolit.length < 1) {
        props.setMetacolor([]);
      }
      for (let i = 0; i < metabolit.length; i++) {
        metabolit[i].color = null;
        for (let j = 0; j < colorPool.length; j++) {
          if (colorPool[j].state === "free" && metabolit[i].color === null) {
            colorPool[j].state = "used";
            metabolit[i].color = colorPool[j].color;
            tmpcolor.push(metabolit[i]);
          }
        }
      }
      props.setMetacolor(tmpcolor);
    } else {
      if (metabolit.length < 1) {
        props.setMetacolor([]);
      }
      for (let i = 0; i < metabolit.length; i++) {
        if (metabolit[i].mz === null || metabolit[i].mz < 70) {
          metabolit[i].color = concentrationColorPool[2];
        }
        if (metabolit[i].mz >= 70 && metabolit[i].mz < 130) {
          metabolit[i].color = concentrationColorPool[1];
        }
        if (metabolit[i].mz >= 130) {
          metabolit[i].color = concentrationColorPool[0];
        }
      }
      props.setMetacolor(metabolit);
    }
  }

  const [metabolitList, setMetabolitList] = useState([]);

  useEffect(() => {
    const getMetabolits = async () => {
      await axios
        .get("http://nemesi-project.it/api/v1/metabolits/?format=json")
        .then((response) => {
          setMetabolitList(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    getMetabolits();
  }, []);

  const [tagColorList, setTagColorList] = useState([]);

  return (
    <React.Fragment>
      {/* Top Nav Bar */}
      <div className={Style.topNavBar}>
        <div className={Style.goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> TORNA AL PROGETTO</span>
        </div>
        <div className={Style.headerMenu}>AMMINISTRAZIONE</div>
      </div>

      {/* Menu Bar */}
      <div className={Style.topBarContainer}>
        <Row>
          <Col sm={3} className={Style.menuBarController}>
            <div className={Style.menuBarContainer}>
              <div className={Style.menuLabel}>Mappe</div>
              <FormControl
                className={Style.formMapType}
                variant="standard"
                sx={{ m: 2, marginLeft: "0px" }}
              >
                <Select
                  style={{ fontSize: "19px" }}
                  labelId="map-type-select-label"
                  id="map-type-select-input"
                  value={props.mapType}
                  label="asdasd"
                  onChange={(e) => {
                    props.setMapType(e.target.value);
                    setTagColorList([]);
                    props.setChartDataMetabolitics(null);
                    props.setChartDataTree(null);
                    props.setTableData(null);
                    props.setMonthData(null);
                  }}
                >
                  <MenuItem value={mapTypeDict.presence.value}>
                    {mapTypeDict.presence.label}
                  </MenuItem>
                  <MenuItem value={mapTypeDict.concentration.value}>
                    {mapTypeDict.concentration.label}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Col>

          <Col sm={5} className={Style.menuBarController}>
            <div className={Style.menuBarContainer}>
              <div className={Style.menuLabel}>Metaboliti</div>
              <Stack
                spacing={3}
                sx={{ width: "100%", marginLeft: "0px" }}
                id="tag-controller"
              >
                {metabolitList && (
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={metabolitList}
                    value={tagColorList}
                    getOptionDisabled={(option) => tagColorList.length >= 12}
                    loading={metabolitList < 1}
                    loadingText=<div
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
                    onChange={(event, newValue) => {
                      colorhandler(newValue);
                      props.setIsLoading(true);
                      setTagColorList(newValue);
                      const metaList = [];
                      const metacolorList = [];
                      for (let i = 0; i < newValue.length; i++) {
                        metaList.push(newValue[i].id).toString();
                        metacolorList.push(newValue[i].color).toString();
                      }
                      getChartData(metaList, metacolorList);
                      getTreeData(metaList, metacolorList);
                      getTableData(metaList);
                      getMonthData(metaList);
                    }}
                    getOptionLabel={(option) => {
                      return "Metabolita " + option.cod_met;
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.cod_met === value.cod_met;
                    }}
                    renderTags={(value) => {
                      return value.map((option, index) => (
                        <Chip
                          key={index}
                          className={Style.tagStyle}
                          style={{
                            backgroundColor: option.color,
                            marginLeft: "6px",
                          }}
                          value={option}
                          label={"Metabolita " + option.cod_met}
                          variant="outlined"
                          size="small"
                          onDelete={() => {
                            props.setIsLoading(true);
                            const metaList = tagColorList.filter(
                              (item) => item.cod_met !== option.cod_met
                            );
                            setTagColorList(metaList);
                            const metaList2 = [];
                            const metacolorList = [];
                            for (let i = 0; i < metaList.length; i++) {
                              metaList2.push(metaList[i].id).toString();
                              metacolorList.push(metaList[i].color).toString();
                            }
                            getChartData(metaList2, metacolorList);
                            getTreeData(metaList2, metacolorList);
                            getTableData(metaList2);
                            getMonthData(metaList2);
                            props.setMetacolor(metaList);
                          }}
                        />
                      ));
                    }}
                    renderInput={(params) => {
                      return (
                        <React.Fragment>
                          <TextField
                            style={{ marginTop: "20px" }}
                            {...params}
                            variant="standard"
                            placeholder="Seleziona Metabolita"
                          />
                        </React.Fragment>
                      );
                    }}
                  />
                )}
              </Stack>
            </div>
          </Col>
          <Col sm={4} className={Style.logoContainer} style={{ width: "33%" }}>
            <img
              alt="logo"
              className={Style.logoImage}
              src="http://nemesi-project.it/img/logo-nemesi.png"
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
