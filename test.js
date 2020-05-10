
// 矩形移动部分
var diffX = 0
var diffY = 0
var translateMoveX = 0
var translateMoveY=0

// 矩形拉伸部分
var offsetXVal = 0
var offsetYval = 0
var MIN_WIDTH = 20
var MAX_HEIGHT= 20
var downX = 0//鼠标按下clientX
var downY = 0//鼠标按下clientY
var sketchMoveX = 0//鼠标移动clientX
var sketchMoveY = 0//鼠标移动clientY
var isOnmouseDown = true
var smallRectLeftTop = document.getElementById('small_rect_left_top')
var smallRectRightTop = document.getElementById('small_rect_right_top')
var smallRectLeftBottom= document.getElementById('small_rect_left_bottom')
var smallRectRightBottom= document.getElementById('small_rect_right_bottom')
var recTangle = document.getElementById('rec_tangle')


smallRectLeftTop.onmousedown = listenAndStretch
smallRectRightTop.onmousedown = listenAndStretch
smallRectLeftBottom.onmousedown = listenAndStretch
smallRectRightBottom.onmousedown = listenAndStretch
recTangle.onmousedown=listenAndStretch

function listenAndStretch(event) {
	var downEvent = event
	var currentTarget = downEvent.currentTarget
		event.preventDefault()
		event.stopPropagation()

	  diffX = event.clientX - recTangle.offsetLeft;
	  diffY = event.clientY - recTangle.offsetTop;
		downX = event.clientX
		downY = event.clientY
	
		document.onmousemove = function (event) {
			event.preventDefault()
			event.stopPropagation()
			
			if (currentTarget.id !=='rec_tangle') {

				if (isOnmouseDown) {
					offsetXVal = event.clientX - downX
					offsetYval = event.clientY - downY
					isOnmouseDown = false
				} else {
					offsetXVal = event.clientX - sketchMoveX
					offsetYval = event.clientY - sketchMoveY
				}
				sketchMoveX = event.clientX
				sketchMoveY = event.clientY
				

				toStretch(offsetXVal, offsetYval, getCurrSmallRecIdx(downEvent.target.id))
			} else {
				toTranslate(diffX, diffY)
			}
	
			
		}


		document.onmouseup = function (event) {
			event.preventDefault()
			event.stopPropagation()
			isOnmouseDown = true
			document.onmousemove = null
			document.onmouseup = null
			sketchMoveX = 0
			sketchMoveY=0
		}

	}


function getCurrSmallRecIdx(id) {
	var idx
	switch (id) {
		case 'small_rect_left_top':
			idx=0 
			break;
		case 'small_rect_right_top':
			idx = 1
			break;
		case 'small_rect_left_bottom':
			idx = 2
			break; 
		case 'small_rect_right_bottom':
			idx = 3
			break;
	}
	return idx
	
}	
	
function toStretch(offsetXVal, offsetYval,currSmallRecIdx) {
	var recTangleStyle = recTangle.style
	var recTangleWidth = recTangleStyle.width
	var recTangleHeight = recTangleStyle.height
	var recTangleLeft = recTangleStyle.left
	var recTangleTop = recTangleStyle.top
	
	switch (currSmallRecIdx) {
		case 0:
			// 大小计算
			
			recTangleStyle.width = Number(recTangleWidth.replace('px', '')) < MIN_WIDTH ? MIN_WIDTH +
				'px' :Number(recTangleWidth.replace('px', '')) - offsetXVal + 'px'

			recTangleStyle.height = Number(recTangleHeight.replace('px', '')) < MAX_HEIGHT ? MAX_HEIGHT + 'px' :	Number(recTangleHeight.replace('px', '')) - offsetYval + 'px'

			// 位置计算
			
			recTangleStyle.left = Number(recTangleWidth.replace('px', '')) > MIN_WIDTH ?
				Number(recTangleStyle.left.replace('px', '')) + offsetXVal + 'px' : recTangleLeft

			recTangleStyle.top = Number(recTangleHeight.replace('px', '') > MAX_HEIGHT) ?
				Number(recTangleStyle.top.replace('px', '')) + offsetYval + 'px' : recTangleTop 
			break;
		case 1:
			recTangleStyle.width = Number(recTangleWidth.replace('px', '')) < MIN_WIDTH ? MIN_WIDTH +
				'px' : Number(recTangleWidth.replace('px', '')) + offsetXVal + 'px'

			recTangleStyle.height = Number(recTangleHeight.replace('px', '')) < MAX_HEIGHT ? MAX_HEIGHT + 'px' : Number(recTangleHeight.replace('px', '')) - offsetYval + 'px'

			// 位置计算
			recTangleStyle.right = Number(recTangleWidth.replace('px', '')) > MIN_WIDTH ?
				Number(recTangleStyle.right.replace('px', '')) - offsetXVal + 'px' : recTangleLeft

			recTangleStyle.top = Number(recTangleHeight.replace('px', '') > MAX_HEIGHT) ?
				Number(recTangleStyle.top.replace('px', '')) + offsetYval + 'px' : recTangleTop 
			break;
		case 2:
			
			recTangleStyle.width = Number(recTangleWidth.replace('px', '')) < MIN_WIDTH ? MIN_WIDTH +
				'px' : Number(recTangleWidth.replace('px', '')) - offsetXVal + 'px'

			recTangleStyle.height = Number(recTangleHeight.replace('px', '')) < MAX_HEIGHT ? MAX_HEIGHT + 'px' : Number(recTangleHeight.replace('px', '')) + offsetYval + 'px'
          // 位置计算
			recTangleStyle.left = Number(recTangleWidth.replace('px', '')) > MIN_WIDTH ?
				Number(recTangleStyle.left.replace('px', '')) + offsetXVal + 'px' : recTangleLeft

			recTangleStyle.botttom = Number(recTangleHeight.replace('px', '') > MAX_HEIGHT) ?
				Number(recTangleStyle.bottom.replace('px', '')) + offsetYval + 'px' : recTangleTop 
			break;
		case 3:
			recTangleStyle.width = Number(recTangleWidth.replace('px', '')) < MIN_WIDTH ? MIN_WIDTH +
				'px' : Number(recTangleWidth.replace('px', '')) + offsetXVal + 'px'

			recTangleStyle.height = Number(recTangleHeight.replace('px', '')) < MAX_HEIGHT ? MAX_HEIGHT + 'px' : Number(recTangleHeight.replace('px', ''))+ offsetYval + 'px'

			// 位置计算
			recTangleStyle.right = Number(recTangleWidth.replace('px', '')) > MIN_WIDTH ?
				Number(recTangleStyle.left.replace('px', '')) -offsetXVal + 'px' : recTangleLeft

			recTangleStyle.bottom = Number(recTangleHeight.replace('px', '') > MAX_HEIGHT) ?
				Number(recTangleStyle.top.replace('px', '')) - offsetYval + 'px' : recTangleTop 
			break;
	}
	
	
}

function toTranslate(diffX, diffY) {
	translateMoveX = event.clientX - diffX;
	translateMoveY = event.clientY - diffY;
	recTangle.style.left = translateMoveX > 0 ? translateMoveX + 'px': recTangle.style.left;
	recTangle.style.top = translateMoveY >0 ? translateMoveY + 'px' : recTangle.style.top;
}
