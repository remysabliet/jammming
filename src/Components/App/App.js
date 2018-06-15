import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify.js';


let  randomTrack= [{name:"Allo",
                            artist:"ABBA",
                            album:"album",
                            id:"1"
                          },
                          {name:"Caminando en la calle",
                          artist:"Gipsy king",
                          album:"ALBDDO",
                          id:"2"
                          }]
let randomPlayListTracks=[{name:"La petite demoiselle",
                            artist:"Renault",
                            album:"album",
                            id:"3"
                          },
                          {name:"Time",
                          artist:"Pink floyd",
                          album:"Dark Side of the moon",
                          id:"4"
                          }]



class App extends React.Component {
  constructor(props){
    super(props);
    this.state= { searchResults: randomTrack,
                  playlistName : "PlayList Autumn 2017",
                  playlistTracks : randomPlayListTracks
                };
   this.addTrack=this.addTrack.bind(this);
   this.removeTrack=this.removeTrack.bind(this);
   this.updatePlaylistName=this.updatePlaylistName.bind(this);
   this.savePlaylist=this.savePlaylist.bind(this);
   this.search=this.search.bind(this);
}

search(term){
  console.log(term);
  Spotify.getAccessToken();
  console.log(Spotify.search(term));
  
}

savePlaylist(){
  let trackURIs= [];
  this.state.playlistTracks.map(track => {trackURIs.push(track.uri) });
  return trackURIs;
}


updatePlaylistName(name){
  this.setState({playlistName: name});
  console.log('new name'+this.state.playlistName);

}
addTrack(track){
  let exist = false;
  this.state.playlistTracks.map(element => { if(element.id === track.id){
                                                exist=true;
                                           }
  });
  if(exist===true){
  //  console.log("found we add nothing");
  }else{
      this.setState({playlistTracks: this.state.playlistTracks.concat([track])});
  }
}
/*Remove song from PlayList*/
removeTrack(track){
   this.setState({playlistTracks: this.state.playlistTracks.filter(( i) => i.id !== track.id)});
}
//filter((_, i) => i !== index
render(){
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}  onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
  );
}

}


export default App;

/*

<div>
<h1>Ja<span className="highlight">mmm</span>ing</h1>
<div className="App">
<!-- Add a SearchBar component -->
<div className="App-playlist">
<!-- Add a SearchResults component -->
<!-- Add a Playlist component -->
</div>
</div>
</div>
);*/
