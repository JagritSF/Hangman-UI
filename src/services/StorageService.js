/*  
    This file contains the services for local storage of the application
*/
export class StorageService{
  static setItem = (key,value) => {
    return Promise.resolve().then(()=>{
      localStorage.setItem(key, value);
    });
  }
  static getItem = (key) => {
    return Promise.resolve().then(()=>{
      return localStorage.getItem(key);
    });
  }
  static deleteItem = (key) => {
    return Promise.resolve().then(()=>{
      localStorage.removeItem(key);
    });
  }
  static clearLocalStorage = () => {
    return localStorage.clear();
  }
}