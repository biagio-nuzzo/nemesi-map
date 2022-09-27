import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import NemesiMap from "./Components/NemesiMap/NemesiMap";
import TabSetSide from "./Components/TabSet/TabSet";
import NavBar from "./Components/NavBar/NavBar";
import TreeTable from "./Components/TreeTable/TreeTable";
import TreeChart from "./Components/TreeChart/TreeChart";
import axios from "axios";

const Core = () => {
  const [treeSelected, setTreeSelected] = useState(0);
  const [elNumber, setElNumber] = useState(0);
  const [chartDataMetabolitics, setChartDataMetabolitics] = useState(null);
  const [chartDataTree, setChartDataTree] = useState(null);
  const [mapType, setMapType] = useState("presence");
  const [isLoading, setIsLoading] = useState(false);
  const [metacolor, setMetacolor] = useState([]);
  const [tableData, setTableData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  function handleXylellaClick(id) {
    const getAnalysis = async (id) => {
      setOpen(true);
      setIsLoading(true);
      const response = await axios.get(
        "http://nemesi-project.it/api/v1/analysis-xf/?tree=" + id
      );

      setAnalysisData(response.data);
    };
    getAnalysis(id);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <NavBar
        mapType={mapType}
        setMapType={setMapType}
        setIsLoading={setIsLoading}
        setChartDataMetabolitics={setChartDataMetabolitics}
        setChartDataTree={setChartDataTree}
        setMetacolor={setMetacolor}
        setTableData={setTableData}
        setMonthData={setMonthData}
      />
      <Row>
        <Col md={8} style={{ padding: "0px" }}>
          <NemesiMap
            mapType={mapType}
            treeSelected={treeSelected}
            setTreeSelected={setTreeSelected}
            metacolor={metacolor}
            chartDataTree={chartDataTree}
          />
        </Col>
        <Col
          md={4}
          className="sideBarContainer"
          style={{ padding: "0px", borderTop: "2px solid black" }}
        >
          <TabSetSide
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            mapType={mapType}
            setElNumber={setElNumber}
            elNumber={elNumber}
            chartDataMetabolitics={chartDataMetabolitics}
            chartDataTree={chartDataTree}
            treeSelected={treeSelected}
            metacolor={metacolor}
            analysisData={analysisData}
            handleXylellaClick={handleXylellaClick}
            handleClose={handleClose}
            open={open}
          />
        </Col>
        <Col md={8}>
          <TreeTable
            metacolor={metacolor}
            tableData={tableData}
            elNumber={elNumber}
            setElNumber={setElNumber}
          />
          <TreeChart
            metacolor={metacolor}
            elNumber={elNumber}
            setElNumber={setElNumber}
            setMonthData={setMonthData}
            monthData={monthData}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Core;
