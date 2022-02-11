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

  const badMonths = [2, 4, 6, 7, 9, 11]

  const transform = (value) => {
    if (value < 10) return `0${value}`
    return value
  }

  const takeDate = (e) => {
    if (e.key === 'Enter') {

      // 31 day problem

      const year = +e.target.value.split('-')[0]
      const month = +e.target.value.split('-')[1]
      const day = +e.target.value.split('-')[2]

      badMonths.forEach((item) => {
        if (item === month) {
          if ((year - 2024) % 4 === 0) {
            if (month === 2) {
              if (day === 30) {
                alert('Write correctly, February 30-31 not match')
                e.target.value = null
              }
            }
          } else {
            if (month === 2) {
              if (day === 29 || day === 30) {
                alert('Write correctly, February 29-31 not match')
                e.target.value = null
              }
            }
          }

          if (day === 31) {
            alert('Write correctly, 31 not match')
            e.target.value = null
          }
        }
      })

      //Because GMT+03:00 => 2023 = 2023-01-01 03:00

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
        Example : 2030-04-24<br />
        Example : 2030-04<br />
        Example : 2030 <br />
        <input type="text" onKeyPress={takeDate} /> <br />
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
            <div className="timerItem">{transform(day)}</div>
            <div className="timerItem">:</div>
            <div className="timerItem">{transform(hour)}</div>
            <div className="timerItem">:</div>
            <div className="timerItem">{transform(minute)}</div>
            <div className="timerItem">:</div>
            <div className="timerItem">{transform(second)}</div>
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
