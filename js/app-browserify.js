// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

var $ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react'),
	SC = require('soundcloud')

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

var	clientId = "ee61fbdb48ee35377e1847f4e2af152d"
//apiSecret=ee61fbdb48ee35377e1847f4e2af152d
SC.initialize({
	client_id: clientId
})

//====================COLLECTION============
// var TrackCollection = Backbone.Collection.extend({
// 	url: "https://api.soundcloud.com/playlists/180461791?cliend_id=" + clientId),
// })
//=====================VIEW==================
var Playlist = React.createClass({
	componentWillMount: function() {
		console.log(this)
	},

	render: function() {
		return(
			<div>
				<p>We are here!</p>
			</div>
			)
	}
})
//==========================ROUTER===========
var TrackRouter = Backbone.Router.extend({
	routes: {
		"*anyroute": "showDefault"
	},

	showDefault: function() {
		SC.get("/tracks", {
			q:"metalocalypse",
			license: "cc-by-sa"
		}).then(function(tracks){
			React.render(<Playlist playlistPage={tracks} />,document.querySelector("#container"))
		})
	},

	initialize: function() {
		Backbone.history.start()
	}

})

var tr = new TrackRouter()



