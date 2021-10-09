import React from 'react';
import './Film_Flip.css';
import { PlayCircleOutlined } from '@ant-design/icons';
import {history} from '../../App';

export default function Film_Flip(props) {

    const { item } = props;

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
                </div>
                <div className="flip-card-back">
                    <div style={{position:'absolute',top:0,left:0}}>
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 300, height: 300 }} />
                    </div>
                    <div className="w-full h-full" style={{position:'absolute',backgroundColor:'rgba(0,0,0,0.5)',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <div>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined className="iconPlay" style={{fontSize:'50px'}}/></div>
                            <div className="text-2xl mt-5 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold" onClick={()=>{
                history.push(`/detail/${item.maPhim}`);
            }}>ĐẶT VÉ</div>
        </div>

    )
}