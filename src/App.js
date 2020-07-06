import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './calculator.js'

const calculator = new Calculator()

function App() {
  const [equation, setEquation] = useState(0)

  useEffect(() => {
    function keyDownEvent(event) {
      const { key, keyCode } = event;
      if (keyCode >= 48 && keyCode <= 57) {
        const display = calculator.inputDigit(parseInt(key, 10))
        setEquation(display);
      } else if (keyCode >= 96 && keyCode <= 105) {
        const display = calculator.inputDigit(parseInt(key, 10))
        
        setEquation(display);
      }

    }

    document.addEventListener('keyup', keyDownEvent)
    return () => {
      document.removeEventListener('keyup', keyDownEvent)
    }
  }, [])

  const inputDigit = (event) => {
    const innerText = event.target.innerText
    const newDigit = parseInt(innerText, 10)
    const outPut = calculator.inputDigit(newDigit)
    setEquation(outPut)
  }
  
  const inputOperator = (event) => {
    const innerText = event.target.innerText
    const outPut = calculator.inputOp(innerText)
    setEquation(outPut)
  }
  
  const inputEquals = (event) => {
    const equals = event.target.innerText
    const outPut = calculator.equals(equals)
    setEquation(outPut)
  }

  const clear = () => {
    const clear = calculator.clear()
    setEquation(clear)
  }

  const inputDecimal = (event) => {
    const display = calculator.decimal()
    setEquation(display)
  }
  return (
    <div className="App">
      <div className={'calcBorder'}>
        <div className={'display'}>
          <div>{equation}</div>
        </div>
        <div className={'buttons'}>
          <div className={'operators'} onClick={clear}>C</div>
          <div className={'empty'} />
          <div className={'empty'} />
          <div className={'operators'} onClick={inputOperator}>^</div>
          <div onClick={inputDigit}>7</div>
          <div onClick={inputDigit}>8</div>
          <div onClick={inputDigit}>9</div>
          <div className={'operators'} onClick={inputOperator}>/</div>
          <div onClick={inputDigit}>4</div>
          <div onClick={inputDigit}>5</div>
          <div onClick={inputDigit}>6</div>
          <div className={'operators'} onClick={inputOperator}>*</div>
          <div onClick={inputDigit}>1</div>
          <div onClick={inputDigit}>2</div>
          <div onClick={inputDigit}>3</div>
          <div className={'operators'} onClick={inputOperator}>-</div>
          <div className={'empty'} />
          <div onClick={inputDigit}>0</div>
          <div className={'operators'} onClick={inputEquals}>=</div>
          <div className={'operators'} onClick={inputOperator}>+</div>
        </div>
      </div>
    </div>
  );
}

export default App;
