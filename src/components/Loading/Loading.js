import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer);

    return (
        <Fragment>
            {
                isLoading ? <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99 }} >
                    <img src="https://img.pikbest.com/58pic/35/39/61/62K58PICb88i68HEwVnm5_PIC2018.gif!bw700" alt="..." className="lg:w-4/12 md:w-5/12 w-7/12 h-3/5" />
                </div> : ''
            }
        </Fragment>
    )
}
