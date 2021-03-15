/*  
    This file contains the service for starting the game after the user add his/her email
*/
import axios from 'axios';
import EnvService from './EnvService';

export class  StartGameService {
    
    static startGame = (data) => {
        return axios({
            method: 'post',
            url: EnvService.host+'api/startGame/',
            data: data
        });
    }
}