
const client_id='51e66184a969426fb30b8aa4e0fbd765';
const redirect_uri='http://localhost:3000/';
//const redirect_uri='http://sikllindil.surge.sh/';
const spotify_api_root='https://api.spotify.com/v1';
const v_contentType = { 'Content-Type': 'application/json' }
let accessToken='';
let expires_in='';
let userID='';



const Spotify= {

  savePlaylist: function(name,URIs){
      Spotify.getAccessToken();// Retrieve Token
      const v_header = {Authorization: `Bearer ${accessToken}`};
      const v_contentType = { 'Content-Type': 'application/json' }

      let createPlayListData={
          "name": name,
          "description": "New playlist description"
        };


      if(name==="" || URIs.length===0){
         console.log('PlayList name or TrackList is empty');
        return; //return null
      }else{ // STEP 1-Retrieve User ID (GET)
         return fetch(spotify_api_root+'/me',  {headers : v_header}).then(response=>{
            if (response.ok) { //Boolean
              return response.json(); //json() function can be used only one time. (data can be read only one time)
            }
            throw new Error(spotify_api_root+'/me Request failed!');
          //Throw Exception
         }, networkError => {    //Function in charge of handling errors
            console.log(networkError.message)
         }).then(jsonResponse => {
            userID=jsonResponse.id;
                    // STEP 2- Create a new  PlayList on the user account (POST)
                    fetch(`${spotify_api_root}/users/${userID}/playlists`,
                        { method : 'POST',
                          headers : { ...v_header,
                                    ...v_contentType}, //not necessary to include v_contentType as it will be automatically be added by ReactJS when doing the POST
                          body: JSON.stringify(createPlayListData)
                        }
                    ).then(response => {
                       if(response.ok){
                           return response.json();
                       }
                       throw new Error(`${spotify_api_root}/users/${userID}/playlists Request failed!`);
                     },networkError => {
                          console.log(networkError.message)
                       }
                     ).then(jsonResponse  => {
                        console.log('TrackID'+jsonResponse.id);
                        let PlayListID=jsonResponse.id;
                                //Step 3: Add Tracks to the newly created PlayList
                                fetch(`${spotify_api_root}/users/${userID}/playlists/${PlayListID}/tracks`,
                                    { method : 'POST',
                                      headers : { ...v_header,
                                                ...v_contentType}, //not necessary to include v_contentType as it will be automatically be added by ReactJS when doing the POST
                                      body: JSON.stringify({uris: URIs})
                                    }
                                ).then(response => {
                                   if(response.ok){
                                       return response.json();
                                   }
                                   throw new Error(`${spotify_api_root}/users/${userID}/playlists/${PlayListID}/tracks Request failed!`);
                                 },networkError => {
                                      console.log(networkError.message)
                                   }
                                 ).then(jsonResponse  => {

                                 })
                     }) //End Step3
         }) //End Step2
      }//End Step1
    },


  search: function(term){
    Spotify.getAccessToken();// Retrieve Token

    //return fetch allow to invoke .then() in the calling function.
    return fetch('https://api.spotify.com/v1/search?type=track&q='+term, {headers: {Authorization: `Bearer ${accessToken}`}
          }).then(response => {
              if (response.ok) { //Boolean
      return response.json();
    }
                  throw new Error('Request failed!'); //Throw Exception
                }, networkError => {    //Function in charge of handling errors
                  console.log(networkError.message)
                }).then(jsonResponse => {

                    if(jsonResponse.tracks.items){
                      return jsonResponse.tracks.items.map(track => {
                              return {
                                id:track.id,
                                name: track.name,
                                artist: track.artists[0].name,
                                album:track.album.name,
                                uri: track.uri
                              };
                            });
                    }else{
                          return [];
                    }
                  });
},

  getAccessToken: function(){
  if(accessToken!==''){
    //console.log('userToken already present');
    return accessToken;
    /*Check if TokenAccess is already present in the URL*/
  }else if(window.location.href.match(/access_token=([^&]*)/)){
    accessToken=window.location.href.match(/access_token=([^&]*)/)[1];
    expires_in=window.location.href.match(/expires_in=([^&]*)/)[1];
    window.setTimeout(() => accessToken = '', expires_in * 1000); //Make sure TokenAccess expires
    window.history.pushState('Access Token', null, '/');//Clean Up URL

    return accessToken;

  }else{
    // Sets the new href (URL) for the current window (Browser's page)
    window.location.href='https://accounts.spotify.com/authorize?client_id='+client_id+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirect_uri;
  }
  }
};

export default Spotify;
