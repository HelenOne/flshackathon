import React from "react";
import { store } from "../store.js";
import { observer } from "mobx-react";
import axios from 'axios';
import { Checkbox , Button} from "antd";
import { Menu, Dropdown, Icon } from "antd";
import "antd/dist/antd.css";
import ChooseTime from './ChooseTime'

export default observer(
  class ToDo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "" };
     
    }
    componentDidMount() {

      axios
        .get(
          `https://cors-anywhere.herokuapp.com///84.201.154.32:8000/api/wheel/${this.props.match.params.id}`
        )
        .then(res => {
            store.todos[this.props.match.params.id] =
              res.data[this.props.match.params.id];
            //  console.log(res.data);
        });
    }
    render() {
        // console.log(res.data);
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
        console.log(this.props);
      return (
        <div className="toDoBlock">
          <div className="FieldNameToDo">
            {goodNames[this.props.match.params.id]}
          </div>
          <input
            className="newToDoTitle"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <button
            className="addNewToDoTitle"
            onClick={() => {
              axios
                .post(
                  `https://cors-anywhere.herokuapp.com///84.201.154.32:8000/api/wheel/${this.props.match.params.id}/`,
                  {
                    [this.props.match.params.id]: {
                      toDo: this.state.value,
                      timePub: Math.floor(Date.now() / 1000),
                      timeEnd: Math.floor(Date.now() / 1000) + store.seconds
                    }
                  }
                )
                .then(() => {
                //   store.todos[this.props.match.params.id]({
                //     toDo: this.state.value
                //   });
                  this.setState({ value: "" });
                   axios
                     .get(
                       `https://cors-anywhere.herokuapp.com///84.201.154.32:8000/api/wheel/${this.props.match.params.id}`
                     )
                     .then(res => {
                       store.todos[this.props.match.params.id] =
                         res.data[this.props.match.params.id];
                       console.log(res.data);
                     });
                });
            }}
          >
            +
          </button>
          <ChooseTime />
          
          <div className="toDoWrapper">
            <ul>
              {store.todos[this.props.match.params.id].map((value, index) => (
                <li key={value.title} className={value.toDelete ? 'todo-item deleting' : 'todo-item'}>
                  <Checkbox 
                    onChange={event => {
                      store.todos[this.props.match.params.id][
                        index
                      ].toDelete = true;
                      axios
                        .delete(
                          `https://cors-anywhere.herokuapp.com///84.201.154.32:8000/api/wheel/${this.props.match.params.id}/${value.id}`
                        )
                        .then(res => {
                         setTimeout(() => {store.todos[this.props.match.params.id] = store.todos[
                            this.props.match.params.id
                          ].filter(obj => {
                            return obj.id !== value.id;
                          });}, 800)
                        });
                    }}
                  >
                    {" "}
                    {value.toDo}{" "}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
);
