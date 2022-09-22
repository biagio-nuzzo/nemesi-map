import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import Style from "./TreeTable.module.css";

const TreeTable = (props) => {
  function colorhandler(color) {
    for (let i = 0; i < props.metacolor.length; i++) {
      if (color.id === props.metacolor[i].cod_met) {
        return props.metacolor[i].color;
      }
    }
  }

  const columns = [
    {
      field: "cod_met",
      headerName: "Metabolita",
      renderCell: (params) => (
        <Chip
          key={params.value}
          label={params.value}
          size="small"
          variant="outlined"
          className={Style.tagStyle}
          style={{
            backgroundColor: colorhandler(params),
            marginLeft: "6px",
          }}
        />
      ),
    },
    { field: "sample_date", headerName: "Data prelievo", width: 100 },
    { field: "mz", headerName: "Concentrazione", width: 120 },
    { field: "tree", headerName: "Albero" },
    { field: "age", headerName: "Età" },
    { field: "diameter", headerName: "Diametro tronco", width: 120 },
    { field: "status", headerName: "Stato di cura", width: 120 },
    { field: "phase", headerName: "Fase fenologica", width: 120 },
    { field: "cultivar", headerName: "Cultivar" },
    { field: "field", headerName: "Agro" },
    { field: "laboratory", headerName: "Codice Laboratorio", width: 200 },
  ];

  let rows = [];

  if (props.tableData !== null) {
    props.tableData.forEach((element) => {
      rows.push({
        id: element.cod_met,
        cod_met: element.cod_met,
        sample_date: element.sample_date,
        mz: element.mz,
        tree: element.tree,
        age: element.age,
        diameter: element.diameter,
        status: element.status,
        phase: element.phase,
        cultivar: element.cultivar,
        field: element.field,
        laboratory: element.laboratory,
      });
    });
  } else {
    rows = [];
  }

  return (
    <div
      style={{
        paddingLeft: "10px",
        marginBottom: "25px",
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default TreeTable;
