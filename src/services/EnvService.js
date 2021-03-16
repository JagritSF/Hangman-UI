/*  
    This file contains the host and api client for the API calls
*/
import axios from 'axios';

export default class EnvService{
  static host = 'https://hangman-laravel.herokuapp.com/';
  static apiClient = axios;
}