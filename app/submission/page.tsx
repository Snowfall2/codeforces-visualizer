'use client'
import React, { useEffect, useState } from 'react';
import Problem from '@/interfaces/problem';
import processHandle from '@/hooks/processHandle';
import SearchSidebar from '@/components/submission/SearchSidebar';

export default function ProblemPage() {
    const [submitHandle, setSubmitHandle] = useState('');
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState<Problem[]>([]);

    processHandle(setLoading, setProblems, submitHandle);
    
    return (
      <div className='xl:mx-10 mx-10'>
        <SearchSidebar/>
      </div>
    
  );
}
