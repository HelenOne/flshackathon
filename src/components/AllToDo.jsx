import React from "react";
import { store } from "../store.js";
import { observer } from "mobx-react";
import axios from "axios";
import { Checkbox, Button } from "antd";
import { Menu, Dropdown, Icon } from "antd";
import "antd/dist/antd.css";
import ChooseTime from "./ChooseTime";
import './components.css';

export default observer(
  class AllToDo extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const allTodos = Object.values(store.todos)
        .map((cat, catIndex) =>
          cat.map(item => ({
            ...item,
            category: Object.keys(store.todos)[catIndex]
          }))
        )
        .reduce((acc, value) => acc.concat(value), []);
      return (
        <ul className="AllToDoUl">
          {allTodos.map((value, index) => (
            <li
              key={value.title}
              className={value.toDelete ? "todo-item deleting" : "todo-item"}
            >
              <Checkbox
                onChange={event => {
                  store.todos[value.category][index].toDelete = true;
                  axios
                    .delete(
                      `https://cors-anywhere.herokuapp.com///84.201.154.32:8000/api/wheel/${this.props.match.params.id}/${value.id}`
                    )
                    .then(res => {
                      setTimeout(() => {
                        store.todos[value.category] = store.todos[
                          value.category
                        ].filter(obj => {
                          return obj.id !== value.id;
                        });
                      }, 800);
                    });
                }}
              >
                {" "}
                {value.toDo}{" "}
              </Checkbox>
            </li>
          ))}
        </ul>
      );
    }
  }
);
