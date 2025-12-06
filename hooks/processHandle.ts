import { useEffect } from "react";
import Problem from "@/interfaces/problem";
import { customStorage } from '@/utils/storage';

export default function processHandle(
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setProblems:React.Dispatch<React.SetStateAction<Problem[]>>,
    submitHandle:string ) {
    useEffect(() => {
          const fetchData = async () => {
              const methodName = `user.status?handle=${submitHandle}`;
              const updateFetch = `https://codeforces.com/api/${methodName}`;
              setLoading(true);
              try {
                if(customStorage.isExpire(submitHandle)) {
                    const json = await fetch(updateFetch).then(res => res.json());
                    if(json.status == "OK") {
                        const rawData = json.result;
                        const problems = rawData.map((sub:any, numSub:number) => {
                            return {
                                id: numSub,
                                name: (sub["problem"]["contestId"]).toString(),
                                index: (sub["problem"]["index"]).toString(),
                                fullName: sub["problem"]["name"],
                                rating: sub["problem"]["rating"],
                                tags: sub["problem"]["tags"],
                                verdict: sub["verdict"],
                                creationTimeSeconds: sub["creationTimeSeconds"],
                            } as Problem;
                        }).filter((sub:any) => sub != null);
                        customStorage.updateItem(submitHandle, problems);
                    }
                }
                const displayProblems = customStorage.getItem(submitHandle);
                setProblems(displayProblems);
              }
              catch {
                setProblems([] as Problem[]);
              }
              finally {
                setLoading(false);
              }
          };
          if(submitHandle != '')
          fetchData();
      }, [submitHandle]);
}