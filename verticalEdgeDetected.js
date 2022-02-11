//  input  : image
//  output : edge detected

var pixels = require("image-pixels");
var fs = require("fs");
const Jimp = require("jimp");

async function edgeDetected(point2pointDistance, edgedetectDistance) {
    // load single source
    var { data, width, height } = await pixels("./image/Lenna.png");

    let resultdata = [];
    let count = 0;
    for (let i = 0; i < 512; i++) {
        resultdata[i] = [];
        for (let j = 0; j < 512; j++) {
            resultdata[i][j] = [];
            for (let k = 0; k < 4; k++) {
                if (k != 3) {
                    resultdata[i][j].push(data[count++]);
                } else {
                    count++;
                }
            }
        }
    }
    //resultdata : 1차원 데이터를 3차원 데이터로 width * height * 4(R, G, B, A)
    let edgeData_vertical = [];
    for (let i = 0; i < resultdata.length - point2pointDistance; i++) {
        //width version
        edgeData_vertical[i] = [];
        for (let j = 0; j < resultdata.length - point2pointDistance; j++) {
            //data[i][j] = r g b a
            edgeData_vertical[i][j] = colorPointDistance(resultdata[i][j], resultdata[i + point2pointDistance][j]);
        }
    }
    //edgeData_vertical : 자기 자신과 바로 오른쪽 점과의 공간좌표 RGB 에서의 거리
    edgeData_vertical = edgeDetectedArray(edgeData_vertical, edgedetectDistance);

    let image = new Jimp(512, 512, function (err, image) {
        if (err) throw err;

        edgeData_vertical.forEach((row, y) => {
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        image.write("./image/result_vertical.png", (err) => {
            if (err) throw err;
        });
    });
}

function colorPointDistance(a, b) {
    let x = (a[0] - b[0]) * (a[0] - b[0]);
    let y = (a[1] - b[1]) * (a[1] - b[1]);
    let z = (a[2] - b[2]) * (a[2] - b[2]);

    let result;
    result = Math.sqrt(x + y + z);
    return result;
}

function edgeDetectedArray(a, Benchmark) {
    //2
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            if (a[i][j] >= Benchmark) {
                //edge 라고 판단하면 빨간색
                a[i][j] = 0xff0000ff;
            } else {
                //edge 가 아니면 파란색
                a[i][j] = 0x0000ffff;
            }
        }
    }
    return a;
}

edgeDetected(3, 30);
