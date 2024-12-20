// export default function AddTask(props: any) {

//     const submitOnEnter = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter") {
//             e.preventDefault();
//             props.button();
//         }
//     }

//     return (
//         <div className="text-center flex flex-row justify-between w-[650px] h-[75px] border-2 border-slate-200 p-2.5 ml-8 rounded-lg">
//             <input value={props.state} onChange={e => props.setState(e.target.value)} onKeyDown={submitOnEnter} className="w-3/4 text-center shadow shadow-slate-300 rounded" type="text" placeholder="Enter task ..."></input>
//             <button onClick={props.button} className="mx-2 border-2 border-slate-300 p-1 w-[50px] h-[50px] shadow shadow-green-200 rounded-lg">✅</button>
//         </div>
//     )
// }

export default function AddTask(props: any) {
  const submitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.button();
    }
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-[650px] bg-white rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md mx-auto">
      <input
        value={props.state}
        onChange={(e) => props.setState(e.target.value)}
        onKeyDown={submitOnEnter}
        className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg outline-none transition-all duration-300 focus:bg-gray-100 placeholder:text-gray-400"
        type="text"
        placeholder="Add a new task..."
      />
      <button
        onClick={props.button}
        className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
