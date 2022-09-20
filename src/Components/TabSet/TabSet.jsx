import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Style from "./TabSet.module.css";
import ReactApexChart from "react-apexcharts";
import Chip from "@mui/material/Chip";

import { TailSpin } from "react-loading-icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          TabIndicatorProps={{ style: { background: "black", color: "black" } }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab style={{ width: "25%" }} label="MAPPA" {...a11yProps(0)} />
          <Tab style={{ width: "25%" }} label="CULTIVAR" {...a11yProps(1)} />
          <Tab style={{ width: "25%" }} label="ALBERI" {...a11yProps(2)} />
          <Tab style={{ width: "25%" }} label="ALBERO" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{ padding: "20px" }}>
        <div className={Style.mapDescriptionContainer}>
          {props.mapType === "presence" ? (
            <React.Fragment>
              <span style={{ color: "black", fontWeight: 400 }}>
                La mappa della presenza metabolitica
              </span>
              <br />
              <p style={{ color: "grey" }}>
                mostra le presenza sul territorio regionale dei metaboliti
                rilevati sugli alberi analizzati tramite processi metabolomici
                targeted/untargeted
              </p>
              <p style={{ color: "grey", marginTop: "25px" }}>
                I dati riportati nella seguente mappa fanno riferimento
                all'ultimo periodo disponibile rilevato
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span style={{ color: "black", fontWeight: 400 }}>
                La mappa della concentrazione
              </span>
              <br />
              <p style={{ color: "grey" }}>lorem</p>
              <p style={{ color: "grey", marginTop: "25px" }}>lorem</p>
            </React.Fragment>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.chartDataMetabolitics !== null ? (
          <ReactApexChart
            height="750px"
            options={props.chartDataMetabolitics.options}
            series={props.chartDataMetabolitics.series}
            type="bar"
          />
        ) : props.isLoadingCultivar ? (
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
            style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
          >
            Seleziona un metabolita valido per visualizzare il grafico
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.chartDataTree !== null ? (
          <ReactApexChart
            height="750px"
            options={props.chartDataTree.options}
            series={props.chartDataTree.series}
            type="bar"
          />
        ) : props.isLoadingCultivar ? (
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
            style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
          >
            Seleziona un metabolita valido per visualizzare il grafico
          </div>
        )}
      </TabPanel>
      <TabPanel className={Style.treeDescContainer} value={value} index={3}>
        {props.treeSelected ? (
          <React.Fragment>
            <div className={Style.treeDescContent}>
              <p style={{ fontSize: "22px", fontWeight: 500 }}>
                {"AV " + props.treeSelected.id}
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                {"Cultivar: " + props.treeSelected.cultivar.specie}
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                {"Età: " + props.treeSelected.age}
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                {"Diametro: " + props.treeSelected.diameter}
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                {"Fase fenologica: " + props.treeSelected.phase}
              </p>
            </div>
            <hr />
            <div className={Style.treeDescContent}>
              <p style={{ fontSize: "22px", fontWeight: 500 }}>
                Presenza Metaboliti
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                {props.treeSelected.metabolites.length > 0
                  ? props.treeSelected.metabolites.map((metabolit) => {
                      let tmpcolor = "f5f5f5";
                      if (props.metacolor.length > 0) {
                        for (let i = 0; i < props.metacolor.length; i++) {
                          if (
                            metabolit.metabolit__cod_met ===
                            props.metacolor[i].cod_met
                          ) {
                            tmpcolor = props.metacolor[i].color;
                          }
                        }
                      }
                      return (
                        <React.Fragment>
                          <Chip
                            key={metabolit.metabolit__cod_met}
                            className={Style.tagStyle}
                            value={metabolit}
                            style={{
                              marginLeft: "6px",
                              backgroundColor: tmpcolor,
                            }}
                            variant="outlined"
                            size="small"
                            label={metabolit.metabolit__cod_met}
                          />
                        </React.Fragment>
                      );
                    })
                  : "Nessun metabolita rilevato"}

                <br />
                <p style={{ fontSize: "18px", fontWeight: 300 }}>
                  Ultima rilevazione:{" "}
                  {props.treeSelected.metabolites.length > 0 ? (
                    <React.Fragment>
                      {props.treeSelected.metabolites[0].sample_date}
                    </React.Fragment>
                  ) : (
                    "Nessuna rilevazione"
                  )}
                </p>
              </p>
            </div>
            <hr />
            <div className={Style.treeDescContent}>
              <p style={{ fontSize: "22px", fontWeight: 500 }}>
                Stato di salute
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                {props.treeSelected.health_status}
              </p>
              <ul>
                {props.treeSelected.diseases &&
                  props.treeSelected.diseases.map((disease) => {
                    return (
                      <li key={props.treeSelected.id}>{disease.common_name}</li>
                    );
                  })}
              </ul>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className={Style.mapDescriptionContainer}
              style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
            >
              Seleziona un albero sulla mappa per visualizzare le informazioni
            </div>
          </React.Fragment>
        )}
      </TabPanel>
    </Box>
  );
}
