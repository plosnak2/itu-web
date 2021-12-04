/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is graphic component for displaying current user´s shopping lists
 */
import React, { Component } from 'react';
import '../App.css';
import logo from '../images/logo.png'
import { Link } from "react-router-dom";
import Moment from 'moment';
import { CloseOutline } from 'react-ionicons'
import { TrashOutline } from 'react-ionicons'

class ShoppingPage extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
        <div className="container">
            <div className="shoppinglist">
                <div className="shop">
                    <h3 style={{textAlign:"center", color: "white"}}>{this.props.item.shop}</h3>
                    <div style={{position:"absolute", top:5, right:40}}>
                        <TrashOutline
                            color={'red'} 
                            height="60px"
                            width="60px"
                            beat
                            onClick={() => this.props.deleteList(this.props.index)}
                        />
                    </div>
                    <hr/>
                </div>
                <div>
                    <h3 style={{textAlign:"center", color: "white"}}>Nákup naplánovaný na: {
                        Moment(new Date(this.props.item.date.toDate())).format('DD.MM.YYYY')
                    }</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20, textAlign:"center", marginTop:40 }}>
                    <div><h4 style={{color: "white"}}>Druh</h4></div>
                    <div><h4 style={{color: "white"}}>Množstvo</h4></div>
                    <div></div>
                    
                </div>
                {
                    Object.entries(this.props.item.items).map(([key, value]) => {
                        return(
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20, textAlign:"center", marginTop:20 }}>
                                <div><h5 style={{color:"#f6c445"}}>{key}</h5></div>
                                <div><h5 style={{color:"#f6c445"}}>{value}</h5></div>
                                <div>
                                    <CloseOutline
                                        color={'red'} 
                                        height="50px"
                                        width="50px"
                                        beat
                                        onClick={() => this.props.deleteItem(this.props.index, key)}
                                    />
                                </div>
                            </div>
                            )
                    })
                    
                }
            </div>
        </div>
        );
    }
}

export default ShoppingPage;
