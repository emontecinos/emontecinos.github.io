import React, {Component} from 'react';
import {socket} from '../client';
import Switch from "react-switch";

class SocketSwitch extends Component {
    constructor() {
        super();
        this.state= {cheked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(cheked){
        if(socket.connected){
            alert("Cerrando");
            socket.close()}
        else{
            alert("Abriendo");
            socket.open()}
        this.setState({cheked});
    }

    render () {
        return (
            <label htmlFor="material-switch">
            <span style={{color: "white"}}>Conectarse al mundo</span>
            <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                onColor="#blue"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
            />
            </label>
        );
    }
}
export default SocketSwitch;