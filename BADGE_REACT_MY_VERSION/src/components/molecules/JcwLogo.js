import React, { Component } from 'react';
import styled from 'styled-components';


import media from '../../config/media';

const Wrapper = styled.div`
  margin: 20px 0;
  text-align: center;
  position: ${props => props.fixed ? 'fixed' : 'relative' };
  ${props => props.fixed ?  'bottom: 0; left: 0; width: 100vw;' : '' }

  ${media.desktop`
    margin: ${props => props.center ? '0 0 40px' : '130px 0 50px'};
    position: ${props => props.center ? 'fixed' : 'relative' };
    ${props => props.center ?  'bottom: 0; left: 0; width: 100vw;' : '' }
  `}

  img {
    width: 141px;
  }
`;

class JcwLogo extends Component {
  render() {
    return (
      <Wrapper {...this.props}>
        <img alt='JCW' src={jcwLogo} />
      </Wrapper>
    )
  };
}

export default JcwLogo;
