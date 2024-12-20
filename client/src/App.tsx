import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AccountCreationSuccessfull from "./pages/AccountCreationSuccessfull";

export const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);

export default function App() {
  // const [TaskItems, setTaskItems] = useState([])

  // const [Todos, setTodos] = useState([]);
  // const [Tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   const getAllTodos = async () => {
  //     const data = await axios.get("http://localhost:7777/todo/get_todos", {
  //       headers: { 'Content-Type': 'application/json' },
  //       data: { user: "janardan" }
  //     })
  //   }
  //   getAllTodos();

  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/account-created"
        element={<AccountCreationSuccessfull />}
      ></Route>
    </Routes>
    // <>
    //   <Header />
    //   <div className="flex justify-center">
    //     <div className="flex flex-row mx-28">
    //       <Navbar />
    //       <div className="flex flex-col">
    //         {...TaskItems}
    //         <AddTask state={TaskItems} add_to_state={setTaskItems} />
    //       </div>
    //     </div>
    //   </div>
    //   <Footer />
    // </>
  );
}
