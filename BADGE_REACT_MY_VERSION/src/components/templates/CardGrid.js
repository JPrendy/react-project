import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import '../styles/app.css';
import '../styles/badgegrid.css';
import { Card, Container, Header } from 'semantic-ui-react';
import LikeItBtn from '../atoms/LikeItBtn';
import api from '../../api';
import arrow from '../../assets/images/icons/doublearrow.svg';

const FontAlignBg = styled.p`
  font-size: rem-calc(12);
  text-align: center;
  z-index: 20;
  margin-top: -105px;
  text-transform: uppercase;
`;

const divStyle_badge_back = {
  zIndex: 10
};

const badge_color = {
  color: 'white'
};

class CardGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      pass: true,
      test: false
    };
    this.move_to_next_page = this.move_to_next_page.bind(this);
    this.test = this.test.bind(this);
    this.isValid = this.isValid.bind(this);
    this._isMyComponentMounted = true;
  }

  test(event) {
    this.setState(
      {
        text: event.target.value,
        test: true
      },
      () => {}
    );
  }

  test2(event) {
    var okay = event.target.value;
    if (okay === '') {
      this.setState({
        errors: null
      });
      console.log('the field is blank');
    } else {
      var badge_string = okay.length;
      if (badge_string >= 3) {
        setTimeout(
          function() {
            this.move_to_next_page(okay);
          }.bind(this),
          200
        );
      } else {
        if (this.state.test === true) {
          this.setState({
            fetching: false,
            pass: true
          });
          this.isValid(okay);
        }
      }
    }
  }

  move_to_next_page(okay) {
    console.log('this is the okay field ' + okay);
    if (this.state.fetching) {
      return;
    }

    this.setState({
      errors: null,
      fetching: true
    });

    api
      .getBannedWord(okay)
      .then(data => {
        this.setState({
          fetching: false,
          errors: 'Very funny. Try again.',
          pass: false
        });
        console.log(data);
      })
      .catch(err => {
        this.setState({
          fetching: false,
          pass: true
        });
        if (this.state.test === true) {
          this.isValid(this.state.text);
        }
      });
  }

  isValid(str) {
    console.log(str);
    var test = /^[\x00-\x7F]*$/.test(str);
    console.log('this is an ascii test ' + test);
    if (test === true) {
      this.props.updateData('badgename', str);
    } else {
      this.setState({
        fetching: false,
        errors: 'Try a different badgename.',
        pass: false
      });
    }
  }

  handleSort(value, badgetype) {
    this.props.updateData('badgetype_no', badgetype);
    this.next_page();
  }

  next_page() {
    if (this.state.pass === true) {
      this.props.history.push('/badge-overview');
    }
  }

  render() {
    var msg = this.state.text;
    var error_msg = '?#*&%!';
    var chassis = localStorage.getItem('chassis_number');
    if (chassis == null) {
      this.props.history.push('/');
      console.log('there is no chassis stored in the localStorage');
    }

    return (
      <div>
        <div className="row" id="badge-sign-up">
          <div className="naming-form" id="frm-name-it">
            <div className="container">
              <div className="content_main">
                <label>
                  <span>
                    ADD YOUR NAME<i className="show-for-small">.</i>
                  </span>
                  <img
                    className="arrow_indicator"
                    alt="right arrow pointing to the input bar"
                    src={arrow}
                    vertical-align="midle"
                    height="35px"
                    width="25px"
                  />
                </label>
              </div>

              <div className="content2">
                <input
                  type="text"
                  name="badge_name"
                  id="id_badge_name"
                  placeholder="Type here"
                  maxLength="8"
                  onChange={this.test.bind(this)}
                  onKeyUp={this.test2.bind(this)}
                  value={this.state.text}
                />

              </div>
            </div>
          </div>
        </div>
        <div>
          {this.state.errors ? (
            <div className="form-errors">
              <div className="form-msg">{this.state.errors}</div>
            </div>
          ) : null}
        </div>
        <Grid.Row>
          <Card className="card_back_SpeedStripesBlue">
            <Card.Content className="SpeedStripesBlue">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeOne.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="SpeedStripesBlue"
              >
                <Header className="backtitle" as="h4" floated="left">
                  CLASSIC
                </Header>
                <p className="descriptionparagraph">
                  It’s a proven fact that stripes make your MINI go faster. It’s
                  also proven that blue makes people feel calm. Which is great,
                  because with this badge your MINI is bound to cause quite a
                  stir.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>CLASSIC</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeOne.png'}
                  onClick={() =>
                    this.handleSort('badgeOne.png', 1)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_Orange">
            <Card.Content className="Orange">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeTwo.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>
                  {' '}
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                id="Orange"
                style={divStyle_badge_back}
                className="Orange"
              >
                <Header className="backtitle" as="h4" floated="left">
                  ORANGE
                </Header>
                <p className="descriptionparagraph">
                  MINI and the ORANGE go hand in hand. Why not celebrate
                  your MINI’s heritage with a badge as British as the car
                  itself.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>ORANGE</b>
                </Card.Header>

                <LikeItBtn
                  value={'badgeTwo.png'}
                  onClick={() =>
                    this.handleSort('badgeTwo.png', 2)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_RayNoName">
            <Card.Content className="RayNoName">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeThree.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>{this.state.errors ? error_msg : msg}</FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="RayNoName"
              >
                <Header as="h4" className="backtitle" floated="left">
                  WHITE STRIPE
                </Header>
                <p className="descriptionparagraph">
                  Why settle for one colour when you can have five? Add a little
                  thrill to your grille with this distinctive design.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>WHITE STRIPE</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeThree.png'}
                  onClick={() => this.handleSort('badgeThree.png', 3)}
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_MiniTartanNoName">
            <Card.Content className="MiniTartanNoName">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeFour.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="MiniTartanNoName"
              >
                <Header as="h4" className="backtitle" floated="left">
                  MINI TARTAN
                </Header>
                <p className="descriptionparagraph">
                  Whether you’re driving yourself or the whole clan, our tartan
                  badge is as Scottish as a set of bagpipes. And much easier on
                  the ear.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>MINI TARTAN</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeFour.png'}
                  onClick={() =>
                    this.handleSort('badgeFour.png', 4)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_BlackJackNoName">
            <Card.Content className="BlackJackNoName">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeFive.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="BlackJackNoName"
              >
                <Header as="h4" className="backtitle" floated="left">
                  BALANCE
                </Header>
                <p className="descriptionparagraph">
                  Make a statement on and off the road with this ORANGE
                  badge in classic black and white.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>BALANCE</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeFive.png'}
                  onClick={() =>
                    this.handleSort('badgeFive.png', 5)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_GreenStripes">
            <Card.Content className="GreenStripes">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeSix.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="GreenStripes"
              >
                <Header as="h4" className="backtitle" floated="left">
                  IRISH PRIDE
                </Header>
                <p className="descriptionparagraph">
                  There’s no colour that’s more MINI than classic British Racing
                  Green, put this badge on your grille and make your way to the
                  starting line.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>IRISH PRIDE</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeSix.png'}
                  onClick={() =>
                    this.handleSort('badgeSix.png', 6)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_speedStripesBourbon">
            <Card.Content className="speedStripesBourbon">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeSeven.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="speedStripesBourbon"
              >
                <Header as="h4" className="backtitle" floated="left">
                  CLASSIC
                </Header>
                <p className="descriptionparagraph">
                  If you have the need, the need for speed, let the world know
                  with a badge featuring CLASSIC in your name and
                  preferred colour.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>CLASSIC</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeSeven.png'}
                  onClick={() =>
                    this.handleSort('badgeSeven.png', 7)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_SpeedStripesWhite">
            <Card.Content className="SpeedStripesWhite">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeEight.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg>{this.state.errors ? error_msg : msg}</FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="SpeedStripesWhite"
              >
                <Header as="h4" className="backtitle" floated="left">
                  CLASSIC
                </Header>
                <p className="descriptionparagraph">
                  Warning. May induce white line fever.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>CLASSIC</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeEight.png'}
                  onClick={() =>
                    this.handleSort('badgeEight.png', 8)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_JcwNoName">
            <Card.Content className="JcwNoName">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeNine.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg style={badge_color}>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="JcwNoName"
              >
                <Header as="h4" className="backtitle" floated="left">
                  THE RING
                </Header>
                <p className="descriptionparagraph">
                  Our most powerful MINI ever deserves the badge to match. And
                  there couldn’t be a design more fitting than one sporting a
                  chequered flag.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b> THE RING </b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeNine.png'}
                  onClick={() => this.handleSort('badgeNine.png', 9)}
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card className="card_back_SpeedStripesGinger">
            <Card.Content className="SpeedStripesGinger">
              <figure>
                <img
                  src={require(`../../assets/images/badges-final/no-name-edit/badgeTen.png`)}
                  alt=""
                  display="inline-block"
                  vertical-align="middle"
                  height="160px"
                  width="140px"
                />
                <FontAlignBg>
                  {this.state.errors ? error_msg : msg}
                </FontAlignBg>
              </figure>
              <Container
                text
                style={divStyle_badge_back}
                className="SpeedStripesGinger"
              >
                <Header as="h4" className="backtitle" floated="left">
                  CLASSIC
                </Header>
                <p className="descriptionparagraph">
                  It may be orange, but this badge is the quickest way to make
                  others green with envy.
                </p>
              </Container>
            </Card.Content>
            <Container className="buttonwrapper">
              <Card.Description>
                <Card.Header className="badgetitles">
                  <b>CLASSIC</b>
                </Card.Header>
                <LikeItBtn
                  value={'badgeTen.png'}
                  onClick={() =>
                    this.handleSort('badgeTen.png', 10)
                  }
                >
                  I CHOOSE YOU!
                </LikeItBtn>
              </Card.Description>
            </Container>
          </Card>
        </Grid.Row>
      </div>
    );
  }
}

export default CardGrid;
