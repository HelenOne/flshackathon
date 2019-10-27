import React from 'react';
import './App.css';
import Wheel from './components/Wheel.jsx';
import { Switch, Link, Route, useParams  } from "react-router-dom";
import Field from './components/Field';
import ToDo from './components/ToDo';
import {Menu} from 'antd';
import "antd/dist/antd.css";


function App() {
  return (
    <div className="App">
      <Menu className="navigation" mode="horizontal">
        <Menu.Item>
          <Link to="/"> Wheel </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/toDo">ToDo</Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route exact path="/" component={Wheel} />
        <Route path="/toDo/:id" component={ToDo} />
        {/* <Route path="/toDo" component={AllToDo} /> */}
        <Route component={() => "Page not found"} />
        {/* <Route path="/toDo/:id" component={toDo} /> */}
      </Switch>
    </div>
  );
}

export default App;
