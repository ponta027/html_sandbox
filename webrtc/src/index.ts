import jsQR, { QRCode } from 'jsqr';

const mediaStreamConstraints: MediaStreamConstraints
        = {audio :false , video:{facingMode:"environment"}}
let video:HTMLVideoElement;

function showErrorMessage(data:any){
}
$( ()=>{
        console.log("Start");
        video = document.querySelector("video") as HTMLVideoElement;
        navigator.mediaDevices.enumerateDevices()
                .then( (devices) => {
                        for( const device of devices){
                                console.log(device);
                                if( device.kind =="videoinput"){
                                        const comboTag ='<option value="'+device.deviceId+'">'+device.label+'</option>'
                                        $("#cameralist").append(comboTag);
                                }
                                }
                });
        //const video = $("#video") as HTMLVideoElement;
        setUpCamera(video)
});

function setUpCamera(videoObj:HTMLVideoElement){
        navigator.mediaDevices.getUserMedia( mediaStreamConstraints )
        .then( (stream=>{
                console.log(stream);
                videoObj.srcObject = stream;
                videoObj.onloadedmetadata = (e) =>{
                        videoObj.play();
                        start();
                };

                const [track] = stream.getVideoTracks();
                const capabilities = track.getCapabilities();
                if ( "zoom" in capabilities){
                        /*
                        track.applyConstraints({
                            advanced:[{zoom:1}];
                        });
                        }
                         */
                }else{
                        console.log("zoom not supported")
                    
                }
        })).catch( (error)=>{
                console.log(error);
        });

}

$('select').change(function() {
        const selectedDeviceId = $("#cameralist").val() as string
        (mediaStreamConstraints.video as MediaTrackConstraints).deviceId = selectedDeviceId;
        setUpCamera(video);
});


$("#drawLine").on('click', ()=>{
        console.log("click")
        const canvasElem = document.querySelector("canvas") as HTMLCanvasElement
        const ret = (video.getBoundingClientRect());
        console.log(ret);
        //        $("#canvas").css({"position":"absolute","top":ret.top,"left":ret.left,"width":ret.width, "height":ret.height});
        const ctx = canvasElem.getContext("2d") ;
        if( ctx ) {
                ctx.strokeStyle= "blue"
                ctx.lineWidth=5;
                ctx.beginPath()
                ctx.moveTo(0,0);
                ctx.lineTo(0,100)
                ctx.stroke();
        }
})



function start(){
        setInterval(()=>{
                readQr();
        },1000);
}
function readQr(){
        console.log("readQr")
        const canvas = document.getElementById("canvasQR") as HTMLCanvasElement
        if( canvas ) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;   
        }else{
                console.log("canvas error")
                return 
        }
        const ctx = canvas.getContext("2d");
        if( !ctx ){
                console.log("canvas 2d")
                return;
        }
        ctx.drawImage(video,0,0,canvas.width , canvas.height);
        const imageData = ctx.getImageData(0,0,canvas.width , canvas.height);
        const code = jsQR( imageData.data , canvas.width, canvas.height,{
                inversionAttempts:"dontInvert"
        })
        if( code ){
            drawLine(ctx, code.location );

             const canvasElem = document.getElementById("canvas") as HTMLCanvasElement
                canvasElem.width = video.videoWidth;
                canvasElem.height = video.videoHeight;   
                $("#canvas").css({position:"absolute",top:video.getBoundingClientRect().top,left:video.getBoundingClientRect().left});


 
            const ctx2 = canvasElem.getContext("2d");
            if( ctx2 ){
                    drawLine(ctx2, code.location );
            }
        }else{
             const canvasElem = document.getElementById("canvas") as HTMLCanvasElement
            const ctx2 = canvasElem.getContext("2d");
                if(ctx2){
                        ctx2.clearRect(0,0,video.getBoundingClientRect().width , video.getBoundingClientRect().height);
                }
        }


}
function drawLine(
        ctx:CanvasRenderingContext2D ,
           pos: {
        topRightCorner: any;
        topLeftCorner: any;
        bottomRightCorner: any;
        bottomLeftCorner: any;
        topRightFinderPattern: any;
        topLeftFinderPattern: any;
        bottomLeftFinderPattern: any;
        bottomRightAlignmentPattern?: any
           }){

        // const canvasElem = document.getElementById("canvasQR") as HTMLCanvasElement

        const ret = (video.getBoundingClientRect());
        console.log(ret);
        //        $("#canvas").css({"position":"absolute","top":ret.top,"left":ret.left,"width":ret.width, "height":ret.height});
        // const ctx = canvasElem.getContext("2d") ;
        console.log(pos);
        if( ctx ) {
                ctx.strokeStyle= "blue"
                ctx.lineWidth=5;
                ctx.beginPath()
  ctx.moveTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
  ctx.lineTo(pos.topRightCorner.x, pos.topRightCorner.y);
  ctx.lineTo(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
  ctx.lineTo(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
  ctx.lineTo(pos.topLeftCorner.x, pos.topLeftCorner.y);

                ctx.stroke();
        }

}


