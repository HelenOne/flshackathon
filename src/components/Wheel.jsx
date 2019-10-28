import React from "react";
import './components.css';
import axios from 'axios';
import { observer } from "mobx-react";
import { store } from "../store.js";
import { Link } from "react-router-dom";
import './components.css';

export default observer(
  class Wheel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com///84.201.154.32:8000/api/wheel`
      )
      .then(res => {
        const points = res.data[0];
        store.points = points;
        // this.setState({points});
      });}
  render() {
    let goodNames = {
      health: "Health",
      relationships: "Relations",
      environment: "Sociability",
      vocation: "Vocation",
      prosperity: "Finances",
      selfImprovement: "Development",
      brightnessOfLife: "Brightness",
      spirituality: "Spiritual"
    };
    const n = 8;
    // let angle = 360 / n;
    const radius = 250;
    let colors = {
      1: "#D24A45",
      2: "#DF8844",
      3: "#F6EB46",
      4: "#77B75F",
      5: "#4FA9A4",
      6: "#4C6FA2",
      7: "#7F6CAA",
      8: "#BA81B2"
    };
    let filling = Array(n)
      .fill(0)
      .map((_, index) => store.points[Object.keys(store.points)[index]] / 10);
    return (
      
      <svg height={2 * radius} width={2 * radius}>
        // circle
        {Array(n)
          .fill(0)
          .map((_, index) => (
            <path
              key={index}
              className="circle"
              d={`M ${radius} ${radius}
              L ${radius + radius * Math.cos((index * 2 * Math.PI) / n)} 
                ${radius - radius * Math.sin((index * 2 * Math.PI) / n)}
              L  ${radius +
                radius * Math.cos(((index + 1) * 2 * Math.PI) / n)} 
                ${radius - radius * Math.sin(((index + 1) * 2 * Math.PI) / n)}
              Z`}
              stroke="black"
              fill={colors[index + 1]}
            />
          ))}
        // sectors
        {Array(n)
          .fill(0)
          .map((_, index) => (
            <g
              onClick={() =>
                this.props.history.push(
                  `/toDo/${Object.keys(store.todos)[index]}`
                )
              }
            >
              <path
                key={index}
                d={`M ${radius} ${radius}
              L ${radius +
                radius * filling[index] * Math.cos((index * 2 * Math.PI) / n)}
                ${radius -
                  radius * filling[index] * Math.sin((index * 2 * Math.PI) / n)}
              L  ${radius +
                  radius *
                    filling[index] *
                    Math.cos(((index + 1) * 2 * Math.PI) / n)}
                ${radius -
                  radius *
                    filling[index] *
                    Math.sin(((index + 1) * 2 * Math.PI) / n)}
              Z`}
                stroke="black" 
                fill={colors[index + 1]}
              />
              <text
              x={
                radius -
                30 +
                radius * 0.8 * Math.cos(((index + 0.5) * 2 * Math.PI) / n)
              }
              y={
                radius -
                radius * 0.8 * Math.sin(((index + 0.5) * 2 * Math.PI) / n)
              }
              className="field-name"
            >
              {goodNames[Object.keys(store.todos)[index]]}
            </text>
            </g>
          ))}
          ))}
      </svg>
    );
  }
}

)