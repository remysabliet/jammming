
const client_id='51e66184a969426fb30b8aa4e0fbd765';
const redirect_uri='http://localhost:3000/';
let accessToken='';
let expires_in='';

const Spotify= {

  search: function(term){
    console.log('Launching new SEARCH: '+term+ 'with  '+ accessToken);
    return fetch('https://api.spotify.com/v1/search?type=track&q='+term,
    {headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      if (response.ok) { //Boolean
          console.log(response.json());
        return response.json();
      }
      throw new Error('Request failed!'); //Throw Exception
    }, networkError => {    //Function in charge of handling errors
      console.log(networkError.message)
    }).then(jsonResponse => {
      console.log("jsonResponse :" +jsonResponse);
    } )
  },

  getAccessToken: function(){
    if(accessToken!==''){
      console.log('userToken already present');
      return accessToken;

      /*Check if TokenAccess is already in the URL*/
    }else if(window.location.href.match(/access_token=([^&]*)/)){
      accessToken=window.location.href.match(/access_token=([^&]*)/);
      expires_in=window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expires_in * 1000); //Make sure TokenAccess expires
      window.history.pushState('Access Token', null, '/');//Clean Up URL
      console.log('Url token was present in URL :'+ accessToken);
      return accessToken;
      /*Not in the URL, We must retrieve the TokenAccess from Spotify endpoint*/
    }else{
      // Sets the new href (URL) for the current window.
      window.location.href='https://accounts.spotify.com/authorize?client_id='+client_id+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirect_uri;
      //https://cors-anywhere.herokuapp.com/
      console.log('Url token not in URL, we must get it from Spotify');

    }
  }
};

export default Spotify;

//https://accounts.spotify.com/authorize/?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09
//https://accounts.spotify.com/authorize/?client_id=51e66184a969426fb30b8aa4e0fbd765&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/
