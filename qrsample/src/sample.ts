import jsQR, { QRCode } from 'jsqr';

const mediaStreamConstraints: MediaStreamConstraints = { audio: false , video: {facingMode:"user"}};
//const mediaStreamConstraints: MediaStreamConstraints = { audio: false , video: true };
/* https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/webrtc/test */

var video:HTMLVideoElement;
$(() => {
        console.log("Start")
        //https://stackoverflow.com/questions/40360174/playing-html-5-video-from-angular-2-typescript
        //https://stackoverflow.com/questions/56016696/argument-of-type-htmlelement-is-not-assignable-to-parameter-of-type-canvasima
        video= document.querySelector("video") as HTMLVideoElement;
        if(video){
                navigator.getUserMedia(mediaStreamConstraints,
                        stream => {
                                const track: MediaStreamTrack = stream.getTracks()[0];
                                const capabilities = track.getCapabilities();
                                console.log(capabilities)
                                video.srcObject = stream;
                                video.onloadedmetadata = (e) =>{
                                        video.play();
                                        readQrCode();
                                };
                                console.log('label:' + track.label);
                                console.log('ended:' + track.readyState);
                                track.onended = (event: Event) => console.log('Track ended');
                                //                        const objectUrl = URL.createObjectURL(stream);
                        },
                        error => {
                                console.log('Error message: ' + error.message);
                                console.log('Error name: ' + error.name);
                        });

        }
});



function readQrCode(){
        //const canvas= $("#hiddenCanvasForQR");
        const canvas= document.getElementById('hiddenCanvasForQR') as HTMLCanvasElement;
        if( canvas ){
                console.log(canvas);
                canvas.width = video.videoWidth;
                canvas.height = video.videoWidth;
        }else{
                return false;
        }
        const ctx = canvas.getContext('2d');
        if( ctx ) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }else{
                return false;
        }
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height
                , {
                        inversionAttempts: "dontInvert",
                }
        );
        if( code ){
                console.log(code.binaryData);
                drawLine( ctx ,code.location )
        }else{
    setTimeout(() => {
      readQrCode();
    }, 1000);
        }
        return true;
}


function drawLine( ctx:CanvasRenderingContext2D ,     pos: {
        topRightCorner: any;
        topLeftCorner: any;
        bottomRightCorner: any;
        bottomLeftCorner: any;
        topRightFinderPattern: any;
        topLeftFinderPattern: any;
        bottomLeftFinderPattern: any;
        bottomRightAlignmentPattern?: any;
}){
        ctx.strokeStyle = "blue";
        ctx.lineWidth =5;

  ctx.beginPath();
  ctx.moveTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
  ctx.lineTo(pos.topRightCorner.x, pos.topRightCorner.y);
  ctx.lineTo(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
  ctx.lineTo(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
  ctx.lineTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
  ctx.stroke();
        return;
}
