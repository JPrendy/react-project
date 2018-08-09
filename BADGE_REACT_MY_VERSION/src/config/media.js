import { css } from 'styled-components';

// Sizes available to use:
//
// media.phone => less than 475px
// media.tablet => less than 768px
// media.desktop => greater than 768px

const sizes = {
  phone: 475,
  tablet: 768
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

media.desktop = (...args) => css`@media (min-width: ${sizes.tablet + 1}px) {
  ${css(...args)}
}`;

export default media;
