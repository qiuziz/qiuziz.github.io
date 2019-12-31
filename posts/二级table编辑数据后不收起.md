

   之前在做项目中，有一个需求是要由一个二级table，也就是table中嵌套一个table。虽然table是不能之前嵌套的，但是可以利用td里放一个div来嵌套table。需求是这个嵌套的table是可以点击展开收起，当时是直接利用了CSS3的transition属性来做的这个一个动画。


**页面主要代码：**

	<table>
		<thead></thead>
		<tbody ng-repeat="item in items">
			<tr>
				<td>item.name</td>
			</tr>
			<tr>
				<td>
					<div>
						<table>
							<thead></thead>
							<tbody ng-repeat="color in item.colors">
								<tr>
									<td>color</td>
								</tr>
						</table>
					</div>	
				</td>
			</tr>
		</tbody>
	</table>

将二级table增加一个`class`为`showOrHide`,将高度用`transition`设为平滑过渡的效果：

	heigth : 0;
	transition:heigth .6s;
	
	
默认将其高度设为0，在点击后触发`showOrhide`函数：

	let display = false;
	var other = document.querySelectorAll('.showOrHide');
	for (var i = 0, len = other.length; i < len; i++) {
		if (other[i] != ele) {
			if (parseInt(other[i].style.height) > 0) {
				display = false;
				slideToggleTrans(display,other[i]);			}
		}
	}
	if (parseInt(ele.style.height) > 0) {
		display = true;
	}
	display = !display;
	slideToggleTrans(display,ele);

利用`display`变量来控制二级table的展开还是收起，同时将其他展开的收起。`slideToggleTrans(display,ele)`函数主要是一个计算二级table的高度:

	function slideToggleTrans(display,eleMore) {
	 //  display表示默认更多展开元素是显示状态还是隐藏
		eleMore && (eleMore.style.height = display ? (function () {
			var height = 0;
			Array.prototype.slice.call(eleMore.childNodes).forEach(function (child) 					{
					if (child.nodeType === 1) {
						var oStyle = window.getComputedStyle(child);
						height += child.clientHeight + 	(parseInt(oStyle.borderTopWidth) || 0) + (parseInt(oStyle.borderBottomWidth) || 0);
					}
				});
			return height;
		})() + "px" : "0px");
	}
	
	
	
	
这样一来完全是没有问题，**BUT**交互是有问题的。


因为这个二级table可不是仅仅展示，还有按钮可以编辑删除的，编辑删除后，需要读取接口获取新的数据吧，问题就是这里。因为重新获取这个`items`，获取完后页面是会重新渲染的，这就导致我修改完后，页面回到了初始状态，也就是我好辛苦在多条记录中找到的那一条记录下的二级table中多条记录中的某条数据，修改完后我需要再看一下的话，就只能花个几分钟再重新找一次了。（我是有多闲啊！）。



所以这就是需要解决的问题。


###下面就是花式钻牛角尖


**首先**，我不想放弃这个我好不容易写出来的工具类，所以我开始还是将目光锁定了这个工具类上。


既然用`transition`来控制高度的，所以我还是利用这个属性来控制二级table修改完变化的高度。这样删除某条记录，我将其从`item.colors`中`splice(index,1)`，这样`ng-repeat`会重新渲染一遍，但是其他没有改变的不会去渲染了。OK，删除解决了，那编辑和添加同样这样解决。为此，还找后端添加color接口给我返回这个新增的id了。这样一来，问题完美解决了。真是prefect！

重新发布后不到一个小时，问题又出现了！

* 后端：前端你这个展开样式有问题<br/>
* 我：我这边没问题啊（怎么可能，老纸测的好好的，你一测就有问题，坑啊）<br/>
* 后端：你看这截图<br/>
* 我：。。。噢 我改一下（妈蛋，什么鬼数据啊）<br/>


问题出在数据上，有一些数据内容比较大，这样就吧td的高度撑起来了，比其他的高很多，这样如果将一个高度为32px的修改后高度为58px,这样内容超出我袁先生设置的高度，部分内容不可见了。

一看是这个问题，so easy嘛，啪啪啪代码改好了，在修改数据后，我再调一次`slideToggleTrans(display,ele)`来计算高度不就OK了。修改后本地开始测，但是为毛我修改后计算的高度跟实际的不一样啊喂。折腾好久发现了问题，但是没法改啊，原因是Angular的页面渲染机制（别问我渲染机制是什么，这只是我大概猜测）。

于是我讲目光再次锁定到数据记录上了。你不是自己边高度嘛，我就把你数据锁死，内容过多不给你撑起高度，看你还给我变高度(傲娇脸)

	max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    
    
问题解决，快表扬我


重新打包发布，继续学习，毕竟还是一个菜鸟啊


一天后，后端找我，坑比又来了！！！

####这次，是一级table编辑提交后，二级table收起了


我就想问，你一级table编辑跟二级table有毛裤关系啊，但是被后端说服了，也确实是不友好，所以又是一顿折磨，就这个问题已经持续一周了啊！！！


我实在不知道怎么解决了，于是动歪点子了。在高度展开后，将高度设为`auto`,这样我就不去造假数据了。但是问题还是没有解决，于是想着利用`setTimeout`来在获取数据后将高度展开。但是为什么非要等js执行完后再去渲染页面啊妈蛋！！


所以，决定换一个方式来实现这个工具类。找了半天，发现jquery有一个`slideToggle`方法，啊啊啊，我为什么不早点发现这个。这样的话，直接在样式里增加一个`showOrHide{{$index}}`样式，这样可以找到确定的div了。这样的话，在二级table里修改删除都不用担心高度问题了，因为这个方法是利用的`display`属性，`heigth`默认为`auto`。但是一级table编辑后二级table收起的问题还是没有解决啊，思索了一天多还是没找到解决方案。昨天一大神路过，于是我把他打劫了。大神听了问题，说了一句话，你可以在这个对象里加一个属性`displayOpen`，为true的话，页面渲染时将其`display`属性设为`block`，可以利用`ng-if`或`ng-show`。

果然大神就是大神，几分钟解决了困扰我许久的问题。


于是，我走上了正道。


按大神的方式去实现了，但是为毛点击后不出现了啊，二级table你死哪儿去了。噢，原来我用了`ng-show`，但是这个不是控制样式的啊，于是我想着应该有`ng-style`的指令的，先改成这个，再去查了一下，啊哈果然有我真是天才啊。[The ngStyle directive allows you to set CSS style on an HTML element conditionally.](https://docs.angularjs.org/api/ng/directive/ngStyle)





###END
