/**
 * Created by Gao Liye on 2017/7/6.
 * 2048 小游戏
 */
function my$(id) {
	return document.getElementById(id);
}

function setElementText(element, text) {
	if (element.innerText) {
		element.innerText = text;
	} else {
		element.textContent = text;
	}
}

// 长度16的数组，全为0
var arrObj = [];
var score=0;
for (var i = 0; i < 16; i++) {
	var obj = {
		index: i,
		sum: 0
	};
	arrObj.push(obj);
}


// 2048游戏的核心代码
function sumDeal(arr) {
	// 数字是否相加，或者位置发生改变的标志
	var flag=false;
	for (var j = 0; j < arr.length - 1; j++) {
		for (k = j; k < arr.length - 1; k++) {
			if (arr[j].sum == 0) {
				if (arr[k + 1].sum != 0) {
					arr[j].sum = arr[k + 1].sum;
					arr[k + 1].sum = 0;
					//位置发生了改变/*2017-07-09*/
					flag=true;
				}
			} else {
				if (arr[k + 1].sum != 0) {
					if (arr[j].sum == arr[k + 1].sum) {
						//得分为当前相加值的一半
						score+=arr[j].sum/2;
						
						arr[j].sum += arr[k + 1].sum;
						arr[k + 1].sum = 0;
						//相同的数累加/*2017-07-09*/
						flag=true;
					}
					break;
				}
			}
		}
	}

	return flag;
}

// 新追加的随机数2或4
function setNum(arr) {
	//一个空数组用来接收当前.sum为0的对象
	var arrTemp = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].sum == 0) {
			arrTemp.push(arr[i]);
		}
	}
	//当还有两个或者两个以上的个子为空时，就为两个格子添加新的值
	
	/*20170903 最后只剩两个或一个空格子时，随机出一个数字 statr */
	//if (arrTemp.length > 1) {
	if (arrTemp.length > 2) {
	/*20170903  end */
		do {
			var r1 = parseInt(Math.random() * arrTemp.length);
			var r2 = parseInt(Math.random() * arrTemp.length);
		} while (r1 == r2);
		
		arrTemp[r1].sum = parseInt(Math.random() * 10) != 9 ? 2 : 4;
		arrTemp[r2].sum = parseInt(Math.random() * 10) != 9 ? 2 : 4;	
		/*----- 20170903  start ------*/
			//} else if (arrTemp.length == 1) {
			//当只剩下一个或两个格子为空的时则为格子设置数值
		
			//arrTemp[0].sum = parseInt(Math.random() * 10) != 9 ? 2 : 4;
		} else if (arrTemp.length <= 2) {
			var index = Math.floor(Math.random()*arrTemp.length);
			arrTemp[index].sum = parseInt(Math.random() * 10) != 9 ? 2 : 4;
		/*----- 20170903  end  ------*/
	}
}
//是否结束了
function isEnd(arr) {
	var flag = true;
	var step = Math.sqrt(arr.length);

	//横向判断
	for (var j = 0; j < arr.length - 1; j++) {
		if (j % 4 == 3) {
			continue;
		} else{
			if (arr[j].sum == arr[j + 1].sum) {
				/*2017-07-09 相邻的数字有相等就不结束*/
				flag = false;
				break;
			}else if (arr[j].sum ==0||arr[j + 1].sum==0) {
				/*2017-07-09 相邻的数字不相等且有一个为0就不结束*/
				flag = false;
				break;
			}
		}
	}
	//列判断
	for (var i = 0; i < arr.length - step; i++) {
		if (arr[i].sum == arr[i + step].sum) {
			/*2017-07-09 相邻的数字有相等就不结束*/
			flag = false;
			break;
		}else if(arr[i].sum ==0 ||arr[i + step].sum==0){
			/*2017-07-09 相邻的数字不相等且有一个为0就不结束*/
			flag = false;
			break;
		}
	}
	return flag
}
// 数据的展示
function showNum(arr) {
	var list = my$("uu").children;
	for (var j = 0; j < list.length; j++) {
		setElementText(list[j], "");
		if (arr[j].sum!= 0) {
			//如果对象的sum属性不为0就渲染出去
			setElementText(list[j], arr[j].sum);
		}
	}
}

// 上键处理
function upKeyDeal(arrUp) {
	/*2017-07-09 是否追加新的数*/
	var flag=false;
	for (var i = 0; i < 4; i++) {
		var arrTemp = [];
		for (var j = 0; j < arrUp.length; j++) {
			if (j % 4 == i) {
				arrTemp.push(arrUp[j]);
			}
		}
		if(sumDeal(arrTemp)){
			flag=true;
		}
	}
	return flag;
}

// 下键处理
function downKeyDeal(arrDown) {
	/*2017-07-09 是否追加新的数*/
	var flag=false;

	for (var i = 0; i < 4; i++) {
		var arrTemp = [];
		for (var j = 0; j < arrDown.length; j++) {
			if (j % 4 == i) {
				arrTemp.push(arrDown[j]);
			}
		}
		if(sumDeal(arrTemp.reverse())){
			flag=true;
		}
	}
	return flag;
}
// 左键处理
function leftKeyDeal(arrLeft) {
	/*2017-07-09 是否追加新的数*/
	var flag=false;

	for (var i = 0; i < 4; i++) {
		var arrTemp = arrLeft.slice(i * 4, (i + 1) * 4);
		if(sumDeal(arrTemp)){
			flag=true;
		}
	}
	return flag;
}

// 右键处理
function rightKeyDeal(arrRight) {
	/*2017-07-09 是否追加新的数*/
	var flag=false;
	for (var i = 0; i < 4; i++) {
		var arrTemp = arrRight.slice(i * 4, (i + 1) * 4);
		if(sumDeal(arrTemp.reverse())){
			flag=true;
		}
	}
	return flag;
}

//游戏
function game(event) {
	var e=event||window.event;
	var flag=false;
	/*2017-07-09 是否发生相加或者位置改变*/
	var change=false;
	/*2017-07-09 是否结束*/
	var isOver=false;
	switch (e.keyCode|| e.which){
		//38,上键
		case 38 :
			/*2017-07-09 是否发生相加或者位置改变*/
			change=upKeyDeal(arrObj);
			flag=true;
			break;
		//40,下键
		case 40:
			/*2017-07-09 是否发生相加或者位置改变*/
			change=downKeyDeal(arrObj);
			flag=true;
			break;
		//37，左键
		case 37:
			/*2017-07-09 是否发生相加或者位置改变*/
			change=leftKeyDeal(arrObj);
			flag=true;
			break;
		//39，右键
		case 39:
			/*2017-07-09 是否发生相加或者位置改变*/
			change=rightKeyDeal(arrObj);
			flag=true;
			break;
		default :
			break;
	}
	if(flag){
		//得分
		setElementText(my$("score"),score);
		if(change){
			/*2017-07-09 发生相加或者位置改变*/
			setNum(arrObj)
			//重新追加的数字
			showNum(arrObj);
		}else if(isEnd(arrObj)){
			//游戏结束
			alert("游戏结束");
			document.onkeydown=null;
		}
		console.log(isEnd(arrObj));
	}
}

//重新开始游戏
function initialGame(arr){
	score=0;
	setElementText(my$("score"),score);
	for(var i=0;i<arr.length;i++){
		arr[i].sum=0;
	}
	setNum(arr);
	showNum(arr);
}

