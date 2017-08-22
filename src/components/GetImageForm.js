import React, { Component } from 'react';
import GetImageButton from './GetImageButton';
import ImageDisplay from './ImageDisplay';

const API_KEY = 'aMXkLOWkgg53P57ded14MfQ4tvIJlR8J2xdpska8';

export default class GetImageForm extends Component {
  constructor(){
    super()
    this.state = {
      rover: 'Curiosity',
      camera: 'FHAZ',
      sol: '',
      photos: []
    }
}

  handleRover = event => (
    this.setState({
      rover: event.target.value
    })
  )

  handleCamera = event => (
    this.setState({
      camera: event.target.value
    })
  )

  handleSol = event => (
    this.setState({
      sol: event.target.value
    })
  )

  fetchRoverImage = (e) => {
    e.preventDefault();
    const { rover, camera, sol } = this.state;
    let imageUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${API_KEY}`;

    fetch(imageUrl)
    .then(r => r.json())
    .then(({photos}) => {
      this.setState({photos});
    })
  }

  render(){
    return (
      <div>
        <form action="submit">
          <label htmlFor="rover">Rover</label>
            <select onChange={this.handleRover} id="rover" value={this.state.rover}>
              <option value="Curiosity">Curiosity</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Spirit">Spirt</option>
            </select>
          <label htmlFor="camera">Camera Type</label>
            <select onChange={this.handleCamera} id="rover" value={this.state.camera}>
              <option value="fhaz">FHAZ (Front Hazard)</option>
              <option value="rhaz">RHAZ (Rear Hazard)</option>
              <option value="navcam">NAVCAM (Navigation Cam)</option>
            </select>
          <label htmlFor="sol">Martian Sol: 1000-2000</label>
            <input type="number" onChange={this.handleSol} max="2000" min="1000" value={this.state.sol}/>
        </form>
        <GetImageButton onClick={this.fetchRoverImage} />
        <ImageDisplay images={this.state.photos}/>
      </div>
    )
  }
}
