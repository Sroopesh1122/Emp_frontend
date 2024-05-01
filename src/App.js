import React from "react";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmp from "./pages/employee/CreateEmp";
import UpdateEmp from "./pages/employee/UpdateEmp";
import InfoPage from "./pages/InfoPage";
import EmpList from "./pages/employee/EmpList";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from 'react-query';
import UpdateWrapper from "./components/UpdateWrapper";
import NotFound from "./components/NotFound";
const queryClient = new QueryClient();


function App() {
 
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Dashboard/>}/> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<InfoPage />} />
            <Route path="/emp/update" element={<UpdateEmp />} />
            <Route path="/emp/create" element={<CreateEmp />} />
            <Route path="/emp/list" element={<EmpList />} />
            <Route path="/emp/update/:id" element={<UpdateWrapper />} />
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
      
      
    </>
  );
}

export default App;
