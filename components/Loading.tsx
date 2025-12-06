export default function Loading({loading}: {loading:boolean}) {
    return loading?
    <div className='flex flex-col h-[calc(100vh-300px)]'>
        <div className="flex grow flex-col items-center justify-center">
            <span className="loader"></span>
        </div>
    </div>: null;
}