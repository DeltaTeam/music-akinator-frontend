import testResponse from './testResponse';
import creds from './credentials';
var request = require('request');

function readResponse() {
  return testResponse;
}

class auddIO {
  constructor() {
    this.rtn = {};
    this.api_token = creds.api_token;

  }
  sendTest(handleResponse) {
    handleResponse(readResponse());
  }

  sendTest1(handleResponse) {
    var data = {
      'url': 'https://audd.tech/example1.mp3',
      'return': 'timecode,deezer,spotify',
      'api_token': this.api_token
    }
    var req = request
      ({
        uri: 'https://api.audd.io/',
        form: data,
        method: 'POST'
      }, function (err, res, body) {
        handleResponse(body);
      });
  }

  sendAudio(handleResponse,file) {
    const url = 'https://api.audd.io/';

    var data = {
      'file': file,
      'return': 'timecode,deezer,spotify',
      'api_token': this.api_token
    }

    console.log(file);
    var formData = new FormData();
    formData.append('file', data.file);
    formData.append('return', 'timecode,deezer,spotify');
    formData.append('api_token', data.api_token);

    var oReq = new XMLHttpRequest();
    oReq.open("POST", url);
    oReq.send(formData);

    oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            console.log("Uploaded");
            console.log(oReq);
            console.log(oEvent);
            handleResponse(oReq.response);
        } else {
            console.log("Error " + oReq.status + " occurred uploading your file.");
            handleResponse({'status':'error'});
          }
  };
  }


  sendLyrics(handleResponse,lyrics) {
    var data = {
      'method': 'findLyrics',
      'q': lyrics,
      'return': 'timecode,deezer,spotify',
      'api_token': this.api_token
    }
    request
      ({
        uri: 'https://api.audd.io/',
        form: data,
        method: 'POST'
      }, function (err, res, body) {;
        handleResponse(body);
      });
  }

}

export default auddIO