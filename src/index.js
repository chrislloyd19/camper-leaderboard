import React from 'react';
import ReactDOM from 'react-dom';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],
      allTime: [],
      toggle: false
    }
    this.getRecent = this.getRecent.bind(this);
    this.getAllTime = this.getAllTime.bind(this);
  }
  componentWillMount() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(response => response.json())
    .then((results) => this.setState({recent: results}));

    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then(response => response.json())
    .then((results) => this.setState({allTime: results}));
  }
  getRecent(e) {
    e.preventDefault();
    this.setState({toggle: false});
  }
  getAllTime(e) {
    e.preventDefault();
    this.setState({toggle: true});
  }
  render() {
    return (
      <LeaderboardTable
        campers={this.state.toggle ? this.state.allTime : this.state.recent}
        getRecent={this.getRecent}
        getAllTime={this.getAllTime}
      />
    )
  }
}

class LeaderboardTable extends React.Component {
  render() {
    let rows = this.props.campers.map(function(camper, index) {
      return (
        <LeaderboardTableRow
          key={camper.username}
          index={index+1}
          username={camper.username}
          recent={camper.recent}
          allTime={camper.alltime}
        />
      )
    })
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th><a href="#" onClick={this.props.getRecent}>Points in last 30 days</a></th>
            <th><a href="#" onClick={this.props.getAllTime}>All time points</a></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class LeaderboardTableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.username}</td>
        <td>{this.props.recent}</td>
        <td>{this.props.allTime}</td>
      </tr>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Leaderboard />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
