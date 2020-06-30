import React, { useState } from 'react';
import './App.css';
import Calculator from './calculator.js'

const calculator = new Calculator()

function App() {
  const [equation, setEquation] = useState(0)

  const inputDigit = (event) => {
    const innerText = event.target.innerText
    const newDigit = parseInt(innerText, 10)
    const outPut = calculator.inputDigit(newDigit)
    setEquation(outPut)
  }
  

  return (
    <div className="App">
      <div className={'calcBorder'}>
        <div className={'display'}>
          <div>{equation}</div>
        </div>
        <div className={'buttons'}>
          <div onClick={inputDigit}>7</div>
          <div onClick={inputDigit}>8</div>
          <div onClick={inputDigit}>9</div>
          <div>/</div>
          <div onClick={inputDigit}>4</div>
          <div onClick={inputDigit}>5</div>
          <div onClick={inputDigit}>6</div>
          <div>*</div>
          <div onClick={inputDigit}>1</div>
          <div onClick={inputDigit}>2</div>
          <div onClick={inputDigit}>3</div>
          <div>-</div>
          <div>C</div>
          <div onClick={inputDigit}>0</div>
          <div>=</div>
          <div>+</div>
        </div>
      </div>
    </div>
  );
}

export default App;
