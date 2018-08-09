import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button'
})`
  background: ${props => (props.back ? '#000' : '#CC0000')};
  border: 1px solid ${props => (props.back ? '#000' : '#CC0000')};
  border-radius: 0;
  color: white;
  cursor: pointer;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  font-family: "Times New Roman";
  font-size: ${props => (props.size ? props.size : '14px')};
  outline: 0;
  text-transform: uppercase;
  padding: ${props => (props.small ? '11px 23px 9px' : '18px 42px 16px')};
  width: ${props => (props.block ? '100%' : 'initial')};
  border-radius: 25px;
  &:hover {
    background: ${props => (props.back ? '#CC0000' : '#000')};
  }
`;

export default Button;
