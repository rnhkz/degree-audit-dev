import React from 'react'
import { Row, Col } from 'react-bootstrap';
import SingUp from './components/SingUp';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import AuthProvider from './context/AuthContext';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className='container-fluid'>
      <Row className='bg-image' style={{ minHeight: "100vh" }} xs={12} sm={6} lg={8}>
        <Col className='bg-white center-block' style={{ minHeight: "100vh" }} sm={6} lg={4}>
          <div className='d-flex justify-content-center mx-xs-2  mx-sm-4 mt-5'>
            <AuthProvider>
              <Routes>
                <Route path='/' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SingUp />} />
              </Routes>
            </AuthProvider>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
