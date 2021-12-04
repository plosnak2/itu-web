/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays the instruction based on timer to user
 */
import React, { Component } from 'react'
import Gif1 from '../images/cooking1.gif'
import Gif2 from '../images/cooking2.gif'
import Gif3 from '../images/cooking3.gif'
import Gif4 from '../images/cooking4.gif'
import Gif5 from '../images/cooking5.gif'

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            seconds: 3,
            time: this.props.time,
            instructions: this.props.instructions,
            act_instruction: '',
            act_index: 0,
            interval: null,
            backgroundColor: ['green', 'yellow', '#e8d876', '#dbf5ff', '#ffec97'],
            flag: true,
            vibration: null
        };
    }

    //changing timer
    tick = () => {
        if (this.state.seconds > 0) {
            this.setState({flag: true})
            this.setState(state => ({
                seconds: state.seconds - 1
            }));
        }
        else {
            if (this.state.act_index == this.state.time.length - 1) {
                this.setState({ interval: clearInterval(() => this.tick()) })
            }
            else if(this.state.flag){

            }
        }
    }

    componentDidMount() {
        this.setState({ act_instruction: this.state.instructions[0] })
        this.setState({seconds: this.state.time[0]})
        let timer = setInterval(this.tick, 1000);
        this.setState({ timer });

    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    //change time to user friendly variant
    formatTime(secs) {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    //change actual instruction to next
    nextInstruction() {
        this.setState({ seconds: this.state.time[this.state.act_index+1] })
        this.setState({ act_instruction: this.state.instructions[this.state.act_index+1] })
        this.setState({ act_index: this.state.act_index + 1 })
    }

    //change actual instruction to previous
    prevInstruction() {
        this.setState({ seconds: this.state.time[this.state.act_index-1] })
        this.setState({ act_instruction: this.state.instructions[this.state.act_index-1] })
        this.setState({ act_index: this.state.act_index - 1 })
    }

    render() {
        return (
            <div style={{ flex: 1, backgroundColor: this.state.backgroundColor[this.state.act_index % 5], height: window.innerHeight-87, paddingLeft:20, paddingRight: 20}}>
                <div className="d-flex justify-content-between">
                    {
                        this.state.act_index != 0 && <button style={{backgroundColor: '#0782F9', borderRadius:100, justifyContent: 'center', color:'white', fontSize:25}} onClick={() => this.prevInstruction()}>Späť</button>
                    }
                    
                        <button style={{backgroundColor: '#0782F9', borderRadius:100, color:'white', fontSize:25}} onClick={this.props.home}>Recept</button>
                    
                    {
                        this.state.act_index != this.state.time.length - 1 && <button style={{backgroundColor: '#0782F9', borderRadius:100, justifyContent: 'center', color:'white', fontSize:25}} onClick={() => this.nextInstruction()}>Ďalej</button>
                    }                   
                </div>
                <h3 style={{ paddingTop: 30 }}>
                    Časovač: {this.formatTime(this.state.seconds)}
                </h3>
                <div style={{ marginHorizontal: 20 }}>
                    <h3>Postup:</h3>
                    <h5 style={{ fontSize: 20 }}>{this.state.act_instruction}</h5>
                </div>
                <div class="d-flex justify-content-center" style={{marginTop: 50}}>
                    {this.state.act_index % 5 == 0 && (
                        <img  width={window.innerWidth/3} height={window.innerHeight/3} src={Gif1} />
                    )}
                    {this.state.act_index % 5 == 1 && (
                        <img  width={window.innerWidth/3} height={window.innerHeight/3} src={Gif2} />
                    )}
                    {this.state.act_index % 5 == 2 && (
                        <img  width={window.innerWidth/3} height={window.innerHeight/3} src={Gif3} />
                    )}
                    {this.state.act_index % 5 == 3 && (
                        <img  width={window.innerWidth/3} height={window.innerHeight/3} src={Gif4} />
                    )}
                    {this.state.act_index % 5 == 4 && (
                        <img  width={window.innerWidth/3} height={window.innerHeight/3} src={Gif5} />
                    )}

                </div> 
            </div>
        );
    }
}
export default Timer

/*const styles = StyleSheet.create({
    image: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").height / 4,
        resizeMode: "stretch",
        alignSelf: "center",
        marginTop: Dimensions.get("window").height / 3,
    },
    wrapper: {
        backgroundColor: '#0782F9',
        borderRadius: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    wrapperedtext: {
        color: 'white',
        fontSize: 25,
    },
})*/