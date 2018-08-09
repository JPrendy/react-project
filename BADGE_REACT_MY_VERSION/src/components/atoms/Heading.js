import styled from 'styled-components';

import media from '../../config/media';

const Heading = styled.h1`
font-family: "Times New Roman";
font-size: ${props => (props.size ? props.size : '58px')};
  font-weight: 400;
  margin: 0;
  color: ${props => (props.white ? '#000' : '#000')};
  text-transform: uppercase;

  ${media.desktop`
    font-size: 45px;
  `};
`;

Heading.h2 = Heading.withComponent('h2').extend`
  font-size: 22px;

  ${media.desktop`
    font-size: 28px;
    line-height: 32px;
  `}
`;

Heading.h3 = Heading.withComponent('h3');
Heading.h4 = Heading.withComponent('h4');
Heading.h5 = Heading.withComponent('h5');
Heading.h6 = Heading.withComponent('h6');

export default Heading;
