function buddyhack(){
$(document).ready(function(){
	
		mixpanel.track('splash')
		$('#auth').click(function(){
			 FB.login(function(response) {
			   if (response.authResponse) {
			     console.log('Welcome!  Fetching your information.... ');
			     FB.api('/me', function(response) {
			       	console.log('Good to see you, ' + response.name + '.');
			       	console.log(response);
			       	displayButtons(response);
			  	 });
			   } else {
			     console.log('User cancelled login or did not fully authorize.');
			   }
			 }, {scope: 'email,read_stream,publish_stream,sms,read_mailbox,status_update,user_religion_politics,user_likes,user_interests,user_photos,photo_upload'});
		})
	function displayButtons(response){
		$('#splash').hide();
     	$('.name').html(response.name);
		console.log(response.name);
		firstName = response.first_name;
		$('#buttons').show();
		$('.possessive').text(response.first_name + "'s")
		$('html').addClass('subtle');
		mixpanel.name_tag(response.name)
		if(response.favorite_athletes || response.favorite_teams){
			if(response.favorite_athletes && response.favorite_teams){
				var conjunction = response.favorite_athletes[0].name + " and the " + response.favorite_teams[0].name;	
			} else if (response.favorite_athletes) {
				var conjunction = response.favorite_athletes[0].name;
			} else {
				var conjunction = 'the ' + response.favorite_teams[0].name;
			}
			var sportsCopy = "Posts statuses that talk smack about " + response.first_name + "'s favorite athletes and teams like " + conjunction;
			$('#sports').show()
			$('#sports .subtext').text(sportsCopy)
		} else {
			$('#girl').show()
		}
	}
	
	$('#obama').click(function(){
		FB.api('me/feed', 'post', {
			message: '"Change will not come if we wait for some other person or some other time. We are the ones we\'ve been waiting for. We are the change that we seek." -Barack Obama'
		}, function(response){
			FB.api('me/feed', 'post', {
				message: '"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness." - Barack Obama'
			}, function(response){
				FB.api('me/photos', 'post', {
					message: "I've finally made the switch; I'm voting for Barack Obama, and you can too: Please rock the vote at http://rockthevote.org/",
					url: 'http://timenewsfeed.files.wordpress.com/2012/08/148786446.jpg?w=600&h=400&crop=1'
				})
				
/*							FB.api('me/albums', function(response){
					for(i=0; i<response.length; i++){ 
						if(response[i].name == 'Cover Photos'){
							FB.api(response[i].id+'/photos', 'post', {
								message: "I've finally made the switch; I'm voting for Barack Obama, and you can too: Please rock the vote at http://rockthevote.org/", 
								image: 'http://25.media.tumblr.com/tumblr_m6uknyTxf81rprh7mo1_1280.jpg'
							})
						}
					}
				}) */							
			})
		})
		mixpanel.track('obama')
	});

	$('#romney').click(function(){
		FB.api('me/feed', 'post', {
			message: '"Change will not come if we wait for some other person or some other time. We are the ones we\'ve been waiting for. We are the change that we seek." -Mitt Romney'
		}, function(response){
			FB.api('me/feed', 'post', {
				message: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. - Mitt Romney'
			}, function(response){
				FB.api('me/photos', 'post', {
					message: "I've finally made the switch; I'm voting for Mitt Romney, and you can too: Please rock the vote at http://rockthevote.org/",
					url: 'http://www.biography.com/imported/images/Biography/Images/Profiles/R/Mitt-Romney-241055-4-402.jpg'
				})
				
/*							FB.api('me/albums', function(response){
					for(i=0; i<response.length; i++){ 
						if(response[i].name == 'Cover Photos'){
							FB.api(response[i].id+'/photos', 'post', {
								message: "I've finally made the switch; I'm voting for Barack Obama, and you can too: Please rock the vote at http://rockthevote.org/", 
								image: 'http://25.media.tumblr.com/tumblr_m6uknyTxf81rprh7mo1_1280.jpg'
							})
						}
					}
				}) */							
			})
		})
		console.log("Obama Clicked");
		mixpanel.track('romney')
	})
	
	$('#valentine').click(function(){
		FB.api(
			'fql', 
			{q: 'SELECT uid, name FROM user WHERE uid IN (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 0,25) AND uid <> me() LIMIT 0,25'}, 
			function(response){
				console.log(response);
				var poems = [
					"You can be the peanut butter to my jelly / You can be the butterflies I feel in my belly / You can be the captain / And I can be your first mate / You can be the chills that I feel on our first date",
				"You can be the hero / And I can be your sidekick / You can be the tear that I cry if we ever split / You can be the rain from the cloud when it's stormin' / Or you can be the sun when it shines in the mornin'",
				"You can be the prince and I can be your princess / You can be the sweet tooth I can be the dentist / You can be the shoes and I can be the laces / You can be the heart that I spill on the pages / You can be the vodka and I can be the chaser / You can be the pencil and I can be the paper / You can be as cold as the winter weather / But I don't care as long as we're together",
				"Roses are red / Violets are blue / My heart skip a beat /When I think of you",
				"Roses are red / Violets are blue / Baby I want you and / I know you want me too",
				"Roses are red / Violets are blue / You are my best friend / I'm glad I met you",
				"A million stars up in the sky / one shines brighter I cant deny / A love so precious a love so true / a love that comes from me to you / The angels sing when you are near / within your arms I have nothing to fear / You always know just what to say / just talking to you makes my day / I love you honey with all of my heart / together forever and never to part."
				];
				for(i=0;i<response.data.length;i++){
					var friend = response.data[i]
					var rand = Math.random();
					
					var poem = poems[Math.floor(Math.random()*poems.length)]
					FB.api(friend.uid+'/feed', 'post', {
						message: poem
					})
					console.log(friend.name)
				}
				/*
				var friend1 = response.data[Math.floor(Math.random()*response.data.length)]
				var friend2 = response.data[Math.floor(Math.random()*response.data.length)]
				var friend3 = response.data[Math.floor(Math.random()*response.data.length)]
				FB.api(friend1.uid+'/feed', 'post', {
					message: "You can be the peanut butter to my jelly / You can be the butterflies I feel in my belly / You can be the captain / And I can be your first mate / You can be the chills that I feel on our first date"
				})
				FB.api(friend2.uid+'/feed', 'post', {
					message: "hey " + friend2.name.split(' ')[0] + ". you are a tremendous person. it is not the ocean i hear when you are near my ear, but rather five hundred hummingbirds; the fast floating of their small fluttering wings and their chirps like rain kissing glass"
				})
				
				console.log(friend1);
				console.log(friend2);
				*/
			}					
		)
		mixpanel.track('valentines')
	})
	
	$('.button').click(function(){
		$(this).attr('disabled', true)
		$(this).addClass('clicked')
		console.log('button clicked')
		mixpanel.track('button')
	})
	
	$('#unhack').click(function(){
		FB.api('fql', 
			{q: 'SELECT post_id FROM stream WHERE source_id = me() AND app_id = 242542695868233 LIMIT 75'},
			function(response){
				appp = response;
				if(response.data){
					for(i=0; i<response.data.length; i++){
						console.log('DELETE: ' +response.data[i].post_id)
						FB.api(response.data[i].post_id, 'delete', function(response){
							//console.log('DELETE: ' +response.data[i].post_id)
						})
					}
				}
				console.log(response)
			}
			
		)
		FB.api('fql', 
			{q: 'SELECT post_id FROM stream WHERE actor_id = me() AND app_id = 242542695868233 LIMIT 75'},
			function(response){
				if(response.data){
					appp = response;
					for(i=0; i<response.data.length; i++){
						console.log('DELETE: ' +response.data[i].post_id)
						FB.api(response.data[i].post_id, 'delete', function(response){
							//console.log('DELETE: ' +response.data[i].post_id)
						})
					}
					console.log(response)
				}
			}
			
		)
		FB.api('me/feed', 'post', {
			message: 'I\'ve been hacked via Hack My Facebook. Many of the outlandish things I\'ve recently posted aren\'t necessarily true.',
			link: 'http://hackmyfacebook.com'
		})
		mixpanel.track('unhack')
	})
	
	$('#lyrics').click(function(){
		FB.api('me/feed', 'post', {
			message: '"It\'s getting late I haven\'t seen my date so tell me when the boys get here, It\'s seven o\'clock and I wanna rock, Want to get a belly full of beer" <3 <3 Nickelback :P'
		})
		FB.api('me/feed', 'post', {
			message: 'I just found this song by Carly Rae Jepson and it\'s really catching on to me. :) Give it a look :P',
			link: 'http://www.youtube.com/watch?v=fWNaR-rxAic'
		})
		FB.api('me/feed', 'post', {
			message: 'Pitbull should be in every song..\. he\'s amazing..\. :D Fuego!'
		})
		mixpanel.track('lyrics')
	})
	
	$('#birthday').click(function(){
		FB.api('me/feed', 'post', {
			message: 'Only my true friends know that my actual birthday is today. So far, the only true friends I have are Starbucks and my dentist :('
		})
		mixpanel.track('birthday')
	})


	$('#sports').click(function(){
		if(userData.favorite_athletes){
			var athlete = userData.favorite_athletes[0].name;
			FB.api('me/feed', 'post',{
				message: 'Is it just me or is ' + athlete + ' just not that good? I honestly don\'t understand all the hype. What a disgrace to humanity.'
			})
		}
		if(userData.favorite_teams){
			var team = userData.favorite_teams[0].name;
			FB.api('me/feed', 'post',{
				message: 'I hate to say it, but the ' + team + ' are in for a really, really bad year. I regret ever supporting them to be honest. Disgusting.'
			})
		}
		mixpanel.track('sports');
	})
	
	$('#dropout').click(function(){
		FB.api('me/feed', 'post', {
			message: 'After rewatching The Social Network last night, I\'ve decided to pursue my dreams and drop out of college. College has been great so far, but for myself, the opportunity cost is too high. I\'m too busy changing the world. On a related note, I have a really great idea for a business, but I need developers to build it. If you know any, please let them know.!'
		})
		FB.api('me/feed', 'post', {
			message: 'I will be leaving Facebook and Twitter and joining App.net. It\'s about damn time that a social network aligns it\'s interests with it\'s users. It\'s where true entrepreneurs really live. Join the revolution. http://join.app.net'
		})
	})
	
	$('#girl').click(function(){
		FB.api('me/photos', 'post', {
			message: 'Sometimes life surprises you, and what a great surprise it was. So happy right now. It\'s a girl. :)',
			url: 'http://www.pregnancycheck.com/img/pregnancy-ultrasound-17-weeks.jpeg'
		})
	})
	
	$('#remove').click(function(){
		setTimeout(function(){
			alert("Come on, now. You aren\'t that mean.");
		},1000);
	})
})
}