import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const TreeTable = () => {
  const VISIBLE_FIELDS = [
    "name",
    "rating",
    "country",
    "dateCreated",
    "isAdmin",
  ];
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const columns = [
    { field: "Metabolita" },
    { field: "Data prelievo" },
    { field: "Concentrazione" },
    { field: "Livello di significatività" },
    { field: "Faold change" },
    { field: "REgolazione" },
    { field: "Codice laboratorio" },
    { field: "Laboratorio" },
    { field: "Indirizzo" },
    { field: "Telefono" },
    { field: "Albero" },
    { field: "Età" },
    { field: "Diametro tronco" },
    { field: "Stato di cura" },
    { field: "Fase fenologica" },
    { field: "Cultivar" },
  ];

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
        rows={[
          {
            id: 1,
            username: "@MUI",
            age: 20,
            Metabolita: "Metabolita 1",
          },
        ]}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default TreeTable;
