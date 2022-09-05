import React, { useState } from "react";
import { useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";

const CreateLayersMunicipal = (props) => {
  const map = useMap();
  const activeClass = "active-polygon";
  const [activeElement, setActiveElement] = useState("polygonMunicipal1");
  const layersList = [];

  props.data.features.map((feature, index) => {
    const tmpId = "polygonMunicipal" + index.toString();

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

export default CreateLayersMunicipal;
