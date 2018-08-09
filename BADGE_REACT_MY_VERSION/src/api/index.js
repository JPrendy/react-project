import axios from 'axios';

// const API_ROOT =
  // process.env.REACT_APP_API_URL || 'http://wp-rest.uat.afk-lab.com/';

 const API_ROOT = 'http://localhost:8000/quickstart';


const getChassisData = function(chassisNumber) {
  const endpoint = `${API_ROOT}/${chassisNumber}/`;

  return axios
    .get(endpoint)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err));
};


// const getChassisData = function(chassisNumber) {
//   const endpoint = `${API_ROOT}api/welcomepack/${chassisNumber}/`;

//   return axios
//     .get(endpoint)
//     .then(res => Promise.resolve(res.data))
//     .catch(err => Promise.reject(err));
// };

const getBannedWord = function(bannedword) {
  const endpoint = `${API_ROOT}api/bannedword/${bannedword}/`;

  return axios
    .get(endpoint)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err));
};

const add_post = function(
  chassisNumber,
  badgename,
  badgetype,
  firstname,
  surname,
  email,
  address,
  Suburb,
  State,
  postcode,
  screenshot
) {
  var badgename_u = badgename.toUpperCase();
  var State_u = State.toUpperCase();
  var postcode_u = postcode.toUpperCase();
  const endpoint = `${API_ROOT}api/welcomepack/${chassisNumber}/`;
  return axios
    .put(endpoint, {
      FIRSTNAME: `${firstname}`,
      SURNAME: `${surname}`,
      EMAIL: `${email}`,
      ADDRESS1: `${address}`,
      Suburb: `${Suburb}`,
      State: State_u,
      POSTCODE: postcode_u,
      BADGENAME: badgename_u,
      BADGETYPE: `${badgetype}`,
      is_active: false,
      is_approved: true,
      images_base64: screenshot
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const saveGloveChoices = function(
  chassisNumber,
  name,
  test,
  firstname,
  surname,
  email,
  address,
  Suburb,
  State,
  postcode
) {
  const endpoint = `${API_ROOT}api/glove-invitations/${chassisNumber}/`;

  const payload = {
    is_active: name,
    is_approved: test,
    FIRSTNAME: firstname,
    SURNAME: surname,
    EMAIL: email,
    ADDRESS1: address,
    Suburb: Suburb,
    State: State,
    POSTCODE: postcode
  };

  return axios
    .put(endpoint, payload)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err));
};

export default {
  getChassisData,
  saveGloveChoices,
  getBannedWord,
  add_post
};
