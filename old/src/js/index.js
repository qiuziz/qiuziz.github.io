function Random() {
	this.dishesList = [];
	this._init();
}

Random.prototype = {
	_init: function() {
		var that = this;
		$.get({
			url: '/dishes',
			success: function(res) {
				that.dishesList = res.dishes;
				$('#createBtn').click(function() {
					that._create();
				});
				$('#addBtn').click(function() {
					that._add();
				});
				$('#save').click(function() {
					that._save();
				});
				$('#cancel').click(function() {
					that._cancel();
				});
			}
		});
	},

	_create: function() {
		var len = this.dishesList.length,
			a = Math.floor(Math.random() * len),
			b = noRepeat(a, Math.floor(Math.random() * len), len),
			dish1 = this.dishesList[a],
			dish2 = this.dishesList[b];
		$('#createDishes').text('今晚菜谱：' + dish1 + ' + ' + dish2);
	},

	_add: function() {
		$('.content').css({display: 'none'});
		$('.editDishes').css({display: 'block'});
		$('#dishesInput')[0].value = this.dishesList.toString().replace(/,/g,'\n');
	},

	_save: function() {
		var that = this;
		var dishes = $('#dishesInput')[0].value.replace(/\n/g, ',');
		this.dishesList = dishes.split(',');
		var auth = $('#auth').val();
		$.ajax({
			type: 'POST',
			url: '/dishes',
			data: { dishes: that.dishesList, auth: auth },
			success: function(res) {
				that._cancel();
			},
			error: function(xhr,errorText,errorType) {
				var err = JSON.parse(xhr.responseText);
				$('#errorTips').text(err.msg);
			}
		})
		
	},

	_cancel: function () {
		$('#errorTips').text('');
		$('.content').css({display: 'block'});
		$('.editDishes').css({display: 'none'});
	}
}

function noRepeat(a, b, len) {
	return a === b ? noRepeat(a, Math.floor(Math.random() * len)) : b
}

new Random();