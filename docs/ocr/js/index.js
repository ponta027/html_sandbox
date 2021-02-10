const FACING_MODE_ENVIRONMENT = "environment";
const FACING_MODE_USER = "user";
let gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;
let intervalTime = 250;
let frameRate = 10;
let readCount = 0;
let width = 240;
let height = 320;

const switchCamera = () => {
        if (gCurrentCameraFacingMode === FACING_MODE_ENVIRONMENT) {
                gCurrentCameraFacingMode = FACING_MODE_USER;
        } else {
                gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;
        }
        startVideo();
}


const video = document.querySelector("#camera");
//const canvas = document.querySelector("#picture");

const canvas = document.getElementById('hiddenCanvasForQR');

function Position( x , y ){
        this.x=x;
        this.y = y 
}
/**/
var startPosition=new Position(0,0);
var endPosition =new Position(0,0);
function onClick(e){
        e.preventDefault();
        startPosition.x = (e.touches[0].clientX)- canvas.getBoundingClientRect().left;
        startPosition.y = (e.touches[0].clientY)- canvas.getBoundingClientRect().top;
}
function touchMove(e){
        //    console.log(e);
}
function touchEnd(e){
        if( e.changedTouches.length == 1 ){
                endPosition.x = e.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
                endPosition.y = e.changedTouches[0].clientY - canvas.getBoundingClientRect().top;
                const ctx = canvas.getContext('2d');
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 5;
                console.log(startPosition);
                console.log(endPosition);

                ctx.beginPath();
                ctx.moveTo(startPosition.x,startPosition.y);
                ctx.lineTo( startPosition.x , endPosition.y);
                ctx.lineTo( endPosition.x , endPosition.y );
                ctx.lineTo( endPosition.x , startPosition.y);
                ctx.lineTo( startPosition.x , startPosition.y);
                ctx.stroke();
        }
}
canvas.addEventListener( 'touchstart' , onClick , false);
canvas.addEventListener( 'touchend' , touchEnd, false);
canvas.addEventListener( 'touchmove' , touchMove, false);
/**/

$('#capture').on('click', function(){
                video.pause();
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                $('#log').text("result:");

                })
$('#load').on('click', function(){
                console.log(canvas.toDataURL());

                this.status = 'reading';
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                if (canvas.width == 0) {
                return;
                }
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(
                        startPosition.x, startPosition.y, 
endPosition.x-startPosition.x, 
endPosition.y-startPosition.y);

                ctx.strokeStyle = "blue";
                ctx.lineWidth = 5;



                Tesseract.recognize(imageData, 'eng', {
logger: log => {
console.log(log);
}
})
.then(result => {
                console.log(result);
                $('#msg').text("result:"+result.text);

                })
.catch(error => console.log(error))
        .finally(() => {
                        video.play();
                        });


})



function sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
}

var videoSetting;
const startVideo = () => {
        console.log("startVideo");
        if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({
video: {
width: {
ideal: width
},
height: {
ideal: height
},

iso: {
min: 100,
ideal: 1000,
max: 1600
},
frameRate: {
max: frameRate
},
facingMode: gCurrentCameraFacingMode
}
})
.then(async stream => {

                await sleep(1000);
                const [track] = stream.getVideoTracks();
                const capabilities = track.getCapabilities();


                video.srcObject = stream;

                video.onloadedmetadata = (e) => {
                video.play();
                checkPicture();
                };
                }) ;

} else {
}
}


startVideo();

const checkPicture = () => {

        /*
           canvas.width = video.videoWidth;
           canvas.height = video.videoHeight;
           const ctx = canvas.getContext('2d');
           if (canvas.width == 0) {
           return;
           }
           ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

           const jsQRfinish = new Date();
           requestAnimationFrame( checkPicture );
           */
}
const drawLine = (ctx, pos, options = {
color: "blue",
size: 5
}) => {
        ctx.strokeStyle = options.color;
        ctx.lineWidth = options.size;

        ctx.beginPath();
        ctx.moveTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
        ctx.lineTo(pos.topRightCorner.x, pos.topRightCorner.y);
        ctx.lineTo(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
        ctx.lineTo(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
        ctx.lineTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
        ctx.stroke();
}


