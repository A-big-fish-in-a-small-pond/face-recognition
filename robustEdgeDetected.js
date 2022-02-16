//  input  : image
//  output : edge detected

var pixels = require("image-pixels");
var sizeOf = require("image-size");
var fs = require("fs");
const Jimp = require("jimp");

async function edgeDetected(point2pointDistance, edgedetectDistance) {
    // load single source

    let width;
    let height;
    sizeOf("./image/result/sample2.png", function (err, dimensions) {
        width = dimensions.width;
        height = dimensions.height;
    });
    var { data } = await pixels("./image/result/sample2.png");

    let resultdata = [];
    let count = 0;
    for (let i = 0; i < height; i++) {
        resultdata[i] = [];
        for (let j = 0; j < width; j++) {
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
    let edgeData_horizontal = [];
    for (let i = 0; i < height; i++) {
        //width version
        edgeData_horizontal[i] = [];
        for (let j = 0; j < width - point2pointDistance; j++) {
            //data[i][j] = r g b a
            edgeData_horizontal[i][j] = colorPointDistance(resultdata[i][j], resultdata[i][j + point2pointDistance]);
        }
    }
    //edgeData_horizontal : 자기 자신과 바로 오른쪽 점과의 공간좌표 RGB 에서의 거리
    edgeData_horizontal = edgeDetectedArray(edgeData_horizontal, edgedetectDistance);

    // console.log(edgeDetectedArray(edgeData_horizontal, edgedetectDistance));
    // console.log(edgeData_horizontal);

    let edgeData_vertical = [];
    for (let i = 0; i < height - point2pointDistance; i++) {
        edgeData_vertical[i] = [];
        for (let j = 0; j < width; j++) {
            edgeData_vertical[i][j] = colorPointDistance(resultdata[i][j], resultdata[i + point2pointDistance][j]);
        }
    }

    edgeData_vertical = edgeDetectedArray(edgeData_vertical, edgedetectDistance);

    edgeData_master = [];
    for (let i = 0; i < height - point2pointDistance; i++) {
        edgeData_master[i] = [];
        for (let j = 0; j < width - point2pointDistance; j++) {
            if (edgeData_horizontal[i][j] == 0xff0000ff || edgeData_vertical[i][j] == 0xff0000ff) {
                edgeData_master[i][j] = 0xff0000ff;
            } else {
                edgeData_master[i][j] = 0xffffff00;
            }
        }
    }

    let image = new Jimp(width, height, function (err, image) {
        if (err) throw err;

        edgeData_master.forEach((row, y) => {
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        image.write("./image/result/sample2_mas_result.png", (err) => {
            if (err) throw err;
        });
    });
}
//horizontal
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
                //a[i][j] = 0xff0000ff;
                a[i][j] = 0xff0000ff;
            } else {
                //edge 가 아니면 파란색
                //a[i][j] = 0x0000ffff;
                //0x : 16진수라는 의미
                //R, G, B, 투명도
                a[i][j] = 0xffffff00;
            }
        }
    }
    return a;
}

edgeDetected(1, 40);
