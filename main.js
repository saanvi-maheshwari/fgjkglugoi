song = "";
left_wristY = 0;
left_wristX = 0;

right_wristY = 0;
right_wristX = 0;

score_right_wrist = 0;
score_left_wrist = 0;

no_leftY = 0;
remove_decimalsLY = 0;
volume = 0;

no_rightY = 0;
remove_decimalsRY = 0;
speed_rate = 0;

function preload(){
    song = loadSound("pp.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
   
    video.hide();
    video.size(600,500);

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',getposes);
    
}

function getposes(results){
    if (results.length>0){
        console.log(results);
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;

        console.log("Left wrist's X coordinate is:" + left_wristX);
        console.log("Left wrist's Y coordinate is:" + left_wristY);

        console.log("Right wrist's X coordinate is:" + right_wristX);
        console.log("Right wrist's Y coordinate is:" + right_wristY);

       score_left_wrist = results[0].pose.keypoints[9].score;       
       score_right_wrist = results[0].pose.keypoints[10].score;       

    }
}


function modelLoaded(){
    console.log("Model is ready and initialized.")
}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("orange");

    if(score_right_wrist > 0.2){
     circle(right_wristX,right_wristY,15);

     no_rightY = Number(right_wristY);
     remove_decimalsRY = floor(no_rightY*100);
     speed_rate = remove_decimalsRY/300;
     song.rate(speed_rate);
     console.log(speed_rate);

     document.getElementById("speed_label").innerHTML = "Speed: "+speed_rate;
    }
    
    if(score_left_wrist > 0.2){
        circle(left_wristX,left_wristY,15);

        no_leftY = Number(left_wristY);
        remove_decimalsLY = floor(no_leftY*100);
        volume = remove_decimalsLY/300;
        song.setVolume(volume);
        console.log(volume);

        document.getElementById("Volume_label").innerHTML = "Volume: "+volume;
    }

}

function song_play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
