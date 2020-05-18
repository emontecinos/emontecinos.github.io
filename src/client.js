import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BarChart,
    Bar,
    Line,
    LineChart,
    Legend,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import {exchange_active,NavBar} from '../src/components/navbar'
import './client.css'


const socket = io('wss://le-18262636.bitzonte.com', {
    path: '/stocks',
    transports: ['websocket','polling']
});

function get_exchange(exchange_info, exchange_name){
    let retorno =null;
    Object.keys(exchange_info).map((exchange) => {
        if(exchange_info[exchange]['name']==exchange_name){
            console.log(exchange_info[exchange]);
            retorno= exchange_info[exchange];
        }
    });
    return retorno;
}

function get_ticker_comp(nombre_compania,stocks_info){
    let retorno = null;
    Object.keys(stocks_info).map((stock)=>{
        if(stocks_info[stock]['company_name']==nombre_compania){
            retorno=stocks_info[stock]['ticker'];
        }
    });
    return retorno;
}
function filter_ticker (exchange_info,data,exch_name,nombre_compania,stocks_info){
    let exchange;
    let ticker_c;
    console.log(nombre_compania);
    console.log(exch_name);
    exchange=get_exchange(exchange_info,exch_name);
    ticker_c = get_ticker_comp(nombre_compania,stocks_info);
    console.log(ticker_c);
    console.log(nombre_compania);
    return data.filter(i=>i['ticker']==ticker_c);

    
}
let exchange_info=[];
let stocks_info=[];

socket.emit('EXCHANGES',/* */);
socket.once('EXCHANGES',(data) => {
    // setDataExchange(currentData=>[...currentData,data]);
    // exchange_info=data;
    // exchange_info[data.key]=data;
    Object.keys(data).forEach(function(key) {
        exchange_info[key] = data[key];
        // console.log(key);
        // console.log(data[key]);
    });
    console.log('EXCHANGE');
    console.log(exchange_info);
});
socket.emit('STOCKS',/* */);
socket.once('STOCKS',(data) => {
    // setDataStocks(currentData=>[...currentData,data]);
    Object.keys(data).forEach(function(key) {
        stocks_info[key] = data[key];
        // console.log(data[key]['ticker']);
    });
    console.log('STOCKS');
    // console.log(stocks_info);
});

function condition_exchange_active(exchange_info,dataupdate,exchange_active) {
    var exchange = get_exchange(exchange_info,exchange_active);
    console.log(exchange);
    if (exchange===null){
        return (
            <div>
                <h2>Elige un mercado we</h2>
            </div>
        );
    }else{
        return (
            <div>  
            <div className="Grafico-Grid">
            {exchange['listed_companies'].map((nombre_compania) => {
                return (<div className="Grafico">
                    <h2>{exchange_active}</h2>
                    <h4>{nombre_compania }</h4>
                    <LineChart width={500} height={300} data={filter_ticker(exchange_info,dataupdate,exchange_active,nombre_compania,stocks_info)}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Legend verticalAlign="top" height={36}/>
                    <Line name={nombre_compania} stype="monotone" dataKey="value" stroke="#8884d8" />
                    <Tooltip />
                    </LineChart>
                </div>);

            })}
            </div> 
        </div>
        );
    }
}



const App = ({}) => {

    const [dataupdate,setData] = useState([]);
    const [data2,setData2] = useState([]);
    // const [exchange_info,setDataExchange]=useState([]);
    // const [stocks_info,setDataStocks]=useState([]);

    
    
    // Listen for update event, update state
    useEffect(() => {       
        socket.on('UPDATE',(update) => {
            setData( currentData=>[...currentData,update]);
            console.log("Update\n");
            // console.log(update);
        }),
        socket.on('BUY',(value) => {
            setData2( currentData => [...currentData,value]);
            console.log("BUY\n");
        }),
        socket.on('SELL',(value) => {
            setData2( currentData => [...currentData,value]);
            console.log("SELL\n");
        });
    },[]);

    return (

        <div>  
            <NavBar exch={exchange_info} />
            {console.log(exchange_active)}
            {condition_exchange_active(exchange_info,dataupdate,exchange_active)}
            {/* <div className="Grafico-Grid">
            {stocks_info.map((value) => {
                return <div className="Grafico">
                    <h2>{exchange_active}</h2>
                    {console.log(exchange_active)}
                    <h4>{value['company_name'] }</h4>
                    <LineChart width={500} height={300} data={filter_ticker(dataupdate,exchange_active,value['ticker'],stocks_info)}>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Legend verticalAlign="top" height={36}/>
                    <Line name={value['company_name']} stype="monotone" dataKey="value" stroke="#8884d8" />
                    <Tooltip />
                    </LineChart>
                    </div>
                </div> */}  
        </div>
        );
};

export {socket};
export {stocks_info};
export {exchange_info};

ReactDOM.render(<App />,document.getElementById("root"));