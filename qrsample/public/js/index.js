const FACING_MODE_ENVIRONMENT = "environment";
const FACING_MODE_USER = "user";
let gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;
let intervalTime = 250;
let frameRate = 10;
let readCount = 0;
let width = 320;
let height = 240;

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

$("#slider_frame").bind("slidechange", function(event, ui) {
  $("#slider_frame_val").text(ui.value);
  frameRate = ui.value;

  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: gCurrentCameraFacingMode,
      frameRate: {
        max: frameRate
      },
      width: {
        ideal: width
      },
      height: {
        ideal: height
      }

    }
  }).then((stream) => {
    const [track] = stream.getVideoTracks();
    videoSetting = track.getSettings();
    showVideoSetting();
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
      checkPicture();
    };


  });
});



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
      .then((stream) => {
        const [track] = stream.getVideoTracks();
        videoSetting = track.getSettings();
        const capabilities = track.getCapabilities();
        const input = document.querySelector('input[type="range"]');

        // Map zoom to a slider element.
        input.min = capabilities.zoom.min;
        input.max = capabilities.zoom.max;
        input.step = capabilities.zoom.step;
        input.value = videoSetting.zoom;
        input.oninput = function(event) {
          track.applyConstraints({
            advanced: [{
              zoom: event.target.value
            }]
          });
        }
        input.hidden = false;
        showVideoSetting();
        video.srcObject = stream;
        if (!('zoom' in capabilities)) {
          return Promise.reject('Zoom is not supported by ' + track.label);
        }
        video.onloadedmetadata = (e) => {
          video.play();
          checkPicture();
        };
      }) ;

  } else {
    showUnSupportMessage();
  }
}

const showVideoSetting = () => {
  var buf = "<table border='1'>";
  for (const i in videoSetting) {
    buf = buf + "<tr><td>" + i + "</td><td>" + videoSetting[i] + "</td></tr>";

  }
  $("#videoSetting").html(buf);
}

startVideo();
$("#slider_val").text(intervalTime);
$("#slider_frame_val").text(frameRate);

const checkPicture = () => {

  const canvas = document.getElementById('hiddenCanvasForQR');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  const option = document.getElementById('jsQROption').value;
  if (canvas.width == 0) {
    return;
  }
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const jsQRbefore = new Date();
  const code = jsQR(imageData.data, canvas.width, canvas.height
    , {
      inversionAttempts: option,
    }
  );
  const jsQRfinish = new Date();

  //----------------------
  // 存在する場合
  //----------------------
  if (code) {
    drawLine(ctx, code.location);
    //    var qrdata = btoa(String.fromCharCode(...new Uint8Array(code.binaryData)));

    insertResult("#result", code.data.length + ":jsQR elapseTime:" + (jsQRfinish.getTime() - jsQRbefore.getTime()));

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
  liLast.textContent = "elapse:" + ((new Date()).getTime() - current.getTime()) + ": QR size" + data;
  var element = document.querySelector(id)
  element.insertBefore(liLast, element.firstChild)
  document.querySelector("#count").innerHTML = readCount;
  current = new Date();
}
