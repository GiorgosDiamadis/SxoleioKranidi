export default function Spinner({props}) {
    return (<div
        id={"spinner"}
        className={`${props.isLoading === false ? "invisible" : ""} loader absolute ml-auto mr-auto left-0 right-0 top-1/2 z-10 ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32`}>
    </div>)
}