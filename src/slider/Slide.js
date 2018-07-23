/**
 * Created by taren on 19-7-2018.
 */
import React, {Component} from "react";

export class Slide extends Component {
  container;

  constructor() {
    super();
    this.container = React.createRef();
  }


  render() {
    const {children} = this.props;

    return (<div className="slider-container__slide" ref={this.container}>{children}</div> );
  }
}