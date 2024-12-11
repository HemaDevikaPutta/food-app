import { React, useEffect } from 'react';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import AppRoutes from './Routes/AppRoutes';
import { useLoading } from './hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadinginterceptors';
import logger from "./logger";
function App() {
  const {showLoading, hideLoading} = useLoading();

  useEffect(()=>{
    logger.log("App component rendered");
    setLoadingInterceptor({showLoading, hideLoading});
  },[]);

  return (
    <>
    <Loading/>
    <Header/>
    <AppRoutes/>
    </>
  );
}

export default App;
