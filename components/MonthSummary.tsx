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

export default function MonthSummary(
    {problems}:
    {problems:Problem[]}
) {
    const data: ChartData = {
        xAxis: [{
            data: [""],
            label: '',
        }],
        yAxis: [{ label: '' }],
        series: [{ label: '', data: [0]}],
        height: 300,

    };
    const [plot, setPlot] = useState(data);
    
    useEffect(() => {
        handleSetPlot(problems);
    }, [problems])

    function handleSetPlot(data:Problem[]) {
        const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const verdict = [...new Set(data.map(sub => sub.verdict? sub.verdict:"" ))];
        const problems = filterProblem(data, verdict);
        const monthAcceptNumber = [] as number[];
        const monthRejectNumber = [] as number[];
        const startMonth = (new Date(Date.now()).getMonth() + 1) % 12;
        const currentMonth = new Date(Date.now()).getMonth();
        const targetDate = [] as number[];
        const targetMonth = [] as string[];
        for(let i = 0;i < 12;i++) {
            const addMonth = (startMonth + i) % 12;
            const currentDate = new Date(Date.now());
            if(addMonth <= currentMonth) {
                targetDate.push(new Date(currentDate.getFullYear(), addMonth, 1).valueOf()/1000)
                targetMonth.push(shortMonth[addMonth] + " "  + String(currentDate.getFullYear()));
            }
            else {
                targetDate.push(new Date(currentDate.getFullYear() - 1, addMonth, 1).valueOf()/1000)
                targetMonth.push(shortMonth[addMonth] + " "  + String(currentDate.getFullYear() - 1));
            }
        }

        targetDate.forEach((date, i) => {
            let accept = problems.filter(problem => (problem.creationTimeSeconds >= date && problem.verdict == "OK")).length;
            let reject = problems.filter(problem => (problem.creationTimeSeconds >= date && problem.verdict != "OK")).length;
            console.log(problems,accept,reject,date)
            if(i+1 != targetDate.length) {
                accept -= problems.filter(problem => (problem.creationTimeSeconds >= targetDate[i+1] && problem.verdict == "OK")).length;
                reject -= problems.filter(problem => (problem.creationTimeSeconds >= targetDate[i+1] && problem.verdict != "OK")).length;
            }
            monthAcceptNumber.push(accept);
            monthRejectNumber.push(reject);
        })

        setPlot({
            xAxis: [{id: 'barCategories', data: targetMonth, tickLabelStyle: {
            }}],
            yAxis: [{ label:'Problem solved'}],
            series: [{ label: 'Accepted', data: monthAcceptNumber, xAxisId: 'barCategories'}, { label: 'Rejected', data: monthRejectNumber, xAxisId: 'barCategories'}],
            height: 300,
        })
    }

    return (
        problems.length > 0 ? (
        <PlotToolbar title={"Month Submission"} >
            <BarChart {...plot}/>
        </PlotToolbar>) : null
    );
}