import Problem from "@/interfaces/problem";
import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from "react";
import PlotToolbar from "./PlotToolbar";
import filterProblem from "@/utils/problemUtils";

export default function ProblemDistribution(
    {problems}:
    {problems:Problem[]}
) {
    const data = {
        xAxis: [{ data: [0], label: ''}],
        yAxis: [{label: ''}],
        series: [{ data: [0] }],
        height: 300,
    };
    const verdict = ["OK"];
    const [plot, setPlot] = useState(data);
    
    useEffect(() => {
        handleSetPlot(problems);
    }, [problems])

    function handleSetPlot(data:Problem[]) {
        const ratings = filterProblem(data, verdict).map(problem => problem["rating"])
        const ratingArray = [];
        const ratingNumber = [];
        for(let i = Math.min(...ratings);i <= Math.max(...ratings);i += 100) {
            ratingArray.push(i);
            ratingNumber.push(ratings.filter((rating) => rating === i).length);
        }
        setPlot({
            xAxis: [{ data: ratingArray, label:'Rating'}],
            yAxis: [{ label:'Problem solved'}],
            series: [{ data: ratingNumber}],
            height: 300,
        })
    }

    return (
        problems.length > 0 ? (
        <PlotToolbar title={"Problem Distribution"} >
            <BarChart {...plot}/>
        </PlotToolbar>) : null
    );
}