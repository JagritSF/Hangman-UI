/*  
    This file contains the service for saving last Random word to be guessed to Database
*/
import EnvService from './EnvService';

export class  SaveLastWordService {
    
  static saveLastWord = (data) => {
    return EnvService.apiClient({
      method: 'post',
      url: EnvService.host+'api/savelastword/',
      data: data
    });
  }
}