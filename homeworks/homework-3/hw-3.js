const genders = ['female', 'male']

class Student {
  constructor(name, age, gender, grades = []) {
    this.name = name
    this.age = age
    this.group = undefined
    this.grades = grades
    this.gender = gender
  }

  signToGroup(group) {
    this.group = group
  }

  addGrade(grade) {
    if (grade instanceof Number) {
      throw new TypeError('grade should be number')
    }
    this.grades.push(grade)
  }

  avarageGrade() {
    return this.grades.reduce((a, b) => a + b, 0) / this.grades.length
  }

  toString() {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${
      genders[this.gender]
    }, Group: ${this.group.name}`
  }
}

class Group {
  constructor(name) {
    this.name = name
    this.students = []
  }

  push(student) {
    if (!student instanceof Student) {
      throw new TypeError("student parameter isn't instance of Student")
    }

    this.students.push(student)
    student.signToGroup(this)
  }

  filter(predicate) {
    return this.students.filter(predicate)
  }

  toString() {
    return `Group ${this.name} Students: ${this.students
      .map((student) => student.name)
      .join(', ')}`
  }

  avarageGrade() {
    const grades = this.students.map((student) => student.grades).flat()

    return grades.reduce((a, b) => a + b, 0) / grades.length
  }
}

const group = new Group('PV021')

group.push(new Student('Alex', 21, 1, [10, 11, 9, 12]))
group.push(new Student('Ben', 22, 1, [7, 8, 7, 7]))
group.push(new Student('Sam', 22, 0, [7, 3, 7, 7]))
group.push(new Student('Tom', 20, 1, [7, 5, 3, 1]))
group.push(new Student('Jenifer', 18, 0, [10, 11, 11, 12]))

console.log('Exercise #1')
console.log(group.toString())
console.log()

console.log('Exercise #2')
console.log(
  group
    .filter((student) => student.age > 20)
    .map((student) => student.toString())
    .join('; ')
)
console.log()

console.log('Exercise #3')
console.log(
  group
    .filter((student) => student.avarageGrade() < 7)
    .map((student) => student.toString())
    .join(';<br />')
)
console.log()

console.log('Exercise #4')
console.log('Females')
console.log(
  group
    .filter(
      (student) =>
        student.gender == genders.findIndex((gender) => gender === 'female')
    )
    .map((student) => student.toString())
    .join(';<br />')
)
console.log()
console.log('Males')
console.log(
  group
    .filter(
      (student) =>
        student.gender == genders.findIndex((gender) => gender === 'male')
    )
    .map((student) => student.toString())
    .join('<br />')
)
console.log()

console.log('Exercise #5')
console.log(group.avarageGrade())
