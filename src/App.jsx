import { createContext, useEffect, useReducer } from 'react';
import './App.css';
import Table from './components/table/table';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from './routes/protectedRoutes';
import Auth from './components/auth/auth';
import { StateContext } from './context/context';
import { initialState, reducer } from './reducer/reducer';
import { useUsersQuery } from './services/usersApi';
function App() {

  const { data, refetch, error, isLoading, isSuccess } = useUsersQuery();

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch, data, refetch, error, isLoading, isSuccess }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/" element={<Table />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </StateContext.Provider>
  );
}

export default App;
