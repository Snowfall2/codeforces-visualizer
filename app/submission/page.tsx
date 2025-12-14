'use client'
import React, { useEffect, useState } from 'react';
import Problem from '@/interfaces/problem';
import processHandle from '@/hooks/processHandle';
import SearchSidebar from '@/components/submission/SearchSidebar';
import ProblemList from '@/components/submission/ProblemList';

export default function SubmissionPage() {
    const [submitHandle, setSubmitHandle] = useState('');
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [range, setRange] = useState<number[]>([]);
    const filterProblems = problems.filter(problem => (
      problem.tags.filter(tag => tags.includes(tag) && range[0]).length == tags.length && 
      range[0] <= problem.rating && problem.rating <= range[1]
    ))
    processHandle(setLoading, setProblems, submitHandle);
    
    return (
      <div className='flex flex-row mx-10'>
        <div className='w-1/3'>
          <SearchSidebar submitHandle={setSubmitHandle} submitTags={setTags} submitRange={setRange}/>
        </div>
        <div className='w-2/3 p-2'>
          <div className='pagination'>
            <ProblemList problems={filterProblems} tags={tags}/>
          </div>
        </div>
      </div>
    
  );
}
