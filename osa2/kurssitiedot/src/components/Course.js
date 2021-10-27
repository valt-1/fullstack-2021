import React from "react"

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Content = ({ course }) => {
  const parts = course.parts
  return (
    <div>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </ul>
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>Total of {total} exercises</div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default Course
