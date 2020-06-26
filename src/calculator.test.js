class Calculator {
  constructor() {
    this.memory = []
  }

  inputDigit(num) {
    this.memory.push(num)
  }
}

describe('Calculator', () => {
  test('#constructor', () => {
    const sut = new Calculator()
    expect(sut).toBeInstanceOf(Calculator)
  })

  it('instantiates with memory as an empty Array', () => {
    const sut = new Calculator()
    expect(sut.memory).toEqual([])
  })

  describe('#inputDigit', () => {
    it('throws Error if arg is not a single digit', () => {
      const sut = new Calculator()

      expect(() => sut.inputDigit(11)).toThrow()
    })

    it('throws if arg is a negative digit', () => {
      const sut = new Calculator()

      expect(() => sut.inputDigit(-1)).toThrow()
    })

    it('returns the current calculation', () => {
      const sut = new Calculator()

      const oneDigit = sut.inputDigit(1)
      sut.memory.push('+')
      const twoDigits = sut.inputDigit(1)

      expect(oneDigit).toEqual('1')
      expect(twoDigits).toEqual('1 + 1')
    })

    it('combines multiple consecutive inputs of numbers', () => {
      const sut = new Calculator()

      sut.inputDigit(1)
      const resultOfTwoDigits = sut.inputDigit(2)
      const resultOfThreeDigits = sut.inputDigit(3)
      const resultOfFourDigits = sut.inputDigit(4)

      expect(resultOfTwoDigits).toEqual('12')
      expect(resultOfThreeDigits).toEqual('123')
      expect(resultOfFourDigits).toEqual('1234')
    })

    describe('when multiple consecutive calls are made', () => {
      it('combines digits', () => {
        const sut = new Calculator()

        sut.inputDigit(1)
        const resultOfTwoDigits = sut.inputDigit(2)
        const resultOfThreeDigits = sut.inputDigit(3)
        const resultOfFourDigits = sut.inputDigit(4)

        expect(resultOfTwoDigits).toEqual('12')
        expect(resultOfThreeDigits).toEqual('123')
        expect(resultOfFourDigits).toEqual('1234')
      })

      it('combines digits after an operator', () => {
        const sut = new Calculator()

        sut.memory = [1, '+']
        const resultOfOneDigit = sut.inputDigit(1)
        const resultOfTwoDigits = sut.inputDigit(2)
        const resultOfThreeDigits = sut.inputDigit(3)
        const resultOfFourDigits = sut.inputDigit(4)

        expect(resultOfOneDigit).toEqual('1 + 1')
        expect(resultOfTwoDigits).toEqual('1 + 12')
        expect(resultOfThreeDigits).toEqual('1 + 123')
        expect(resultOfFourDigits).toEqual('1 + 1234')
      })
    })
  })

  describe('#inputOp', () => {
    it('throws on any invalid operator input', () => {
      const sut = new Calculator()

      expect(() => sut.inputOp('invalid')).not.toThrowError(TypeError)
      expect(() => sut.inputOp('invalid')).toThrowError()
      expect(() => sut.inputOp('-')).not.toThrowError()
      expect(() => sut.inputOp('/')).not.toThrowError()
      expect(() => sut.inputOp('+')).not.toThrowError()
      expect(() => sut.inputOp('*')).not.toThrowError()
    })

    describe('when there is a single digit in memory', () => {
      it('returns a string of the partial equation', () => {
        const sut = new Calculator()

        sut.memory = [1]
        const result = sut.inputOp('+')

        expect(result).toEqual('1 +')
      })
    })

    describe('when there are two digits and an operator in memory', () => {
      it('returns calculated string with new input operator', () => {
        const sut = new Calculator()

        sut.memory = [1, '+', 1]
        const result = sut.inputOp('+')

        expect(result).toEqual('2 +')
      })
    })

    it('throws Error if there is no digit stored in memory', () => {
      const sut = new Calculator()

      expect(() => sut.inputOp('-')).not.toThrowError(TypeError)
      expect(() => sut.inputOp('-')).toThrowError()
    })
  })

  describe('#equals', () => {
    it('calculates equation stored in memory', () => {
      const sut = new Calculator()
      sut.memory = [1, '+', 1]

      const result = sut.equals()

      expect(result).toEqual('2')
    })

    it('throws if the equation cannot be calculated', () => {
      const sut = new Calculator()
      sut.memory = [1, '+']

      expect(() => sut.equals()).not.toThrowError(TypeError)
      expect(() => sut.equals()).toThrowError()
    })

    describe('available operators', () => {
      it('+', () => {
        const sut = new Calculator()

        sut.memory = [1, '+', 1]
        const result = sut.equals()

        expect(result).toEqual('2')
      })

      it('-', () => {
        const sut = new Calculator()

        sut.memory = [1, '-', 1]
        const result = sut.equals()

        expect(result).toEqual('0')
      })

      it('*', () => {
        const sut = new Calculator()

        sut.memory = [10, '*', 10]
        const result = sut.equals()

        expect(result).toEqual('100')
      })

      it('/', () => {
        const sut = new Calculator()

        sut.memory = [10, '/', 10]
        const result = sut.equals()

        expect(result).toEqual('1')
      })
    })
  })
})
