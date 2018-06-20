import React from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify.js';

/* Test Data*/
/*let  randomTrack= [{name:"Allo",
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
                            id:"3",
                            uri:"spotify:track:0yl1LvI69CJrQlXJoYnU97"
                          },
                          {name:"Time",
                          artist:"Pink floyd",
                          album:"Dark Side of the moon",
                          id:"4",
                          uri:"spotify:track:2dQzfKRaMKUCQgMpOtpLTh"
                          }]
*/


class App extends React.Component {
  constructor(props){
    super(props);
    this.state= { searchResults: [],
                  playlistName : "New PlayList",
                  playlistTracks : []
                };
   this.addTrack=this.addTrack.bind(this);
   this.removeTrack=this.removeTrack.bind(this);
   this.updatePlaylistName=this.updatePlaylistName.bind(this);
   this.savePlaylist=this.savePlaylist.bind(this);
   this.search=this.search.bind(this);
}

search(term){
  Spotify.search(term).then(tracks => {
                                      this.setState({searchResults:   tracks});}
  );
}

savePlaylist(){
  let trackURIs= [];
  this.state.playlistTracks.forEach(track => {trackURIs.push(track.uri) });
  Spotify.savePlaylist(this.state.playlistName,trackURIs).then(()=> {
//  this.updatePlaylistName("New PlayList");
  this.setState({playlistName: 'New PlayList',
                playlistTracks: []
                });
  })
}

updatePlaylistName(name){
  console.log('updatePlaylistName' + name);
  this.setState({playlistName: name});
}

addTrack(track){
  let exist = false;
  this.state.playlistTracks.forEach(element =>
  { if(element.id === track.id){
        exist=true;
    }
  });
  if(exist===true){
   //Track already exist in the playList so we don't need to add it
  }else{
      this.setState({playlistTracks: this.state.playlistTracks.concat([track])});
  }
}
/*Remove song from PlayList*/
removeTrack(track){
   this.setState({playlistTracks: this.state.playlistTracks.filter(( i) => i.id !== track.id)});
}

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
