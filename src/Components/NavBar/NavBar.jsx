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

function chartDataGenerator(metabolits, cultivardata) {

  var categoriesList = [];
  var seriesList = [];

  for (let a = 0; a < metabolits.length; a++){
    for (let i = 0; i < cultivardata.cultivars.length; i++){
      for (let j = 0; j < cultivardata.cultivars[i].metabolits.length; j++){
        if (metabolits[a].cod_met === cultivardata.cultivars[i].metabolits[j].metabolit){
          if (categoriesList.indexOf(cultivardata.cultivars[i].name) === -1){
            categoriesList.push(cultivardata.cultivars[i].name);
          }
          seriesList.push({
            name: cultivardata.cultivars[i].metabolits[j].metabolit,
            data: [cultivardata.cultivars[i].metabolits[j].value],
          });
        }
      }
    }
  }

  

    const state = {
    options: {
      chart: {
        id: "basic-bar",
        type: "bar",
        height: 800,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: categoriesList,
      },
    },
    series: seriesList,
  };
  return state;
}

function RandomColor(){
  const colorpool = ['#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928'
  ];
  return colorpool[Math.floor(Math.random() * colorpool.length)];
}

const NavBar = (props) => {
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


  const [metabolitList, setMetabolitList] = useState([]);

  const [cultivarData, setCultivarData] = useState([]);

  const [tagColorList, setTagColorList] = useState([]);
  
  useEffect(() => {
    const getMetabolits = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/metabolits/?format=json"
      );
      setMetabolitList(response.data);
    };

    const getCultivardata = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/cultivar-data/?format=json"
      );
      setCultivarData(response.data);
      // console.log(response.data.cultivars[0].metabolits);
    };

    const getTagColorList = async () => {
      const colorList = [];
      setTagColorList(colorList);
    };

    getMetabolits();
    getCultivardata();
    getTagColorList();

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
                { metabolitList && (
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={metabolitList}
                    value={tagColorList}
                    getOptionDisabled={(option) =>
                      tagColorList.length >= 12
                    }
                    onChange={(event, newValue) => {
                      setTagColorList(
                        newValue.map((item) => {
                          return {
                            ...item,
                            color: RandomColor(),
                          };
                        })
                      );
                      props.setChartDataMetabolitics(
                        chartDataGenerator(newValue, cultivarData),
                        []
                      );
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
                          onDelete={value.length > 0 ? () => {
                            const newTagColorList = [...tagColorList];
                            newTagColorList.splice(index, 1);
                            setTagColorList(newTagColorList);
                            props.setChartDataMetabolitics(
                              chartDataGenerator(
                                newTagColorList,
                                cultivarData
                                ),
                                console.log(newTagColorList)
                            );
                          } : null}
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
