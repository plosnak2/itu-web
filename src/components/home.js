import { Component } from 'react';
import '../App.css';
import { RecipeRef} from '../firebase'
import HomePage from '../pages/homepage';

class Home extends Component {
    state = {
        Recipe: [],
        subscribe: 'a',
        filter: '',
        isPopupTrue: false,
        checked: false,
        loading: true,
    }

    async get_data(filter) {
        RecipeRef.onSnapshot((QuerySnapshot) => {
            let recipes = [];
            this.setState({ Recipe: [] })
            QuerySnapshot.forEach((doc) => {
                if (filter !== '') {
                    let reci = doc.data()
                    //let bool = true;
                    let bool_i = 0;
                    let add_flag = false;
                    let length = Object.keys(reci.ingredient).length;
                    filter.forEach((ingredient) => {
                        if (ingredient in reci.ingredient) {
                            add_flag = true;
                        }
                        else {
                            //bool=false;
                            bool_i++;
                        }
                    });
                    if ((filter.length - bool_i === length) && filter.length >= length && this.state.checked) {
                        recipes.push({ id: doc.id, data: doc.data() });
                    }
                    else if (this.state.checked === false && add_flag) {
                        recipes.push({ id: doc.id, data: doc.data() });
                    }
                }
                else if (filter === '') {
                    recipes.push({ id: doc.id, data: doc.data() });
                }
            });
            this.setState({ Recipe: recipes });
        });
    }

    componentDidMount() {
        console.log("a")
        this.get_data('');
        this.setState({ loading: false })
        console.log(this.state.Recipe)
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
            return "Nehodnotené"
        }
        return (rate / rate_count)
    }

    filtered_ingredients = (filter) => {
        this.get_data(filter);
        this.render();
        this.setState({ filter: filter })
    }

    render() {
        return (
            <div className="container">
                <div className="row" style={{paddingTop: 30}}>
        {this.state.Recipe.map((item, index) => (            
                <HomePage
                    item={item}
                    rate={this.rate(item.data.rate, item.data.rate_count)}
                />
            
        ))}
        </div>
        </div>
        )
    }
}
export default Home