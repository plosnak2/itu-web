import {Component} from 'react'
import Loader from "react-loader-spinner";
import Navbar from "../static/navbar";
import {auth, UsersRef, RecipeRef} from '../firebase'
import cookie from 'js-cookie';
import {Navigate} from 'react-router-dom'
import Favourite from './favorite';
import { CartOutline } from 'react-ionicons'

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
        };
    }

    async get_user() {
        try{
            const user = await cookie.get('mail')
            this.setState({user: user});
            console.log(user)
            UsersRef.doc(user).get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                   let array = [];
                   array.push(documentSnapshot.data())
                   array.map((item) => (item.rating[this.state.id] != null ? this.setState({rating: item.rating[this.state.id]}) : 0));
                }
             });
        } catch(e) {
            console.log(e)
        }        
    }

    componentDidMount() {
        auth.onAuthStateChanged( user => {
            if (user) {
                const url = window.location.href;
                const id = url.substring(url.indexOf('?') + 4);
                this.setState({id: id});
                this.get_user();
                this.unsubcribe = RecipeRef.doc(this.state.id).get().then((documentSnapshot) => {
                       if (documentSnapshot.exists) {
                          this.setState({ recipe: documentSnapshot.data() });
                          this.setState({ loading: false });
                       }
                });
            } else {
                this.setState({unauthorized: true})
                this.setState({loading: false})
            }
          })
    }


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
                    <div className="container" style={{paddingBottom: 100, paddingTop: 30}}>
                        
                        <div style={{width: '80%', margin: 'auto'}}>
                            <img style={{width: '100%', alignSelf: 'center'}} src={this.state.recipe.image}/>
                            <h1 style={{textAlign: 'center', }}>{this.state.recipe.name}</h1>
                            <div className="row">
                            <text className="col-10">a</text>
                            <div className="col-1">
                                <Favourite id={this.state.id}/>
                            </div>                            
                            <CartOutline className="col-1" height="40px" width="40px"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

} export default Recipe