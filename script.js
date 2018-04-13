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
              stream.viewers = data.stream.viewers;
              stream.game = data.stream.game;
              stream.description = data.stream.channel.status;
            } 
            else {
              stream.url = '';
              stream.broadcastStatus = 'Offline';
              stream.game = '';
              stream.viewers = 0;
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
      htmlToAppend += '<div class="row justify-content-center">';
    }
    htmlToAppend += generateStreamCardHTML(stream.display_name, stream.logo, stream.viewers, stream.game, stream.description);
    if (index % 2 == 1)
      htmlToAppend += '</div>';
  });
  
  $("#streamers-grid").append(htmlToAppend);
  $("#waiting-div").hide();
  //$(".streamCard").fadeIn(1000);
  $(".streamCard").each((index, element) => {

    $(element).delay(index * 200).fadeIn(1000);
    if (index % 2 == 0) {
      $(element).addClass('animated fadeInLeft');
    }
    else {
      $(element).addClass('animated fadeInRight');
    }

  });
});

function generateStreamCardHTML(streamName, logoURL, viewers, game, description) {
  let status;
  let streamStatusClass = '';
  if (viewers != 0) {
    status = `<img class="viewers-img" src="https://openclipart.org/image/2400px/svg_to_png/202776/pawn.png"> ${viewers} | ${game}`;
  } 
  else {
    status = ' Offline';
    streamStatusClass = 'offline'; 
  }
  return `
  <div style="display: none" class="streamCard ${streamStatusClass} text-light col-lg-4 col-md-8 col-sm-10 p-2 mr-2 mb-2">
    <img class='stream-logo pr-3' src="${logoURL}" alt="logo" align="left">
    <p class="h5 pt-2">${streamName}&nbsp;<span class="badge badge-light h6">${status}</span></p>
    <p class="h6">${description}</p>
  </div>`;
}