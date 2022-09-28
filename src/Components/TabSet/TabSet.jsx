import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Style from "./TabSet.module.css";
import ReactApexChart from "react-apexcharts";
import Chip from "@mui/material/Chip";
import { WarningRounded, CheckRounded } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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
    if (newValue === 3) {
      props.setElNumber(1);
    } else {
      props.setElNumber(0);
    }
  };

  function getXfPresence(params) {
    if (params.value === true) {
      return (
        <React.Fragment>
          <WarningRounded style={{ color: "red", marginRight: 10 }} />
          Presente
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CheckRounded style={{ color: "green", marginRight: 10 }} />
          Assente
        </React.Fragment>
      );
    }
  }

  const columns = [
    {
      field: "xf_presence",
      headerName: "Saggio lab. Xf",
      width: 120,
      renderCell: (params) => getXfPresence(params),
    },
    { field: "serial_id", headerName: "Seriale del sensore", width: 140 },
    { field: "exp_id", headerName: "Numero busta", width: 120 },
    { field: "id_raf", headerName: "ID IRAF", width: 100 },
    { field: "observation_date", headerName: "Data rilievo", width: 100 },
    { field: "sample_date", headerName: "Data prelievo", width: 100 },
    { field: "method", headerName: "Metodo di analisi", width: 140 },
    { field: "symptom", headerName: "Sintomo", width: 130 },
    { field: "laboratory", headerName: "Laboratorio", width: 120 },
    { field: "lab_technician", headerName: "Tecnico laboratorio", width: 140 },
  ];

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
              <p style={{ color: "grey" }}>
                su territorio regionale dei metaboliti rilevati sugli alberi
                analizzati tramite processi metabolomici targeted/untargeted.
                Cliccare sui markers per aprire il riquadro con informazioni
                dettagliate.
              </p>
              <p style={{ color: "grey", marginTop: "25px" }}>
                I dati riportati nella seguente mappa fanno riferimento
                all'ultimo periodo disponibile rilevato.
              </p>
            </React.Fragment>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.mapType === "concentration" ? (
          <div
            className={Style.mapDescriptionContainer}
            style={{ width: "100%", paddingLeft: "5px", paddingRigth: "5px" }}
          >
            Selezionare la mappa della <strong>presenza di metaboliti</strong>{" "}
            per visualizzare il grafico
          </div>
        ) : props.chartDataMetabolitics !== null ? (
          <ReactApexChart
            height="750px"
            options={props.chartDataMetabolitics.options}
            series={props.chartDataMetabolitics.series}
            type="bar"
          />
        ) : props.isLoading ? (
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
        ) : props.isLoading ? (
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
      <TabPanel
        className={Style.treeDescContainer}
        value={value}
        index={3}
        // style={{ position: "absolute" }}
      >
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
                      var tmpcolor = "f5f5f5";
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
                <span style={{ fontSize: "18px", fontWeight: 300 }}>
                  Ultima rilevazione:{" "}
                  {props.treeSelected.metabolites.length > 0 ? (
                    <React.Fragment>
                      {props.treeSelected.metabolites[0].sample_date}
                    </React.Fragment>
                  ) : (
                    "Nessuna rilevazione"
                  )}
                </span>
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
                {props.treeSelected.diseases && props.treeSelected.diseases.length > 0
                  ? props.treeSelected.diseases.map((disease) => {
                      return (
                        <li key={disease.id}>
                          <p style={{ fontSize: "18px", fontWeight: 300 }}>
                            {disease.common_name}
                          </p>
                        </li>
                      );
                    })
                  : "Nessuna malattia rilevata"}
              </ul>
            </div>
            <hr />
            <div className={Style.treeDescContent}>
              <p style={{ fontSize: "22px", fontWeight: 500 }}>
                Xylella Fastidiosa
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 300,
                  display: "inline-grid",
                  position: "absolute",
                }}
              >
                {props.treeSelected.xylella &&
                  props.treeSelected.xylella.map((xylella) => {
                    if (xylella.tree_id === props.treeSelected.id) {
                      if (xylella.xf_presence === true) {
                        return (
                          <React.Fragment>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ mt: 1 }}
                              onClick={() =>
                                props.handleXylellaClick(xylella.tree_id)
                              }
                              startIcon={
                                <WarningRounded style={{ color: "red" }} />
                              }
                            >
                              PRESENTE IL {xylella.observation_date}
                            </Button>
                            <Modal
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              open={props.open}
                              onClose={props.handleClose}
                              aria-labelledby="modal-title"
                              aria-describedby="modal-description"
                            >
                              <Box
                                sx={{
                                  width: "75%",
                                  height: "75%",
                                  bgcolor: "background.paper",
                                  border: "2px solid #000",
                                  boxShadow: 24,
                                  p: 4,
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                <Typography
                                  id="modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Albero AV {xylella.tree_id}: Analisi xylella
                                  fastidiosa
                                </Typography>
                                <Typography
                                  id="modal-description"
                                  sx={{ mt: 2, height: "90%" }}
                                >
                                  <DataGrid
                                    rows={props.analysisData}
                                    columns={columns}
                                    components={{ Toolbar: GridToolbar }}
                                  />
                                </Typography>
                              </Box>
                            </Modal>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 1 }}
                            onClick={() =>
                              props.handleXylellaClick(xylella.tree_id)
                            }
                            startIcon={
                              <CheckRounded style={{ color: "green" }} />
                            }
                          >
                            ASSENTE IL {xylella.observation_date}
                          </Button>
                        );
                      }
                    }
                  })}
              </p>
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
