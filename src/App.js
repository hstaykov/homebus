import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import './Utils.js';
import firebase from 'firebase'
import Settings from './Settings.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

var config = {
   apiKey: "AIzaSyCbp98cdDDWbHRl5bHARFH-Z5DH1hICfxY",
   authDomain: "weather-station-c2d40.firebaseapp.com",
   databaseURL: "https://weather-station-c2d40.firebaseio.com",
   storageBucket: "weather-station-c2d40.appspot.com",
   messagingSenderId: "915829445018"
 };

  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Бира и Шкембе</h1>
          <Clock/>
        </header>
        <div className="App-intro">

        <FetchDemo/>


          <br></br>
          <MuiThemeProvider>
            <Settings label="Default" />
            </MuiThemeProvider>
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
        data : null,
        time : null
    };
  }

 componentDidMount() {
    var that = this;
    getBusData();
    function getBusData(){
      var ref = firebase.database().ref('home/currentTemperature/');
      ref.once('value').then(function(data) {
          console.log(data.val().temp);
          that.setState({data: data.val()})

      });

  }
      setInterval(getBusData, 30000);
  }
    render(){
      return this.state.data ? <div> Temperature: {this.state.data.temp}°C Humidity: {this.state.data.hum} % at {this.state.data.date.split(" ")[1].split(".")[0]}</div> : <div> Loading ... </div>
    }
}

export default App;
