import testResponse from './testResponse';
import $ from 'jquery';
var request = require('request');

function readResponse() {
  return testResponse;
}

class auddIO {
  constructor() {
    // this.handleResponse = handleResponse;
    this.rtn = {};
    this.api_token = '6950b7b569a80df42c26795865702903';

  }
  sendTest(handleResponse) {
    handleResponse(readResponse());
  }

  // sendTest1(handleResponse) {
  //   var data = {
  //     'url': 'https://audd.tech/example1.mp3',
  //     'return': 'timecode,deezer,spotify',
  //     'api_token': this.api_token
  //   }
  //   var req = request
  //     ({
  //       uri: 'https://api.audd.io/',
  //       form: data,
  //       method: 'POST'
  //     }, function (err, res, body) {
  //       // console.log(res.body);
  //       this.rtn = res.body;
  //       handleResponse(body);
  //       return (res.body);
  //     });
  // }

  sendAudio(handleResponse,file) {
    var data = {
      'url': 'https://audd.tech/example1.mp3',
      'return': 'timecode,deezer,spotify',
      'api_token': this.api_token
    }
    request
      ({
        uri: 'https://api.audd.io/',
        form: file,
        method: 'POST'
      }, function (err, res, body) {
        handleResponse(body);
      });
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