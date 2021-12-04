/**
 * Author: Jozef Čásar (xcasar)
 * This is graphic component that displays user all recipes from database
 */
import { Component } from "react";
import { IoIosStar, IoIosAlarm } from "react-icons/io";
import { Link } from "react-router-dom";


class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card " style={{marginTop: 20 ,backgroundColor: 'orange'}}>
          
          <img
            className="card-img-top" style={{height: 200}}
            src={this.props.item.data.image}
            alt=""
          ></img>
          <div className="card-body text-center" >
          <Link to={{ pathname: `/recipe?id=${this.props.item.id}` }}>
            <a className="stretched-link text-decoration-none">
            <div className="card-title" style={{ alignContent: 'center' ,fontSize: 30 }}>
              {this.props.item.data.name}        
            </div>
            </a></Link>
            <div className="inline align-items-center" style={{alignContent: 'space-between'}}>
            <IoIosStar style={{alignItems: 'center'}}/>
            <text className="card-text" style={{ fontSize: 20}}> {this.props.rate} </text>
            <IoIosAlarm />
            <text className="card-text" style={{ fontSize: 20}}> {this.props.item.data.time}</text>
            </div>
          </div>
         
        </div>
      </div>
    );
  }
}
export default HomePage;
