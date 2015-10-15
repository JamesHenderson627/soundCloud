// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react')

console.log('loaded javascript')
// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }

//apiKey=ee61fbdb48ee35377e1847f4e2af152d
//apiSecret=ee61fbdb48ee35377e1847f4e2af152d

//====================COLLECTION============
var TrackCollection = Backbone.Collection.extend({
	url: "https://api.soundcloud.com/tracks?client_id=ee61fbdb48ee35377e1847f4e2af152d",

	parse: function(repsonseData) {
		// console.log("Response data")
		// console.log(repsonseData)
		return repsonseData
	}
})
//=====================VIEW=================
var TrackView = React.createClass({
	componentWillMount: function(){
		console.log("TrackView render imminent. Resistence is futile!")
		this.props.tracksInfo.on("update sync", this.forceUpdate.bind(this))
		console.log(this.props.tracksInfo)
	}, 

	_getSingleTrack: function(trackObj){ 
		return(<SingleTrack single={trackObj} />)
	},

	render: function(){
		var trackInfo = this.props.tracksInfo.models		
			return(
				<div id="overview">
					<FixedBar />
					{trackInfo.map(this._getSingleTrack).slice(0,10)}
				</div>
			)
	}
})

var FixedBar = React.createClass({
	render: function() {
		return(
			<div id="topBar">
				<img id="logo" src="http://putyourjammieson.files.wordpress.com/2011/07/sound_wave_by_ex_astris1701-d41s0be.jpg" />
				<h3>Welcome to RoundSound!!</h3>
				<SearchBar />
			</div>
			)
	}
})

var SearchBar = React.createClass({
	render: function() {
		return(
			<div id="intro">
				<input type="text" placeholder="Search"></input>
			</div>
			)
	}
})

var SingleTrack = React.createClass({
	componentDidMount: function() {
		console.log("models")
		console.log(this)
	},

	render: function(){
		var stream = this.props.single.attributes.stream_url + "?client_id=ee61fbdb48ee35377e1847f4e2af152d",
			userName = this.props.single.attributes.user.username,
			pic = ""
		
		if (this.props.single.attributes.user.avatar_url) {
			pic=this.props.single.attributes.user.avatar_url
		} else {
			pic = "http://img10.deviantart.net/ce46/i/2008/160/a/8/itunes_sheet_music_icon_by_purds.jpg"
		}
		return(
			<div className="single">
				<img className="profilePic" src={pic} />
				<p className="userName">{userName}</p>
				<audio className="song" src={stream} controls autoplay></audio>
			</div>
			)
	}

})

//==========================ROUTER===========
var TrackRouter = Backbone.Router.extend({
	routes: {
		"*anyroute": "showDefaultTracks"
	},

	showDefaultTracks: function(){
		var self = this
		console.log("Getting the music!")
		console.log(this.tc)
		React.render(<TrackView tracksInfo={self.tc} />,document.querySelector("#container"))
		this.tc.fetch({
			dataType: "jsonp",
			pracessData: true
		})
	},

	initialize: function(){
		this.tc = new TrackCollection()
		console.log("I am a collection")
		Backbone.history.start()
	}
})

var tr = new TrackRouter()

