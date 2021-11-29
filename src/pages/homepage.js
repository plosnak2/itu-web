import { Component } from "react";
import { IoIosStar, IoIosAlarm } from "react-icons/io";


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
          <a className="stretched-link text-decoration-none" href="/">
            <div className="card-title" style={{ alignContent: 'center' ,fontSize: 30 }}>
              {this.props.item.data.name}        
            </div>
            </a>
            <div className="inline align-items-center" style={{alignContent: 'space-between'}}>
            <IoIosStar style={{alignItems: 'center'}}/>
            <text className="card-text" style={{ fontSize: 20}}> {this.props.rate} </text>
            <IoIosAlarm />
            <text className="card-text" style={{ fontSize: 20}}> {this.props.item.data.time}</text>
            </div>
          </div>
         
        </div>
      </div>

      /*<div className="col-md-3 col-xs-6">
            <div className="card">
              <img className="card-img-top" src={this.props.item.data.image} alt=""></img>
              <div className="card-body">
                <p className="card-text">
                  {this.props.item.data.name}
                </p>
              </div>
            </div>
          </div>*/
    );
  }
}
export default HomePage;
