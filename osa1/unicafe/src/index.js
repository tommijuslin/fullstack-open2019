import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => <h1>{header}</h1>

const StatsHeader = ({ statsHeader }) => <h1>{statsHeader}</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ good, bad, neutral, total, average, positive }) => {
    if (total === 0) {
        return <div><p>Ei yhtään palautetta annettu</p></div>
    }

    return (
            <table>
                <tbody>
                    <Statistic text='hyvä' value={good} />
                    <Statistic text='neutraali' value={neutral} />
                    <Statistic text='huono' value={bad} />
                    <Statistic text='yhteensä' value={total} />
                    <Statistic text='keskiarvo' value={average} />
                    <Statistic text='positiivisia' value={positive + " %"} />
                </tbody>
            </table>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    const [clicks, setClicks] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const handleGoodClick = () => setClicks({ ...clicks, good: clicks.good + 1 })
    const handleNeutralClick = () => setClicks({ ...clicks, neutral: clicks.neutral + 1 })
    const handleBadClick = () => setClicks({ ...clicks, bad: clicks.bad + 1 })

    const header = 'anna palautetta'
    const statsHeader = 'statistiikka'

    const total = clicks.good + clicks.neutral + clicks.bad
    const average = (clicks.good - clicks.bad) / total
    const positive = clicks.good / total * 100

    return (
        <div>
            <Header header={header} />
            <Button handleClick={handleGoodClick} text='hyvä' />
            <Button handleClick={handleNeutralClick} text='neutraali' />
            <Button handleClick={handleBadClick} text='huono' />
            <StatsHeader statsHeader={statsHeader} />
            <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad}
                        total={total} average={average} positive={positive} />
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));