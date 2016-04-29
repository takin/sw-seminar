'use strict';

function applyBodyBackground(bg, center, edge) {

	var body = document.querySelector('body'),
		section = document.querySelector('section.present'),
		imagesPath = 'http://slide.seminar.sw/public/images/',
		bodyBg,sectionBg,bgExt;

	if ( typeof(bg) !== 'undefined' ) {
		
		var bgObjects = bg.split(new RegExp('\.(jpe?g|png)$','i'));
		
		bodyBg = imagesPath + bgObjects[0] + '.' + bgObjects[1];
		sectionBg = imagesPath + bgObjects[0] + '-blur.' + bgObjects[1];

	} else {
		bodyBg = imagesPath + 'cover-bg-small.jpg';
		sectionBg = imagesPath + 'cover-bg-small-blur.jpg';
	}

	var center = typeof(center) === 'undefined' ? .7 : center;
	var edge = typeof(edge) === 'undefined' ? .8 : edge;
	
	// console.log(bgObjects);

	var bodyBgStyle = `background:-webkit-radial-gradient(center, circle cover, rgba(250,250,250,`+ center + `) 0%, rgba(20,20,20,`+ edge +`) 100%),
				   url('` + bodyBg + `');
				   background:-moz-radial-gradient(center, circle cover, rgba(250,250,250,`+ center + `) 0%, rgba(20,20,20,`+ edge +`) 100%),
				   url('` + bodyBg + `');
				   background-size:cover;background-repeat:no-repeat;`;

	var sectionBgStyle = `background-image: -webkit-linear-gradient(0deg, rgba(255,255,255,.6), rgba(255,255,255,.6)), 
					      url('` + sectionBg + `');
					      background-image: -moz-linear-gradient(0deg, rgba(255,255,255,.6), rgba(255,255,255,.6)),
					 	  url('` + sectionBg + `');`;

	body.setAttribute('style', bodyBgStyle);
	section.setAttribute('style', sectionBgStyle);
}

Reveal.initialize({
	transition:'convex',
	// width: 900,
	backgroundTransition:'fade',
	history:true,
	controls:false,
	progress: false
	// parallaxBackgroundImage:'http://slide.seminar.sw/public/images/social-media-crowd-2.jpg',
	// parallaxBackgroundSize:'1200px 500px'
});

Reveal.addEventListener('slidechanged', function(event) {

	var state = Reveal.getState();

	switch( state.indexh ) {
		case 4:
			applyBodyBackground('data-center-1.jpg',.2,.5);
		break;
		case 8:
			applyBodyBackground('html-source.jpg',.3,.6);
		break;
		case 12:
			applyBodyBackground('student-in-lib.jpg',.3,.6);
		break;
		default:
			applyBodyBackground();
		break;
	}

});
