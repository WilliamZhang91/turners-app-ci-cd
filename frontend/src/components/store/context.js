import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import Axios from "axios";

const initialState = {
    registration: "",
    parked: "",
    dob: "",
    license: "",
    first_name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
    plan: "",
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { REACT_APP_PRODUCT } = process.env
    console.log(state)
    console.log(REACT_APP_PRODUCT)

    const handleRegistration = (e) => {
        dispatch({
            type: "REGISTRATION",
            value: e.target.value
        })
    };

    const handleParked = (e) => {
        dispatch({
            type: "PARKED",
            value: e.target.value
        })
    };

    const handleBirthday = (e) => {
        dispatch({
            type: "DATE_OF_BIRTH",
            value: e.target.value
        })
    };

    const handleFirstName = (e) => {
        dispatch({
            type: "FIRST_NAME",
            value: e.target.value
        })
    };

    const handleSurname = (e) => {
        dispatch({
            type: "SURNAME",
            value: e.target.value
        })
    };

    const handleAddress = (e) => {
        dispatch({
            type: "ADDRESS",
            value: e.target.value
        })
    };

    const handlePhone = (e) => {
        dispatch({
            type: "PHONE",
            value: e.target.value
        })
    };

    const handleEmail = (e) => {
        dispatch({
            type: "EMAIL",
            value: e.target.value
        })
    };

    const handlePlan = (e) => {
        dispatch({
            type: "PLAN",
            value: e.target.attributes.getNamedItem("value").value
        })
    }

    const submitDetails = (e) => {
        e.preventDefault();
        Axios.post(`${process.env.REACT_APP_PRODUCTS}`, {
            name: state.first_name,
            surname: state.surname,
            registration: state.registration,
            phone: state.phone,
            email: state.email,
            address: state.address,
        });
        console.log("submitted")
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                handleRegistration,
                handleParked,
                handleBirthday,
                handleFirstName,
                handleSurname,
                handleAddress,
                handlePhone,
                handleEmail,
                handlePlan,
                submitDetails
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }