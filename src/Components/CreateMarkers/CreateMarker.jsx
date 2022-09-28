import React from "react";
import { useMap, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import CustomMarker from "../../assets/images/tree.webp";

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: CustomMarker,
    iconSize: _iconSize,
  });
}

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

export default CreateMarkers;
