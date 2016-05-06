'use strict';

document.addEventListener('DOMContentLoaded', () => {

	var Slide = (event) => {

		
		const _imagesPath 			= 'http://slide.seminar.sw/public/images/',
			  _defBg 				= 'cover-bg-small.jpg',
			  _defCenterGradient 	= .3,
			  _defEdgeGradient 		= .6;
		var	  _body 				= document.querySelector('body');
		
		var _section = (new function() {

			 	var section = document.querySelector('section.present');
				var elementClasses = section.getAttribute('class');

				return {
					element:section,
					isContainClass: function(className) {
						return new RegExp(className,'i').test(elementClasses);
					},
					getClasses: function () {
						return elementClasses;
					}
				}
			}());

		function getStyle(image, centerGradient, edgeGradient) {

			var imagePath = typeof(image) === 'undefined' ? getImagePath(_defBg) : getImagePath(image);

			return  {
				body: function() {
					return `background:-webkit-radial-gradient(center, circle cover, rgba(250,250,250,`+ centerGradient + `) 0%, rgba(20,20,20,`+ edgeGradient +`) 100%),url('` + imagePath.original + `');
				   			background:-moz-radial-gradient(center, circle cover, rgba(250,250,250,`+ centerGradient + `) 0%, rgba(20,20,20,`+ edgeGradient +`) 100%),url('` + imagePath.original + `');
				   			background-size:cover;background-repeat:no-repeat;`;
				}(),
				section: function() {
					var originalSectionStyle = _section.element.getAttribute('style');
					return originalSectionStyle + `background-image: -webkit-linear-gradient(0deg, rgba(255,255,255,.6), rgba(255,255,255,.6)), url('` + imagePath.blur + `');
					      	background-image: -moz-linear-gradient(0deg, rgba(255,255,255,.6), rgba(255,255,255,.6)),url('` + imagePath.blur + `');
					      	background-repeat: no-repeat;
						    background-attachment: fixed;
						    -moz-background-size: cover;
						    -o-background-size: cover;
						    -webkit-background-size: cover;
						    background-size: cover;
						    border-radius: 5px;
						    box-shadow: 0 25px 37px rgba(10,20,30,1);
						    padding-top: 0px;`;
				}()
			};
		}

		function getImagePath(imageName) {

			var splittedImageName = imageName.split(new RegExp('\.(jpe?g|png|gif)$','i'));

			return {
				original: _imagesPath + imageName,
				blur: _imagesPath + splittedImageName[0] + '-blur' + '.' + splittedImageName[1]
			};
		}
	
		function applyBackground(bgImage, centerGradient, edgeGradient) {

			var bodyStyle,sectionStyle;

			if(typeof(centerGradient) === 'undefined'){
				centerGradient = _defCenterGradient;
			}
			
			if(typeof(edgeGradient) === 'undefined'){
				edgeGradient = _defEdgeGradient;
			}

			if ( _section.isContainClass('image-only') ) {
			} else if ( _section.isContainClass('stacked-slide') ) {

			}else {
				bodyStyle = getStyle(bgImage, centerGradient, edgeGradient).body;
				sectionStyle = getStyle(bgImage, centerGradient, edgeGradient).section;
				_body.setAttribute('style', bodyStyle);
				_section.element.setAttribute('style', sectionStyle);
			}
		}

		var state = Reveal.getState();
		switch( state.indexh ) {
			case 4:
				applyBackground('data-center-1.jpg',.2,.5);
			break;
			case 9:
				applyBackground('html-source.jpg');
			break;
			case 12:
				applyBackground('ai.jpg');
			break;
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
				applyBackground('lod-cloud.png');
			break;
			default:
				applyBackground();
			break;
		}
	};


	Reveal.initialize({
		transition:'convex',
		backgroundTransition:'fade',
		history:true,
		controls:false,
		progress: false
	});

	Reveal.addEventListener('slidechanged', Slide);

});