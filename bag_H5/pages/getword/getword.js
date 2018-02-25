var APP = new App() ;
var GETWORD = new Vue({
	el: "#getword",

	data: {
		data:[
			{word:"福",num:"0"},
			{word:"字",num:"1"},
			{word:"他",num:"2"},
			{word:"我",num:"4"},
			{word:"你",num:"0"},
			{word:"婚",num:"1"},
			{word:"是",num:"1"},
			{word:"就",num:"5"},
			{word:"好",num:"1"}
		]
	},
	methods: {
		turnToSb:function (e) {
			console.log(20);
		},
		moveStart:function(e) {
			console.log(e)
		},
		moveing:function(e) {
			console.log(e)
		},
		movend:function(e) {
			console.log(e)
		}
	}
})