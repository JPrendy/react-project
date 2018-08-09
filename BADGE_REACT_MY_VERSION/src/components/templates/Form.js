import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/login.css';
import '../styles/form.css';
import media from '../../config/media';
import api from '../../api';
import html2canvas from 'html2canvas';
//import grill_no_badge from '../../assets/images/bgs/grill-no-badge.png';

const Wrapper = styled.div`
  ${media.desktop`
  margin-left: auto;
  margin-right: auto;
  float: none;
  text-align:center;
  `};
`;

const Content = styled.div`
  ${media.desktop`
    padding: 53px 50px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    float: none;
    `};
`;

const TwoColField = styled.div`
  > * {
    width: 100%;
    display: inline-block;
    margin-right: 5%;
    vertical-align: top;
    &:last-child {
      margin-right: 0;
    }
  }
  ${media.desktop`
      > * {
        width: 47.5%;
        display: inline-block;
        margin-right: 5%;
        vertical-align: top;
        &:last-child {
          margin-right: 0;
        }
      }



        `};
`;

function validate(firstname, surname, email, address, Suburb, State, postcode) {
  // true means invalid, so our conditions got reversed
  return {
    firstname: firstname.length === 0,
    surname: surname.length === 0,
    email: email.length === 0,
    address: address.length === 0,
    Suburb: Suburb.length === 0,
    State: State.length === 0,
    postcode: postcode.length === 0
  };
}

class Form_Details extends Component {
  constructor(props) {
    super(props);
    this.State = {
      firstname: '',
      surname: '',
      email: '',
      address: '',
      Suburb: '',
      State: '',
      postcode: ''
    };
    this.changeChassisNumber = this.changeChassisNumber.bind(this);
    this.changeChassisNumber2 = this.changeChassisNumber2.bind(this);
    this.changeChassisNumber3 = this.changeChassisNumber3.bind(this);
    this.changeChassisNumber4 = this.changeChassisNumber4.bind(this);
    this.changeChassisNumber5 = this.changeChassisNumber5.bind(this);
    this.changeChassisNumber6 = this.changeChassisNumber6.bind(this);
    this.changeChassisNumber7 = this.changeChassisNumber7.bind(this);
  }

