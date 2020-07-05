const OPERATIONS = {
  '+': (num1, num2) => {
    return num1 + num2
  },
  '-': (num1, num2) => {
    return num1 - num2
  },
  '*': (num1, num2) => {
    return num1 * num2
  },
  '/': (num1, num2) => {
    return num1 / num2
  },
  '^': (num1, num2) => {
    return num1 ** num2
  }
}
const OPERATORS = Object.keys(OPERATIONS)

class Calculator {
  constructor() {
    this.memory = []
    // find a way to limit first index length
  }

  inputDigit(num) {
    if (num < 0 || num >= 10) {
      throw new Error('invalid input, input only 0-9')
    }

    const index = OPERATORS.includes(this.memory[1]) ? 2 : 0

    const newNum = (this.memory[index] || 0) * 10 + num
    this.memory[index] = newNum

    return this.display()
  }

  inputOp(operator) {
    if (!OPERATORS.includes(operator)) {
      throw new Error(`Invalid operator. Use ${OPERATORS}`)
    }

    if (typeof this.memory[0] !== 'number') {
      throw new Error('Digit required before operator')
    }

    if (this.memory.length === 3) {
      this.memory = [this.operate()]
    }
    
    this.memory[1] = operator
    
    return this.display()
  }

  equals() {
    const calculation = this.operate()
    this.memory = [calculation]
    return this.display()
  }

  operate() {
    return OPERATIONS[this.memory[1]](this.memory[0], this.memory[2])
  }

  clear() {
    this.memory = []
    return this.display()
  }

  // decimal() {
  //   return this.display() + '.'
  //   /**
  //    * if theres an operator then i want to use the 2nd index
  //    * if there no operator then i want to use the 0 index
  //    */
  //   // if (this.memory[1]) {
  //   //   if (this.memory[2] === undefined)
  //   //   return `${this.memory[0]} ${this.memory[1]} ${this.memory[2]} .`
  //   // } else if (this.memory[0]) {
  //   //   return this.memory[0] + '.'
  //   // } else {
  //   //   return '0.'
  //   // }
  // }

  display() {
    return this.memory.join(' ') || '0'
  }
}

export default Calculator