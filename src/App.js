import React from 'react';

const musicClips =
  [{identifier: 'Q',
  identifierCode: 81,
  clipName: 'Heater 1',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },

  {identifier: 'W',
  identifierCode: 87,
  clipName: 'Heater 2',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},

  {identifier: 'E',
  identifierCode: 69,
  clipName: 'Heater 3',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},

  {identifier: 'A',
  identifierCode: 65,
  clipName: 'Heater 4',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},

  {identifier: 'S',
  identifierCode: 83,
  clipName: 'Heater 6',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},

  {identifier: 'D',
  identifierCode: 68,
  clipName: 'Kick \'n Hat',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},

  {identifier: 'Z',
  identifierCode: 90,
  clipName: 'RP4 Kick',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},

  {identifier: 'X',
  identifierCode: 88,
  clipName: 'Punchy Kick',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'},

  {identifier: 'C',
  identifierCode: 67,
  clipName: 'Break Snare',
  clipLink: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'}]


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicClips: musicClips,
      currentlyPlaying: ''
    }
  this.playMusic = this.playMusic.bind(this);
  this.handleKeyPress = this.handleKeyPress.bind(this);  
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    switch(e.keyCode) {
      case 81:
      case 87:
      case 69:
      case 65:
      case 83:
      case 68:
      case 90:
      case 88:
      case 67:
        let audioEl = document.getElementsByName(e.keyCode);
        audioEl[0].parentElement.classList.add('down');
        setTimeout(() => {audioEl[0].parentElement.classList.remove('down');}, 250);
        audioEl[0].play();
        let currentClip = musicClips.filter(x => x.identifierCode === e.keyCode);
        this.setState({currentlyPlaying: currentClip[0].clipName});
        setTimeout(() => {
          this.setState({currentlyPlaying: ''});
        }, 1000);
        break;
      default:
        this.setState({currentlyPlaying: 'WRONG BUTTON!'});
        setTimeout(() => {
          this.setState({currentlyPlaying: ''});
        }, 1000);
    }
  }

  playMusic(e) {
    let audioEl = e.target.parentElement.querySelector('audio');
    audioEl.play();
    this.setState({currentlyPlaying: audioEl.parentElement.id});
    setTimeout(() => {
      this.setState({currentlyPlaying: ''});
    }, 1000);
  }

  render() {
    return (
      <DrumMachine 
      musicClips={this.state.musicClips} 
      currentlyPlaying={this.state.currentlyPlaying}
      onClick={this.playMusic}
      />
    )
  }
}

function DrumMachine(props) {
  return (
    <div id='drum-machine'>
    <p id='brand'>Dream-Pad</p>
    <Display display={props.currentlyPlaying}/>
    <DrumPads 
    musicClips={props.musicClips}
    onClick={props.onClick}
    />
    </div>
  );
}

function Display(props) {
  return (
    <div id='display'>
    <p id='display-p'>{props.display}</p>
    </div>
  )
}

function DrumPads(props) {
  let a = props.musicClips.map(x => { 
    return (
    <div
    className='drum-pad'
    id={x.clipName}
    onClick={props.onClick}>
    <audio
    src={x.clipLink}
    className='clip'
    id={x.identifier}
    name={x.identifierCode}>
    </audio>
    <p>{x.identifier}</p>
    </div>
    )});
  return a;
  }

export default App;
