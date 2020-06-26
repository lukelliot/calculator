class Calculator {
  constructor() {
    this.memory = []
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

  describe('#input', () => {
    it('saves number into memory', () => {
      const sut = new Calculator()

      sut.input(3)

      expect(sut.memory).toEqual([3])
    })
  })
})
