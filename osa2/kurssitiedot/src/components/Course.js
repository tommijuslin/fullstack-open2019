import React from 'react'

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => {
    const parts = props.course.parts

    const rows = () => parts.map(part =>
        <div key={part.id}>
            <Part part={part} />
        </div>
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

const Course = ({ course }) => {
    const parts = course.parts
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue)

    return (
        <div>
            <h2>{course.name}</h2>
            <Content course={course} />
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}

export default Course