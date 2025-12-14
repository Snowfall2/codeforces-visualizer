import Problem from "@/interfaces/problem";
import Badge from "./Badge";
import { Fragment } from "react/jsx-runtime";

export default function ProblemCard({problem, tags}: {problem:Problem, tags:string[]}) {
    return (
        <div className="flex flex-col gap-4 p-4 bg-white border-1 white rounded-4xl">
            <h2 className="text-2xl">{problem.fullName}</h2>
            <div className="flex flex-row gap-2 flex-wrap">
                {problem.tags.map((tag, idx) => 
                    <Fragment key={tag+idx}>
                        <Badge tag={tag} includeTag={tags.includes(tag)}></Badge>
                    </Fragment>
                )}
            </div>
            <p>Latest status: {problem.verdict}</p>
            <div></div>
        </div>
    );
}