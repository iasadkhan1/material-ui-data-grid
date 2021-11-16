import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { v4 as uuid } from "uuid";

function App() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100000,
    editable: true,
  });
  console.log(data.columns);
  const [tradeData, setTradeData] = useState(data);
  const [selectedList, setSelectedList] = useState([]);
  const [name, setName] = useState("");
  const [selectedWatchListId, setSelectedWatchListId] = useState(null);
  const [watchLists, setWatchLists] = useState([
    { id: uuid(), list: ["Eth,Btc,Usdt"], name: "one" },
    { id: uuid(), list: ["Eth,Btc,Usdt"], name: "two" },
    { id: uuid(), list: ["Eth,Btc,Usdt"], name: "three" },
  ]);
  const [renderColumns, setRenderColumns] = useState([
    "desk",
    "commodity",
    "traderName",
    "traderEmail",
    "id",
  ]);
  useEffect(() => {
    if (data) {
      setTradeData(data);
    }
  }, [data]);
  // data.columns.map((item) => console.log(item.field));

  const filteredData = data.columns.filter((item) => {
    // renderColumns.map((items) => {
    //  if (item.field != items) {
    //      console.log("inloop", item.field);
    //      return
    //  }
    // });
    //
    if (item.field !== renderColumns) {
      return item;
    }
  });

  var array = [];
  var j = 0;
  for (var i = 0; i < tradeData.columns.length; i++) {
    if (renderColumns[i] === undefined) {
      array[j] = data.columns[i];
      j++;
    } else if (renderColumns[i].localeCompare(tradeData.columns[i].field)) {
      continue;
    }
  }
  useEffect(() => {
    async function lol() {
      if (data.rows) {
        await setTradeData({ ...tradeData, columns: array });
      }
    }
    lol();
  }, []);

  // console.log("data", filteredData);
  // //renderColumns.map((item) => console.log(item));
  // console.log(array);

  // renderColumns.map((item) => {
  //  return item.toLowerCase();
  // });
  const onSubmit = () => {
    const data = { id: uuid(), list: selectedList, name: name };
    setWatchLists((list) => [...list, data]);
  };
  console.log("list", selectedList);
  console.log("trade", tradeData);
  console.log(array);
  console.log(selectedList);
  console.log("final", watchLists);
  console.log(selectedWatchListId);
  return (
    <div style={{ height: "120vh", width: "100%" }}>
      <input
        placeholder="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onSubmit}>save</button>
      {watchLists
        ? watchLists.map((item, index) => {
            return (
              <div key={index}>
                <input
                  name="WatchList"
                  type="radio"
                  value={item.id}
                  onChange={(e) => setSelectedWatchListId(item.id)}
                />
                {item.name}
              </div>
            );
          })
        : null}
      <DataGrid
        {...tradeData}
        loading={tradeData.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = data.rows.filter((row) =>
            selectedIDs.has(row.id)
          );

          setSelectedList(selectedRows);
        }}
      />
    </div>
  );
}

export default App;
