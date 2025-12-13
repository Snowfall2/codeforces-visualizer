export default function Badge({tag, removeTag}: {tag:string, removeTag: any}) {
    return (
        <div className="flex flex-row px-2 my-0 bg-yellow-100 rounded-3xl outline outline-yellow-400 items-center gap-1 text-gray-600 transition-colors hover:text-gray-400">
            <span className="text-sm">{tag}</span>
            <img src="close.svg" className="w-5 cursor-pointer" onClick={() => removeTag(tag)}></img>
        </div>
    )
}