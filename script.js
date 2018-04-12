let BASE_STREAM_QUERY_URL = 'https://wind-bow.glitch.me/twitch-api/streams/';
let BASE_USER_QUERY_URL = 'https://wind-bow.glitch.me/twitch-api/users/';
const STREAM_LIST = ["esl_sc2", "OgamingSC2", "cretetion", 
                  "freecodecamp", "storbeck", "reynad27", 
                  "RobotCaleb", "noobs2ninjas"];
let streamData = [
  {
    name: "esl_sc2",
  },
  {
    name: "ogamingsc2",
  },
  {
    name: "cretetion",
  },
  {
    name: "freecodecamp",
  },
  {
    name: "storbeck",
  },
  {
    name: "reynad27",
  },
  {
    name: "robotcaleb",
  },
  {
    name: "noobs2ninjas",
  }
];

let streamInfo = []; // name, logo, link, status, game

$(document).ready(() => {
  getUserData();
});

function getUserData() {
  
  STREAM_LIST.forEach((stream) => {
    let currentStreamInfo = [];
    $.ajax({
      url: BASE_USER_QUERY_URL + stream,
      method: 'GET',
      success: data => {
        currentStreamInfo = [data.display_name, data.logo];
        streamInfo.push(currentStreamInfo);
      }
    });
    
  });
}

/*
$.ajax({
  url: BASE_STREAM_QUERY_URL + stream,
  method: 'GET',
  success: data => {
    console.log(data);
    if (data.stream)
      currentStreamInfo = [currentStreamInfo[0], currentStreamInfo[1], data.stream.channel.url, 'Live', data.stream.game, data.stream.channel.status];
    else 
      currentStreamInfo = [currentStreamInfo[0], currentStreamInfo[1], '', 'Offline', '', ''];
    streamInfo.push(currentStreamInfo);
} 
*/

$(document).ajaxStop(() => {
  let htmlToAppend = '';
  streamInfo.forEach((stream, index) => {
    let firstColumnAdditionalClass = '';
    if (index % 2 == 0) {
      htmlToAppend += '<div class="row justify-content-center mb-2">';
      firstColumnAdditionalClass = ' mr-2';
    }
    htmlToAppend += generateStreamCardHTML(stream[0], stream[1], firstColumnAdditionalClass);
    if (index % 2 == 1)
      htmlToAppend += '</div>';
  });
  $("#streamers-grid").append(htmlToAppend);   
});

function generateStreamCardHTML(streamName, logoURL, additionalClass) {
  return `
    <div class="col-md-4 bg-secondary p-1${additionalClass}">
      <img class='stream-logo pr-3' src="${logoURL}" alt="logo" align="left">
      <p class="h5 pt-2">${streamName}  <span class="badge badge-light h6">Status | Game</span></p>
      <p class="h6">Opis streamu</p>
    </div>`;
}