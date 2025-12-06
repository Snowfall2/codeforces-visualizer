'use client'
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface SubmitHandleProps {
  setSubmitHandle:React.Dispatch<React.SetStateAction<string>>,
  displayButton:string,
}

export default function SubmitHandle({
  setSubmitHandle,
  displayButton,
}: SubmitHandleProps
) {
  const [handle, setHandle] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHandle(e.target.value);
  } 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitHandle(handle);
  }


  return (
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col max-w-80'>
          <TextField className='bold' id="standard-basic" value={handle} onChange={handleChange} label="Handle" variant='standard' />
          <button className="handle-submit my-4">View {displayButton}</button>
        </div>
      </form>
  );
}
