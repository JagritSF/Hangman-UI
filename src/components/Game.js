/* 
  This file Contains the Hangman Game
*/
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Figure from './Figure';
import WrongLetters from './WrongLetters';
import Word from './Word';
import Popup from './Popup';
import Notification from './Notification';
import { showNotification as show } from '../helpers/helpers';
import { SaveLetterService } from '../services/SaveLettersService';
import { RandomWordService } from '../services/RandomWordService';
import { SaveLastWordService } from '../services/SaveLastWordService';
import { StorageService } from '../services/StorageService';

const Game = () => {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setselectedWord] = useState('');

  useEffect(() => {
    StorageService.getItem('last_word').then((lastWord) => {
      /*
        Check if user has any pending game left
      */
      if (lastWord) {
        setselectedWord(lastWord)
        StorageService.getItem('correct_letters').then((letters) => {
          /*
            Check if user has any correct letters in the previous game
          */
          if (letters) {
            var lettersString = letters;
            var lettersArray = lettersString.split(",");
            setCorrectLetters(lettersArray) 
          }
        })
        StorageService.getItem('wrong_letters').then((letters) => {
          /*
            Check if user has any wrong letters in the previous game
          */
          if (letters) {
            var lettersString = letters;
            var lettersArray = lettersString.split(",");
            setWrongLetters(lettersArray)
          }
        })
      } else {
        /*
          Get Random words from RandomWordService
        */
        RandomWordService.getRandomWord()
        .then(response => {
            let words = response.data
            /*
              Set one of the Random word as Current SelectedWord
            */
            setselectedWord(words[Math.floor(Math.random() * words.length)])
        })
      }
    })
  }, [])

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      /*
        Check for only Alphabets keys
      */
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        /*
          Check if the word to be guess has the input letter
        */
        if (selectedWord.includes(letter)) {
          /*
            Check if correctLetters State has the input Letter
          */
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
            StorageService.getItem('user_id').then((userId) => {
              if (userId) {
                /*
                  Save the Correct Letter to Database
                */
                const correctLetterData = new FormData();
                correctLetterData.append('letter', letter)
                correctLetterData.append('user_id', userId)
                correctLetterData.append('word', selectedWord)
                SaveLetterService.saveCorrectLetters(correctLetterData)
              }
            })
          } else {
            /*
              If the Letter is pressed again show error
            */
            show(setShowNotification);
          }
        } else {
          /*
            Check if wrongLetters State has the input Letter
          */
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
            StorageService.getItem('user_id').then((userId) => {
              if (userId) {
                /*
                  Save the Wrong Letter to Database
                */
                const wrongLetterData = new FormData();
                wrongLetterData.append('letter', letter)
                wrongLetterData.append('user_id', userId)
                wrongLetterData.append('word', selectedWord)
                SaveLetterService.saveWrongLetters(wrongLetterData)
              }
            })
          } else {
            /*
              If the Letter is pressed again show error
            */
            show(setShowNotification);
          }
        }
        StorageService.getItem('user_id').then((userId) => {
          if (userId) {
            const lastWord = new FormData();
            lastWord.append('word', selectedWord)
            lastWord.append('user_id', userId)
            SaveLastWordService.saveLastWord(lastWord)
          }
        })
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable, selectedWord]);

  /*
    Calls when the user click on play again button in the Popup
  */
  function playAgain() {
    setPlayable(true);
    /*
      Set correctLetters and wrongLetters state to empty arrays
    */
    setCorrectLetters([]);
    setWrongLetters([]);
    /*
      Get Random words from RandomWordService
    */
    RandomWordService.getRandomWord()
    .then(response => {
        let words = response.data
        /*
          Set one of the Random word as Current SelectedWord
        */
        setselectedWord(words[Math.floor(Math.random() * words.length)])
    })
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default Game;
