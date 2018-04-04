import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import Character from './components/character.js';
import Marker from './components/marker'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      allCharacters: [],
      selectedCharacter: null,
      search: ""
    };
  }

  componentDidMount() {
    const url = "https://gateway.marvel.com:443/v1/public/characters?apikey=190a83bf62397b0d285eb933c7a79e0f"
    fetch(url)
    .then(response => response.json())
    .then((json) => {
      this.setState({
        characters: json.data.results,
        allCharacters: json.data.results
      })
    })
  }

  selectCharacter = (character) => {
    // eslint-disable-next-line
    console.log
    this.setState ({
      selectedCharacter: character
    })
  }

  handleSearch = (event) => {
    this.setState ({
      search: event.target.value,
      characterss: this.state.allCharacters.filter((character) => new RegExp(event.target.value, "i").exec(character.name))
    })
  }


  render() {
    let center = {
      lat: 48.8566,
      lng: 2.35
    }

    if (this.state.selectedCharacter) {
      center = {
        lat: this.state.selectedCharacter.lat,
        lng: this.state.selectedCharacter.lng
      }
    }

    return (
      <div className ="app">
        <div className="side-bar">
        <div><img src={'./img/marvel-finder.jpg'} alt="logo" className="logo"/></div>
        <h3>Track your favourite character!</h3>
        </div>
          <div className ="main">
            <div className ="search">
              <input
                type="text"
                placeholder="search"
                value={this.state.search}
                onChange={this.handleSearch} />
            </div>
            <div className ="characters">
              {this.state.characters.map((character) => {
                return < Character
                  key={character.name}
                  character={character}
                  selectCharacter={this.selectCharacter}
                  />
              })}
            </div>
          </div>
          <div className="map">
           <GoogleMapReact
              center={center}
              zoom={11}>
              {this.state.characters.map((character) => {
                return <Marker
                  key={character.name}
                  selected={character === this.state.selectedCharacter} />
              })}
            </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
