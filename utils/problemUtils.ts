import Problem from "@/interfaces/problem";

export default function filterProblem(data: Problem[], verdict: string[]) {
    const uniqueProb = new Map();
    const submissions = data.filter((problem:Problem) => (problem["rating"] != null && verdict.includes(problem["verdict"]? problem["verdict"]: "")))
        .map((problem:Problem) => {
        const name = problem["name"];
        if(uniqueProb.has(name)) {
            const verdict = uniqueProb.get(name).verdict;
            if(verdict != "OK") {
                uniqueProb.set(name, problem);
            }
        }
        else {
            uniqueProb.set(name, problem);
        }
        return problem;
    });
    const problemDistribution  = submissions.reduce(function(problems, problem) {
        if (problem != null) {
            if(verdict[0] == "") problems.push(problem);
            else if(verdict.includes(problem["verdict"]? problem["verdict"]:"")) problems.push(problem);
        }
        return problems;
    }, [] as Problem[]);
    return problemDistribution;
}