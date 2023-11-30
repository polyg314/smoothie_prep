import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewSmoothieOrder } from "./pages/NewSmoothieOrder";
import Layout from './Layout';

function Main(props: any) {

    return (
        <Layout
            handleSignOut={props.handleSignOut}
            handleCredential={props.handleCredential}
        >
        <>
            
            <Router>
                <Routes>
                    <Route path="/" element={<NewSmoothieOrder />} />
                </Routes>
            </Router>
            
        </>
        </Layout>
    )
}

export default Main;