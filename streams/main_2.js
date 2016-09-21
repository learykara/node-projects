const { Multiply, PrintToConsole, RandomNumbers} = require('./numbers')

const random = new RandomNumbers(10)
const multiply = new Multiply(2)
const printer = new PrintToConsole()

random.pipe(multiply).pipe(printer)
