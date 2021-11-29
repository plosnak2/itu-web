import { Component } from "react";
import "../App.css";
import { RecipeRef } from "../firebase";
import HomePage from "../pages/homepage";
import Loader from "react-loader-spinner";
import Navbar from "../static/navbar";
import Dropdown from "./dropdown";
import {auth, UsersRef} from '../firebase'
import {Navigate} from 'react-router-dom'
import cookie from 'js-cookie';

class Favourites extends Component {
    state = {
        Recipe: [],
        subscribe: "a",
        filter: "",
        isPopupTrue: false,
        checked: false,
        loading: true,
        unauthorized: false,
        numOfFavs: 0
    };

    async get_data(filter) {
        try{
            const mail = await cookie.get('mail')
            const user = await UsersRef.doc(mail).get()
            this.setState({numOfFavs: user.data().favourites.length})
            RecipeRef.onSnapshot((QuerySnapshot) => {
                let recipes = [];
                this.setState({ Recipe: [] });
                QuerySnapshot.forEach((doc) => {
                    if(user.data().favourites.includes(doc.id)){
                        recipes.push({ id: doc.id, data: doc.data() });
                    }
                });
                this.setState({ Recipe: recipes });
                this.setState({ loading: false });
        });
        } catch(e) {
            console.log(e)
        }
        
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
        /*let imageRef = firebase.storage().ref('/AjeuQGuaecKrhM4pUgb9.png');
            imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                console.log(url);
            })*/
    }

    rate = (rate, rate_count) => {
        if (rate_count === 0) {
            return "Nehodnotené";
        }
        return rate / rate_count;
    };

    

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
export default Favourites;
