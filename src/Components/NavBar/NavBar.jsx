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

function generateListofRandomNumbers(numberOfElements) {
  let list = [];
  for (let i = 0; i < numberOfElements; i++) {
    list.push(Math.floor(Math.random() * 100));
  }
  return list;
}

function chartFakeDataGenerator(numElements) {
  const seriesList = [];

  for (let i = 0; i < numElements; i++) {
    seriesList.push({
      name: "Metabolita " + (i + 1),
      data: generateListofRandomNumbers(10),
    });
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
        categories: [
          "AV 1",
          "AV 2",
          "AV 3",
          "AV 4",
          "AV 5",
          "AV 6",
          "AV 7",
          "AV 8",
          "AV 9",
        ],
      },
    },
    series: seriesList,
  };
  return state;
}


const NavBar = (props) => {
  
  
  const getChartData = async (value) => {
            
    props.setChartDataMetabolitics(null);
    
      await axios
      .get("http://nemesi-project.it/api/v1/cultivar-chart/?metabolites=" + value)
      .then((response) => {

          props.setChartDataMetabolitics(response.data);
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
                    props.setChartDataMetabolitics([]);
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
                    getOptionDisabled={(option) =>
                      tagColorList.length >= 12
                    }
                    onChange={(event, newValue) => {
                      var metaList = [];
                      for (let i = 0; i < newValue.length; i++) {
                        metaList.push(newValue[i].id);
                        console.log(metaList.toString());
                        props.setChartDataMetabolitics(
                          getChartData(metaList.toString())
                        );
                      }
                      setTagColorList(newValue);
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
                            setTagColorList(
                              value.filter((item) => item.cod_met !== option.cod_met)
                            );
                            props.setChartDataMetabolitics(
                              getChartData(
                                value.filter((item) => item.cod_met !== option.cod_met)
                              )
                            );
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
