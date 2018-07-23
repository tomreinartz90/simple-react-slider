import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {SliderContainer} from './slider/SliderContainer';
import {Slide} from './slider/Slide';

class App extends Component {

  getSlide = (data) => {
    return (
      <div>
        {data}
      </div>);
  };

  render() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
      <div className="App">
        <SliderContainer dataSet={items} slideTemplate={this.getSlide} />
      </div>
    );
  }
}

export default App;
