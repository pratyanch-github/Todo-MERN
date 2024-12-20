export default function TodoItem(props: any) {
    return (
        <div className="border-2 p-3 text-center w-[278px] flex flex-row justify-between h-[75px] rounded-xl" onClick={props.DisplayClickedNavbarItems}>
            {props.todoTitle}
            <button onClick={props.taskDelete} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-slate-200 rounded-lg">🗑️</button>
        </div>
    )
}