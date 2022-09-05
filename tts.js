// alert if user want use "write amharic in english feature"
var clickHistory = document.getElementById('fidele')
clickHistory.onchange = function() {
    if (clickHistory.checked) {
        document.getElementById('checker').innerHTML = "true"
        alert('There are some rules that should applied when writing text to be translate \n',
     '1. For 1st alphabets (ለግዕዝ ) use "e" example: "le" - ለ \n',
     '2. For 2nd alphabets ( ለካእብ ) use "u" example: "lu" - ሉ \n',
     '3. For 3rd alphabets (ለሳልስ ) use "i" example: "li" - ሊ \n ',
     '4. For 4rh alphabets (ለራዕብ ) use "a" example: "la" - ላ \n ',
     '5. For 5th alphabets (ለሀምስ ) use "ie" example: "lie" - ሌ \n ',
     '6. For 6th alphabets (ለሳድስ) use only vowel example: "l" - ል \n ',
     '7. For 7th alphabets (ለሳብዕ) use "o" example: "lo" - ሎ \n ',
     '8. For 8th alphabets(ለዲቃላ ቃላት) use "ua" example: "ua" - ሏ \n ',
     '9. The above rules not works for "አ" and "ሀ" family in "አ" and "ሀ" 4th alphabets are removed because it have the same sound as 1th alphabet \n',
     '10. for "አ" and "ሀ" 1st alphabets uses " a ') 
    }
    else{
        document.getElementById('checker').innerHTML = "false"
    }
}

// detect if the holder is changed and translate result of text if checker is on
jQuery('#holder').on('input propertychange paste', function() {
    holder_data = document.getElementById("holder").value    

    url = "https://fidelapi.herokuapp.com/?text="+ holder_data 
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", url )
          xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == XMLHttpRequest.DONE){
                audio_data = JSON.parse(xmlHttp.responseText)["data"]
                if (document.getElementById('checker').innerHTML == "true"){
                   document.getElementById("resultoffidel").innerHTML = audio_data
                }
            }
    }
    xmlHttp.send();
});

audio_disp = document.getElementById("aud") // audio field


// generate button 
function generate(){
    document.getElementById("filelink").innerHTML = document.getElementById("holder").value // set the value of text data for api to holder value
    // if file upload 
    if (document.getElementById("uploaddata").innerHTML == 'true'){
        document.getElementById("uploaddata").innerHTML = 'false'
        var file = document.getElementById("file").files[0] 
        var fileReader = new FileReader()
        fileReader.onload = function(fileLoadedEvent){
            var textFromUploadFile = fileLoadedEvent.target.result
            document.getElementById("filelink").innerHTML = textFromUploadFile // set the value of input data to upload data 
            audio_disp.style.display = "none" // disapear player controller after clicking generate button 
            changer = "false" // by default change "write amharic in english feature" is off
            const js = document.querySelector('#fidele')
            if (js.checked == true){
                changer = "true" 
            }

            url = "https://amhtts.herokuapp.com/?text="+ document.getElementById("filelink").innerHTML + "&" + "changer="+changer // api url with value of input data
            console.log(url)
            var xmlHttp = new XMLHttpRequest()
            xmlHttp.open( "GET", url )
                  xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState == XMLHttpRequest.DONE){
                        console.log(xmlHttp.responseText)
                        var audio_disp = document.getElementById("aud")
                        audio_data = JSON.parse(xmlHttp.responseText)["data"]
                        document.getElementById("filelink").innerHTML = audio_data
                        document.getElementById("aud").src = audio_data 
                        audio_disp.style.display = "block"  // appear 
                    }
            }
            xmlHttp.send();
        }
        fileReader.readAsText(file, "UTF-8")
    }
    // if file is not uploaded
    else {
        audio_disp.style.display = "none" // disapear player controller after clicking generate button 
        changer = "false" // by default change "write amharic in english feature" is off
        const js = document.querySelector('#fidele')
        if (js.checked == true){
            changer = "true" 
        }

        url = "https://amhtts.herokuapp.com/?text="+ document.getElementById("filelink").innerHTML + "&" + "changer="+changer // api url with value of input data
        console.log(url)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open( "GET", url )
              xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == XMLHttpRequest.DONE){
                    var audio_disp = document.getElementById("aud")
                    audio_data = JSON.parse(xmlHttp.responseText)["data"]
                    console.log(audio_data)
                    document.getElementById("filelink").innerHTML = audio_data
                    document.getElementById("aud").src = audio_data 
                    audio_disp.style.display = "block"  // apear 
            }
        }
        xmlHttp.send();
    }
}

// click to upload
function upload(){ 
    document.getElementById("file").click()
    document.getElementById('uploaddata').innerHTML = "true"
}








