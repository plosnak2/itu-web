/**
 * Author: Jozef Čásar (xcasar)
 * This is logical component that retrieve all recipes data
 */
import { Component } from "react";
import "../App.css";
import { RecipeRef } from "../firebase";
import HomePage from "../pages/homepage";
import Loader from "react-loader-spinner";
import Navbar from "../static/navbar";
import Dropdown from "./dropdown";
import {auth} from '../firebase'
import {Navigate} from 'react-router-dom'

class Home extends Component {
    state = {
        Recipe: [],
        subscribe: "a",
        filter: "",
        isPopupTrue: false,
        checked: false,
        loading: true,
        unauthorized: false
    };

    //getting all recipes(name, time, instructions,...) from database
    async get_data(filter) {
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            this.setState({ Recipe: [] });
            QuerySnapshot.forEach((doc) => {
                if (filter.length != 0) {
                    let reci = doc.data();
                    //let bool = true;
                    let bool_i = 0;
                    let add_flag = false;
                    let length = Object.keys(reci.ingredient).length;
                    filter.forEach((ingredient) => {
                        if (ingredient in reci.ingredient) {
                            add_flag = true;
                        } else {
                            //bool=false;
                            bool_i++;
                        }
                    });
                    if (
                        filter.length - bool_i === length &&
                        filter.length >= length &&
                        this.state.checked
                    ) {
                        recipes.push({ id: doc.id, data: doc.data() });
                    } else if (this.state.checked === false && add_flag) {
                        recipes.push({ id: doc.id, data: doc.data() });
                    }
                } else if (filter.length === 0) {
                    recipes.push({ id: doc.id, data: doc.data() });
                }
            });
            this.setState({ Recipe: recipes });
            this.setState({ loading: false });
        });
    }

    componentDidMount() {
        auth.onAuthStateChanged( user => {
            if (user) {
                this.get_data("");
            } else {
                this.setState({unauthorized: true})
                this.setState({loading: false})
            }
          })
        
        
        console.log(this.state.Recipe);
    }

    //counting recipe rate
    rate = (rate, rate_count) => {
        if (rate_count === 0) {
            return "Nehodnotené";
        }
        return rate / rate_count;
    };

    //change recipes with changing filter
    filtered_ingredients = (filter) => {
        this.get_data(filter);
        this.render();
        this.setState({ filter: filter });
    };

    //display data
    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Navbar />
                    <div className="vertical">
                        <Loader 
                        type="ThreeDots"
                        color="#0782F9"
                        height={100}
                        width={100}
                        />
                    </div>
                </div>
            );
        } else {
            if(this.state.unauthorized){
                return(
                  <Navigate to="/"/>
                )
            }
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <div style={{ paddingTop: 20 }}>
                            <Dropdown set={this.filtered_ingredients} />
                            <div className='custom-control custom-switch' style={{ paddingLeft: 40 }}>
                                <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    id='customSwitches'
                                    checked={this.state.checked}
                                    onChange={() => { this.setState({ checked: !this.state.checked }); this.filtered_ingredients(this.state.filter) }}
                                    readOnly
                                />
                                <label className='custom-control-label' htmlFor='customSwitches'>
                                    Recepty iba s týmito surovinami, ktoré sú zadané
                                </label>
                            </div>
                        </div>
                        <div className="row" style={{ paddingTop: 30, paddingBottom: 30 }}>
                            {this.state.Recipe.map((item, index) => (
                                <HomePage
                                    item={item}
                                    rate={this.rate(item.data.rate, item.data.rate_count)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Home;
