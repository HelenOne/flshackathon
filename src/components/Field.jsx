import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { observer } from "mobx-react";
import { store } from "../store.js";
import { Button } from "antd/lib/radio";
import { withRouter } from "react-router-dom";

export default withRouter(
    observer(
  class Field extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: "" };
      console.log(props);
    }
    render() {
      return (
        <div>
          <Menu>
            {store.subFields.map(value => (
              <Menu.Item> {value.title} </Menu.Item>
            ))}
          </Menu>
          <input
            className="newSubFieldTitle"
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <button
            className="addNewSubFieldTitle"
            onClick={() => store.subFields.push({ title: this.state.value })}
          >
            +
          </button>
        </div>
      );
    }
  }
)
)