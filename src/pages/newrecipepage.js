/**
 * Author: Slavomir Svorada (xsvora02)
 * This is graphic component that displays screen where user can add recipe to firestore database
 */
import { Component } from "react";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert, setFieldValue } from 'react'
import Navbar from "../static/navbar";
import "../App.css";
import { withFormik } from 'formik';
import * as yup from 'yup';
import { uploadRecipe } from '../API/newrecipeapi';
import { AddCircle, CloseOutline } from 'react-ionicons'

class NewRecipePage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div style={{ paddingTop: 50, textAlign: 'center', fontSize: 50, fontFamily: 'Open' }}>
                        <label>Vytvorte si recept</label>
                    </div>
                    <div style={{ paddingTop: 50, fontSize: 20, fontWeight: "bold" }}>
                        <div class="form-group">
                            <label for="recipeName">Názov receptu</label>
                            <input type="text" class="form-control" id="recipeName" placeholder="Zadajte názov receptu"  onChange={(e) => { this.props.setFieldValue('name', e.target.value) }} value={this.props.name} />
                        </div>
                        <div class="form-row" style={{ paddingTop: 20 }}>
                            <div class="form-group col-md-8">
                                <label for="tutorialName">Postup</label>
                                <input type="text" class="form-control" id="tutorialName" placeholder="Zadajte časť postupu" onChange={this.props.setCurName} value={this.props.currInstrName} />
                            </div>
                            <div class="form-group col-md-3">
                                <label for="tutorialTime">Čas postupu</label>
                                <input type="number" class="form-control" id="tutorialTime" placeholder="Zadajte čas prípravy (max 999)" onChange={this.props.setCurTime} value={this.props.currInstrTime} />
                            </div>
                            <div class="form-group col-md-1" style={{ paddingTop: 38, paddingLeft: 17 }}>
                                <button class="btn btn-secondary" onClick={this.props.submitSubNameTime} >Pridať</button>
                            </div>
                        </div>
                        {
                            Object.entries(this.props.food.instrName).map(([key, value]) => {
                                return(
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: 20, marginTop:20 }}>
                                        <div><h5 style={{color:"#154c79"}}>{value}</h5></div>
                                    </div>
                                    )
                            })  
                        }
                        <div class="form-row" style={{ paddingTop: 20 }}>
                            <div class="form-group col-md-8">
                                <label for="foodName">Suroviny</label>
                                <input type="text" class="form-control" id="foodName" placeholder="Zadajte názov suroviny" onChange={this.props.ingNameChange} value={this.props.ingName} />
                            </div>
                            <div class="form-group col-md-3">
                                <label for="foodCount">Množstvo suroviny</label>
                                <input type="text" class="form-control" id="foodCount" placeholder="Zadajte množstvo suroviny" onChange={this.props.ingCountChange} value={this.props.ingCount} />
                            </div>
                            <div class="form-group col-md-1" style={{ paddingTop: 38, paddingLeft: 17 }}>
                                <button class="btn btn-secondary" onClick={this.props.ingNameCountAdd} >Pridať</button>
                            </div>
                        </div>
                        {
                            Object.entries(this.props.ingredients).map(([key, value]) => {
                                return(
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20, textAlign:"center", marginTop:20 }}>
                                        <div><h5 style={{color:"#2596be"}}>{key}</h5></div>
                                        <div><h5 style={{color:"#e28743"}}>{value}</h5></div>
                                    </div>
                                    )
                            })  
                        }
                        <div class="form-row" style={{ paddingTop: 20}}>
                            <div class="form-group col-md-4">
                                <label for="fullTime">Čas</label>
                                <input type="text" class="form-control" id="fullTime" placeholder="Zadajte celkový čas prípravy receptu" onChange={(e) => { this.props.setFieldValue('time', e.target.value) }} value={this.props.time} />
                            </div>
                        </div>
                        <div class="form-row" style={{ paddingTop: 20, paddingBottom: 50  }}>  
                        <div class="form-group col-md-8">
                                <label for="customFile">Fotografia</label>
                        </div>
                        <div >
                            <input type="file" onChange={this.props.onFileChange} />
                            <button class="btn btn-secondary" onClick={this.props.uploadFile} >Pridať</button>
                        </div>
                        </div>
                        <div style={{ paddingBottom: 50 }}>
                            <button type="submit" class="btn btn-primary" onClick={this.props.handleSubmit} >Pridať recept</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//export default NewRecipePage;
export default withFormik({
    mapPropsToValues: ({ food }) => ({
      name: food.name,
      time: food.time,
      rate: food.rate,
      rate_count: food.rate_count
    }),
    enableReinitialize: true,
    validationSchema: (props) => yup.object().shape({
        //name: yup.string().max(30).required(),
        //time: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
      console.log('ENDING');
      console.log(props);
      console.log('recipeName: ', props.food.name);
      console.log('recipeName: ', props.food.time);
      values.image = props.imageGet
      values.ingredient = props.ingredients;
      values.instructions = props.food.instrName;
      values.instructions_time = props.food.instrTime;
      console.log('VALUES:' , values);
      uploadRecipe(values, values.ingredient);
      alert('Recept bol pridaný');
    },
})(NewRecipePage);
