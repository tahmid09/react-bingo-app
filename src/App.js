import React, { Component } from 'react';
import ParticleComponent from "./ParticleComponent";
import './App.css';

const data_list = [
  "Create a Positive Environment",
  "Celebrate Your Small Wins",
  "Great success",
  "User engagement",
  "Impossible is just an opinion.",
  "Learning experience ",
  "Personalized learning",
  "Super excited ",
  "Hold the vision",
  "One day or day one",
  "Invest in your dreams",
  "It’s only a test",
  "Operate like a startup",
  "Work hard in silence",
  "The results look promising",
  "Don’t say you don’t have",
  "Can’t wait to share results ",
  "Significant increase ",
  "High quality content",
  "Opportunities don’t happen",
  "Turn your wounds into wisdom",
  "Glorious X team",
  "Allocate resources ",
  "Begin anywhere",
  "Happy to announce"
];

function shuffle_array() {
  return data_list.sort(() => Math.random() - 0.5)
}

const midpoint = 12

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      list: this.getRandomRowCol(),
      checkpoint: {[midpoint]: true},
      showParticle: false,
      selectCol: 0,
      selectRow:0
    };
    this.url = "./Bingo.mp3";
    this.audio = new Audio(this.url);
    
    
  }

  playAudio = () => {
    this.audio.play();
  }

  componentDidUpdate(prevProps, prevState) {
  //  this.isbingoForCol(this.state.selectCol);
  //  this.isbingoForRow(this.state.selectRow);
  //   this.checkLeftTorightDiagonal(this.state.selectRow, this.state.selectCol);
  //   this.checkRightToleftDiagonal(this.state.selectRow, this.state.selectCol);

 
    if(this.isbingoForCol(this.state.selectCol) ||  this.isbingoForRow(this.state.selectRow) || this.checkLeftTorightDiagonal(this.state.selectRow, this.state.selectCol) || this.checkRightToleftDiagonal(this.state.selectRow, this.state.selectCol)) {
        if (!this.state.showParticle) {
          this.setState({
            showParticle: true
          })
        }
        this.playAudio();
    } else {
      if (this.state.showParticle) {
        this.setState({
          showParticle: false
        })
      }
    }

  } 

 /* Reset Board   */
  displayNewBoard = () => {
     this.setState({
      list: this.getRandomRowCol(),
      checkpoint: {[midpoint]: true},
      showParticle: false,
      selectCol: 0,
      selectRow:0
     }) 
  }

    /* Create Random Array   */
   getRandomRowCol = () => {
    const shuffle = shuffle_array();
    const size = 5;
    let grid = [];
    for (let row = 0; row < size; row++) {
      grid[row] = [];
      for (let col = 0; col < size; col++) {
        let id = col + (row * size);
        grid[row][col] = {
          value: shuffle[id],
          id: id
        }
      }
    }
  
    return grid;
  }


   /* check Selected Column   */
   isbingoForCol(col) {
    let is_col = true
    for (let i = col; i < 25; i+= 5) {
      if (!this.state.checkpoint[i]) {
        is_col = false
        return false
      }
    }
    return true
    // if( is_col ) {
    //   if (!this.state.showParticle) {
       
    //     this.setState({
    //       showParticle: true
    //     })
    //   }
    //   this.playAudio();
    // } 
  }
 /* check Selected Column   */
  isbingoForRow = (row) => {
    const rowStart = row * 5;
    let is_row = true
    for (let i = rowStart; i < rowStart + 5; i++) {
      if (!this.state.checkpoint[i]) {
        is_row = false;
        return false
      }
    }
    return true
    // if (is_row) {
    //   if (!this.state.showParticle) {
    //     this.setState({
    //       showParticle: true
    //     })
    //   }
    //   this.playAudio();
    // } 
  }

/* Diagonal left to right */
  checkLeftTorightDiagonal(row, col) {
    let is_leftright = true
    if (row === col) {
      for (let i = 0; i < 5; i++) {
        if (!this.state.checkpoint[5 * i + i]) {
          is_leftright = false
          return false
        }
      }
      return true
      // if (is_leftright) {
      //   if (!this.state.showParticle) {
      //     this.setState({
      //       showParticle: true
      //     })
      //   }
      //   this.playAudio();
      // }
    }
  }
