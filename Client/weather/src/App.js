
import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from  '@mui/material/TextField';
import FormLabel from  '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';

import  FormControlLabel  from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
 
  input:  {

          textAlign:"center",
    color: "white",
    fontSize:"20px"

  },


});


function App() {




const classes = useStyles();

  const [data, setData] = useState({});
  //data from openweather api

  const [location, setLocation] = useState('');
  // textfield input

  const searchForLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);

      })
      setLocation('');
    }

  }

  const handleUnix = (unix) => {
    const unixTimestamp = unix * 1000;
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString("en-UK");
    return humanDateFormat

  }




  const apiKey = "57c110b8d74bd2c1048e95658c1b7a1f"
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=placeholder&appid=${apiKey}}` 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=57c110b8d74bd2c1048e95658c1b7a1f&units=metric`

  // I have added the unit metrics for temperate (celcius) at the end of the url string.


  const background = "./sunset.jpeg";
  return (
    <div className="app">
    <div className="search">

<TextField

    className={useStyles.background}
  
      inputProps={{ className: classes.input }}
   
      id="outlined-basic"
      value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchForLocation}
          placeholder='Enter Location'
 
    variant="outlined"
 
    />

    <div>
<Container>

    </Container>
    </div>
    </div>
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
          {data.sys && 
          
          <p> {data.sys.country} </p>
      
          
          }
       
        </div>

      
        <div className="temp">
        {data.main && 
      <h1> {data.main.temp.toFixed()} °C</h1>
        }
        </div>

        <div className="sun">
        {data.sys && 
          <h2> Sunrise  </h2> } {data.sys && 
          <p>  {handleUnix(data.sys.sunrise)} </p>
          }    
      

        </div>

        <div className="sun">
        {data.sys && 
          <h2> Sunset  </h2> } {data.sys && 
          <p>  {handleUnix(data.sys.sunset)} </p>
          }    
      

        </div>



        <div className="description">
        {data.weather && 
      <p> {data.weather[0].main}  </p>

      
      
      }
      {data.weather && 
      <p> {data.weather[0].description}  </p>

      
      
      }
      {data.weather && 
        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />

      
      
      }
    
        </div>
      </div>

  {data.name && 
        <div className="bottom">
          <div className="feels">
            {data.main &&
            <p>{data.main.feels_like.toFixed()} °C </p>
            
            }
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main &&
            <p>{data.main.humidity}%</p>}
            <p> Humidity</p>
          </div>
          <div className="wind">
          {data.wind &&
           <p> {data.wind.speed.toFixed()}MPH </p>
          }
          <p> Wind Speed</p>
          </div>
        </div>
      

  }

    </div>
  </div>
  );
}

export default App;
