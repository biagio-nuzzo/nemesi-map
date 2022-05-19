import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
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

function generateListofRandomNumbers(numberOfElements) {
  let list = [];
  for (let i = 0; i < numberOfElements; i++) {
      list.push(Math.floor(Math.random() * 100));
  }
  return list;
}

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

      series: [
          {
              name: "AV 1",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 2",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 3",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 4",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 5",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 6",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 7",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 8",
              data: generateListofRandomNumbers(9),
          },
          {
              name: "AV 9",
              data: generateListofRandomNumbers(9),
          },
      ],
  };

  return state;
}

const NavBar = (props) => {

  const mapTypeDict = {
    attendance: {
      label: "Presenza di metaboliti",
      value: "attendance",
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

  const [mapType, setMapType] = useState(mapTypeDict.attendance.value);
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
                  value={mapType}
                  label="asdasd"
                >
                  <MenuItem value={mapTypeDict.attendance.value}>
                    {mapTypeDict.attendance.label}
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
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={tmpDict}
                  value={tagColorList}
                  onChange={(event, newValue) => {
                    setTagColorList(newValue);
                    props.setChartDataMetabolitics(chartFakeDataGenerator())
                  }}
                  getOptionLabel={(option) => {
                    return option.title;
                  }}
                  isOptionEqualToValue={(option, value) => {
                    return option.key === value.key;
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
                        label={option.title}
                        variant="outlined"
                        size="small"
                        onDelete={() => {
                          setTagColorList(
                            value.filter((item) => item.key !== option.key)
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
              </Stack>
            </div>
          </Col>
          <Col sm={4} className={Style.logoContainer}>
            <img
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
