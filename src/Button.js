import React , {Component} from "react";


class Button extends Component {
    render(){
      return (
        <div className="btn btn-primary">
            <button onClick={this.greetings}>
                Hello!
            </button>
        </div>
      );
    }
    greetings(){
        alert("It works!");
    }
  }

  export default Button;