import { useState } from "react";
import TodoItem from "./Todo";

export default function AddTodo(props: any) {
  const [NewTodo, setNewTodo] = useState("");

  return (
    <div className="border-2 p-3 text-center w-[278px] flex flex-row justify-between h-[75px] rounded-xl">
      <input
        onChange={(e) => setNewTodo(e.target.value)}
        className="input-todo w-3/4 text-center shadow shadow-slate-300 rounded"
        type="text"
        placeholder="Enter todo ..."
      ></input>
      <button
        className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg"
        onClick={() => {
          props.add_to_state((prevState = props.state) => {
            return [...prevState, <TodoItem todoTitle={NewTodo} />];
          });
        }}
      >
        ✅
      </button>
    </div>
  );
}