/* Diagonal right to left */
  checkRightToleftDiagonal(row, col) {
    let is_rightleft = true
    if (row === (5 - col - 1)) {
      for (let i = 0; i < 5; i++) {
        if (!this.state.checkpoint[5 * i + 5 - i - 1]) {
          is_rightleft = false
          return false
        }
      }
      return true
      // if (is_rightleft) {
      //   if (!this.state.showParticle) {
      //     this.setState({
      //       showParticle: true
      //     })
      //   }
      //   this.playAudio();
      // }
    }
  }

  // Create Middle Cell
  getmidpointCell = (cellId, row, col) => {
    return (
      <td role='gridcell' key={cellId}>
        <div className='cell-contents'>
          <button
            aria-disabled={true}
            aria-pressed={true}
            className='cell'
           
          >
            <svg className="svg-cell"  role="img" aria-labelledby="star-title" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title id="star-title">Star (free tile)</title>
              <path d="M12.6 1.4l2.2 7c.1.2.3.4.6.4h6.9c.7 0 1 .9.5 1.3l-5.7 4.2c-.2.1-.3.5-.2.7l2.7 7.2c.2.6-.5 1.2-1.1.7l-6-4.5c-.3-.2-.6-.2-.9 0l-6.1 4.5c-.5.5-1.3-.1-1-.7L7.1 15c.1-.2 0-.6-.3-.7l-5.6-4.2c-.6-.4-.2-1.3.4-1.3h6.9c.4 0 .6-.1.7-.4l2.2-7c.1-.7 1.1-.6 1.2 0z"></path>
            </svg>
          </button>
        </div>
      </td>
    );
  }

  // selectCell =  (event) => {
  //    let checkpoint = Object.assign({}, this.state.checkpoint);
  //    const selected = this.state.checkpoint[event.target.value] || midpoint ? true : false;
  //    checkpoint[event.target.value] = !selected;
  //    this.setState({
  //      checkpoint: checkpoint,
  //    })
  // } 

 
  // Create Random Cell 
  generateColl = (colm, y, x) => {
    const midpoint = colm.id === 12;
    const selected = this.state.checkpoint[colm.id] || midpoint ? true : false;
   // this.isbingoForCol(x);
    // this.isbingoForRow(y);
    //  this.checkLeftTorightDiagonal(y, x);
    //  this.checkRightToleftDiagonal(y, x);
    if (midpoint) { return this.getmidpointCell(colm.id, y, x); }
    return (
      <td role='gridcell' key={colm.id}>
        <div className='cell-contents'>
          <button
            aria-pressed={selected}
            className='cell'
            id={this.props.id + '-cell-' + colm.id}
            value={colm.id}
            onClick={() => {
              let checkpoint = Object.assign({}, this.state.checkpoint);
              const selected = this.state.checkpoint[colm.id] || midpoint ? true : false;
              checkpoint[colm.id] = !selected;
              this.setState({
                checkpoint: checkpoint,
                selectCol: x,
                selectRow: y
              })
            }}
          >
            
            {colm.value} 
          </button>
        </div>
      </td>
    );
  }


  render() {
    
    return (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}>
          { this.state.showParticle ?  <ParticleComponent /> : ''}
          
          <div  style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }} className="container">
          <header className="topheader">
          <button className="btn btn-outline-primary btn-sm" onClick={this.displayNewBoard}>New Board</button>

          </header>
            <main>
            <div className="row justify-content-md-center">
              <div  className="com-md-8">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">B</th>
                      <th className="text-center" scope="col">I</th>
                      <th className="text-center" scope="col">N</th>
                      <th className="text-center" scope="col">G</th>
                      <th className="text-center" scope="col">O</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.list.map( (row, y) => {
                      return ([ <tr key={y}> 
                          { row.map( (col, x) => {
                            return this.generateColl(col, y, x);
                          }) } 
                      </tr> ]);
                          
                    }) }
                  </tbody>
                </table>  
              </div>
            </div>  
          </main>  
      

          <footer>
        
</footer>

          </div>
      
        </div>
    ); 
  }

}

 export default App;


