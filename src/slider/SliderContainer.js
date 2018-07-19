/**
 * Created by taren on 19-7-2018.
 */
import React, {Component} from 'react';

export class SliderContainer extends Component {

  container;

  constructor() {
    super();
    this.container = React.createRef();
    this.state = {activeSlide: 0};
  }

  next = () => {
    this.setActiveSlide(this.state ? (this.state.activeSlide + 1) : 1);
  };

  prev = () => {
    this.setActiveSlide(this.state ? (this.state.activeSlide - 1) : 0);
  };

  setActiveSlide(slide) {
    this.setState({activeSlide: slide});
  }

  getWidthOfContainer() {
    if (this.container && this.container.current) {
      return this.container.current.getBoundingClientRect().width;
    }
    return 0;
  }

  getWidthOfFirstSlide() {
    if (this.container && this.container.current) {
      const firstSlide = this.container.current.querySelector('.slider-container__slide');
      if (firstSlide) {
        return firstSlide.getBoundingClientRect().width;
      }
    }
    return 0;
  }

  render() {
    const {activeSlide} = this.state;
    const {children} = this.props;
    const containerWidth = this.getWidthOfContainer();
    const slideWidth = this.getWidthOfFirstSlide();

    const visibleSlides = Math.floor((containerWidth || 1) / (slideWidth || 1));

    const styles = {
      transform: `translate(-${activeSlide * slideWidth}px, 0)`
    };

    console.log(activeSlide , visibleSlides, children.length);

    return (
      <div className="slider-container" ref={this.container}>
        {activeSlide > 0 && (
          <div className="slider-container__prev-button" onClick={this.prev}>prev</div>
        )}
        <div className="slider-container__slides" style={styles}> {children}</div>
        {(activeSlide + visibleSlides < children.length) && (
          <div className="slider-container__next-button" onClick={this.next}>next</div>
        )}
      </div>);

  }
}
