import { useState } from 'react';

export default function Pagination({children}: {children: React.ReactNode}) {
    const [page, setPage] = useState(1);
    
    return (
      <div className='flex flex-col gap-5'>
        {children}
        <p>sss</p>
      </div>
    
  );
}
