
var request = require('request');

class auddIO {
    constructor(){
        this.rtn = {};
        this.api_token= '6950b7b569a80df42c26795865702903';
    }
    async sendTest(){
        var data = {
            'url': 'https://audd.tech/example1.mp3',
            'return': 'timecode,deezer,spotify',
            'api_token': this.api_token
          }
        var req = request
            ({
              uri:'https://api.audd.io/',   
              form: data,
              method: 'POST'
            },async function(err,res,body){
                console.log(res.body);
                this.rtn = res.body;
                return(await res.body);
            });
            return await req;
          }
    
    sendTest1(){
      var data = {
        'url': 'https://audd.tech/example1.mp3',
        'return': 'timecode,deezer,spotify',
        'api_token': this.api_token
      }
      var req = request
        ({
          uri:'https://api.audd.io/',
          form: data,
          method: 'POST'
        },function(err,res,body){
            console.log(body);
            return body;
        });
      return({});
    }

    sendAudioBlob([buffer, blob]){
      var data = {
        'url': 'https://audd.tech/example1.mp3',
        'return': 'timecode,deezer,spotify',
        'api_token': this.api_token
      }
      request
        ({
          uri:'https://api.audd.io/',
          form: data,
          method: 'POST'
        },function(err,res,body){
            console.log(body);
            this.rtn = res.body;
            // this.rtn = {data};
        });
        return this.rtn;
      }

      async sendLyrics(lyrics){
        var data = {
            'method':'findLyrics',
            'q':lyrics,
            'return': 'timecode,deezer,spotify',
            'api_token': this.api_token
          }
        var req = request
            ({
              uri:'https://api.audd.io/',
              form: data,
              method: 'POST'
            },async function(err,res,body){
                console.log(res.body);
                this.rtn = res.body;
                return(await res.body);
            });
            return await req;
      }
}

export default auddIO