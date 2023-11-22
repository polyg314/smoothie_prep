import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewSmoothieOrder } from "./pages/NewSmoothieOrder";

function Main(props: any) {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<NewSmoothieOrder />} />
                </Routes>
            </Router>
        </>
    )
}

export default Main;