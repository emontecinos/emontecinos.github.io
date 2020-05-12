import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect,useState } from 'react';
import {
    BarChart,
    Bar,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

const socket = io('wss://le-18262636.bitzonte.com', {
    path: '/stocks',
    transports: ['websocket','polling']
});

const App = ({}) => {

    const [data,setData] = useState([]);

    // Listen for cpu event, update state
    useEffect(() => {
        socket.on('UPDATE',(value) => {
            setData( currentData => [...currentData,value]);
        });
    },[]);
    return (
        <div>
            <h1>Valor de la accion</h1>
            <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="time"/>
            <YAxis/>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    

        </div>
    );
};
ReactDOM.render(<App />,document.getElementById("root"));