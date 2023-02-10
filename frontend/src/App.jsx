import { useState } from "react";

import "./App.css";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

function App() {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  return (
    <div className="App">
      <span>First Number </span>
      <input
        type="number"
        onChange={(e) => {
          setNum1(e.target.value);
        }}
      />
      <p></p>
      <span>Second Number </span>
      <input
        type="number"
        onChange={(e) => {
          setNum2(e.target.value);
        }}
      />
      <p></p>
      <button
        onClick={() => {
          setLoad(true);
          axios
            .post("http://localhost:8080/calculate", {
              num1: +num1,
              num2: +num2,
            })
            .then((res) => {
              console.log(res);
              setLoad(false);
              setData(res.data);
            })
            .catch((err) => {
              setLoad(false);
              console.log(err);
              alert("Please enter positive numbers");
            });
        }}
      >
        Generate Steps
      </button>

      {load && <h1>Loading...</h1>}
      {Object.keys(data).length > 0 && (
        <JSONPretty
          id="json-pretty"
          style={{ width: "80%" }}
          themeClassName="Adventure Time"
          data={data}
        ></JSONPretty>
      )}
    </div>
  );
}

export default App;
