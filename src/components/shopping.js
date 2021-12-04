/**
 * Author: Jakub Zaukolec (xzauko00)
 * This is logical component that handles current user´s shopping lists
 */
import {auth, UsersRef} from '../firebase'
import React, { Component } from 'react';
import '../App.css';
import LoginPage from '../pages/loginpage';
import {Navigate} from 'react-router-dom'
import Loader from "react-loader-spinner";
import cookie from 'js-cookie';
import Navbar from '../static/navbar';
import ShoppingPage from '../pages/shoppingpage';
import sad from '../images/sad.png'

class Shopping extends Component {
  constructor(props) {
    super(props);
    this.state= {
        unauthorized: false,
        shopping: [],
        loading: true
    }
    this.deleteList = this.deleteList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount(){
    auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          console.log("SHOPPING")
          const mail = await cookie.get('mail')
          const user = await UsersRef.doc(mail).get()
          this.setState({shopping: user.data().shopping})
          this.setState({loading: false})
        } catch(e) {
            console.log(e)
        }
        
      } else {
        this.setState({unauthorized: true})
        this.setState({loading: false})
      }
    })
  }

  // function that delete whole shopping list from database and also changes state for rerendering
  async deleteList(index){
        const reducedArr = [...this.state.shopping]
        reducedArr.splice(index, 1);
        this.setState({shopping: reducedArr})
        const mail = await cookie.get('mail')
        UsersRef.doc(mail).update({shopping: this.state.shopping})
        .then(() => {
            console.log('User updated!');
        });
  }

  // function that delete one item from particular shopping list from database and also changes state for rerendering
  async deleteItem(index, key){
    const reducedArr = [...this.state.shopping];
    delete reducedArr[index].items[key];
    this.setState({shopping: reducedArr})
    const mail = await cookie.get('mail')
    UsersRef.doc(mail).update({shopping: this.state.shopping})
    .then(() => {
        console.log('User updated!');
    });
}

  render(){
    if(this.state.loading){
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
        if(this.state.unauthorized){
            return(
              <Navigate to="/"/>
            )
        }
    
        if(this.state.shopping.length === 0){
            return(
                <div>
                    <Navbar />
                    <div className="container" >
                        <div style={{textAlign:"center", marginTop:200}}>
                            <img src={sad} style={{width:250}} alt="Placeholder"/>
                            <h1 style={{color:"#0782F9"}}>Aktuálne nemáte vytvorené žiadne nákupné zoznamy</h1>
                        </div>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <Navbar />
                <div style={{marginTop:50}}>
    
                {this.state.shopping.map((item, index, array) => (
                    <div style={{marginBottom:50}}> 
                    <ShoppingPage item={item} index={index} deleteList={this.deleteList} deleteItem={this.deleteItem}/>
                    </div>   
                ))}
                </div>
                <div style={{height:20}}>
                </div>
            </div>
        )
    }

    
  }
}

export default Shopping;
