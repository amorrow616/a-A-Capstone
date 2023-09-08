import HomePage from "./HomePage";
import MainPage from "../MainPage";
import { useSelector } from "react-redux";

export default function HomePageRender() {
    const sessionUser = useSelector((state) => state.session.user);
    return (
        <>
            {sessionUser ? <MainPage /> : <HomePage />}
        </>
    )
}
