/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that retrieve recipe and user data connected with actual recipe
 */
import {Component} from 'react'
import Loader from "react-loader-spinner";
import Navbar from "../static/navbar";
import {auth, UsersRef, RecipeRef} from '../firebase'
import cookie from 'js-cookie';
import {Navigate} from 'react-router-dom'
import Favourite from './favorite';
import { CartOutline } from 'react-ionicons'
import RatingPage from './rating';
import Timer from './cooking'
import { Link } from "react-router-dom";

class Recipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            unauthorized: false,
            user: '',
            id: '',
            recipe: [],
            rating: 0,
            start_flag: false,
        };
        this.set_start_flag = this.set_start_flag.bind(this)
    }

    //get user data connected with recipe
    async get_user() {
        try{
            const user = await cookie.get('mail')
            this.setState({user: user});
            await UsersRef.doc(user).get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                   let array = [];
                   array.push(documentSnapshot.data())
                   array.map((item) => (item.rating[this.state.id] != null ? this.setState({rating: item.rating[this.state.id]}) : 0));
                   this.setState({ loading: false });
                }
             });
        } catch(e) {
            console.log(e)
        }        
    }

    //get recipe data
    async componentDidMount() {
        auth.onAuthStateChanged( user => {
            if (user) {
                const url = window.location.href;
                const id = url.substring(url.indexOf('?') + 4);
                this.setState({id: id});
                this.get_user();
                this.unsubcribe = RecipeRef.doc(this.state.id).get().then((documentSnapshot) => {
                       if (documentSnapshot.exists) {
                          this.setState({ recipe: documentSnapshot.data() });
                       }
                });
            } else {
                this.setState({unauthorized: true})
                this.setState({loading: false})
            }
          })
    }

    //displaying instructions with timer and gif or hole recipe data
    set_start_flag(){
        this.setState({start_flag: false})
    }

    //displaying recipe and user information
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
            else if(this.state.start_flag == false){
                return (
                    <div>
                        <Navbar />
                        <div className="container" style={{paddingBottom: 100, paddingTop: 30}}>
                            
                            <div style={{width: '80%', margin: 'auto'}}>
                                <img style={{width: '100%', alignSelf: 'center'}} src={this.state.recipe.image}/>
                                <h1 style={{textAlign: 'center', }}>{this.state.recipe.name}</h1>
                                <div className="row">
                                <div className="col-10">
                                    <RatingPage actualRating={this.state.rating} user={this.state.user} id={this.state.id} rate_count={this.state.recipe.rate_count} rate={this.state.recipe.rate}/>
                                </div>
                                <div className="col-1">
                                    <Favourite id={this.state.id}/>
                                </div>
                                <Link to='/makelist' state={{ ingredient: this.state.recipe.ingredient }} >
                                    <CartOutline className="col-1" height="40px" width="40px"/>
                                </Link>
                                </div>
                                <hr/>
                                <div style={{paddingTop: 30}}>
                                    <h3>Ingrediencie:</h3>
                                {
                                    Object.entries(this.state.recipe.ingredient).map((item) => {
                                        return (
                                            <h4>{item[1] + " " + item[0]}</h4>
                                        )
                                    })
                                }        
                                </div>
                                <hr/>
                                <div>
                                    <h3>Postup:</h3>
                                    <text>{this.state.recipe.instructions}</text>
                                </div>
                                <div className="d-flex justify-content-center" style={{paddingTop: 30}}>
                                    <button style={{backgroundColor: '#0782F9', borderRadius:100,padding:20,justifyContent: 'center', color:'white', fontSize:25,}} onClick={() => this.setState({start_flag: true})}>Začať variť</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else
                return(
                    <div>
                        <Navbar />
                        <div className="container">
                            <Timer instructions={this.state.recipe.instructions} time={this.state.recipe.instructions_time} home={this.set_start_flag}/>
                        </div>
                    </div>
                )
        }
    }

} export default Recipe