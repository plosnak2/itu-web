import {Component} from 'react'
import Loader from "react-loader-spinner";
import Navbar from "../static/navbar";
import {auth, UsersRef, RecipeRef} from '../firebase'
import cookie from 'js-cookie';
import {Navigate} from 'react-router-dom'
import { IoIosCart } from "react-icons/io";
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
            this.setState({ loading: false });

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
                          console.log(documentSnapshot.data().ingredient)
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
                    <div className="container">
                    <Link to='/makelist'
                    state={{ ingredient: this.state.recipe.ingredient }} ><IoIosCart style={{alignItems: 'center'}}/> </Link>
                        <text>{this.state.rating}</text>
                    </div>
                </div>
            );
        }
    }

} export default Recipe