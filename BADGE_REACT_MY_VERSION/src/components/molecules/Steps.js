import React, { Component } from 'react';
import styled from 'styled-components';

import media from '../../config/media';

const Wrapper = styled.div`
  left: 0;
  position: absolute;
  text-align: center;
  top: 25px;
  width: 100vw;
`;

const Step = styled.div`
  display: ${props => props.isActive ? 'inline-block' : 'none' };

  span {
    color: #A3A3A3;
    font-family: "Times New Roman";
    font-size: 12px;
    text-transform: uppercase;
  }

  span:last-child {
    color: #A90711;
    display: ${props => props.isActive ? 'inline-block' : 'none'};
    padding-left: 2px;
  }

  ${media.desktop`
    display: inline-block;

    &:after {
      content: '';
      display: inline-block;
      width: 80px;
      border-top: 1px solid #A3A3A3;
      margin: 0 10px;
      height: 3px;
    }

    &:last-child:after {
      display: none;
    }
  `}
`;

class Steps extends Component {
  render() {
    const steps = [ 'Select Glove', 'Select Size', 'Confirmation' ];

    const stepsJSX = steps.map((step, index) => {
      const isActive = parseInt(this.props.step, 10) === (index + 1);
      return (
        <Step isActive={isActive} key={`step-${index}`}>
          <span>{`0${index + 1}.`}</span>
          <span>{step}</span>
        </Step>
      );
    });

    return (
      <Wrapper>
        {stepsJSX}
      </Wrapper>
    );
  }
}

export default Steps;
