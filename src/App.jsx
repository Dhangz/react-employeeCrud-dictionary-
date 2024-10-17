import EmployeeList from './pages/EmployeesList'
import Header from "./components/Header"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Definitions from './pages/Definitions'
import Home from './pages/Home'
import Dictionary from './pages/Dictionary'
import NotFound from './components/NotFound'
import Customers from './pages/Customers'
import Customer from './components/Customer'



function App() {

    return (

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
                <Route path='/404' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
            </Routes>  
            </Header>
        </BrowserRouter>
        
    )
    }

export default App
