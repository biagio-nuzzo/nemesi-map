import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import NemesiMap from "./Components/NemesiMap/NemesiMap";
import TabSetSide from "./Components/TabSet/TabSet";
import NavBar from "./Components/NavBar/NavBar";
import TreeTable from "./Components/TreeTable/TreeTable";

const Core = () => {

  const [treeSelected, setTreeSelected] = useState(0);
  const [elNumber, setElNumber] = useState(0);
  const [chartDataMetabolitics, setChartDataMetabolitics] = useState(null);
  const [chartDataTree, setChartDataTree] = useState(null);
  const [mapType, setMapType] = useState("presence");
  const [isLoadingCultivar, setIsLoadingCultivar] = useState(false);
  const [metacolor, setMetacolor] = useState([]);

  return (
    <React.Fragment>
      <NavBar
        mapType={mapType}
        setMapType={setMapType}
        setIsLoadingCultivar={setIsLoadingCultivar}
        setElNumber={setElNumber}
        setChartDataMetabolitics={setChartDataMetabolitics}
        setChartDataTree={setChartDataTree}
        setMetacolor={setMetacolor}
        metacolor={metacolor}
      />
      <Row>
        <Col md={8} style={{ padding: "0px" }}>
          <NemesiMap
            mapType={mapType}
            treeSelected={treeSelected}
            setTreeSelected={setTreeSelected}
          />
        </Col>
        <Col
          md={4}
          className="sideBarContainer"
          style={{ padding: "0px", borderTop: "2px solid black" }}
        >
          <TabSetSide
            isLoadingCultivar={isLoadingCultivar}
            mapType={mapType}
            elNumber={elNumber}
            chartDataMetabolitics={chartDataMetabolitics}
            chartDataTree={chartDataTree}
            treeSelected={treeSelected}
            metacolor={metacolor}
          />
        </Col>
        <Col md={8}>
          <TreeTable />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Core;
