import { createBrowserRouter } from "react-router-dom";
import About from "../Components/About/About";
import Home from "../Components/Home/Home";
import Login from "../Components/Login";
import Media from "../Components/Media/Media";
import Message from "../Components/Message/Message";
import Resiste from "../Components/Resiste";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/home', element: <Home /> },
            { path: '/Media', element: <Media /> },
            { path: '/Message', element: <Message /> },
            { path: '/About', element: <About /> },
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/resister', element: <Resiste /> },
])