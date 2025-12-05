'use client'
import { TextField } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import ProblemDistribution from '@/components/ProblemDistribution';
import Problem from '@/interfaces/problem';
import { customStorage } from '@/utils/storage';
import TagDistribution from '@/components/TagDistribution';
const data = {

  xAxis: [{ data: [0], label: ''}],
  yAxis: [{label: ''}],
  series: [{ data: [0] }],
  height: 300
};
export default function Home() {
  const [handle, setHandle] = useState('');
  const [submitHandle, setSubmitHandle] = useState('');
  const [plot, setPlot] = useState(data);
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
      const fetchData = async () => {
          const methodName = `user.status?handle=${submitHandle}`;
          const updateFetch = `https://codeforces.com/api/${methodName}`;
          console.log(customStorage.isExpire(submitHandle));
          try {
            setLoading(true);
            if(customStorage.isExpire(submitHandle)) {
                const json = await fetch(updateFetch).then(res => res.json());
                if(json.status == "OK") {
                    const rawData = json.result;
                    const problems = rawData.map((sub:any) => {
                        return {
                            name: (sub["problem"]["contestId"]+sub["problem"]["index"]).toString(),
                            rating: sub["problem"]["rating"],
                            tags: sub["problem"]["tags"],
                            verdict: sub["verdict"],
                        } as Problem;
                    }).filter((sub:any) => sub != null);
                    customStorage.updateItem(submitHandle, problems);
                }
            }
            const displayProblems = customStorage.getItem(submitHandle);
            setProblems(displayProblems);
          }
          catch {
            setProblems([] as Problem[]);
          }
          finally {
            setLoading(false);
          }
      };
      if(submitHandle != '')
      fetchData();
  }, [submitHandle]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setHandle(e.target.value);
  } 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitHandle(handle);
  }


  return (
      <div className='mx-10'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col max-w-80'>
            <TextField className='bold' id="standard-basic" value={handle} onChange={handleChange} label="Handle" variant='standard' />
            <button className="handle-submit my-4">View rating distribution</button>
          </div>
        </form>


        {loading ? <div className="flex justify-center h-full">
          <span className="loader h-screen translate-y-100"></span>
        </div>: <>
            {!loading && problems.length == 0 && submitHandle != '' && <h1 className='text-center'>Handle {submitHandle} not found</h1>}
            {!loading && problems.length != 0 && submitHandle != '' && <h1 className='text-center'>{submitHandle} data</h1>}
            {!loading && problems.length != 0 &&
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <ProblemDistribution problems={problems} />
                  <TagDistribution problems={problems}/>
                  {/* {submitHandle != '' && <BarChart {...plot}></BarChart>}
                  {submitHandle != '' && <BarChart {...plot}></BarChart>} */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
                  <TagDistribution problems={problems}/>
                </div>
              </>
            }
          </>
        }
      </div>
    
  );
}
