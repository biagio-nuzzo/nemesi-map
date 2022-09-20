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
            props.setIsLoadingCultivar(false);
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
          props.setIsLoadingCultivar(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          props.setIsLoadingCultivar(false);
        });
    } else {
      if (props.chartDataMetabolitics !== null) {
        props.setChartDataMetabolitics(null);
        props.setIsLoadingCultivar(false);
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
            props.setIsLoadingCultivar(false);
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
          props.setIsLoadingCultivar(false);
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          props.setIsLoadingCultivar(false);
        });
    } else {
      if (props.chartDataTree !== null) {
        props.setChartDataTree(null);
        props.setIsLoadingCultivar(false);
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
      key: 0,
      color: "#a6cee3",
      state: "free",
    },
    {
      key: 1,
      color: "#1f78b4",
      state: "free",
    },
    {
      key: 2,
      color: "#b2df8a",
      state: "free",
    },
    {
      key: 3,
      color: "#33a02c",
      state: "free",
    },
    {
      key: 4,
      color: "#ff7f00",
      state: "free",
    },
    {
      key: 5,
      color: "#cab2d6",
      state: "free",
    },
    {
      key: 6,
      color: "#6a3d9a",
      state: "free",
    },
    {
      key: 7,
      color: "#ffff99",
      state: "free",
    },
    {
      key: 8,
      color: "#b15928",
      state: "free",
    },
    {
      key: 9,
      color: "#fb9a99",
      state: "free",
    },
    {
      key: 10,
      color: "#e31a1c",
      state: "free",
    },
    {
      key: 11,
      color: "#fdbf6f",
      state: "free",
    }
  ];

  function colorhandler(metabolit) {
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
  }

  const [metabolitList, setMetabolitList] = useState([]);

  useEffect(() => {
    const getMetabolits = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/metabolits/?format=json"
      );
      setMetabolitList(response.data);
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
                    props.setChartDataMetabolitics(null);
                    props.setChartDataTree(null);
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
                    onChange={(event, newValue) => {
                      colorhandler(newValue);
                      props.setIsLoadingCultivar(true);
                      setTagColorList(newValue);
                      const metaList = [];
                      const metacolorList = [];
                      for (let i = 0; i < newValue.length; i++) {
                        metaList.push(newValue[i].id).toString();
                        metacolorList.push(newValue[i].color).toString();
                      }
                      getChartData(metaList, metacolorList);
                      getTreeData(metaList, metacolorList);
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
                            props.setIsLoadingCultivar(true);
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
