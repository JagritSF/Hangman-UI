/*  
    This file contains the host and api client for the API calls
*/
import axios from 'axios';

export default class EnvService{
  static host = 'http://127.0.0.1:8000/';
  static apiClient = axios;
}