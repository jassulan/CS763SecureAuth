import React from "react";
import {render as rtlRender} from "@testing-library/react"
import {configureStore} from "@reduxjs/toolkit"
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from '../reducers'

function render(
    ui,
    {
        preloadedState,
        store = configureStore({reducer : rootReducer, preloadedState: {

        }}),
        ...renderOptions
    }={}

)
{function Wrapper({children}){
    return <Provider store = {store}><Router>{children}</Router></Provider>
}
return rtlRender(ui,{wrapper: Wrapper, ...renderOptions})
}

export* from "@testing-library/react"

export {render}