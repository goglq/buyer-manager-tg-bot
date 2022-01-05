console.log('### EXERCISE 1 ###')

class Car {
  constructor(producer, model, year, avgSpeed) {
    this.producer = producer
    this.model = model
    this.year = year
    this.avgSpeed = avgSpeed
  }

  print() {
    console.log(
      `${this.producer} ${this.model} ${this.year} Avg Speed: ${this.avgSpeed}`
    )
  }

  calculateTravelTime(distance) {
    const time = distance / this.avgSpeed
    const sumPause = Math.floor(time / 4)
    const result = time + sumPause
    return result
  }
}

const bmw = new Car('BMW', 'M8', '2021', 100)

bmw.print()

console.log(bmw.calculateTravelTime(400))
