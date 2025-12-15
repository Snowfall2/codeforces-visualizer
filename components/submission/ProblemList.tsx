import { Fragment, useEffect, useState } from "react";
import Problem from "@/interfaces/problem";
import ProblemCard from "./ProblemCard";
import {MenuItem, Select, TextField } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ProblemList({problems, tags}: {problems:Problem[], tags:string[]}) {
    const [inputPage, setInputPage] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [property, setProperty] = useState("creationTimeSeconds");
    const [asc, setAsc] = useState(false);
    const filterProblem = problems.filter((problem) => 
        (problem.contest+problem.index).toLowerCase().includes(search.toLowerCase()) ||
        (problem.fullName??"").toLowerCase().includes(search.toLowerCase()) ||
        (problem.rating).toString().includes(search)
    ).sort(sortByProperty(property, asc));

    const showProblem = filterProblem.slice((page)*5, (page+1)*5)
    const maxPage = Math.max(Math.floor((filterProblem.length-1)/5+1), 0);
    function submitPage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if(!Number.parseInt(inputPage)) throw Error("NaN");
            const curPage = Math.max(Math.min(Number.parseInt(inputPage)-1, maxPage-1), 0);
            setPage(curPage);
            setInputPage((curPage+1).toString())
        }
        catch {
            setPage(0);
            setInputPage("1");
        }
    }

    function handlePageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputPage(e.target.value);
    } 

    function sortByProperty(prop:string, curAsc:boolean) {
        return (a:any, b:any) => {
            if(typeof a[prop] == "string") {
                const comparison = a[prop].localeCompare(b[prop]);
                return curAsc ? comparison : -comparison
            }
            else {
                const comparison = a[prop] - b[prop];
                return curAsc ? comparison : -comparison
            }
        }
    }

    useEffect(() => {
        setPage(0);
    }, [problems])

    return (
        <div className="flex flex-col gap-10">
            {
                maxPage > 0 &&
                <div className="flex gap-4 items-center">
                    <TextField
                        value={search}
                        className="bg-white flex grow"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <img src="search.png" className="h-12 w-12 transform -scale-x-100"/>
                                ),
                            },
                        }}
                        placeholder="Search for problem name or id"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(0);
                        }}
                    >
                    </TextField>
                    <Select
                        value={property}
                        sx={{
                            backgroundColor: 'white'
                        }}
                        aria-placeholder="Content to sort"
                        className="w-50"
                        onChange={(e) => setProperty(e.target.value)}
                    >
                        <MenuItem value="contest" >Contest</MenuItem>
                        <MenuItem value="fullName" >Problem Name</MenuItem>
                        <MenuItem value="rating" >Rating</MenuItem>
                        <MenuItem value="verdict" >Verdict</MenuItem>
                        <MenuItem value="creationTimeSeconds" >Submission time</MenuItem>
                    </Select>
                    <img src="asc.png" className={`h-8 w-8 transition-all duration-300 ${asc? "":"-scale-y-100"}`} onClick={() => setAsc(!asc)}/>
                </div>
                
            }
            <div className="flex flex-col gap-5">
                {problems.length > 0 && showProblem.map((problem, idx) => <Fragment key={idx}><ProblemCard problem={problem} tags={tags}></ProblemCard></Fragment>)}
                {problems.length == 0 && <div className="w-full h-100 flex justify-center items-center"><h2 className="text-2xl">No submission data</h2></div>}
            </div>
            {
                maxPage > 1 &&
                <div className="flex flex-row gap-2 justify-center flex-wrap">
                    {
                        ([...Array(Math.max(Math.min(2, page - 1), 0)).keys()]).map((problem, idx) => (
                        <div key={idx} className={`select-none flex items-center justify-center rounded-4xl w-10 h-10 cursor-pointer transition-all duration-300 ${idx==page? "bg-blue-200":""}`} onClick={() => setPage(idx)}>
                            <p>{idx+1}</p>
                        </div>
                        ))
                    }

                    {
                        page > 3 &&
                        <div className="flex items-center">
                            <p>...</p>
                        </div>
                    }

                    {
                        ([...Array(maxPage).keys()].slice(Math.max(page-1, 0), page+2)).map((idx, _) => (
                        <div key={idx} className={`select-none flex items-center justify-center rounded-4xl w-10 h-10 cursor-pointer transition-all duration-300 ${idx==page? "bg-blue-200":""}`} onClick={() => setPage(idx)}>
                            <p>{idx+1}</p>
                        </div>
                        ))
                    }

                    {
                        page < maxPage - 4 &&
                        <div className="flex items-center">
                            <p>...</p>
                        </div>
                    }

                    {
                        maxPage - page >= 3 &&
                        ( [...Array(maxPage).keys()].slice(Math.max(page - maxPage + 2,-2))).map((idx, _) => (
                        <div key={idx} className={`select-none flex items-center justify-center rounded-4xl w-10 h-10 cursor-pointer transition-all duration-300 ${idx==page? "bg-blue-200":""}`} onClick={() => setPage(idx)}>
                            <p>{idx+1}</p>
                        </div>
                        ))
                    }

                    {
                        maxPage > 1 && 
                        <div className="flex items-center gap-2 max-md:order-last">
                            <p>Jump to</p>
                            <form onSubmit={submitPage}>
                                <TextField
                                    className="w-10"
                                    variant="standard"
                                    value={inputPage}
                                    onChange={handlePageChange}
                                />
                            </form>
                        </div>
                    }
                </div>
            }
        </div>
    );
}