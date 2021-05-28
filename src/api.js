import axios from 'axios';

export default axios.create({
  baseURL: 'https://entropiya-api.herokuapp.com/api/',
  // baseURL: 'http://localhost:5000/'
});
