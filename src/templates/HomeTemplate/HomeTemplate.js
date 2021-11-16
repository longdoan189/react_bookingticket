import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";



export const HomeTemplate = (props) => {

    const {Component,...restProps} = props;

    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        }
    })

    return <Route {...restProps} render={(propsRoute)=>{
        return <Fragment>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}