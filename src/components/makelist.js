/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is logical and graphic component for creating new shopping list
 */
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import {auth, UsersRef} from '../firebase'
import Loader from "react-loader-spinner";
import Navbar from "../static/navbar";
import {Navigate, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import cookie from 'js-cookie';
import { AddCircle, CloseOutline } from 'react-ionicons'

export default function MakeList () {
    const navigate = useNavigate();
    const location = useLocation()
    const [unauthorized, setUnauthorized] = useState(false);
    const [loading, setLoading] = useState(true)
    const [shop, setShop] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [mail, setMail] = useState(cookie.get("mail"));
    const [shopping, setShopping] = useState([])
    const [ingredient, setIngredient] = useState(location.state.ingredient);
    const [species, setSpecies] = useState("");
    const [quantity, setQuantity] = useState("")
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [isWrong, setIsWrong] = useState(false)
    const [wrong, setWrong] = useState('')

    useEffect(() => {
        // Update the document title using the browser API
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setLoading(false)
                const fetched = await UsersRef.doc(mail).get();
                setShopping(fetched.data().shopping)
            } else {
                setUnauthorized(true)
                setLoading(false)
            }
          })
        
      }, []);
    
    // function that creates new list in database and navigate into shopping page where user can see his shopping lists
    const submit = async () =>{
        if(shop === ''){
            setIsWrong(true)
            setWrong('Musíte zadať názov obchodu')
        } else {
            const list = {
                shop: shop,
                date: startDate,
                items: ingredient
            }
            
            const final = [...shopping, list]
            UsersRef.doc(mail).update({shopping: final})
            .then(() => {
                navigate('/shopping');
            });
        }  
    }

    // function that adds new item (ingredient) into map of ingredients and changes it´s state
    const add = () => {
        if(ingredient === '' || quantity === ''){
            setIsError(true)
            setError('Musíte zadať aj druh aj množstvo')
        } else {
            const reducedArr = ingredient;
            reducedArr[species] = quantity
            setIngredient({...reducedArr})
            setSpecies('')
            setQuantity('')
            setIsError(false)
            setError('')
        }
        
    }

    // function that deletes item from map of ingredients and update it´s state
    const deleteItem = (key) => {
        console.log(key)
        const reducedArr = ingredient;
        delete reducedArr[key];
        setIngredient({...reducedArr})
    }

    if(loading){
        return(
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
        )
    } else {
        if(unauthorized){
            return(
                <Navigate to="/"/>
            )
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="shoppinglist" style={{marginTop:50}}>
                        <h3 style={{textAlign:"center", color: "white"}}>Zadajte názov obchodu</h3>
                        <input type="text" value={shop} placeholder="Obchod" name="shop" onChange={e =>setShop(e.target.value)} class="form-control" style={{width:"60%", margin:"auto", marginTop:30}}/>
                        <h3 style={{textAlign:"center", color: "white", marginTop:50}}>Zadajte dátum svojho nákupu</h3>
                        <div style={{textAlign:"center", marginTop:30}}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} style={{margin:"auto"}}/>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20, textAlign:"center", marginTop:40 }}>
                            <div><h4 style={{color: "white"}}>Druh</h4></div>
                            <div><h4 style={{color: "white"}}>Množstvo</h4></div>
                            <div></div>
                        </div>
                        {
                            Object.entries(ingredient).map(([key, value]) => {
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
                                            onClick={() => deleteItem(key)}
                                            />
                                        </div> 
                                    </div>
                                    )
                            })  
                        }
                        <h3 style={{textAlign:"center", color: "white", marginTop:30}}>Pridať ďalšie suroviny</h3>
                        <input type="text" value={species} placeholder="Druh" name="shop" onChange={e =>setSpecies(e.target.value)} class="form-control" style={{width:"60%", margin:"auto", marginTop:30}}/>
                        <input type="text" value={quantity} placeholder="Množstvo" name="shop" onChange={e =>setQuantity(e.target.value)} class="form-control" style={{width:"60%", margin:"auto", marginTop:30}}/>
                        <div style={{textAlign:"center", marginTop:15}}>
                            <AddCircle
                            color={'white'} 
                            height="10%"
                            width="10%"
                            onClick={()=>{add()}}
                            />
                        </div>
                        {
                            isError && <h2 style={{textAlign:"center", color: "orange"}}>{error}</h2>
                        }
                        <div style={{textAlign:"center", marginTop:30}}>
                            <button type="button" class="btn btn-light" style={{ fontWeight:"bold"}} onClick={()=>{submit()}}>Vytvoriť zoznam</button>
                        </div>
                        {
                            isWrong && <h2 style={{textAlign:"center", color: "orange", marginTop:15}}>{wrong}</h2>
                        }
                    </div>
                </div>
            </div>
        )
    }
    
  }