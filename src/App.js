import React, { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid"; 
import Confetti from 'react-confetti';



export default function App() {
    const [die, setDie] = React.useState(allNewDice())
    const [tenzies,setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = die.every(dice => dice.isHeld)
        const firstValue = die[0].value
        const allValues = die.every(dice => dice.value === firstValue)
        if(allHeld && allValues){
            setTenzies(true)
            
        }
    }, [die])
    function generateNewDie(){
        return {
            value : Math.ceil(Math.random() * 6),
            isHeld : false,
            id : nanoid()

             
    }
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        
        return newDice
    }



    function rollDice() {
        if(!tenzies){
        setDie(prevDice => prevDice.map(die =>
            {
                return die.isHeld ?
                die:
                generateNewDie()
            }))} else {
                setTenzies(false)
                setDie(allNewDice())
            }
    }

    function handleDice(id){
        setDie(prevDice => prevDice.map(die => {
           return die.id === id ? 
           {...die, isHeld: !die.isHeld}: 
           die
        }))
    
    }
  

   
    const dieElement = die.map(dice => (<Die 
        key = {dice.id}
         value={dice.value} 
         isHeld = {dice.isHeld} 
        handleDice = {() => handleDice(dice.id)} 
        />
        ))
        
    return (
        <main>
            {tenzies && <Confetti  />}
            <h1 className="title">Tenzies</h1>
            <div className="instructions"><h3>Enjoy The Game</h3><p>Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className='die-container'>
                {dieElement}
            
            </div>
            <button onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice" }</button>
            
        </main>
    )
}
