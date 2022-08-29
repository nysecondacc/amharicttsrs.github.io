var audio_disp = document.getElementById("aud")
function generate(){
    document.getElementById("filelink").innerHTML = document.getElementById("holder").value // set file link value to holder value
    url = "https://amhtts.herokuapp.com/?text="+ document.getElementById("filelink").innerHTML // url with value of input data
    console.log( document.getElementById("filelink").innerHTML)
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", url )
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE){
               var audio_disp = document.getElementById("aud")
               audio_data = JSON.parse(xmlHttp.responseText)["data"]
               console.log(xmlHttp.responseText)
               document.getElementById("filelink").innerHTML = audio_data
               document.getElementById("aud").src = audio_data 
               audio_disp.style.display = "block" 
        }
     
    } 
    xmlHttp.send();
  

}

// click to upload
function upload(){ 
    document.getElementById("file").click()
}




