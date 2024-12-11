import {createContext, useContext, useState} from 'react';

const loadingContext = createContext({});

export const LoadingProvider = ({children})=>{

  const [isloading,setIsLoading] = useState(false);
  const showLoading =()=> setIsLoading(true);
  const hideLoading =()=> setIsLoading(false);

  return(
    <loadingContext.Provider value={{isloading, showLoading, hideLoading}}>
        {children}
    </loadingContext.Provider>
  );
}
export const useLoading =()=> useContext(loadingContext);