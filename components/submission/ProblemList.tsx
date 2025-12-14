import { Fragment, useEffect, useState } from "react";
import Problem from "@/interfaces/problem";
import ProblemCard from "./ProblemCard";

export default function ProblemList({problems, tags}: {problems:Problem[], tags:string[]}) {
    const [page, setPage] = useState(0);
    const filterProblem = problems.slice((page)*5, (page+1)*5);
    useEffect(() => {
        setPage(0);
    }, [problems])
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                {filterProblem.map((problem, idx) => <Fragment key={idx}><ProblemCard problem={problem} tags={tags}></ProblemCard></Fragment>)}
            </div>
            <div className="flex flex-row gap-2 justify-center flex-wrap">
                {
                    ([...Array(Math.ceil((problems.length-1)/5)).keys()]).map((problem, idx) => (
                    <div key={idx} className={`flex items-center justify-center rounded-4xl w-10 h-10 cursor-pointer transition-all duration-300 ${idx==page? "bg-blue-200":""}`} onClick={() => setPage(idx)}>
                        <p>{idx+1}</p>
                    </div>

                    ))
                }
            </div>
        </div>
    );
}