/*  
    This file contains the service for starting the game after the user add his/her email
*/
import EnvService from './EnvService';

export class  StartGameService {
    
  static startGame = (data) => {
    return EnvService.apiClient({
      method: 'post',
      url: EnvService.host+'api/startGame/',
      data: data
    });
  }
}