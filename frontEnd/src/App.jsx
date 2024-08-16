import './App.css'
import TaleList from "./components/TalesList.jsx";
import {TaleProvider} from "./components/TaleContext.jsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import TaleReading from "./components/TaleReading.jsx";
import AppNavigation from "./components/AppNavigation.jsx";


const Layout = () => {
    return (
        <>
            <AppNavigation/>
            <Outlet/>
        </>
    )
}


const router = createBrowserRouter([
        {
            element: <Layout/>,
            children:
                [{
                    path: '/',
                    element: <TaleList/>
                },
                    {
                        path: '/:slug',
                        element: <TaleReading/>
                    }]
        }
    ]
)

function App() {

    return (

        <TaleProvider>
            <RouterProvider router={router}/>
        </TaleProvider>

    )
}

export default App
