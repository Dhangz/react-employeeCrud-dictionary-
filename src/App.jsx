import EmployeeList from './pages/EmployeesList'
import Header from "./components/Header"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Definitions from './pages/Definitions'
import Home from './pages/Home'
import Dictionary from './pages/Dictionary'
import NotFound from './components/NotFound'
import Customers from './pages/Customers'
import Customer from './components/Customer' 
import Login from './components/Login'
import Register from './components/Register'
import { createContext, useState, useEffect } from 'react'
import { baseUrl } from './Shared'


export const LoginContext = createContext();

function App() {

    useEffect(() => {

        const url =  baseUrl + "api/token/refresh/";
        const minute = 1000 * 60;

        function RefreshToken(){
            if (localStorage.refresh){
                fetch(url, {
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        refresh : localStorage.refresh
                    })
                }).then((response) => {
                    if (!response.ok){
                        throw new Error(response.status)
                    }
    
                    return response.json()
                }).then((data) => {
                    localStorage.access = data.access;
                    localStorage.refresh = data.refresh;
                    setIsLoggedIn(true)
                }).catch((e) => console.log(e))
            }
        }
            RefreshToken();
            setInterval(RefreshToken, minute * 3)        
    }, [])

    function changeLoggedIn(data){
        setIsLoggedIn(data)
        if(data == false){
            localStorage.clear();
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.access ? true : false);

    return (
        <LoginContext.Provider value={[ isLoggedIn, changeLoggedIn ]}>
            <BrowserRouter>
            <Header>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Dictionary' element={<Dictionary />} />
                    <Route path='/Definitions' element={<Definitions />} />
                    <Route path='/Definitions/:search' element={<Definitions />} />
                    <Route path='/Employees' element={<EmployeeList />} />
                    <Route path='/Customers' element={<Customers />} />
                    <Route path='/Customers/:id' element={<Customer />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/404' element={<NotFound />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>  
                </Header>
            </BrowserRouter>
        </LoginContext.Provider>
    )
    }

export default App
