import Problem from "@/interfaces/problem";
import Badge from "./Badge";
import { Fragment } from "react/jsx-runtime";

const getVerdictClass = (verdict: string) => {
  switch (verdict) {
    case 'Accepted':
      return 'px-1 border-2 border-green-200 rounded-xl bg-green-100 text-green-700';
    case 'Wrong Answer':
      return 'px-1 border-2 border-red-200 rounded-xl bg-red-100 text-red-700';
    case 'Time Limit Exceeded':
      return 'px-1 border-2 border-orange-200 rounded-xl bg-orange-100 text-orange-700';
    case 'Memory Limit Exceeded':
      return 'px-1 border-2 border-orange-200 rounded-xl bg-orange-100 text-orange-700';
    case 'Runtime Error':
      return 'px-1 border-2 border-yellow-200 rounded-xl bg-yellow-100 text-yellow-700';
    case 'Compilation Error':
      return 'px-1 border-2 border-yellow-200 rounded-xl bg-yellow-100 text-yellow-700';
    default:
      return '';
  }
};
const getRatingClass = (rating: number) => {
    if(rating < 1200)
        return 'px-1 border-2 border-gray-200 rounded-xl bg-gray-100 text-gray-700';
    else if(rating < 1400)
        return 'px-1 border-2 border-green-200 rounded-xl bg-green-100 text-green-700';
    else if(rating < 1600)
        return 'px-1 border-2 border-cyan-200 rounded-xl bg-cyan-100 text-cyan-700';
    else if(rating < 1900)
        return 'px-1 border-2 border-blue-200 rounded-xl bg-blue-100 text-blue-700';
    else if(rating < 2100)
        return 'px-1 border-2 border-violet-200 rounded-xl bg-violet-100 text-violet-700';
    else if(rating < 2400)
        return 'px-1 border-2 border-yellow-200 rounded-xl bg-yellow-100 text-yellow-700';
    else
        return 'px-1 border-2 border-red-200 rounded-xl bg-red-100 text-red-700';
};

export default function ProblemCard({problem, tags}: {problem:Problem, tags:string[]}) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-white border white rounded-4xl">
            <div>
              <h2 className="text-2xl">{problem.fullName}</h2>
              <h3 className="text-lg">{problem.contest + problem.index}</h3>
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
                {problem.tags.map((tag, idx) => 
                    <Fragment key={tag+idx}>
                        <Badge tag={tag} includeTag={tags.includes(tag)}></Badge>
                    </Fragment>
                )}
            </div>
            <p>Rating: <span className={getRatingClass(problem.rating??0)}>{problem.rating}</span> </p>
            <p>Status: <span className={getVerdictClass(problem.verdict??"")}>{problem.verdict}</span> </p>
            <div className="flex max-md:flex-col gap-2 justify-between">
                <p>Submission Time: {new Date(problem.creationTimeSeconds * 1000).toLocaleString()}</p>
                  <a href={`https://codeforces.com/contest/${problem.contest}/problem/${problem.index}`} className='' target="_blank">
                    <div className='flex problem-redirect px-5 py-1 max-md:py-2 justify-center items-center rounded-xl transition duration-300 text-black hover:text-yellow-200 cursor-pointer'>
                                Open problem
                    </div>
                  </a>
            </div>
            <div></div>
        </div>
    );
}