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

function chartFakeDataGenerator() {
  const state = {
    options: {
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
        categories: [],
      },
    },
    series: [],
  };
  return state;
}

const NavBar = (props) => {
  const getChartData = async (value) => {
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

  const getTableData = async () => {
    // props.setTableDataMetabolitics(null);
    await axios
      .get("http://nemesi-project.it/api/v1/analysis-metabolit/?format=json")
      .then((response) => {
        console.log(response.data);
        if (response.data.results.length < response.data.count) {
          props.setTableDataMetabolitics(response.data.results);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
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

  const tmpDict = [
    {
      key: 1,
      title: "Metaboliti 1",
      label: "metaboliti 1",
      color: "#a6cee3",
    },
    {
      key: 2,
      title: "Metaboliti 2",
      label: "metaboliti 2",
      color: "#1f78b4",
    },
    {
      key: 3,
      title: "Metaboliti 3",
      label: "metaboliti 3",
      color: "#b2df8a",
    },
    {
      key: 4,
      title: "Metaboliti 4",
      label: "metaboliti 4",
      color: "#33a02c",
    },
    {
      key: 5,
      title: "Metaboliti 5",
      label: "metaboliti 5",
      color: "#ff7f00",
    },
    {
      key: 6,
      title: "Metaboliti 6",
      label: "metaboliti 6",
      color: "#cab2d6",
    },
    {
      key: 7,
      title: "Metaboliti 7",
      label: "metaboliti 7",
      color: "#6a3d9a",
    },
    {
      key: 8,
      title: "Metaboliti 8",
      label: "metaboliti 8",
      color: "#ffff99",
    },
    {
      key: 9,
      title: "Metaboliti 9",
      label: "metaboliti 9",
      color: "#b15928",
    },
  ];

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
                      props.setIsLoadingCultivar(true);
                      setTagColorList(newValue);
                      const tmpList = [];
                      for (let i = 0; i < newValue.length; i++) {
                        tmpList.push(newValue[i].id).toString();
                      }
                      getChartData(tmpList);
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
                            const tmpList = tagColorList.filter(
                              (item) => item.cod_met !== option.cod_met
                            );
                            setTagColorList(tmpList);
                            const tmpList2 = [];
                            for (let i = 0; i < tmpList.length; i++) {
                              tmpList2.push(tmpList[i].id).toString();
                            }
                            getChartData(tmpList2);
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
