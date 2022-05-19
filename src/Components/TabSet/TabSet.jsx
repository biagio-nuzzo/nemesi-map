import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Style from "./TabSet.module.css";
import ReactApexChart from "react-apexcharts";

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
          <span style={{ color: "black", fontWeight: 400 }}>
            La mappa della presenza metabolitica
          </span>
          <br />
          <p style={{ color: "grey" }}>
            mostra le presenza sul territorio regionale dei metaboliti rilevati
            sugli alberi analizzati tramite processi metabolomici
            targeted/untargeted
          </p>
          <p style={{ color: "grey", marginTop: "25px" }}>
            I dati riportati nella seguente mappa fanno riferimento all'ultimo
            periodo disponibile rilevato
          </p>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.chartDataMetabolitics.series.length > 0 ? (
          <ReactApexChart
            height="800px"
            options={props.chartDataMetabolitics.options}
            series={props.chartDataMetabolitics.series}
            type="bar"
          />
        ) :
        <div
              className={Style.mapDescriptionContainer}
              style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
            >
              Seleziona almeno un metabolita per visualizzare il grafico
            </div>}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReactApexChart
          height="800px"
          options={props.chartDataMetabolitics.options}
          series={props.chartDataMetabolitics.series}
          type="bar"
        />
      </TabPanel>
      <TabPanel className={Style.treeDescContainer} value={value} index={3}>
        {props.treeSelected ? (
          <React.Fragment>
            <div className={Style.treeDescContent}>
              <p style={{ fontSize: "22px", fontWeight: 500 }}>
                {"AV " + props.treeSelected.id}
              </p>
              <p style={{ fontSize: "18px", fontWeight: 300 }}>
                Cultivar: fieldname
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
              <span className={Style.metabolTag}>---</span>
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
