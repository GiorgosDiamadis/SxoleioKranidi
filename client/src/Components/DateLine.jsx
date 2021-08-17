export default function DateLine({date}) {
    return (
        <h2 className={"date-line-h2"} key={date}>
            <span className={"date-line-span"}>{date}</span>
        </h2>
    )
}