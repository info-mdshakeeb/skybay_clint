import { createBrowserRouter } from "react-router-dom";
import About from "../Components/About/About";
import Login from "../Components/Login";
import DetailsPage from "../Components/Media/DetailsPage";
import Media from "../Components/Media/Media";
import Message from "../Components/Message/Message";
import Resiste from "../Components/Resiste";
import Main from "../Layout/Main";
import ProvateRoutes from "./ProvateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Media /> },
            // { path: '/home', element: <Home /> },
            { path: '/Media', element: <Media /> },
            { path: '/Message', element: <Message /> },
            { path: '/About', element: <ProvateRoutes><About /></ProvateRoutes> },
            {
                path: '/media/:id',
                loader: ({ params }) => fetch(`http://localhost:2100/post/${params.id}`),
                element: <DetailsPage />
            },
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/resister', element: <Resiste /> },
])