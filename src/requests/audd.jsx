

var request = require('request');

class auddIO {
    constructor(){
        this.res = {};
    }
    sendTest(){
        var data = {
            'url': 'https://audd.tech/example1.mp3',
            'return': 'timecode, deezer, lirycs',
            'api_token': 'test'
          }
          console.log(data);
          request
            ({
              uri:'https://api.audd.io/',
              form: data,
              method: 'POST'
            },function(err,res,body){
              console.log(err);
              console.log(res);
              console.log(body);
              res = body;
            });
            return this.res;
          }
    

    // sendAudioBlob([buffer, blob])
    // {
    //     const blobURL=URL.createObjectURL(blob);
    //     console.log(blob);
    //     console.log(blobURL);

    //     var reader = new FileReader();
    //     reader.readAsDataURL(blob); 
    //     reader.onloadend = function() {
    //         var base64data = reader.result;                
    //         // console.log(base64data);

    //         var data = {
    //           'audio': base64data,
    //           // 'url': 'https://audd.tech/example1.mp3',
    //           "method":"recognize",
    //           'return': 'timecode, deezer',
    //           'api_token': '6950b7b569a80df42c26795865702903'
    //         }

    //         request
    //         ({
    //           headers: {
    //             // 'Content-Length': base64data.length,
    //             'Content-Type': 'multipart/form-data'
    //           },
    //           uri:'https://api.audd.io/',sendAudioBlob([buffer, blob])
    // {
    //     const blobURL=URL.createObjectURL(blob);
    //     console.log(blob);
    //     console.log(blobURL);

    //     var reader = new FileReader();
    //     reader.readAsDataURL(blob); 
    //     reader.onloadend = function() {
    //         var base64data = reader.result;                
    //         // console.log(base64data);

    //         var data = {
    //           'audio': base64data,
    //           // 'url': 'https://audd.tech/example1.mp3',
    //           "method":"recognize",
    //           'return': 'timecode, deezer',
    //           'api_token': '6950b7b569a80df42c26795865702903'
    //         }

    //         request
    //         ({
    //           headers: {
    //             // 'Content-Length': base64data.length,
    //             'Content-Type': 'multipart/form-data'
    //           },
    //           uri:'https://api.audd.io/',
    //           audio : base64data,
    //           method: 'POST'
    //         },function(err,res,body){
    //           console.log(err);
    //           console.log(res);
    //           console.log(body);
    //         });
    //       }
    // }

    // sendLirycs(){

    // }
    //           audio : base64data,
    //           method: 'POST'
    //         },function(err,res,body){
    //           console.log(err);
    //           console.log(res);
    //           console.log(body);
    //         });
    //       }
    // }

    // sendLirycs(){

    // }
}

export default auddIO