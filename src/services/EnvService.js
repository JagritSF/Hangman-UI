/*  
    This file contains the host and api client for the API calls
*/
import axios from 'axios';

export default class EnvService{
  static host = 'https://f8decbc07908.ngrok.io/';
  static apiClient = axios;
}