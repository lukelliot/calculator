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
  }
}
const OPERATORS = Object.keys(OPERATIONS)

class Calculator {
  constructor() {
    this.memory = []
  }

  inputDigit(num) {
    if (num < 0 || num >= 10) {
      throw new Error('invalid input, input only 0-9')
    }

    const index = OPERATORS.includes(this.memory[1]) ? 2 : 0

    const newNum = (this.memory[index] || 0) * 10 + num
    this.memory[index] = newNum

    return this.memory.join(' ')
  }

  inputOp(operator) {
    if (!OPERATORS.includes(operator)) {
      throw new Error(`Invalid operator. Use ${OPERATORS}`)
    }
    if (typeof this.memory[0] !== 'number') {
      throw new Error('Digit required before operator')
    }
    if (this.memory.length === 3) {
      this.memory[0] = this.operate()
    }
    this.memory[1] = operator
    return `${this.memory[0]} ${this.memory[1]}`
  }

  equals() {
    const calculation = this.operate()
    this.memory = [calculation]
    return `${calculation}`
  }

  operate() {
    return OPERATIONS[this.memory[1]](this.memory[0], this.memory[2])
  }
}

export default Calculator