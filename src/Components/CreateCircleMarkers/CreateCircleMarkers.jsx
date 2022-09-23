import React from "react";
import { useMap, Circle } from "react-leaflet";

const CreateCirlceMarkers = (props) => {
  const markersList = [];
  const map = useMap();
  props.data.results.map((marker) => {
    var circleRadius = 0;
    let circleColor = "#ff0000";

    circleColor = marker.tree_color;

    if (props.zoomLevel <= 9) {
      circleRadius = 2500;
    } else if (props.zoomLevel > 9 && props.zoomLevel <= 12) {
      circleRadius = 1300;
    } else if (props.zoomLevel === 13) {
      circleRadius = 1000;
    } else if (props.zoomLevel === 14) {
      circleRadius = 600;
    } else if (props.zoomLevel === 15) {
      circleRadius = 25;
    } else if (props.zoomLevel === 16) {
      circleRadius = 10;
    } else if (props.zoomLevel >= 17) {
      circleRadius = 5;
    }

    markersList.push(
      <Circle
        key={marker.id}
        center={[marker.lat, marker.lon]}
        radius={circleRadius}
        color={circleColor}
        fillOpacity={0.85}
        eventHandlers={{
          click: (e) => {
            map.setView([marker.lat, marker.lon], 20);
            props.setTreeSelected(marker);
          },
          mouseover: (e) => {},
        }}
      />
    );

    return null;
  });

  return markersList;
};

export default CreateCirlceMarkers;
