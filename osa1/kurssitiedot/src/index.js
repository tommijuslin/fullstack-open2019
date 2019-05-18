import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return <h1>{props.course.name}</h1>
}

const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.course.parts[0]} />
            <Part part={props.course.parts[1]} />
            <Part part={props.course.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    let sum = 0
    props.course.parts.forEach(values => {
        sum += values.exercises
    })

    return <p>yhteensä {sum} tehtävää</p>
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));