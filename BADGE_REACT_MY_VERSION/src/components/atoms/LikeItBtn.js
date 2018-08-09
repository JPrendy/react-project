import styled from 'styled-components';
import icon_btn from '../../assets/images/icons/uturn.png';

const LikeItBtn = styled.button.attrs({
  type: 'button'
})`
  margin-top:5px;
  background: url(${icon_btn}) center left no-repeat
    ${props => (props.back ? '#000' : '#ffffff')};
  border: 1px solid ${props => (props.back ? '#000' : '#000')};
  border-radius: 25px;
  border-width: 3px;
  color: black;
  cursor: pointer;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  font-family: "Times New Roman";
  font-size: ${props => (props.size ? props.size : '16px')};
  font-weight: bold;
  outline: 0;
  text-transform: uppercase;
  padding: ${props => (props.small ? '11px 28px 9px' : '18px 22px 16px')};
  width: ${props => (props.block ? '100%' : 'initial')};
`;

export default LikeItBtn;
