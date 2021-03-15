/* 
  This file Contains the Home Page of Hangman Game
  User will a Email here to play the game
*/
import React, {useState, useEffect} from 'react'
import { StartGameService } from '../services/StartGameService';
import { useHistory} from 'react-router-dom'
import { StorageService } from '../services/StorageService';

const Home = () => {

  const [email, setEmail] = useState('')
  const history = useHistory()

  useEffect(() => {
    /* 
      Clear Local storage
    */
    StorageService.clearLocalStorage()
  }, [])

  const handleEmailChange = (e) => {
    e.preventDefault();
    /* 
      Set email entered by user on state
    */
    setEmail(e.target.value)
  }

  /* 
    Trrigers when the user will hit start game button
  */
  const startGame = (e) => {
    e.preventDefault()
    const emailData = new FormData()
    emailData.append('email', email)
    /* 
      Start Game
    */
    StartGameService.startGame(emailData)
    .then(response => {
      if (response.data.hasOwnProperty('last_word')) {
        /* 
          Saved last played game word to local storage
        */
        StorageService.setItem('last_word', response.data.last_word)
      }
      if (response.data.hasOwnProperty('correct_letters')) {
        /* 
          Saved last played game correct letters to local storage
        */
        StorageService.setItem('correct_letters', response.data.correct_letters)
      }
      if (response.data.hasOwnProperty('wrong_letters')) {
        /* 
          Saved last played game wrong letters to local storage
        */
        StorageService.setItem('wrong_letters', response.data.wrong_letters)
      }
      /* 
        Saved user ID to local storage
      */
      StorageService.setItem('user_id', response.data.user_id)
      history.push("/game");
    })
}

  return (
    <div>
        <p>Please enter your Email</p>
        <form >
            <div>
                <input type="text" name="setemail" placeholder="Enter Email" onChange={handleEmailChange}/>
            </div><br />
            <div>
                <button type="submit" onClick={startGame}>Start Game</button>
            </div>
        </form>
    </div>
  )
}

export default Home
