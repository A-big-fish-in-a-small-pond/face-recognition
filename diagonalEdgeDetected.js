//  input  : image
//  output : edge detected
//  horizontalEdgeDetected + verticalEdgeDetected

var pixels = require("image-pixels");
var sizeOf = require("image-size");
var fs = require("fs");
const Jimp = require("jimp");

async function edgeDetected(point2pointDistance, edgedetectDistance) {
    // load single source

    let width;
    let height;
    sizeOf("./image/result/sample1.png", function (err, dimensions) {
        width = dimensions.width;
        height = dimensions.height;
    });
    var { data } = await pixels("./image/result/sample1.png");

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

    //resultdata : 1차원 데이터를 3차원 데이터로 width * height * 4(R, G, B, A) g   dfdfasdf
    let edgeData_diagonal = [];

    for (let i = 0; i < height - point2pointDistance - 1; i++) {
        //width version
        edgeData_diagonal[i] = [];
        for (let j = 0; j < width - point2pointDistance - 1; j++) {
            //data[i][j] = r g b a
            try {
                edgeData_diagonal[i][j] = colorPointDistance(resultdata[i][j], resultdata[i + point2pointDistance][j + point2pointDistance]);
            } catch (e) {
                console.log("a " + resultdata[i][j]);
                console.log("b " + resultdata[i + point2pointDistance][j + point2pointDistance]);
            }
        }
    }
    //edgeData_diagonal : 자기 자신과 바로 오른쪽 점과의 공간좌표 RGB 에서의 거리
    edgeData_diagonal = edgeDetectedArray(edgeData_diagonal, edgedetectDistance);

    let image = new Jimp(width, height, function (err, image) {
        if (err) throw err;

        edgeData_diagonal.forEach((row, y) => {
            row.forEach((color, x) => {
                image.setPixelColor(color, x, y);
            });
        });

        image.write("./image/result/sample1_dia_result.png", (err) => {
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
                a[i][j] = 0x0000ff00;
            }
        }
    }
    return a;
}

edgeDetected(1, 10);
//  input : point2pointDistance  edgedetectDistance
//  point2pointDistance : 한 점과 edge판별할 점의 거리 예시) 3
//  edgedetectDistance  : edge 로 판별 할 color 의 색상 거리 예시 30
