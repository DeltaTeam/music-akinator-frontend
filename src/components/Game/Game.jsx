import React, { Component } from 'react';
import Recorder from '../Recorder/Recorder';
import 'typeface-roboto';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
  
    },
    skel:{
      width:300,
      background: 'red',
    },
    startR:{
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '0 30px',
        width: '300px',
        height: '36px',
        marginLeft: 'calc(50% - 300px/2 + 0.5px)',
        top: 'calc(50% - 16px/2)',
        borderRadius: '4px',
        /* button */
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '16px',
        /* identical to box height, or 114% */
        textAlign: 'center',
        letterSpacing: '1.25px',
        textTransform: 'uppercase',
        border: 'none',
        color: '#FFFFFF',
        background: '#98BF1F',
      },
  }); 

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStrick: 0,
            userGames: 0,
            gameEnded: true,
            hasWon: false
        }
        }

    endGame = (resault) =>{
        //const resault = props.resault,
        const Games = this.state.userGames;
        const Strick = this.state.userStrick;
        this.setState({
            gameEnded: true,
            hasWon: resault,
            userGames: Games + 1,
        })
        if (resault){
            this.setState({
                userStrick: Strick + 1
            })
        }
        else{
            this.setState({
                userStrick: 0
            })
        }
    }

    startGame = () =>{
        this.setState({
            gameEnded: false
        })
    }

  render() {
    return (
    <div className = 'gameBlock'>
        <GamesNumber games = {this.state.userGames}/>
        <StrickNumber strick = {this.state.userStrick}/>
        <ShowRecorder gameEnded = {this.state.gameEnded} games = {this.state.userGames} startGame = {this.startGame} endGame = {this.endGame}/>
    </div>
    );
  }
  
}
function GameResault(props){
    const classes = useStyles();

    const hasWon = props.hasWon;

      if(hasWon){
        return <div>
            <Skeleton className={ classes.skel} animation={false}/>
            <div className = 'textBlock greenColor'>
                You win!
            </div>
            <Skeleton className={ classes.skel} animation={false}/>
          </div>
        
      }
      return <div>
          <Skeleton className={ classes.skel} animation={false}/>
          <div className = 'textBlock redColor'>
                You loose!
        </div>
          <Skeleton className={ classes.skel} animation={false}/>
      </div>
    
  } 

  function ShowRecorder(props){
    const classes = useStyles();
    const gameEnded = props.gameEnded;
    const games = props.games;
    if (gameEnded){
        if(games === 0){
            return <div>
                <Skeleton className={ classes.skel} animation={false}/>
                <Button className={ classes.startR } onClick={props.startGame}>Start Game</Button>
                <Skeleton className={ classes.skel} animation={false}/>
                </div>
        }
        else{
            return <div>
                <GameResault hasWon = {props.hasWon}/>
                <Button className={ classes.startR } onClick={props.startGame}>Try again</Button>
            </div>
        }
    }
    return <div>
        <Recorder endGame = {props.endGame}/>
    </div>
  }  

  const GamesNumber = props =>(
    <div className = 'textBlock greyColor'>
        you have played {`${props.games}`} games
    </div>
  )
  const StrickNumber = props =>(
    <div className = 'textBlock greyColor'>
        You've win {`${props.strick}`} games in a row!
    </div>
  )
  

export default Game;
