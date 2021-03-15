/*  
    This file contains the service for saving correct and wrong letters guessed by the user to Database
*/
import EnvService from './EnvService';

export class  SaveLetterService {
    
  static saveWrongLetters = (data) => {
    return EnvService.apiClient({
      method: 'post',
      url: EnvService.host+'api/savewrongletters/',
      data: data
    });
  }

  static saveCorrectLetters = (data) => {
    return EnvService.apiClient({
      method: 'post',
      url: EnvService.host+'api/savecorrectletters/',
      data: data
    });
  }
  }