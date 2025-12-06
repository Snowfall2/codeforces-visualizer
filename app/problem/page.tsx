'use client'
import React, { useEffect, useState } from 'react';
import Problem from '@/interfaces/problem';
import SubmitHandle from '@/components/SubmitHandle';
import Loading from '@/components/Loading';
import processHandle from '@/hooks/processHandle';
import ProblemTable from '@/components/problem/ProblemTable';

export default function ProblemPage() {
    const [submitHandle, setSubmitHandle] = useState('');
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState<Problem[]>([]);

    processHandle(setLoading, setProblems, submitHandle);
    
    return (
      <div className='xl:mx-10 mx-10'>
        <SubmitHandle setSubmitHandle={setSubmitHandle} displayButton='submission history'/>
        {loading ? <Loading loading={loading}/>: <>
            {!loading && problems.length == 0 && submitHandle != '' && <h1 className='text-center'>Handle {submitHandle} not found</h1>}
            {!loading && problems.length != 0 && submitHandle != '' && <h1 className='text-center'>{submitHandle} data</h1>}
            {!loading && problems.length != 0 &&
              <>
                <div className='grid grid-cols-1 gap-4 -mx-8'>
                  <ProblemTable problems={problems}/>
                </div>
              </>
            }
          </>
        }
      </div>
    
  );
}
