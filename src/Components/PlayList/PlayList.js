import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props){
    super(props);
   this.handleNameChange=this.handleNameChange.bind(this);
  }

 handleNameChange(event){
   this.props.onNameChange(event.target.value);
 }

  render(){
    return (
      <div className="PlayList">
      <input defaultValue={this.props.playlistName} type="text" onChange={this.handleNameChange}/>
      <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
      <a className="PlayList-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
//
