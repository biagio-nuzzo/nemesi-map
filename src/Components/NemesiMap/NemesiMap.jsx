import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Tooltip,
  GeoJSON,
} from "react-leaflet";
import CustomMarker from "../../assets/images/tree.webp";
import L from "leaflet";
import axios from "axios";
import Style from "./NemesiMap.module.css";
import loader from "../../assets/images/loader.gif";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: CustomMarker,
    iconSize: _iconSize,
  });
}

const CreateLayers = (props) => {
  const map = useMap();
  const activeClass = "active-polygon";
  const [activeElement, setActiveElement] = useState("polygon1");
  const layersList = [];

  props.data.features.map((feature, index) => {
    const tmpId = "polygon" + index.toString();

    layersList.push(
      <GeoJSON
        key={index}
        style={{
          className: tmpId,
          weight: 0.5,
          color: "#006A4E",
          fillOpacity: 0.2,
        }}
        eventHandlers={{
          click: () => {
            const x = document.getElementsByClassName(tmpId)[0];

            if (activeElement !== tmpId) {
              const activePol =
                document.getElementsByClassName(activeElement)[0];
              activePol.classList.remove(activeClass);
              activePol.style.transform = "translate(0px, 0px)";
              activePol.style.filter = "none";
              activePol.style.fill = "#006A4E";
              activePol.style.transition = "all 0.5s ease-in-out";
              activePol.style.fillOpacity = 0.2;
              activePol.style.strokeWidth = 1;

              setActiveElement(tmpId);
            } else {
              x.style.fill = "#006A4E";
            }

            if (x.classList.contains(activeClass)) {
              x.style.fill = "#006A4E";
              x.classList.remove(activeClass);
            } else {
              x.style.fill = "#44c59d";
              x.classList.add(activeClass);
            }

            const tmpBounds = L.geoJSON(props.data.features[index]);
            map.fitBounds(tmpBounds.getBounds(), { padding: [270, 250] });
          },
          mouseover: () => {
            const x = document.getElementsByClassName(tmpId)[0];
            x.style.transform = "translate(2px, -4px)";
            x.style.filter = "drop-shadow(2px 4px 6px #a1a1a1)";
            x.style.fillOpacity = 0.7;
            x.style.strokeWidth = 3;
            x.style.transition = "all 0.15s ease-in-out";
          },
          mouseout: () => {
            const x = document.getElementsByClassName(tmpId)[0];

            if (!x.classList.contains(activeClass)) {
              x.style.transform = "translate(0px, 0px)";
              x.style.filter = "none";
              x.style.transition = "all 0.5s ease-in-out";
              x.style.fillOpacity = 0.2;
              x.style.strokeWidth = 1;
            }
          },
        }}
        data={feature}
      />
    );
  });

  return layersList;
};

const CreateMarkers = (props) => {
  const markersList = [];
  const map = useMap();

  props.results.map((marker, index) => {
    const tmpIdMarker = "marker" + marker.id.toString();

    markersList.push(
      <Marker
        key={index}
        position={[marker.lat, marker.lon]}
        icon={GetIcon([33, 33])}
        className={tmpIdMarker}
        style={{ className: tmpIdMarker }}
        eventHandlers={{
          click: (e) => {
            map.setView([marker.lat, marker.lon], 20);
            props.setTreeSelected(marker);
          },
          mouseover: (e) => {},
        }}
      >
        <Tooltip style={{ bottom: "-2px" }}>{"AV" + marker.id}</Tooltip>
      </Marker>
    );
  });

  return markersList;
};

const NemesiMap = (props) => {
  const [polygonData, setPolygonData] = useState("");
  const [markerData, setMarkerData] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/counties/?format=json"
      );
      setPolygonData(response.data);
    };

    const getMarkerData = async () => {
      const response = await axios.get("http://nemesi-project.it/api/v1/tree/");
      setMarkerData(response.data);
    };

    getData();
    getMarkerData();
  }, []);

  const [mapBounds, setMapBounds] = useState();

  return (
    <React.Fragment>
      <div
        className={Style.mapBoxContainer + " mx-0"}
        style={{ position: "relative" }}
      >
        {polygonData && markerData ? (
          <MapContainer
            center={[40.9002965, 16.4000003]}
            zoom={8}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "80vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Layers Generator */}
            <CreateLayers
              setMapBounds={setMapBounds}
              data={polygonData}
            ></CreateLayers>

            {/* Markers Generator */}
            <CreateMarkers
              setTreeSelected={props.setTreeSelected}
              {...markerData}
            />
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
                  {props.treeSelected.cultivar.name
                    ? props.treeSelected.cultivar.name
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
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default NemesiMap;
