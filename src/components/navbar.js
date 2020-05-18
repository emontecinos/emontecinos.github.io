import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SocketSwitch from './soketswitch';
import {exchange_info} from '../client';

let exchange_active;
class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state={
            exchanges:exchange_info,
            nombre : "PERRO",
            size: exchange_info.length,
            exch_active: null,
            display_name: "Ningun mercado seleccionado",
        };
    }

    render () {
            return (
                
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">{this.state.display_name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title="Markets" id="collasible-nav-dropdown">
                    {Object.keys(this.state.exchanges).map((nombre) => {
                        // console.log(nombre);
                        // console.log(this.state.exchanges[nombre]);
                        return <NavDropdown.Item onClick={() => {this.setState({exch_active: this.state.exchanges[nombre], display_name: this.state.exchanges[nombre]['name']});exchange_active=this.state.exchanges[nombre]['name']}}>{this.state.exchanges[nombre]['name']}</NavDropdown.Item>
                    })}
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <SocketSwitch></SocketSwitch>
            </Navbar>
        );
    }
}
export {exchange_active, NavBar};
