import './App.css'
import { HomePage } from './components/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Billing } from './pages/billing/billing'
import { Report } from './pages/report/report'
import { Product } from './pages/product/product'
import { Login } from './pages/Login/login'
import { BillForm } from './pages/billing/billForm'
import { BillingHome } from './pages/billing/billingHome'
import { Dashboard } from './pages/dashboard/dashboard'
// import { CashBill } from './pages/billing/cashBill'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/billingHome' element={<BillingHome/>}/>
            <Route path='/product' element={<Product/>}/>
            <Route path='/report' element={<Report/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/billing/bill" element={<BillForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
