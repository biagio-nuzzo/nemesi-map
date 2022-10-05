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


  const concentrationColorPool = [
    "#D6181B", //red
    "#FDAE61", //yellow
    "#A6D96A", //green
  ];

  function colorhandler(metabolit) {
    const newMetabolit = [...metabolit];
    if (props.mapType === "presence") {
      if (newMetabolit.length < 1) {
        props.setMetacolor([]);
      }
      const tmpListColor = [...colorPool];
      for (let i = 0; i < newMetabolit.length; i++) {
        for (let j = 0; j < tmpListColor.length; j++) {
          if (tmpListColor[j].state === "free" && newMetabolit[i].color === null) {
            tmpListColor[j].state = "used";
            newMetabolit[i].color = tmpListColor[j].color;
          }
        }
      }
      setColorPool(tmpListColor);
      props.setMetacolor(newMetabolit);
    } else {
      if (newMetabolit.length < 1) {
        props.setMetacolor([]);
      }
      for (let i = 0; i < newMetabolit.length; i++) {
        if (newMetabolit[i].mz === null || newMetabolit[i].mz < 70) {
          newMetabolit[i].color = concentrationColorPool[2];
        }
        if (newMetabolit[i].mz >= 70 && newMetabolit[i].mz < 130) {
          newMetabolit[i].color = concentrationColorPool[1];
        }
        if (newMetabolit[i].mz >= 130) {
          newMetabolit[i].color = concentrationColorPool[0];
        }
      }
      props.setMetacolor(newMetabolit);
    }
  }

  const [metabolitList, setMetabolitList] = useState([]);
  const [tagColorList, setTagColorList] = useState([]);
  const [colorPool, setColorPool] = useState([
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
  ]);


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
                  }}
                  sx={{ fontFamily: "Titillium Web" }}
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
                    getOptionDisabled={(option) => tagColorList.length >= 13}
                    loading={metabolitList < 1}
                    // loadingText=<div
                    //   className={Style.loadingContainer}
                    //   style={{
                    //     width: "100%",
                    //     display: "flex",
                    //     justifyContent: "center",
                    //     alignItems: "center",
                    //     alignContent: "center",
                    //   }}
                    // >
                    //   <TailSpin stroke="#000" strokeOpacity={1} />
                    // </div>
                    onChange={(event, newValue) => {
                      if (newValue.length > 12) {
                        
                        //clean colorPool
                        const tmpColor = colorPool[0];
                        tmpColor.state = "free";
                        colorPool.shift();
                        colorPool.push(tmpColor);
                        newValue.shift();
                        //add new metabolita
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
                      } else {
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
                      }
                    }}
                    getOptionLabel={(option) => {
                      return "Metabolita " + option.cod_met;
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return option.cod_met === value.cod_met;
                    }}
                    renderTags={(value) => {
                      console.log(value)
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

                            // console.log(option);
                            // setMetabolitList((oldMetabolitList) => {
                            //   const newValue = [...oldMetabolitList];
                            //   newValue.find((element) => 
                            //     element.cod_met === option.cod_met
                            //   ).color = null;
                            //   return newValue;
                            // }
                            // )

                            
                            setColorPool((prevState) => {
                              const newState = [...prevState];
                              newState.find(
                                (color) => color.color === option.color
                                ).state = "free";
                              return newState;
                            });
                            props.setIsLoading(true);
                            

                            
                            
                            const metaList = tagColorList.filter(
                              (item) => item.cod_met !== option.cod_met
                            );

                            
                            colorhandler(metaList);
                            
                            
                            const metaList2 = [];
                            const metacolorList = [];
                            for (let i = 0; i < metaList.length; i++) {
                              metaList2.push(metaList[i].id).toString();
                              metacolorList.push(metaList[i].color).toString();
                            }
                            getChartData(metaList2, metacolorList);
                            getTreeData(metaList2, metacolorList);
                            getTableData(metaList2);

                            setTagColorList(metaList);
                            console.log(metaList);
                            props.setMetacolor(metaList2);
                            

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