  changeChassisNumber(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  changeChassisNumber2(e) {
    this.setState({
      surname: e.target.value
    });
  }

  changeChassisNumber3(e) {
    this.setState({
      email: e.target.value
    });
  }
  changeChassisNumber4(e) {
    this.setState({
      address: e.target.value
    });
  }
  changeChassisNumber5(e) {
    this.setState({
      Suburb: e.target.value
    });
  }
  changeChassisNumber6(e) {
    this.setState({
      State: e.target.value
    });
  }
  changeChassisNumber7(e) {
    this.setState({
      postcode: e.target.value
    });
  }

  componentDidMount() {
    var chassis = localStorage.getItem('chassis_number');
    if (this.State.fetching) {
      return;
    }
    this.setState({
      errors: null,
      fetching: true
    });

    api
      .getChassisData(chassis)
      .then(data => {
        this.setState({
          firstname: `${data.FIRSTNAME}`,
          surname: `${data.SURNAME}`,
          email: `${data.EMAIL}`,
          address: `${data.ADDRESS1}`,
          Suburb: `${data.Suburb}`,
          State: `${data.State}`,
          postcode: `${data.POSTCODE}`
        });
      })
      .catch(err => {
        this.setState({
          fetching: false
        });
        console.error('Error fetching Chassis Details', err);
      });
  }

  go_to_share_text(chassis_value, badgename, badgepic, screenshot) {
    document.getElementById('submit_change').value = 'PROCESSING...';
    api
      .add_post(
        chassis_value,
        badgename,
        badgepic,
        this.State.firstname,
        this.State.surname,
        this.State.email,
        this.State.address,
        this.State.Suburb,
        this.State.State,
        this.State.postcode,
        screenshot
      )
      .then(data => {
        this.setState({
          fetching: false
        });
        this.props.history.push('/share-it');
      })
      .catch(err => {
        this.setState({
          fetching: false,
          errors:
            'This is not a valid code, please check you have entered it correctly.'
        });
        console.error('Error fetching Chassis Details', err);
      });
  }

  to_test(chassis_value, badgename, badgepic) {
    html2canvas(document.querySelector('.grill-holder-test')).then(canvas => {
      var screenshot = canvas.toDataURL('image/png');
      this.go_to_share_text(chassis_value, badgename, badgepic, screenshot);
    });
  }

  render() {
    const errors = validate(
      this.State.firstname,
      this.State.surname,
      this.State.email,
      this.State.address,
      this.State.Suburb,
      this.State.State,
      this.State.postcode
    );

    var badgepic = localStorage.getItem('badge_text');
    var badgename = localStorage.getItem('badge_name');
    var chassis = localStorage.getItem('chassis_number');
    var badgepic2 = localStorage.getItem('badge_picture');
    if (chassis == null) {
      this.props.history.push('/');
      console.log('there is no chassis stored in the localStorage');
    }
    var text_color;
    if (badgepic === '3' || badgepic === '8') {
      text_color = 'black';
    } else {
      text_color = 'white';
    }
    const pStyle = {
      color: text_color
    };
    return (
      <div>
        <section className="content-body">
          <Wrapper>
            <Content>
              <figure className="grill-holder-test">
                <img
                  alt="display car grill"
                  //src={grill_no_badge}
                  className="grill-no"
                />
                <div className="badge-position-test">
                  <img
                    id="chosen-badge-img"
                    alt="your chosen badge"
                    src={require('../../assets/images/badges-final/no-name-edit/' +
                      badgepic2)}
                    height="160"
                    width="140"
                  />
                </div>
                <p
                  id="chosen-badge-text"
                  className="persons-name-test"
                  style={pStyle}
                >
                  {badgename}
                </p>
              </figure>

              <section id="your-details">
                <div className="row">
                  <div className="your-details-title">
                    <h1 className="main-form">Form Details </h1>
                  </div>
                  <div className="your-details-title">
                    <form className="ui form">
                      <div className="equal width fields">
                        <TwoColField>
                          <div className="field">
                            <label htmlFor="form-subcomponent-shorthand-input-first-name">
                              FirstName
                            </label>
                            <div className="ui input">
                              <input
                                type="text"
                                className="cool"
                                id="form-subcomponent-shorthand-input-first-name"
                                placeholder="First Name"
                                value={this.State.firstname}
                                onChange={this.changeChassisNumber}
                              />
                              <small
                                className={
                                  errors.firstname ? 'error2' : 'error'
                                }
                              >
                                required.
                              </small>
                            </div>
                          </div>
                          <div className="field">
                            <label htmlFor="form-subcomponent-shorthand-input-surname">
                              Surname
                            </label>
                            <div className="ui input">
                              <input
                                type="text"
                                className="cool"
                                id="form-subcomponent-shorthand-input-last-name"
                                placeholder="Surname"
                                value={this.State.surname}
                                onChange={this.changeChassisNumber2}
                              />
                              <small
                                className={errors.surname ? 'error2' : 'error'}
                              >
                                required.
                              </small>
                            </div>
                          </div>
                        </TwoColField>
                        <div className="field">
                          <label htmlFor="form-subcomponent-shorthand-input-email">
                            Email
                          </label>
                          <div className="ui input">
                            <input
                              type="text"
                              className="cool"
                              placeholder="Email"
                              value={this.State.email}
                              onChange={this.changeChassisNumber3}
                            />
                            <small
                              className={errors.email ? 'error2' : 'error'}
                            >
                              required.
                            </small>
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="form-subcomponent-shorthand-input-street-address">
                            Street Address
                          </label>
                          <div className="ui input">
                            <input
                              type="text"
                              className="cool"
                              placeholder="Street Address"
                              value={this.State.address}
                              onChange={this.changeChassisNumber4}
                            />
                            <small
                              className={errors.address ? 'error2' : 'error'}
                            >
                              required.
                            </small>
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="form-subcomponent-shorthand-input-Suburb">
                          Street Address 2
                          </label>
                          <div className="ui input">
                            <input
                              type="text"
                              className="cool"
                              placeholder="Street Address 2"
                              value={this.State.Suburb}
                              onChange={this.changeChassisNumber5}
                            />
                            <small
                              className={errors.Suburb ? 'error2' : 'error'}
                            >
                              required.
                            </small>
                          </div>
                        </div>
                        <TwoColField>
                          <div className="field">
                            <label htmlFor="form-subcomponent-shorthand-input-State">
                              County
                            </label>
                            <div className="ui input">
                              <input
                                type="text"
                                className="cool"
                                placeholder="County"
                                value={this.State.State}
                                onChange={this.changeChassisNumber6}
                                maxLength="3"
                              />
                              <small
                                className={errors.State ? 'error2' : 'error'}
                              >
                                required.
                              </small>
                            </div>
                          </div>
                          <div className="field">
                            <label htmlFor="form-subcomponent-shorthand-input-postcode">
                              Postcode
                            </label>
                            <div className="ui input">
                              <input
                                type="text"
                                className="cool"
                                placeholder="Postcode"
                                value={this.State.postcode}
                                onChange={this.changeChassisNumber7}
                                maxLength="4"
                              />
                              <small
                                className={errors.postcode ? 'error2' : 'error'}
                              >
                                required.
                              </small>
                            </div>
                          </div>
                        </TwoColField>
                      </div>
                    </form>
                    <input
                      type="hidden"
                      name="elqFormName"
                      value="name-your-mini"
                    />
                    <input type="hidden" name="elqSiteID" value="59175416" />
                    <input
                      id="elq-badgename"
                      type="hidden"
                      name="badge_name"
                      value=""
                    />
                    <div className="row" id="give-us-deets-submit">
                      <input
                        id="submit_change"
                        type="submit"
                        className="button mini-black-button full"
                        onClick={() =>
                          this.to_test(chassis, badgename, badgepic)
                        }
                        value="SUBMIT"
                      />
                    </div>

                    <div className="row" id="privacy-disclaimer">
                    </div>
                  </div>
                  {/*  </form> */}
                </div>
              </section>
            </Content>
          </Wrapper>
        </section>
      </div>
    );
  }
}

export default Form_Details;
