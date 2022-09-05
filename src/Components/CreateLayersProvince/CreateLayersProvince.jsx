import React from "react";
import { GeoJSON } from "react-leaflet";

const CreateLayersProvince = (props) => {
  const layersList = [];

  props.data.features.map((feature, index) => {
    const tmpId = "polygonProvince" + index.toString();

    layersList.push(
      <GeoJSON
        key={index}
        style={{
          className: tmpId,
          weight: 2,
          color: "#006A4E",
          fillOpacity: 0,
        }}
        data={feature}
      />
    );
  });

  return layersList;
};

export default CreateLayersProvince;
