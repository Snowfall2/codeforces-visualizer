'use client'
import { TextField } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import ProblemDistribution from '@/components/ProblemDistribution';
import Problem from '@/interfaces/problem';
import { customStorage } from '@/utils/storage';
import TagDistribution from '@/components/TagDistribution';
import MonthSummary from '@/components/MonthSummary';
import processHandle from '@/hooks/processHandle';
import SubmitHandle from '@/components/SubmitHandle';
import Loading from '@/components/Loading';

export default function Home() {
  const [submitHandle, setSubmitHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  
  processHandle(setLoading, setProblems, submitHandle);

  return (
      <div className='xl:mx-10 mx-10'>
        <SubmitHandle setSubmitHandle={setSubmitHandle} displayButton='summary'/>

        {loading ? 
        <Loading loading={loading}/>: <> 
            {!loading && problems.length == 0 && submitHandle != '' && <h1 className='text-center'>Handle {submitHandle} not found</h1>}
            {!loading && problems.length != 0 && submitHandle != '' && <h1 className='text-center'>{submitHandle} data</h1>}
            {!loading && problems.length != 0 &&
              <>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 -mx-8'>
                  <ProblemDistribution problems={problems} />
                  <MonthSummary problems={problems}/>
                </div>
                <div className='grid grid-cols-1 gap-4 -mx-8'>
                  <TagDistribution problems={problems}/>
                </div>
              </>
            }
          </>
        }
      </div>
    
  );
}
