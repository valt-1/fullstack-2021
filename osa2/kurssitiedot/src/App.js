import React from 'react'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course}/>  
      )}
    </div>
  )
}

export default App
