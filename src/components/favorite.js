/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays if this is users favorite recipe
 */
import {Component} from 'react'
import cookie from 'js-cookie';
import {UsersRef} from '../firebase'
import firebase from "firebase";
import { Heart, HeartOutline } from 'react-ionicons'

class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            user: ''
        }
    }

    //check if this recipe is user's favorite recipe
    async getUser(){
        const user = await cookie.get('mail')
        this.setState({user: user})
        UsersRef.doc(this.state.user).get().then((doc) => {
            if (doc.exists){
                this.setState({flag: doc.data().favourites.includes(this.props.id)})
            }        
        });
    }

    componentDidMount(){
        this.getUser();
    }

    //when user click the heart, database is updated
    make_favourite = () => {
        if(this.state.flag == false){
            UsersRef.doc(this.state.user).update({favourites: firebase.firestore.FieldValue.arrayUnion(this.props.id)})
        }
        else if(this.state.flag == true){
            UsersRef.doc(this.state.user).update({favourites: firebase.firestore.FieldValue.arrayRemove(this.props.id)})
        }
        this.setState({flag: !this.state.flag})
    }

    //displaying fill or out-line heart, changed when user press heart
    render(){
        if(this.state.flag == false){
            return(
                <HeartOutline color={'black'} height="40px" width="40px" onClick={() => this.make_favourite()}/>
            )
        }
        else if(this.state.flag){
            return(
                <Heart color={'black'} height="40px" width="40px" onClick={() => this.make_favourite()}/>
            )
        }
    }

}export default Favourite