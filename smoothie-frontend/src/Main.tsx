import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NewSmoothieOrder } from "./pages/NewSmoothieOrder";
import Layout from './Layout';
import { SmoothieData } from './pages/SmoothieData';

function Main(props: any) {

        console.log(JSON.parse(process.env.REACT_APP_LEADERSHIP))
    return (
        <Router>

        <Layout
            handleSignOut={props.handleSignOut}
            handleCredential={props.handleCredential}
            isSignedIn={props.isSignedIn}
            user={props.user}
            loginLoading={props.loginLoading}

        >
            <>

                {/* <Router> */}
                    <Routes>
                        <Route path="/" element={<NewSmoothieOrder />} />
                    </Routes>
                {/* </Router> */}
                {/* {props.user.email &&  */}
                    <>
{JSON.parse(process.env.REACT_APP_LEADERSHIP).includes(props.user.email) && 
                    <Routes>
                        <Route path="/smoothie-data" element={<SmoothieData />} />
                    </Routes>
                
}
                    </>
                {/* } */}
                

                
            </>
        </Layout>
        </Router>
    )
}

export default Main;