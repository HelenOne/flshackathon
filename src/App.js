import React from 'react';
import './App.css';
import Wheel from './components/Wheel.jsx';
import { Switch, Link, Route, useParams  } from "react-router-dom";
import Field from './components/Field';
import ToDo from './components/ToDo';
import {Menu} from 'antd';
import "antd/dist/antd.css";
import AllToDo from './components/AllToDo';
// import LeftMenu from './components/LeftMenu'


function App() {
  return (
    <div className="App">
      <span class="mainTitle">Minimalistic Life Wheel</span>
      <Menu className="navigation" mode="horizontal">
        <Menu.Item>
          <Link to="/"> Wheel </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/AllToDo">ToDo</Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route exact path="/" component={Wheel} />
        <Route path="/toDo/:id" component={ToDo} />
        <Route path="/AllToDo" component={AllToDo} />
        <Route component={() => "Page not found"} />
        {/* <Route path="/toDo/:id" component={toDo} /> */}
      </Switch>

      {/* <LeftMenu/> */}
    </div>
  );
}

export default App;
