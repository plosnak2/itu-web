/**
 * Author: Slavomir Svorada (xsvora02)
 * This is logical component for adding recipe on firestore database
 */
import { Component, React } from "react";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import NewRecipePage from "../pages/newrecipepage";
import { ActivityIndicator, Alert, Platform, LogBox } from 'react'
import "../App.css";
import { storage } from "../firebase";
import firebase from 'firebase/app';

class NewRecipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {},
            food: {
                name: '',
                time: '',
                instrName: [],
                instrTime: [],
                ingName: '',
                ingCount: '',
                rate: 0,
                rate_count: 0,
            },
            currInstrName: null,
            currInstrTime: 0,
            image: '',
            finalURL: '',
            progress:0,
        }
        this.setCurName = this.setCurName.bind(this);
        this.setCurTime = this.setCurTime.bind(this);
        this.recipeName = this.recipeName.bind(this);
        this.recipeTime = this.recipeTime.bind(this);
        this.ingNameChange = this.ingNameChange.bind(this);
        this.ingCountChange = this.ingCountChange.bind(this);
        this.ingNameCountAdd = this.ingNameCountAdd.bind(this);
        this.submitSubNameTime = this.submitSubNameTime.bind(this);
    }

    // function that sets state of name of tutorial name
    setCurName(e) {
        this.setState({ currInstrName: e.target.value })
        console.log('currInstrName = ', this.state.currInstrName);
    }
    // function that sets state of count of tutorial time
    setCurTime(e) {
        this.setState({ currInstrTime: e.target.value })
        console.log('currInstrTime = ', this.state.currInstrTime);
    }

    recipeName(e) {
        this.setState({ name: e.target.value })
        console.log('Meno = ', this.state.name);
    }
    recipeTime(e) {
        this.setState({ time: e.target.value })
        console.log('Cas = ', this.state.time);
    }

    // function that sets state of name of ingredient name
    ingNameChange(e) {
        this.setState({ ingName: e.target.value })
    }

    // function that sets state of name of ingredient count
    ingCountChange(e) {
        this.setState({ ingCount: e.target.value })
    }

    // function checking input text and add data to map
    ingNameCountAdd() {
        console.log('TU');
        if (this.state.ingName === '' || this.state.ingCount === '') {
            alert('Pre pridanie suroviny je potrebné zadať názov aj množstvo');
        } else {
            const ingArr = this.state.ingredients;
            ingArr[this.state.ingName] = this.state.ingCount
            console.log('ingARR: ', ingArr);
            this.setState({
                ingredients: ingArr
            });
            console.log('ingName = ', this.state.ingName);
            this.setState({
                ingName: ''
            });
            console.log('ingCount = ', this.state.ingCount);
            this.setState({
                ingCount: ''
            });

        }
    }

    // function checking input text and add data to name and time arrays
    submitSubNameTime() {
        let ingredient = this.state.currInstrName;
        let ingredient2 = this.state.currInstrTime * 60;

        if ((ingredient && ingredient.length > 2) && ((ingredient2 && ingredient2 < 14400))) {
            this.setState(prevState => ({
                food: {
                    ...prevState.food,
                    instrName: [...prevState.food.instrName, ingredient]
                },
            }));
            console.log('instrName = ', this.state.food.instrName);
            this.setState(prevState => ({
                food: {
                    ...prevState.food,
                    instrTime: [...prevState.food.instrTime, ingredient2]
                },
            }));
            console.log('instrTime = ', this.state.food.instrTime);
            this.setState({
                currInstrName: '',
            });
            this.setState({
                currInstrTime: '',
            });

        } else if (ingredient && ingredient.length < 3) {
            alert('Dĺžka postupu musí byť väčšia ako 2 znaky');
        } else {
            alert('Dĺžka času prípravy musí byť zadaná (najviac 240 minút)');
        }
    }

    // function for file input
    onFileChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log('image: ', this.state.image);
    };

    // function for uploading image on storage and download image URL
    uploadFile = () => {
        let file = this.state.image;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var uploadTask = storageRef.child(file.name).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
                this.setState({ progress })
            }, (error) => {
                throw error
            }, () => {
                // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{

                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    this.setState({
                        finalURL: url
                    })
                })
                //document.getElementById("file").value = null

            }
        )
    }

    render() {
        return (
            <NewRecipePage
                setCurName={this.setCurName}
                setCurTime={this.setCurTime}
                ingNameChange={this.ingNameChange}
                ingCountChange={this.ingCountChange}
                ingNameCountAdd={this.ingNameCountAdd}
                recipeName={this.recipeName}
                recipeTime={this.recipeTime}
                food={this.state.food}
                ingredients={this.state.ingredients}
                submitSubNameTime={this.submitSubNameTime}
                onFileChange={this.onFileChange}
                uploadFile={this.uploadFile}
                imageGet={this.state.finalURL}
                currInstrName={this.state.currInstrName}
                currInstrTime={this.state.currInstrTime}
                ingName={this.state.ingName}
                ingCount={this.state.ingCount}
            />
        );
    }

}

export default NewRecipe
