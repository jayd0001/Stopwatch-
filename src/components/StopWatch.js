import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  clock: {
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const Stopwatch = () => {
  const classes = useStyles()
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [intervalId, setIntervalId] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [savedTimes, setSavedTimes] = useState([])

  useEffect(() => {
    // Save the current saved time state in local storage
    localStorage.setItem("savedTime", JSON.stringify(savedTimes))
  }, [savedTimes])

  // Retrieve the saved time state from local storage on page refresh
  useEffect(() => {
    const savedTime = JSON.parse(localStorage.getItem("savedTime"))
    if (savedTime) {
      setSavedTimes(savedTime)
    }
  }, [])

  const startStopwatch = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setTime((prevTime) => {
          const { hours, minutes, seconds } = prevTime
          if (seconds === 59) {
            if (minutes === 59) {
              return { hours: hours + 1, minutes: 0, seconds: 0 }
            }
            return { ...prevTime, minutes: minutes + 1, seconds: 0 }
          }
          return { ...prevTime, seconds: seconds + 1 }
        })
      }, 1000)
      setIntervalId(id)
      setIsRunning(true)
    }
  }

  const pauseStopwatch = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsRunning(false)
    }
  }
  const resetStopwatch = () => {
    clearInterval(intervalId)
    setIntervalId(null)
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    setIsRunning(false)
  }

  const saveTime = () => {
    setSavedTimes([...savedTimes, time])
  }

  return (
    <div className={classes.root}>
      <Box className={classes.clock}>
        <Typography variant="h4">
          {time.hours.toString().padStart(2, "0")} : {time.minutes.toString().padStart(2, "0")} : {time.seconds.toString().padStart(2, "0")}
        </Typography>
      </Box>
      <Box>
        {isRunning ? (
          <Button variant="contained" color="secondary" className={classes.button} onClick={pauseStopwatch}>
            Pause
          </Button>
        ) : (
          <Button variant="contained" color="primary" className={classes.button} onClick={startStopwatch}>
            Start
          </Button>
        )}
        <Button variant="contained" className={classes.button} onClick={resetStopwatch}>
          Reset
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={saveTime}>
          Save
        </Button>
      </Box>
      <List className={classes.savedTimes}>
        {savedTimes.map((time, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${time.hours.toString().padStart(2, "0")} : ${time.minutes.toString().padStart(2, "0")} : ${time.seconds.toString().padStart(2, "0")}`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Stopwatch