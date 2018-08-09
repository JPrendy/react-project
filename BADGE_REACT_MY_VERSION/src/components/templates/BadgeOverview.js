import React, { Component } from 'react';
import styled from 'styled-components';
import media from '../../config/media';
import Button from '../atoms/Button';
import '../styles/badgegrid.css';

// Fill the page minus the header
const FullPageWrapper = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`;

const HappyHeader = styled.h2`
  font-size: 20px;
  font-weight: normal;

  ${media.desktop`
  font-size: 2.3125rem;
  font-weight:normal;
  `};
`;

const Positiontxt = styled.div`
  display: block;
  padding-top: 25px;
  text-transform: uppercase;
  text-align: center;
  font-family: "Times New Roman";
`;

const DescriptionWrapper = styled.div`
  position: relative;
`;

const BadgeLabel = styled.div`
  display: block;
  position: absolute;
  width: 255px;
  right: -285px;
  top: 150px;
  color: #000;
`;

const LineMeUp = styled.div`
  border-bottom: 2px solid;
  content: '';
  display: block;
  margin: 1.25rem 0;
  width: 50px;
`;

const BadgeParagraph = styled.p`
  display: none;

  ${media.desktop`
        display:block;
        font-size: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 25px;
        `};
`;

const ButtonUTurn = styled.div`
  font-size: rem-calc(14);
  float: left;
  width 50%;
  text-align: center;


  ${media.desktop`
    font-size: rem-calc(14);
    padding-right: 50px;
    float: left;
    text-align: center;
        `};
`;

const ButtonRed = styled.div`
  font-size: rem-calc(14);
  float: left;
  width: 50%;
  text-align: center;
  ${media.desktop`
    font-size: rem-calc(14);
    padding-left:50px;
    float: left;
    text-align: center;
        `};
`;

const DecisionTree = styled.div`
  ${media.desktop`
  font-size: 14px;
  color: #000;
  list-style-type: none;
  margin: auto;
  width: 550px;
  padding: 10px;
    `};
`;

const Chosen = styled.span`
  position: absolute;
  top: 37%;
  text-align: center;
  width: 100%;
  font-size: 30px;
  text-transform: uppercase;
`;


class BadgeOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badge_type: '',
      badge_description: '',
      badge_text_color: '#fff'
    };
  }

  back_to_badgegrid() {
    this.props.history.push('/badge-cards');
  }

  to_form(badgepic) {
    this.props.updateData('badgepic', badgepic);
    this.props.history.push('/form');
  }

  render() {
    var chassis = localStorage.getItem('chassis_number');
    if (chassis == null) {
      this.props.history.push('/');
      console.log('there is no chassis stored in the localStorage');
    }
    var badgename = localStorage.getItem('badge_name');
    var badgetext = localStorage.getItem('badge_text');
    var text_color;
    var badge_type;
    var badge_description;
    var badgepic;
    if (badgetext === '1') {
      badgepic = 'badgeOne.png';
      badge_type = 'CLASSIC';
      badge_description =
        'It’s a proven fact that stripes make your MINI go faster. It’s also proven that blue makes people feel calm. Which is great, because with this badge your MINI is bound to cause quite a stir.';
      text_color = 'white';
    }
    if (badgetext === '2') {
      badgepic = 'badgeTwo.png';
      badge_type = 'ORANGE';
      badge_description =
        'MINI and the ORANGE go hand in hand. Why not  celebrate your MINI’s heritage with a badge as British as the car itself.';
      text_color = 'white';
    }
    if (badgetext === '3') {
      badgepic = 'badgeThree.png';
      badge_type = 'WHITE STRIPE';
      badge_description =
        'Why settle for one colour when you can have five? Add a little thrill to your grille with this distinctive design.';
      text_color = 'white';
    }
    if (badgetext === '4') {
      badgepic = 'badgeFour.png';
      badge_type = 'MINI TARTAN';
      badge_description =
        'Whether you’re driving yourself or the whole clan, our tartan badge is as Scottish as a set of bagpipes. And much easier on the ear.';
      text_color = 'white';
    }
    if (badgetext === '5') {
      badgepic = 'badgeFive.png';
      badge_type = 'BALANCE';
      badge_description =
        'Make a statement on and off the road with this ORANGE badge in classic black and white.';
      text_color = 'white';
    }
    if (badgetext === '6') {
      badgepic = 'badgeSix.png';
      badge_type = 'IRISH PRIDE';
      badge_description =
        'There’s no colour that’s more MINI than classic British Racing Green, put this badge on your grille and make your way to the starting line.';
      text_color = 'white';
    }
    if (badgetext === '7') {
      badgepic = 'badgeSeven.png';
      badge_type = 'CLASSIC';
      badge_description =
        'If you have the need, the need for speed, let the world know with a badge featuring CLASSIC in your name and preferred colour.';
      text_color = 'black';
    }
    if (badgetext === '8') {
      badgepic = 'badgeEight.png';
      badge_type = 'CLASSIC';
      badge_description = 'Warning. May induce white line fever.';
      text_color = 'black';
    }
    if (badgetext === '9') {
      badgepic = 'badgeNine.png';
      badge_type = 'THE RING';
      badge_description =
        'Our most powerful MINI ever deserves the badge to match. And there couldn’t be a design more fitting than one sporting a chequered flag.';
      text_color = 'white';
    }
    if (badgetext === '10') {
      badgepic = 'badgeTen.png';
      badge_type = 'CLASSIC';
      badge_description =
        'It may be orange, but this badge is the quickest way to make others green with envy.';
      text_color = 'black';
    }
    if (badgepic == null) {
      badgepic = 'badgeTen.png';
    }
    const divStyle = {
      color: text_color
    };
    return (
      <div>
        <FullPageWrapper>
          {/*Main heading*/}
          <Positiontxt>
            <span>
              <HappyHeader>
                NOW THAT'S A BADGE.
              </HappyHeader>
            </span>
          </Positiontxt>
          {/*Badge image */}

          {/* Button placement*/}
          <DecisionTree>
            <DescriptionWrapper>
              <BadgeLabel>
                <h2 className="badgeh">
                  {badge_type}
                  <LineMeUp />
                  {/*Needs to be aligned properly*/}
                </h2>
                <BadgeParagraph />
              </BadgeLabel>
            </DescriptionWrapper>

            <div id="badge-to-be-approved" className="badge-to-be-approved ">
              <figure>
                <img
                  alt="your personalised badge"
                  id="badge-img"
                  src={require('../../assets/images/badges-final/no-name-edit/' +
                    badgepic)}
                  className="happy-wear-badge"
                />
                <Chosen style={divStyle}>{badgename}</Chosen>
              </figure>
              <div className="badge-label">
                <span id="badge-type-name" className="line-me-up" />
                <div className="badgedesc">
                  {' '}
                  <p id="badge-desc"> {badge_description}</p>{' '}
                </div>
              </div>
            </div>
            <ButtonUTurn>
              <span>
                <Positiontxt>Second Thoughts?</Positiontxt>
              </span>
              <Button back onClick={() => this.back_to_badgegrid()}>
                GO BACK A PAGE
              </Button>
            </ButtonUTurn>
            <ButtonRed>
              <span>
                <Positiontxt>Happy?</Positiontxt>
              </span>
              <Button onClick={() => this.to_form(badgepic)}>
                TO THE NEXT PAGE
              </Button>
            </ButtonRed>
          </DecisionTree>
        </FullPageWrapper>
      </div>
    );
  }
}

export default BadgeOverview;
