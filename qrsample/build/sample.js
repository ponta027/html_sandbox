var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jsqr"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jsqr_1 = __importDefault(require("jsqr"));
    var mediaStreamConstraints = { audio: false, video: { facingMode: "user" } };
    //const mediaStreamConstraints: MediaStreamConstraints = { audio: false , video: true };
    /* https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/webrtc/test */
    var video;
    $(function () {
        console.log("Start");
        //https://stackoverflow.com/questions/40360174/playing-html-5-video-from-angular-2-typescript
        //https://stackoverflow.com/questions/56016696/argument-of-type-htmlelement-is-not-assignable-to-parameter-of-type-canvasima
        video = document.querySelector("video");
        if (video) {
            navigator.getUserMedia(mediaStreamConstraints, function (stream) {
                var track = stream.getTracks()[0];
                var capabilities = track.getCapabilities();
                console.log(capabilities);
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play();
                    readQrCode();
                };
                console.log('label:' + track.label);
                console.log('ended:' + track.readyState);
                track.onended = function (event) { return console.log('Track ended'); };
                //                        const objectUrl = URL.createObjectURL(stream);
            }, function (error) {
                console.log('Error message: ' + error.message);
                console.log('Error name: ' + error.name);
            });
        }
    });
    function readQrCode() {
        //const canvas= $("#hiddenCanvasForQR");
        var canvas = document.getElementById('hiddenCanvasForQR');
        if (canvas) {
            console.log(canvas);
            canvas.width = video.videoWidth;
            canvas.height = video.videoWidth;
        }
        else {
            return false;
        }
        var ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        else {
            return false;
        }
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var code = jsqr_1.default(imageData.data, canvas.width, canvas.height, {
            inversionAttempts: "dontInvert",
        });
        if (code) {
            console.log(code.binaryData);
            drawLine(ctx, code.location);
        }
        else {
            setTimeout(function () {
                readQrCode();
            }, 1000);
        }
        return true;
    }
    function drawLine(ctx, pos) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
        ctx.lineTo(pos.topRightCorner.x, pos.topRightCorner.y);
        ctx.lineTo(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
        ctx.lineTo(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
        ctx.lineTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
        ctx.stroke();
        return;
    }
});
//# sourceMappingURL=sample.js.map
