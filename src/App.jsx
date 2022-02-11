import React, { useState, useEffect } from 'react';
import { differenceInSeconds, differenceInMinutes, differenceInDays, differenceInHours } from 'date-fns'

function App() {
  const [date, setDate] = useState(new Date())
  const [deadline, setDeadline] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  let day = Math.floor(differenceInDays(deadline, date))
  let hour = Math.floor(differenceInHours(deadline, date) % 24)
  let minute = Math.floor(differenceInMinutes(deadline, date) % 60)
  let second = Math.floor(differenceInSeconds(deadline, date) % 60)


  const getTime = (value) => {
    if (value < 10) return `0${value}`
    return value
  }

  const submit = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value.length === 4) {
        e.target.value = e.target.value + '-01-01T00:00'
      } else if (e.target.value.length === 7) {
        e.target.value = e.target.value + '-01T00:00'
      } else if (e.target.value.length === 10) {
        e.target.value = e.target.value + 'T00:00'
      }
      setDeadline(new Date(e.target.value))
    }
  }

  const resetTime = () => {
    setDeadline(null)
  }

  if (deadline == null) return (
    <div className="wrapper">
      <div className="settimer">
        <div className="title">SET TIMER</div>
        Year-Month-DayThh:mm:ss <br />
        Example : 2030-04-24T20:30 <br />
        <input type="text" onKeyPress={submit} /> <br />
        Then press Enter
      </div>
    </div>
  )
  if (deadline - date > 1000) {
    return (
      <div className="wrapper">
        <div className="app">
          <div className="title">Timer CountDown</div>
          <div className="timer">
            <div className="timerItem">{getTime(day)}</div>
            <div className="timerItem">:</div>
            <div className="timerItem">{getTime(hour)}</div>
            <div className="timerItem">:</div>
            <div className="timerItem">{getTime(minute)}</div>
            <div className="timerItem">:</div>
            <div className="timerItem">{getTime(second)}</div>
          </div>
        </div>
        <button onClick={resetTime}>Reset!</button>
      </div>
    )
  }
  return (
    <div className="wrapper">
      <div className="timeout">
        <div className="title">Time's up!</div>
      </div>
      <button onClick={resetTime}>Reset!</button>
    </div>
  )
}

export default App;
