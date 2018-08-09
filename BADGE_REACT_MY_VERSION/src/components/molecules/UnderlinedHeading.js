import React, { Component } from 'react';
import styled from 'styled-components';

import Heading from '../atoms/Heading';

const UnderlinedDiv = styled.div`
  margin-bottom: 20px;
  display: ${props => props.inline ? 'inline-block' : 'block' };

  h1 {
    position: relative;
    display: inline;
    line-height: 1em;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -3px;
      width: 100%;
      height: 5px;
      border-bottom: 2px solid #A90711;
    }
  }
`;

class UnderlinedHeading extends Component {
  render() {
    return (
      <UnderlinedDiv {...this.props}>
        <Heading white {...this.props} />
      </UnderlinedDiv>
    );
  }
}

export default UnderlinedHeading;
