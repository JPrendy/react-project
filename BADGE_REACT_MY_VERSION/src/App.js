import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/templates/Login';
import BadgeOverview from './components/templates/BadgeOverview';
import CardGrid from './components/templates/CardGrid';
import Form from './components/templates/Form';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chassis: null,
      badgename: null,
      badgetype_no: null,
      badgepic: null
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData(key, value) {
    let state = Object.assign({}, this.state);
    state[key] = value;
    this.setState(state);
  }

  render() {
    if (this.state.badgename == null) {
    } else {
      localStorage.setItem('badge_name', this.state.badgename);
    }

    if (this.state.badgetype_no == null) {
    } else {
      localStorage.setItem('badge_text', this.state.badgetype_no);
    }

    if (this.state.chassis == null) {
    } else {
      localStorage.setItem('chassis_number', this.state.chassis);
    }
    if (this.state.badgepic == null) {
    } else {
      localStorage.setItem('badge_picture', this.state.badgepic);
    }

    return (
      <BrowserRouter>
        <div className="JcwApp">
          <Route
            exact
            path="/"
            render={props => (
              <Login
                {...props}
                data={this.state}
                updateData={this.updateData}
              />
            )}
          />
          <Route
            path="/badge-overview"
            render={props => (
              <BadgeOverview
                {...props}
                data={this.state}
                updateData={this.updateData}
              />
            )}
          />
          <Route
            path="/form"
            render={props => (
              <Form {...props} data={this.state} updateData={this.updateData} />
            )}
          />
          <Route
            path="/badge-cards"
            render={props => (
              <CardGrid
                {...props}
                data={this.state}
                updateData={this.updateData}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
