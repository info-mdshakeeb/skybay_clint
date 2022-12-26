import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import NavBar from "../Components/NavBar";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/home', element: <Home /> },
        ]

    }
])