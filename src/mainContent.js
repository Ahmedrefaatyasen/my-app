import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import MediaCard from './card';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import moment from "moment"






const MainContent =  () => {
  const dat=Date.now()
  const ours=dat.t
  
  const date=moment().local(false).format(" الساعه hh:mm التاريخ DD/MM/YYYY")
  const [diff,setdiff]=useState(0)
  const[time,settime]=useState("")
  const[cities,setCities]=useState({
    name:"القاهره",
    value:"cairo"
  })
  const[timings,setTimings]=useState({
    Fajr: 0, 
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,  
     Ish:0,
  })
 useEffect( ()=>{ 
    fetch (`https://api.aladhan.com/v1/timingsByCity?country=EGY&city=${cities.value}`).then((c)=>c.json()) 
    
 .then((data)=> setTimings(data.data.timings))},[cities])
 
 
 function handlecity(e){
  
  setCities({name:e.target.value.n,value:e.target.value.m})}
   
    function timeout(){
    const momentnow=moment()
    const fager=moment(timings["Fajr"],"hh:mm")
     const dhr=moment(timings["Dhuhr"],"hh:mm")  
     const asr=moment(timings["Asr"],"hh:mm")
     const mag=moment(timings['Maghrib'],"hh:mm")
     const asha= moment(timings['Ish'],"hh:mm")
    
   if(momentnow.isAfter(fager)&&momentnow.isBefore(dhr)) {
    settime("متبقي علي صلاه الظهر")
  }else if(momentnow.isAfter(dhr)&&momentnow.isBefore(asr)){
    setdiff(moment.duration( asr.diff(momentnow)).humanize())
    settime("متبقي علي صلاه العصر ")
    
  }else if(momentnow.isAfter(asr)&&momentnow.isBefore(mag)){
     settime("متبقي علي صلاه المغرب")}
 else if(momentnow.isAfter(mag)&&momentnow.isBefore(asha)){
 settime("متبقي علي صلاه العشاء ")}
else{
settime("متبقي علي صلاه الفجر ")
}}
 useEffect(()=>{
  timeout()
        
      
      
    },)
  
  
  
  
  

    
    
      


    
    return (
        <div >
            <Grid container spacing={60}>
                <Grid xs={6}>
                    <div>
                        <h2>{date}</h2>
                        <h1>{cities.value}</h1>

                    </div>
                </Grid>
                <Grid xs={6}>
                <h2>{time}</h2>
                <h2>{diff}</h2>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent={"space-around"} gap={2}>
            <MediaCard  name="الفجر" time={timings.Fajr} image={img}/>
            <MediaCard  name="الظهر"time={timings.Dhuhr}/>
            <MediaCard name="العصر" time={timings.Asr}/>
            <MediaCard name="المغرب" time={timings.Maghrib}/>
            <MediaCard name="العشاء" time={timings.Isha}/>
            
            </Stack>
            <Stack direction="row"justifyContent="center" style={{marginTop:"40px"}}>
            
      <FormControl style={{width:"20%"}} >
        <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
        <Select style={{color:"white"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        
          onChange={handlecity}
        >
          <MenuItem value={{n:"cairo",m:"القاهره"}} key={";;"} >القاهره</MenuItem>
          <MenuItem value={{n:"beni suef ",m:"بني سويف"}} nam="بني سويف">بني سويف</MenuItem>
          <MenuItem value={{n:"ismailia",m:"اسماعيليه"}} nam="اسماعيليه">اسماعيليه</MenuItem>
        </Select>
      </FormControl>
    
            </Stack>
            <br/>
        </div>
    );
}


export default MainContent;
