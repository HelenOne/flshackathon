import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import "antd/dist/antd.css";
import { observer } from "mobx-react";
import { store } from "../store.js";

export default observer(
  class ToDo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const menu = (
          <Menu
            onClick={event => {
              if (event.key == "day") store.seconds = 24 * 60 * 60;
              else if (event.key == "week") store.seconds = 24 * 60 * 60 * 7;
              else if (event.key == "month") store.seconds = 24 * 60 * 60 * 7 * 4;
              else if (event.key == "seconds") store.seconds = 15;
            }}
          >
            <Menu.Item key="day"> 1 day </Menu.Item>
            <Menu.Item key="week">1 week</Menu.Item>
            <Menu.Item key="month">1 month</Menu.Item>
            <Menu.Item key="seconds"> 5 seconds </Menu.Item>
          </Menu>
        );
        let time = "";
        if(store.seconds == 15) time = `${store.seconds} seconds`
            else if(store.seconds == 24 * 60 * 60) time = "1 day"
            else if(store.seconds == 24 * 60 * 60 * 7) time = "1 week"
            else if(store.seconds == 24 * 60 * 60 * 7 * 4) time = "1 month"
        return (
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="clock-circle" />
                {time}
            </a>
          </Dropdown>
        );
    }


  })