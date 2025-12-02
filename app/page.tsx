'use client'
import Problem from '@/interfaces/Problem';
import { TextField } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';


const data = {

  xAxis: [{ data: [0], label: ''}],
  yAxis: [{label: ''}],
  series: [{ data: [0] }],
  height: 300
};
export default function Home() {
  const [handle, setHandle] = useState('');
  const [submitHandle, setSubmitHandle] = useState('');
  const [userData, setUserData] = useState([]);
  const [plot, setPlot] = useState(data);
  const uniqueProb = new Set();
  
  useEffect(() => {
    const fetchData = async () => {
      let methodName = `user.status?handle=${handle}`;
      const res = await fetch(`https://codeforces.com/api/${methodName}`);
      if(res.ok) {
        const res2 = await res.json();
        const rawData = res2["result"];
        setUserData(rawData);
        const problems = rawData.filter((sub:any) => sub["problem"]["rating"] != null)
        .map((sub:any) => {
          const name = sub["problem"]["contestId"]+sub["problem"]["index"];
          if(uniqueProb.has(name)) return null;
          else {
            uniqueProb.add(name);
            return {
              name: (sub["problem"]["contestId"]+sub["problem"]["index"]).toString(),
              rating: sub["problem"]["rating"],
              tags: sub["problem"]["tags"],
            } as Problem;
          }
        }).filter((sub:any) => sub != null);
        handleSetPlot(problems);
      }
      else {
        console.log("Error");
      }
    };
    if(submitHandle != '') {
      fetchData();
    }
  }, [submitHandle]);
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setHandle(e.target.value);
  } 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitHandle(handle)
  }

  function handleSetPlot(data:Problem[]) {
    const ratings = data.map((problem) => problem["rating"])
    const ratingArray = [];
    const ratingNumber = [];
    for(let i = Math.min(...ratings);i <= Math.max(...ratings);i += 100) {
      ratingArray.push(i);
      ratingNumber.push(ratings.filter((rating) => rating === i).length);
    }
    setPlot({
      xAxis: [{ data: ratingArray, label:'Rating'}],
      yAxis: [{ label:'Problem solved'}],
      series: [{ data: ratingNumber}],
      height: 300
    })
  }

  return (
      <div className='mx-10'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col max-w-80'>
            <TextField className='bold' id="standard-basic" value={handle} onChange={handleChange} label="Handle" variant='standard' />
            <button className="handle-submit my-4">View rating distribution</button>
          </div>
        </form>
        
        <div className='max-w-200'>
          {submitHandle != '' && <BarChart {...plot}></BarChart>}
        </div>
      </div>
  );
}
