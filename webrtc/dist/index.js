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
    var mediaStreamConstraints = { audio: false, video: { facingMode: "environment" } };
    var video;
    function showErrorMessage(data) {
    }
    $(function () {
        console.log("Start");
        video = document.querySelector("video");
        navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
            for (var _i = 0, devices_1 = devices; _i < devices_1.length; _i++) {
                var device = devices_1[_i];
                console.log(device);
                if (device.kind == "videoinput") {
                    var comboTag = '<option value="' + device.deviceId + '">' + device.label + '</option>';
                    $("#cameralist").append(comboTag);
                }
            }
        });
        //const video = $("#video") as HTMLVideoElement;
        setUpCamera(video);
    });
    function setUpCamera(videoObj) {
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            .then((function (stream) {
            console.log(stream);
            videoObj.srcObject = stream;
            videoObj.onloadedmetadata = function (e) {
                videoObj.play();
                start();
            };
            var track = stream.getVideoTracks()[0];
            var capabilities = track.getCapabilities();
            if ("zoom" in capabilities) {
                /*
                track.applyConstraints({
                    advanced:[{zoom:1}];
                });
                }
                 */
            }
            else {
                console.log("zoom not supported");
            }
        })).catch(function (error) {
            console.log(error);
        });
    }
    $('select').change(function () {
        var selectedDeviceId = $("#cameralist").val();
        mediaStreamConstraints.video.deviceId = selectedDeviceId;
        setUpCamera(video);
    });
    $("#drawLine").on('click', function () {
        console.log("click");
        var canvasElem = document.querySelector("canvas");
        var ret = (video.getBoundingClientRect());
        console.log(ret);
        //        $("#canvas").css({"position":"absolute","top":ret.top,"left":ret.left,"width":ret.width, "height":ret.height});
        var ctx = canvasElem.getContext("2d");
        if (ctx) {
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 100);
            ctx.stroke();
        }
    });
    function start() {
        setInterval(function () {
            readQr();
        }, 1000);
    }
    function readQr() {
        console.log("readQr");
        var canvas = document.getElementById("canvasQR");
        if (canvas) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }
        else {
            console.log("canvas error");
            return;
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            console.log("canvas 2d");
            return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var code = jsqr_1.default(imageData.data, canvas.width, canvas.height, {
            inversionAttempts: "dontInvert"
        });
        if (code) {
            drawLine(ctx, code.location);
            var canvasElem = document.getElementById("canvas");
            canvasElem.width = video.videoWidth;
            canvasElem.height = video.videoHeight;
            $("#canvas").css({ position: "absolute", top: video.getBoundingClientRect().top, left: video.getBoundingClientRect().left });
            var ctx2 = canvasElem.getContext("2d");
            if (ctx2) {
                drawLine(ctx2, code.location);
            }
        }
        else {
            var canvasElem = document.getElementById("canvas");
            var ctx2 = canvasElem.getContext("2d");
            if (ctx2) {
                ctx2.clearRect(0, 0, video.getBoundingClientRect().width, video.getBoundingClientRect().height);
            }
        }
    }
    function drawLine(ctx, pos) {
        // const canvasElem = document.getElementById("canvasQR") as HTMLCanvasElement
        var ret = (video.getBoundingClientRect());
        console.log(ret);
        //        $("#canvas").css({"position":"absolute","top":ret.top,"left":ret.left,"width":ret.width, "height":ret.height});
        // const ctx = canvasElem.getContext("2d") ;
        console.log(pos);
        if (ctx) {
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
            ctx.lineTo(pos.topRightCorner.x, pos.topRightCorner.y);
            ctx.lineTo(pos.bottomRightCorner.x, pos.bottomRightCorner.y);
            ctx.lineTo(pos.bottomLeftCorner.x, pos.bottomLeftCorner.y);
            ctx.lineTo(pos.topLeftCorner.x, pos.topLeftCorner.y);
            ctx.stroke();
        }
    }
});
//# sourceMappingURL=index.js.map
