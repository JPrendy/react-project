import styled from 'styled-components';

const Input = styled.input.attrs({
})`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #C4C4C4;
  display: ${props => props.block ? 'block' : 'inline-block'};
  outline: 0;
  font-size:12px;
  padding: 16px 17px 18px 18px;
  width: ${props => props.block ? '100%' : 'initial'};
`

export default Input;
