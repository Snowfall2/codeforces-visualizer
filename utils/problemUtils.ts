import Problem from "@/interfaces/problem";

export default function filterProblem(data: Problem[], verdict: string[]) {
    const uniqueProb = new Map();
    const submissions = data.filter((problem:Problem) => (problem["rating"] != null && verdict.includes(problem["verdict"]? problem["verdict"]: "")))
        .map((problem:Problem) => {
        const name = problem["id"];
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
    return mapVerdict(problemDistribution);
}

function mapVerdict(data: Problem[]) {
    const label: Record<string, string> = {
        "FAILED":"Failed",
        "OK":"Accepted",
        "PARTIAL":"Partial score",
        "COMPILATION_ERROR":"Compilation Error",
        "RUNTIME_ERROR":"Runtime Error",
        "WRONG_ANSWER":"Wrong Answer",
        "TIME_LIMIT_EXCEEDED":"Time Limit Exceeded",
        "MEMORY_LIMIT_EXCEEDED":"Memory Limit Exceeded",
        "IDLENESS_LIMIT_EXCEEDED":"Idleness Limit Exceeded",
        "SECURITY_VIOLATED":"Security Violated",
        "CRASHED":"Crashed",
        "INPUT_PREPARATION_CRASHED":"Input Preparation Crashed",
        "CHALLENGED":"Challenged",
        "SKIPPED":"Skipped",
        "TESTING":"Testing",
        "REJECTED":"Rejected",
        "SUBMITTED":"Submitted",
        "NO_VERDICT":"",
    }
    return data.map(prob => ({...prob, verdict: label[prob.verdict? prob.verdict:"NO_VERDICT"]}))
}