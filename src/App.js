import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import './Utils.js';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Home bus assistant</h1>
          <Clock/>
        </header>
        <div className="App-intro">

        9  <FetchDemo subreddit="reactjs" busNumber="9" busStop="2007"/>
        72  <FetchDemo subreddit="reactjs" busNumber="72" busStop="1904"/>

        </div>
      </div>
    );
  }
}

class Clock extends Component{
  render() {
    return (
      <iframe title="asd" src="http://free.timeanddate.com/clock/i6056p85/n238/tlbg11/fn3/fs20/fcfff/tct/pct/tt0/th1" frameborder="0" width="402" height="24" allowTransparency="true"></iframe>
    )
  }
}

function ListItem(props) {

  return <a class="time">{props.value}</a>;
}

function NumberList(props) {

  const numbers = props.numbers;

  const listItems = numbers.map((number) =>

    <ListItem key={number.toString()}
              value={number} />

  );
  return (

    <div class="timesArray">

      {listItems}
    </div>
  );
}



class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        arrivals : null
    };
  }

 componentDidMount() {
    var that = this;
    getBusData();
    function getBusData(){
  var url = "https://api-arrivals.sofiatraffic.bg/api/v1/arrivals/" + that.props.busStop + "/?line=" +that.props.busNumber +"&type=bus" ;
  $.get(url, function(data, status) {
      const arrivals1 = (data.lines[0].arrivals);
      var array = [];
      for(var i = 0 ; i<4; i++){
        array.push(arrivals1[i].time);
      }
        that.setState({arrivals : array});
    });
  }
      setInterval(getBusData, 30000);
  }
    render(){
      return this.state.arrivals ? <div><NumberList numbers={this.state.arrivals} busNumber={this.props.busNumber}/></div> : <div> Loading ... </div>
    }
}

export default App;
