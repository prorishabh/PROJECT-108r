var prediction="";

Webcam.set({
    width:300,
    height:350,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_image">'
    });

}

console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zp6dQwcJc/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model_Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResults);
}


function gotResults(error,results)
{
    
    
    if(error)
    {
        console.error(error);
    }
    else
    {
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if(results[0].label=="Amazing")
        {
            document.getElementById("result_emoji").innerHTML="&#128076;";
            document.getElementById("information").innerHTML="This is looking amazing";
        }
        else if(results[0].label=="Best")
        {
            document.getElementById("result_emoji").innerHTML="&#128077;";
            document.getElementById("information").innerHTML="All the best";

        }
        else
        {
            document.getElementById("result_emoji").innerHTML="&#9996;";
            document.getElementById("information").innerHTML="That was a marvelous";

        }
    }         
}