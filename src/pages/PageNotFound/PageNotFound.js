import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageNotFound(props) {
    return (
        <div className="text-center" style={{background:'rgba(0,0,0,0.8)'}}>
            <div style={{minHeight:'100vh'}} className="pt-14">
            <h3 className="text-5xl text-blue-500 font-bold">Page Not Found</h3>
            <NavLink to="/">
                <button className="my-5 border border-blue-500 p-3 bg-blue-500 font-medium text-xl text-black rounded">Về trang chủ</button>
            </NavLink>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mt-5">
                <img src="https://teach.am/assets/images/Asset.png" alt="https://teach.am/assets/images/Asset.png" />
            </div>
            </div>
        </div>
    )
}
