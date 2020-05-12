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

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
