import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
 constructor(props){
   super(props);
   this.state={term: ''};

   this.handleSearch=this.handleSearch.bind(this);
   this.handleTermChange=this.handleTermChange.bind(this);
 }

 handleTermChange(event){
   this.state.term=event.target.value;
   //console.log(this.state.term);

 }
 handleSearch(event){
   this.props.onSearch(this.state.term);
   event.preventDefault();
   console.log("CLICK");
 }


  render(){
    return (
      <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
          <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
