/*  
    This file contains the service for saving last Random word to be guessed to Database
*/
import axios from 'axios';
import EnvService from './EnvService';

export class  SaveLastWordService {
    
    static saveLastWord = (data) => {
        return axios({
            method: 'post',
            url: EnvService.host+'api/savelastword/',
            data: data
        });
    }
}