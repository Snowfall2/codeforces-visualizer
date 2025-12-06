import Problem from "@/interfaces/problem";
import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from "react";
import PlotToolbar from "./PlotToolbar";
import filterProblem from "@/utils/problemUtils";

interface ChartData {
    xAxis: Array<any>;
    yAxis: Array<any>;
    series: Array<any>;
    height: number;
}

export default function TagDistribution(
    {problems}:
    {problems:Problem[]}
) {
    const data: ChartData = {
        xAxis: [{
            id: 'barCategories',
            data: [""],
            label: '',
            tickLabelStyle: {
            }
        }],
        yAxis: [{ label: '' }],
        series: [{ label: '', data: [0], xAxisId: 'barCategories' }],
        height: 300,

    };
    const [plot, setPlot] = useState(data);
    
    useEffect(() => {
        handleSetPlot(problems);
    }, [problems])

    function handleSetPlot(data:Problem[]) {
        const verdict = [...new Set(data.map(sub => sub.verdict? sub.verdict:"" ))];
        const problems = filterProblem(data, verdict);
        const tagAcceptNumber = [] as number[];
        const tagRejectNumber = [] as number[];
        const tags = [...new Set(problems.map((problem) => (
            problem.tags.flat()
        )).flat())]
        tags.forEach((tag) => {
            tagAcceptNumber.push(problems.filter(problem => (problem.tags.includes(tag) && problem.verdict == "Accepted")).length)
            tagRejectNumber.push(problems.filter(problem => (problem.tags.includes(tag) && problem.verdict != "Accepted")).length)
        })
        tags
        setPlot({
            xAxis: [{id: 'barCategories', data: tags, tickLabelStyle: {
            }}],
            yAxis: [{ label:'Problem solved'}],
            series: [{ label: 'Accepted', data: tagAcceptNumber, xAxisId: 'barCategories'}, { label: 'Rejected', data: tagRejectNumber, xAxisId: 'barCategories'}],
            height: 300,
        })
    }

    return (
        problems.length > 0 ? (
        <PlotToolbar title={"Tag Distribution"} >
            <BarChart {...plot}/>
        </PlotToolbar>) : null
    );
}