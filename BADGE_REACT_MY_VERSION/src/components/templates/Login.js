import React, { Component } from 'react';
import styled from 'styled-components';
import media from '../../config/media';
import api from '../../api';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Header from '../molecules/Header';

const Tagline = styled.p`
  text-align: center;

  ${media.tablet`
      font-size: 16px;
      font-family: "Times New Roman";
      color: #000;
    `};

  ${media.desktop`
  font-size: 20px;
  font-family: "Times New Roman";
  color: #000;
  display:inline-block;
  margin-top:0px;
  margin-bottom:20px;
  `};
`;

// 350px = Header + Hero
const Wrapper = styled.div`
  background: #fff;
  height: auto;
  ${media.desktop`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align:center;
    `};
`;

const Wrapper2 = styled.div`
  background: #f1f1f1;

  ${media.desktop`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align:center;
      `};
`;

const Content = styled.div`
  ${media.desktop`
        padding: 0;
        width: 100%;
        `};
`;

const Content2 = styled.div`
  padding: 53px 50px;

  ${media.desktop`
          padding: 0;
          width: 100%;
          background:#F1F1F1;
          `};
`;

const FormFields = styled.div`
  margin-top: 20px;
  margin-bottom:35px;

  > * {
    display: block;
    margin-bottom: 10px;
    width: 100%;
  }

  ${media.desktop`
            > * {
              display: inline-block;
              height: 120px;
              vertical-align: top;
              width: initial;
            }

            input {
              margin: 0 10px 10px 0;
              width: 628px;
              font-size:30px;
              padding-left: 30px;
              padding-right: 30px;
              font-family: "Times New Roman";
              text-align:center;
              color: #000;
            }
            `};
`;

const ErrorText = styled.div`
  color: #cc0000;
  text-align: center;
  font-family: "Times New Roman";
  font-size: 16px;
  margin: 20px 0;
`;

const FooterComponent = styled.footer`
            background-color: #000000;
            color: #ffffff;
            height: auto;
            min-height: 80px;
            padding: 10px 50px 5px; 0;
            width: 100%;
            `;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chassisNumber: '',
      errors: null
    };

    this.changeChassisNumber = this.changeChassisNumber.bind(this);
    this.login = this.login.bind(this);
  }

  changeChassisNumber(e) {
    this.setState({
      chassisNumber: e.target.value
    });
  }

  login() {
    if (this.state.fetching) {
      return;
    }
    this.setState({
      errors: null,
      fetching: true
    });

    api
      .getChassisData(this.state.chassisNumber)
      .then(data => {
        this.setState({
          fetching: false
        });

        if (data.is_active === false && data.is_approved === true) {
          this.setState({
            errors: `Your Badge has already been requested and processed.`
          });
        } else {
          this.props.updateData('chassis', this.state.chassisNumber);
          this.props.history.push('/badge-cards');
        }
      })
      .catch(err => {
        this.setState({
          fetching: false,
          errors:
            'This is not a valid code, please check you have entered it correctly.'
        });
        console.error('Error fetching Badge Details', err);
      });
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.login();
    }
  };

  render() {
    return (
      <div>
        <section className="content-body">
          <Header />

          <Wrapper>
            <Content>
              <div className="tag-line-intro">
                <div>
                  <Heading white className="main line-it-after">
                    Congratulations on your new badge.
                  </Heading>
                  <div className="tag-wrap">
                    <Tagline>
                      <span>NOW, IT'S TIME TO PERSONALISE IT.</span>
                    </Tagline>
                  </div>
                </div>
              </div>
            </Content>
          </Wrapper>
          <Wrapper2>
            <Content2>
              <div id="inner-home">
                <div className="form-elements">
                  {this.state.errors ? (
                    <ErrorText>{this.state.errors}</ErrorText>
                  ) : null}
                  <label htmlFor="id_code">
                    Enter the badge id number from your email to begin.
                  </label>
                  <FormFields>
                    <Input
                      placeholder="BADGE NUMBER"
                      type="text"
                      name="code"
                      id="id_code"
                      maxLength="7"
                      value={this.state.chassisNumber}
                      onChange={this.changeChassisNumber}
                      onKeyPress={this._handleKeyPress}
                    />
                  </FormFields>
                </div>
              </div>
            </Content2>
          </Wrapper2>
        </section>

        <FooterComponent>
          <div className="container_login">
            <ul className="footer-list">
            </ul>
          </div>
        </FooterComponent>
      </div>
    );
  }
}

export default Login;
