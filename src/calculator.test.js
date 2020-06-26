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

    it('displays the digit', () => {
      const sut = new Calculator()

      const returnedValue = sut.inputDigit(3)

      expect(returnedValue).toEqual('3')
    })

    it('displays a string of multiple consecutive numbers', () => {
      const sut = new Calculator()

      sut.inputDigit(1)
      const resultOfTwoDigits = sut.inputDigit(2)
      const resultOfThreeDigits = sut.inputDigit(3)
      const resultOfFourDigits = sut.inputDigit(4)

      expect(resultOfTwoDigits).toEqual('12')
      expect(resultOfThreeDigits).toEqual('123')
      expect(resultOfFourDigits).toEqual('1234')
    })

    describe('when an operator and digit has been stored', () => {
      it('returns the equation', () => {
        const sut = new Calculator()

        sut.memory = [1, '+']
        const result = sut.inputDigit(1)

        expect(result).toEqual('1 + 1')
      })

      it('can continue adding digits to second numeral', () => {
        const sut = new Calculator()

        sut.memory = [1, '+', 1]
        const result = sut.inputDigit(1)

        expect(result).toEqual('1 + 11')
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
