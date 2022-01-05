console.log('### EXERCISE 3 ###')

class Clock {
  constructor(hours, minutes, seconds) {
    this.seconds = seconds % 60
    this.minutes = (minutes + Math.floor(seconds / 60)) % 60
    this.hours = (hours % 24) + Math.floor(minutes / 60)
  }

  print() {
    console.log(this.toString())
  }

  toString() {
    const hours =
      this.hours != 0
        ? this.hours >= 10
          ? this.hours
          : '0' + this.hours
        : '00'
    const minutes =
      this.minutes != 0
        ? this.minutes >= 10
          ? this.minutes
          : '0' + this.minutes
        : '00'
    const seconds =
      this.seconds != 0
        ? this.seconds >= 10
          ? this.seconds
          : '0' + this.seconds
        : '00'

    return `${hours}:${minutes}:${seconds}`
  }

  changeHours(hours) {
    this.hours = hours % 24
  }

  changeMinutes(minutes) {
    this.minutes = minutes % 60
    this.hours = (this.hours % 24) + Math.floor(minutes / 60)
  }

  changeSeconds(seconds) {
    this.seconds = seconds % 60
    this.minutes = (this.minutes + Math.floor(seconds / 60)) % 60
    this.hours = (this.hours % 24) + Math.floor(this.minutes / 60)
  }
}

const clock = new Clock(22, 70, 80)
clock.print()
clock.changeHours(5)
clock.print()
clock.changeMinutes(5)
clock.print()
clock.changeSeconds(50)
clock.print()
