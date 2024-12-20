import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountCreationSuccessfull() {
    const [timer, setTimer] = useState<number>(3)
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setTimer(2)
        }, 950)
        setTimeout(() => {
            setTimer(1)
        }, 950 * 2)
        setTimeout(() => {
            navigate("/")
        }, 1300 * 2)
    }, [])
    return (
        <div className="mt-[8.5rem]">
            <h1 className="mb-[4.5rem] text-3xl text-center">Account creation successfull</h1>
            <p className="text-center">Redirecting to App in {timer} seconds...</p>
        </div>
    )
}