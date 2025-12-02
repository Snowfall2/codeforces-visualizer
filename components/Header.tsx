
export default function Header() {
    return (
        <header className="mx-auto py-4 px-8 flex justify-between items-center flex-wrap">
            <div className="logo">
                <img className="h-8" src="cf-icon.png" ></img>
            </div>
            <div className="header flex flex-row justify-end">
                <div className="mx-4 rounded-md">Tag distribution</div>
                <div className="mx-4">Rating distribution</div>
                <div className="mx-4">About me</div>
            </div>
        </header>
    )
}   