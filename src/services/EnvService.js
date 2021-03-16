/*  
    This file contains the host and api client for the API calls
*/
import axios from 'axios';

export default class EnvService{
  static host = 'https://31dae828f094.ngrok.io/';
  static apiClient = axios;
}