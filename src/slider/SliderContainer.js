/**
 * Created by taren on 19-7-2018.
 */
import React, { Component } from 'react';
import { Slide } from './Slide';

export class SliderContainer extends Component {

  container;
  slideRefs = [];

  constructor() {
    super();
    this.container = React.createRef();
    this.state = { activeSlide: 0, containerWidth: 0, slideWidth: 0 };
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    window.addEventListener('resize', () => this.updateDimensionsInState());
    this.setRefsForDataSet();
  }

  componentDidUpdate() {
    this.setRefsForDataSet();
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensionsInState());
  }


  setRefsForDataSet() {
    if (this.props.dataSet && this.props.dataSet.length && this.props.dataSet.length != this.slideRefs.length) {
      this.slideRefs = this.props.dataSet.map(() => React.createRef());
    }
    this.updateDimensionsInState();
  }

  getWidthOfContainer() {
    if (this.container && this.container.current) {
      return this.container.current.getBoundingClientRect().width;
    }
    return 0;
  }

  getWidthOfFirstSlide() {
    if (this.slideRefs && this.slideRefs.length && this.slideRefs[0] && this.slideRefs[0].current) {
      const firstSlide = this.slideRefs[0].current.container.current;
      if (firstSlide) {
        return firstSlide.getBoundingClientRect().width;
      }
    }
    return 0;
  }

  updateDimensionsInState() {
    const { containerWidth, slideWidth } = this.state;
    const newContainerWidth = this.getWidthOfContainer();
    const newSlideWidth = this.getWidthOfFirstSlide();

    if (newContainerWidth !== 0 && newSlideWidth !== 0 && (containerWidth !== newContainerWidth || slideWidth !== newSlideWidth)) {
      this.setState({ containerWidth: newContainerWidth, slideWidth: newSlideWidth });
    }
  }

  next = () => {
    this.setActiveSlide(this.state ? (this.state.activeSlide + 1) : 1);
  };

  prev = () => {
    this.setActiveSlide(this.state ? (this.state.activeSlide - 1) : 0);
  };

  setActiveSlide(slide) {
    this.setState({ activeSlide: slide });
  }

  render() {
    const { activeSlide, containerWidth, slideWidth } = this.state;
    const { dataSet, slideTemplate } = this.props;
    const visibleSlides = Math.floor((containerWidth || 1) / (slideWidth || 1));

    const styles = {
      transform: `translate(-${activeSlide * slideWidth}px, 0)`
    };

    const slides = dataSet.map((item, index) =>
      <Slide key={index} ref={this.slideRefs[index]}>{slideTemplate(item)}</Slide>);

    return (
      <div className="slider-container" ref={this.container}>
        {activeSlide > 0 && (
          <div className="slider-container__prev-button" onClick={this.prev}>prev</div>
        )}
        <div className="slider-container__slides" style={styles}>{slides}</div>
        {(activeSlide + visibleSlides < dataSet.length) && (
          <div className="slider-container__next-button" onClick={this.next}>next</div>
        )}
      </div>);
  }
}
