console.log('### EXERCISE 2 ###')

function gcd(a, b) {
  if (!b) {
    return a
  }

  return gcd(b, a % b)
}

class Fraction {
  constructor(numerator, denomirator) {
    this.numerator = numerator
    this.denomirator = denomirator
  }

  print() {
    console.log(`${this.numerator}/${this.denomirator}`)
  }

  add(other) {
    const denomirator = this.denomirator * other.denomirator
    const numirator =
      this.denomirator * this.numerator + other.denomirator * other.numerator
    const nod = gcd(numirator, denomirator)
    return new Fraction(numirator / nod, denomirator / nod)
  }

  subtract(other) {
    const denomirator = this.denomirator * other.denomirator
    const numirator =
      this.denomirator * this.numerator - other.denomirator * other.numerator
    const nod = gcd(numirator, denomirator)
    return new Fraction(numirator / nod, denomirator / nod)
  }

  multiply(other) {
    const numerator = this.numerator * other.numerator
    const denomirator = this.denomirator * other.denomirator
    return new Fraction(numerator, denomirator)
  }

  divide(other) {
    const numerator = this.numerator * other.denomirator
    const denomirator = this.denomirator * other.numerator

    return new Fraction(numerator, denomirator)
  }

  toString() {
    return `${this.numerator}/${this.denomirator}`
  }
}

class FractionFactory {
  static createFraction(numerator, denomirator) {
    if (denomirator == 0) {
      console.log(`Zero Division Error of fracture ${numerator}/${denomirator}`)
      throw new Error('Zero division')
    }
    return new Fraction(numerator, denomirator)
  }
}

const fraction_a = FractionFactory.createFraction(1, 6)
fraction_a.print()
const fraction_b = FractionFactory.createFraction(1, 3)
fraction_b.print()

const addition = fraction_a.add(new Fraction(1, 3))
const subtraction = fraction_a.subtract(new Fraction(1, 3))
const multiplication = fraction_a.multiply(new Fraction(1, 3))
const division = fraction_a.divide(new Fraction(1, 3))

console.log(`${fraction_a} + ${fraction_b} = ${addition}`)
console.log(`${fraction_a} - ${fraction_b} = ${subtraction}`)
console.log(`${fraction_a} * ${fraction_b} = ${multiplication}`)
console.log(`${fraction_a} / ${fraction_b} = ${division}`)
