/*  
    This file contains the service for saving correct and wrong letters guessed by the user to Database
*/
import axios from 'axios';
import EnvService from './EnvService';

export class  SaveLetterService {
    
    static saveWrongLetters = (data) => {
        return axios({
            method: 'post',
            url: EnvService.host+'api/savewrongletters/',
            data: data
        });
    }

    static saveCorrectLetters = (data) => {
        return axios({
            method: 'post',
            url: EnvService.host+'api/savecorrectletters/',
            data: data
        });
    }
}