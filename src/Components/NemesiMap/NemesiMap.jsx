import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Chip from "@mui/material/Chip";

import axios from "axios";
import Style from "./NemesiMap.module.css";
import loader from "../../assets/images/loader.gif";

import CreateLayersMunicipal from "../CreateLayersMunicipal/CreateLayersMunicipal";
import CreateMarkers from "../CreateMarkers/CreateMarker";
import CreateLayersRegion from "../CreateLayersRegion/CreateLayersRegion";
import CreateLayersProvince from "../CreateLayersProvince/CreateLayersProvince";
import CreateCirlceMarkers from "../CreateCircleMarkers/CreateCircleMarkers";
import ZoomController from "../ZoomController/ZoomController";

const NemesiMap = (props) => {
  const [municipalData, setMunicipalData] = useState("");
  const [provinceData, setProvinceData] = useState("");
  const [regionData, setRegionData] = useState("");
  const [markerData, setMarkerData] = useState("");
  const [mapBounds, setMapBounds] = useState();
  const [zoomLevel, setZoomLevel] = useState(8);

  useEffect(() => {
    const getMunicipalData = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/counties/?format=json"
      );
      setMunicipalData(response.data);
    };

    const getProvinceData = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/provinces/?format=json"
      );
      setProvinceData(response.data);
    };

    const getRegioneData = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/regions/?format=json"
      );
      setRegionData(response.data);
    };

    const getMarkerData = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/tree/?format=json"
      );
      setMarkerData(response.data);
    };
    getMunicipalData();
    getProvinceData();
    getRegioneData();
    getMarkerData();
  }, []);

  return (
    <React.Fragment>
      <div
        className={Style.mapBoxContainer + " mx-0"}
        style={{ position: "relative" }}
      >
        {municipalData && markerData && regionData && provinceData ? (
          <MapContainer
            onzoomend={(e) => {
              console.log(e);
            }}
            center={[40.9002965, 16.4000003]}
            zoom={8}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "80vh" }}
          >
            <ZoomController
              zoomLevel={zoomLevel}
              setZoomLevel={setZoomLevel}
            ></ZoomController>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Region Layers Generator */}
            <CreateLayersRegion data={regionData}></CreateLayersRegion>

            {/* Province Layers Generator */}
            <CreateLayersProvince data={provinceData}></CreateLayersProvince>

            {/* Municipal Layers Generator */}
            <CreateLayersMunicipal
              setMapBounds={setMapBounds}
              data={municipalData}
            ></CreateLayersMunicipal>

            {/* Markers Generator */}
            {props.mapType === "presence" ? (
              <CreateMarkers
                setTreeSelected={props.setTreeSelected}
                {...markerData}
              />
            ) : (
              <CreateCirlceMarkers zoomLevel={zoomLevel} data={markerData} />
            )}
          </MapContainer>
        ) : (
          <div className={Style.loaderContainer}>
            <img src={loader} alt="loader" />
          </div>
        )}

        {props.treeSelected && (
          <div className={Style.mapBoxPopup}>
            <div className={Style.markerPopupDiv}>
              <p style={{ fontWeight: "700" }}>
                {"AV" + props.treeSelected.id}
              </p>
              <p>
                Cultivar:{" "}
                <span style={{ fontWeight: "300" }}>
                  {props.treeSelected.cultivar.specie
                    ? props.treeSelected.cultivar.specie
                    : "-"}
                </span>
              </p>
              <p>
                Eta:{" "}
                <span style={{ fontWeight: "300" }}>
                  {props.treeSelected.age ? props.treeSelected.age : "-"}
                </span>
              </p>
              <p>
                Diametro:{" "}
                <span style={{ fontWeight: "300" }}>
                  {props.treeSelected.diameter
                    ? props.treeSelected.diameter
                    : "-"}
                </span>
              </p>
              <p>
                Stato di salute:{" "}
                <span style={{ fontWeight: "300" }}>
                  {props.treeSelected.health_status
                    ? props.treeSelected.health_status
                    : "-"}
                </span>
              </p>
              <br />
              <p>
                Metaboliti: <br />
                <span style={{ fontWeight: 300 }}>
                  {props.treeSelected.metabolites.length > 0
                    ? props.treeSelected.metabolites.map((metabolit) => {
                        if (props.treeSelected.metabolites.length > 1) {
                          if (
                            props.treeSelected.metabolites.indexOf(metabolit) <
                            props.treeSelected.metabolites.length - 1
                          ) {
                            return metabolit.metabolit__cod_met + ", ";
                          }
                          return metabolit.metabolit__cod_met;
                        } else {
                          return metabolit.metabolit__cod_met;
                        }
                      })
                    : "Nessun metabolita rilevato"}
                </span>
              </p>
            </div>
          </div>
        )}

        {props.mapType === "concentration" && (
          <div className={Style.mapBoxLegend}>
            <div>
              <p>
                <strong>Concetrazione metabolita</strong>
              </p>
              <div className={Style.legendContainer}>
                <div className={Style.legendItem}>
                  <div className={Style.legendItemColor}></div>
                  <p>
                    <Chip
                      sx={{
                        bgcolor: "#D6181B",
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    130 ≤ Con ≤ 200{" "}
                  </p>
                  <div className={Style.legendItemColor}></div>
                  <p>
                    <Chip
                      sx={{
                        bgcolor: "#FDAE61",
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    70 ≤ Con ≤ 130{" "}
                  </p>
                  <div className={Style.legendItemColor}></div>
                  <p>
                    <Chip
                      sx={{
                        bgcolor: "#A6D96A",
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                      }}
                    />
                    0 ≤ Con ≤ 70{" "}
                  </p>
                </div>
                <p>
                  <i>Valori di concentrazione del metabolita</i>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default NemesiMap;
