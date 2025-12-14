import { Autocomplete, createFilterOptions, Slider, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import Badge from "./Badge";
import TAGS from "@/utils/tags";

export default function SearchSidebar({submitHandle, submitTags, submitRange}: {
    submitHandle: React.Dispatch<React.SetStateAction<string>>,
    submitTags: React.Dispatch<React.SetStateAction<string[]>>,
    submitRange: React.Dispatch<React.SetStateAction<number[]>>,
}) {
    const [handle, setHandle] = useState("");
    const [range, setRange] = useState([800, 3700] as number[]);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([] as string[]);
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 5,
        stringify: (tag:string) => tag,
    });

    function submitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submitHandle(handle);
        submitTags(tags);
        submitRange(range);
    }
    function handleRange(event: Event, newValue: number[]) {
        setRange(newValue);
    }
    function handleTagKeyDown(event:any) {
        if(event.key === "Enter") {
            event.preventDefault();
            addTag(tag);
        }
    }
    function handleRemoveTag(removeTag: string) {
        setTags(tags.filter((tag) => tag != removeTag));
    }

    function addTag(newTag: string) {
        if(!tags.includes(newTag) && TAGS.includes(newTag)) {
            setTags([...tags, newTag]);
        }
        setTag("");
    }

    return (
        <div className="max-w-2xl pr-10">
            <form className="flex flex-col max-w-lg gap-6 my-auto" onSubmit={submitSearch}>
                <TextField label="Handle" className="" id="handle-input" variant='standard' onChange={(e) => setHandle(e.target.value)}/>

                <div>
                    <p className="mb-2">Difficulty range</p>
                    <div className="flex flex-row gap-5 items-center">
                        <span>{range[0]}</span>
                        <Slider
                            value={range}
                            min={800}
                            max={3700}
                            step={100}
                            valueLabelDisplay="auto"
                            onChange={handleRange}
                        />
                        <span>{range[1]}</span>
                    </div>
                </div>

                <Autocomplete
                    options={TAGS}
                    value={tag}
                    inputValue={tag}
                    filterOptions={filterOptions}
                    blurOnSelect
                    disableClearable
                    freeSolo
                    onInputChange={(event, value) => {
                        setTag(value);
                    }}
                    onChange={(event, value) => {
                        addTag(value?? "");
                    }}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="Tag" 
                            variant='standard' 
                            onKeyDown={handleTagKeyDown}
                        />
                    )}
                />
                
                <div>
                    <div className="flex flex-row gap-2 flex-wrap">
                        {tags.map((tag) => <Fragment key={tag}><Badge tag={tag} removeTag={handleRemoveTag}></Badge></Fragment>)}
                    </div>
                </div>
                <button className="handle-submit my-4 cursor-pointer">Submit</button>
            </form>
        </div>
    );
}