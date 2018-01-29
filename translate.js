var url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
keyAPI = "trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8";

talkify.config.remoteService.host = 'https://talkify.net';
talkify.config.remoteService.apiKey = '3c2f069c-6173-46a3-927e-1c68b0990d86';

talkify.config.ui.audioControls = {
enabled: false, //<-- Disable to get the browser built in audio controls
container: document.getElementById("player-and-voices")
};


document.querySelector('#translate').addEventListener('click', function() {
var xhr = new XMLHttpRequest(),
    textAPI = document.querySelector('#source').value,
    langAPI = "ko"
    data = "key="+keyAPI+"&text="+textAPI+"&lang="+langAPI;
    
xhr.open("POST",url,true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(data);
xhr.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var res = this.responseText;
        document.querySelector('#json').innerHTML = res;
        var json = JSON.parse(res);
        if(json.code == 200) {
            document.querySelector('#output').innerHTML = json.text[0];
            var player = new talkify.Html5Player(); //or new talkify.Html5Player()
            player.forceLanguage("ko-KR");
            player.playText("Hello");
        }
        else {
            document.querySelector('#output').innerHTML = "Error Code: " + json.code;
        }
    }
}
}, false);