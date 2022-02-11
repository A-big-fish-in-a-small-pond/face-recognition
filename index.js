//  input  : video file
//  output : next edge detected

// var video = require("./video/sample.mp4");
// const extractFrames = require("ffmpeg-extract-frames");
// Divide the sample video file into pictures of each frame and detect edges.

const ffmpeg = require("fluent-ffmpeg");

(async () => {
    const extractFrames = require("ffmpeg-extract-frames");

    await extractFrames({
        input: "./test.mp4",
        output: "./test/%d.png",
    });
})();
