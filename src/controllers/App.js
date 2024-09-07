import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from '../views/components/LogIn.js';
import SignIn from '../views/components/SignIn.js';
import IncidentAlert from '../views/components/IncidentAlert.js';

function App() {
    return (
        <Router>
            <Routes>
                {/* Default route, which will show LogIn */}
                <Route path="/LogIn" element={<LogIn />} />
                <Route path="/" element={<LogIn />} />

                {/* Route for SignIn */}
                <Route path="/SignIn" element={<SignIn />} />

                {/* Route for IncidentAlert */}
                <Route path="/IncidentAlert" element={<IncidentAlert />} />
            </Routes>
        </Router>
    );
}

export default App;

