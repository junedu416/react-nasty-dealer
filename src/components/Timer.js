import React from 'react';
import {useState, useEffect} from 'react';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer(){
    const secondsTotal = 30; // set time for player 
    const[seconds, setSeconds] = useState(secondsTotal);
    const[color, setColor] = useState("#C70039")

    useEffect(() => {
        let playerInterval = setInterval(() => {
            if (seconds > 0){
                setSeconds(seconds - 1);
            }
            if (seconds === 0){
                clearInterval(playerInterval)
            }
            if (seconds <= 11) setColor("#FFC300")
        }, 1000)
        return () => {
            clearInterval(playerInterval)
        }
    })

    const percentage = Math.round( seconds / secondsTotal * 100) ;
    const style = buildStyles({
    //TODO: styling - leave it here for later change to match the payge styling
        rotation: 0,
        strokeLinecap: 'round',
        textSize: '25px',
        pathTransitionDuration: 0.5, 
        pathColor: `${color}`,
        textColor: '#f88',
        trailColor: '#d6d6d6',
        backgroundColor: '#3e98c7',
      })

    return (
        <div>
            <div style = {{maxWidth:150}}><CircularProgressbar styles={style} value={percentage} text={seconds} /></div>
        </div>
    )
}

export default Timer;