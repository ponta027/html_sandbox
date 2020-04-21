const FACING_MODE_ENVIRONMENT = "environment";
const FACING_MODE_USER = "user";
let gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;
let intervalTime = 250;
let readCount = 0;

const switchCamera = () => {
  if (gCurrentCameraFacingMode === FACING_MODE_ENVIRONMENT) {
    gCurrentCameraFacingMode = FACING_MODE_USER;
  } else {
    gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;
  }
  startVideo();
}


const video = document.querySelector("#camera");
const canvas = document.querySelector("#picture");
//const ctx = canvas.getContext("2d");

$("#slider").bind("slidechange", function(event, ui) {
  $("#slider_val").text(ui.value);
  intervalTime = ui.value;
});

const startVideo = () => {
  console.log("startVideo");
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: {
        /*
                width: {
                  min: 320,
                  ideal: 1280,
                  max: 1280
                },
                height: {
                  min: 240,
                  ideal: 720,
                  max: 960
                },
        */
/*
        iso: {
          min: 100,
          ideal: 1000,
          max: 1600
        },
*/
        facingMode: gCurrentCameraFacingMode
      }
    })
      .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          video.play();
          checkPicture();
        };
      }) ;
  } else {
    showUnSupportMessage();
  }
}


startVideo();

const checkPicture = () => {

  const canvas = document.getElementById('hiddenCanvasForQR');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  const option = document.getElementById('jsQROption').value;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const code = jsQR(imageData.data, canvas.width, canvas.height
    , {
      inversionAttempts: option,
    //inversionAttempts: "dontInvert",
    }
  );


  //----------------------
  // 存在する場合
  //----------------------
  if (code) {
    drawLine(ctx, code.location);
    //    var qrdata = btoa(String.fromCharCode(...new Uint8Array(code.binaryData)));

    insertResult("#result", code.data); // 文字列
    /*
    canvas.style.display = 'block';
    video.style.display = 'none';
*/
    //    video.pause();
    setTimeout(() => {
      checkPicture();
    }, intervalTime);
  } else {
    setTimeout(() => {
      checkPicture();
    }, intervalTime);
  }

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

const showUnSupportMessage = () => {
  document.querySelector("#message").text = "unsupport";
}

var current = new Date();
const insertResult = (id, data) => {
  readCount++;

  const liLast = document.createElement('li')
  liLast.textContent = "elapse:" + ((new Date()).getTime() - current.getTime()) + ": QR size" + data.length;
  var element = document.querySelector(id)
  element.insertBefore(liLast, element.firstChild)
  document.querySelector("#count").innerHTML = readCount;
  current = new Date();
}
