
import { DataGrid, GridColDef, GridRenderCellParams  } from '@mui/x-data-grid';
import Problem from '../../interfaces/problem';
import filterProblem from "@/utils/problemUtils";
import React from "react";

const getVerdictClass = (verdict: string) => {
  switch (verdict) {
    case 'Accepted':
      return 'bg-green-100 text-green-700';
    case 'Wrong Answer':
      return 'bg-red-100 text-red-700';
    case 'Time Limit Exceeded':
      return 'bg-orange-100 text-orange-700';
    case 'Memory Limit Exceeded':
      return 'bg-orange-100 text-orange-700';
    case 'Runtime Error':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return '';
  }
};

const columns: GridColDef[] = [
  { field: 'subTime', headerName: 'Submission Time', minWidth: 180, flex: 1, valueGetter: ((value, row) => (new Date(row.creationTimeSeconds * 1000).toLocaleString())) },
  { field: 'shortName', headerName: 'Index', minWidth: 80, flex:0.5, valueGetter: ((value, row) => (row.name + row.index))},
  { field: 'fullName', headerName: 'Problem Name', minWidth: 200, flex: 2 },
  {
    field: 'verdict',
    headerName: 'Verdict',
    flex: 1,
    minWidth: 100,
    cellClassName: (params) => getVerdictClass(params.value),
  },
  {
    field: '',
    disableColumnMenu: true,
    headerName: '',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    minWidth: 100,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
       const onClick = (e: React.MouseEvent) => {
         e.stopPropagation();
       };
    
       return (
        <a href={`https://codeforces.com/contest/${params.row.name}/problem/${params.row.index}`} className='w-full flex justify-center' onClick={onClick} target="_blank">
            <div className='problem-redirect px-5 justify-center items-center rounded-lg transition duration-300 text-black hover:text-yellow-200 cursor-pointer'>
                Open problem
            </div>
        </a>
        )
    }
  }
];

const paginationModel = { page: 0, pageSize: 10 };


export default function ProblemTable({problems}: {problems: Problem[]}) {
    const verdict = [...new Set(problems.map(sub => sub.verdict? sub.verdict:"" ))];
    const displayProblem = filterProblem(problems, verdict);
    return (
    <div className='h-150 mx-4 overflow-x-auto'>
        <DataGrid
            className='overflow-x-auto'
            rows={displayProblem}
            autosizeOptions={{
                columns: columns.map(column => column.field),
                includeOutliers: true,
            }}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            disableColumnSelector
            disableColumnResize
            sx={{
                overflowX: 'scroll',
                backgroundColor: '#fff9eaff',
                border: 0,
                borderColor: 'primary.light',
                '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#feefc8ff',
                    color: '#000',
                    fontSize: 16,
                },

                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: '#fff9eaff',
                },

                '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#e0f2fe',
                },
            }}
        />
    </div>
    )
}