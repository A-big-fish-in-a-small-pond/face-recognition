# Edge Detected

<br>

> 엣지 검출은 다양한 포함 수학 식별 목표 방법 가장자리 , 곡선 A의 디지털 화상 하는 화상 밝기 또는 형식적 갖는다 급격히 변화 불연속 . 1차원 신호에서 불연속성을 찾는 동일한 문제를 단계 감지 라고 하고 시간이 지남에 따라 신호 불연속성을 찾는 문제를 변경 감지라고 합니다. 에지 감지는 특히 특징 감지 영역 에서 이미지 처리 , 머신 비전 및 컴퓨터 비전 의 기본 도구입니다.및 특징 추출 .

<br>

<p><img src="./image/Lenna.png" alt="error"></p>

> [그림 1]

<br><br>

<p><img src="./image/result_horizontal.png" alt="error"></p>

> [그림 2]
> 수평기준으로 edge 검출

<br><br>

<p><img src="./image/result_vertical.png" alt="error"></p>

> [그림 3]
> 수직기준으로 edge 검출

<br><br>

<p><img src="./image/result_diagonal.png" alt="error"></p>

> [그림 4]
> 대각선기준으로 edge 검출

<br><br>

<p><img src="./image/rgb.png" alt="error"></p>

> [그림 5]

<br><br>

> RGB 변화량 = 공간좌표 RGB 에서 두 점의 거리<br>

> [그림 5] 참고<br><br>

> 2차원 이미지에서 각각의 픽셀의 색 데이터(R, G, B) , 투명도는 무시한다<br><br>
> 3차원 공간에서 각각의 축을 R, G, B 라고 생각<br><br>
> 각각의 축은 255가 최대<br><br>
> 2차원 이미지에서의 각각의 픽셀의 색 데이터를 3차원 R, G, B 축으로 만들어진 공간에 넣으면<br><br>
> 공간에서의 점으로 표시가 된다.<br><br>
> 해당 점과 주변 점을 검사하여 변화량이 큰 경우 edge 로 판단한다.<br><br>
> 여기서 검사란<br><br>
> 3차원 R, G, B 축으로 이루어진 공간에서 해당 점과 검사할 점의 벡터의 절대값으로 계산을 하고<br><br>
> edge 로 판단하는 기준을 잡아 해당 기준보다 큰 경우 edge로 판단한다.<br><br>
> edge 로 판단하는 기준을 잡는 방법은 생각중...(input 값으로 지정할 수 있도록) 크면 클 수록 edge 로 판단하지 않는다.<br><br>

<br>
<br><br>

> diagonalEdgeDetected : 대각선 기준
> horizontalEdgeDetected : 수평 기준
> verticalEdgeDetected : 수직 기준
> edgeDetected input 값 : edgeDetected(point2pointDistance, edgedetectDistance)
> point2pointDistance : 각각의 픽셀을 검사할 때 해당 픽셀과 RGB 값의 차이를 검사할 픽셀의 위치
> edgedetectDistance : edge로 판단할 RGB 거리의 최소값 ( edge 기준 )

### Reference

<br>

> https://en.wikipedia.org/wiki/Edge_detection<br>

> http://www.scubamedia.co.kr/news_proc/news_contents.jsp?ncd=136

<br>
