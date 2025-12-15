import { Fragment, useEffect, useState } from "react";
import Problem from "@/interfaces/problem";
import ProblemCard from "./ProblemCard";
import { TextField } from "@mui/material";

export default function ProblemList({problems, tags}: {problems:Problem[], tags:string[]}) {
    const [inputPage, setInputPage] = useState("");
    const [page, setPage] = useState(0);
    const filterProblem = problems.slice((page)*5, (page+1)*5);
    const maxPage = Math.ceil((problems.length-1)/5)-1;
    function submitPage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if(!Number.parseInt(inputPage)) throw Error("NaN");
            const curPage = Math.max(Math.min(Number.parseInt(inputPage)-1, maxPage), 0);
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

    useEffect(() => {
        setPage(0);
    }, [problems])
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                {problems.length > 0 && filterProblem.map((problem, idx) => <Fragment key={idx}><ProblemCard problem={problem} tags={tags}></ProblemCard></Fragment>)}
                {problems.length == 0 && <div className="w-full h-100 flex justify-center items-center"><h2 className="text-2xl">No submission data</h2></div>}
            </div>
            <div className="flex flex-row gap-2 justify-center flex-wrap">
                {
                    maxPage > 0 && 
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
                    ([...Array(Math.ceil((problems.length-1)/5)).keys()].slice(Math.max(page-1, 0), page+2)).map((idx, _) => (
                    <div key={idx} className={`select-none flex items-center justify-center rounded-4xl w-10 h-10 cursor-pointer transition-all duration-300 ${idx==page? "bg-blue-200":""}`} onClick={() => setPage(idx)}>
                        <p>{idx+1}</p>
                    </div>
                    ))
                }

                {
                    page < maxPage - 3 &&
                    <div className="flex items-center">
                        <p>...</p>
                    </div>
                }

                {
                    maxPage - page >= 2 &&
                    ( [...Array(Math.ceil((problems.length-1)/5)).keys()].slice(Math.max(page - maxPage + 1,-2))).map((idx, _) => (
                    <div key={idx} className={`select-none flex items-center justify-center rounded-4xl w-10 h-10 cursor-pointer transition-all duration-300 ${idx==page? "bg-blue-200":""}`} onClick={() => setPage(idx)}>
                        <p>{idx+1}</p>
                    </div>
                    ))
                }
            </div>
        </div>
    );
}