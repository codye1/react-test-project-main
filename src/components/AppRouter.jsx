import React, { useContext } from 'react';
import {  Route, Routes, Navigate} from "react-router-dom";
import { privateroutess, publicroutess } from '../router';
import { AuthContext } from '../context/context';
import MyLoader from './UI/loader/MyLoader';

const AppRouter = () => {
  const {isAuth,isLoading} = useContext(AuthContext)


  if(isLoading){
    return <MyLoader/>
  }

    return (
      isAuth
        ?<Routes>
        {privateroutess.map((route, index) => {
            return (
                <Route key = {index} path = {route.path} element={<route.element />}/>
            )})}
        <Route path = "*" element = {<Navigate to = "/posts" replace/>}/>
        </Routes>
        :<Routes>
        {publicroutess.map((route, index) => {
          return (
              <Route key = {index} path = {route.path} element={<route.element />}/>
          )})}
        <Route path = "*" element = {<Navigate to = "/login" replace/>}/>
        </Routes>
    );
};

export default AppRouter;