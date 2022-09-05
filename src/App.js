import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import NemesiMap from './Components/NemesiMap/NemesiMap';
import TabSetSide from './Components/TabSet/TabSet';
import NavBar from './Components/NavBar/NavBar';
import TreeTable from './Components/TreeTable/TreeTable';

const Core = () => {

    function generateListofRandomNumbers(numberOfElements) {
        let list = [];
        for (let i = 0; i < numberOfElements; i++) {
            list.push(Math.floor(Math.random() * 100));
        }
        return list;
    }

    function chartFakeDataGenerator(numElements) {
        const seriesList = []

        for (let i = 0; i < numElements; i++) {
            seriesList.push(
                {
                    name: "Metabolita " + i,
                    data: generateListofRandomNumbers(10)
                }
            )
        }

        const state = {
            options: {
                chart: {
                    id: "basic-bar",
                    type: "bar",
                    height: 400,
                    stacked: true,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                xaxis: {
                    categories: [
                        "AV 1",
                        "AV 2",
                        "AV 3",
                        "AV 4",
                        "AV 5",
                        "AV 6",
                        "AV 7",
                        "AV 8",
                        "AV 9",
                    ],
                },
            },
            series: seriesList,
        };
        return state;
    }   

    const [treeSelected, setTreeSelected] = useState(0);
    const [elNumber, setElNumber] = useState(0);
    const [chartDataMetabolitics, setChartDataMetabolitics] = useState(chartFakeDataGenerator(elNumber));
    const [mapType, setMapType] = useState("presence");

    return (
        <React.Fragment>
            <NavBar mapType={mapType} setMapType={setMapType} setElNumber={setElNumber} setChartDataMetabolitics={setChartDataMetabolitics} />
            <Row>
                <Col md={8} style={{ padding: "0px" }}>
                    <NemesiMap mapType={mapType} treeSelected={treeSelected} setTreeSelected={setTreeSelected} />
                </Col>
                <Col md={4} className="sideBarContainer" style={{ padding: "0px", borderTop: "2px solid black" }}>
                    <TabSetSide mapType={mapType} elNumber={elNumber} chartDataMetabolitics={chartDataMetabolitics} treeSelected={treeSelected} />
                </Col>
                <Col md={8}>
                    <TreeTable />
                </Col>
            </Row>
        </React.Fragment>

    )
}

export default Core