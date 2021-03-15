/*  
    This file contains the service for getting random words
*/
import EnvService from './EnvService';

export class  RandomWordService {
    
  static getRandomWord = () => {
    return EnvService.apiClient({
      method: 'get',
      url: 'https://random-word-api.herokuapp.com//word?number=50',
    });
  }
}