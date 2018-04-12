let BASE_STREAM_QUERY_URL = 'https://wind-bow.glitch.me/twitch-api/streams/';
let BASE_USER_QUERY_URL = 'https://wind-bow.glitch.me/twitch-api/users/';

let streamData = [
  { name: "esl_sc2", },
  { name: "ogamingsc2", },
  { name: "cretetion", },
  { name: "freecodecamp", },
  { name: "storbeck", },
  { name: "reynad27", },
  { name: "robotcaleb", },
  { name: "noobs2ninjas", }
];


$(document).ready(() => {
  getUserData();
});

function getUserData() {
  
  streamData.forEach((stream) => {
    let currentStreamInfo = [];
    $.ajax({
      url: BASE_USER_QUERY_URL + stream.name,
      method: 'GET',
      success: data => {
        currentStreamInfo = [data.display_name, data.logo];
        stream.display_name = data.display_name;
        stream.logo = data.logo;
        console.log(stream);
      },
      complete: () => {
        $.ajax({
          url: BASE_STREAM_QUERY_URL + stream.name,
          method: 'GET',
          success: data => {
            if (data.stream) {
              stream.url = data.stream.channel.url;
              stream.broadcastStatus = 'Live';
              stream.game = data.stream.game;
              stream.description = data.stream.channel.status;
            } else {
              stream.url = '';
              stream.broadcastStatus = 'Offline';
              stream.game = '';
              stream.description = '';
            }
            console.log(stream);
          } 
        });
      }
    });
  });
}

$(document).ajaxStop(() => {
  let htmlToAppend = '';
  streamData.forEach((stream, index) => {
    let firstColumnAdditionalClass = '';
    if (index % 2 == 0) {
      htmlToAppend += '<div class="row justify-content-center mb-2">';
      firstColumnAdditionalClass = ' mr-2';
    }
    htmlToAppend += generateStreamCardHTML(stream.display_name, stream.logo, firstColumnAdditionalClass, stream.broadcastStatus);
    if (index % 2 == 1)
      htmlToAppend += '</div>';
  });
  $("#streamers-grid").append(htmlToAppend);   
});

function generateStreamCardHTML(streamName, logoURL, additionalClass, broadcastStatus) {
  return `
    <div class="col-md-4 bg-secondary p-1${additionalClass}">
      <img class='stream-logo pr-3' src="${logoURL}" alt="logo" align="left">
      <p class="h5 pt-2">${streamName}  <span class="badge badge-light h6">Status | Game</span></p>
      <p class="h6">${broadcastStatus}</p>
    </div>`;
}