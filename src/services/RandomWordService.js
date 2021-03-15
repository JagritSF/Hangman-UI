/*  
    This file contains the service for getting random words
*/
import axios from 'axios';

export class  RandomWordService {
    
    static getRandomWord = () => {
        return axios({
            method: 'get',
            url: 'https://random-word-api.herokuapp.com//word?number=50',
        });
    }
}