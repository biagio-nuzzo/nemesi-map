import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import NemesiMap from './Components/NemesiMap/NemesiMap';
import TabSetSide from './Components/TabSet/TabSet';
import NavBar from './Components/NavBar/NavBar';

const Core = () => {

    function generateListofRandomNumbers(numberOfElements) {
        let list = [];
        for (let i = 0; i < numberOfElements; i++) {
            list.push(Math.floor(Math.random() * 100));
        }
        return list;
    }

    function chartFakeDataGenerator() {
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

            series: [
                {
                    name: "AV 1",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 2",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 3",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 4",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 5",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 6",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 7",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 8",
                    data: generateListofRandomNumbers(9),
                },
                {
                    name: "AV 9",
                    data: generateListofRandomNumbers(9),
                },
            ],
        };

        return state;
    }

    const [treeSelected, setTreeSelected] = useState(0);
    const [chartDataMetabolitics, setChartDataMetabolitics] = useState(chartFakeDataGenerator());

    return (
        <React.Fragment>
            <NavBar setChartDataMetabolitics={setChartDataMetabolitics} />
            <Row>
                <Col md={8} style={{ padding: "0px" }}>
                    <NemesiMap treeSelected={treeSelected} setTreeSelected={setTreeSelected} />
                </Col>
                <Col md={4} className="sideBarContainer" style={{ padding: "0px", borderTop: "2px solid black" }}>
                    <TabSetSide chartDataMetabolitics={chartDataMetabolitics} treeSelected={treeSelected} />
                </Col>
            </Row>
        </React.Fragment>

    )
}

export default Core