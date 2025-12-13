import { Slider, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import Badge from "./Badge";

export default function SearchSidebar() {
    const [handle, setHandle] = useState("");
    const [range, setRange] = useState([800, 3700] as number[]);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([] as string[]);
    function submitSearch() {
    }
    function handleRange(event: Event, newValue: number[]) {
        setRange(newValue);
    }
    function handleTagKeyDown(event:any) {
        
        if(event.key == "Enter") {
            if (!tags.includes(tag)) setTags([...tags, tag]);
        }
    }
    function handleRemoveTag(removeTag: string) {
        setTags(tags.filter((tag) => tag != removeTag));
    }

    return (
        <div className="max-w-2xl pr-10">
            <form className="flex flex-col max-w-lg gap-6 my-auto" onSubmit={() => submitSearch()}>
                <TextField label="Handle" className="" id="handle-input" variant='standard' onChange={(e) => setHandle(e.target.value)}/>
                
                <div>
                    <p className="mb-2">Difficulty range</p>
                    <div className="flex flex-row gap-5 items-center">
                        <span>{range[0]}</span>
                        <Slider
                            value={range}
                            marks
                            min={800}
                            max={3700}
                            step={100}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            onChange={handleRange}
                        />
                        <span>{range[1]}</span>
                    </div>
                </div>

                <div>
                    <div className="flex flex-row gap-5 items-center mb-4">
                        <TextField label="Tag" className="" id="handle-input" variant='standard' 
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                        />
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {tags.map((tag) => <Fragment key={tag}><Badge tag={tag} removeTag={handleRemoveTag}></Badge></Fragment>)}
                    </div>
                </div>
            </form>
        </div>
    )
}