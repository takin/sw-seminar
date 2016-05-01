'use strict';

function Section() {

	var _sectionElement 	= document.querySelector('section.present');
	
	this.getOriginalBgImage = function() {
		return _sectionElement.dataset.background;
	}

	this.getBlurBgImage = function() {
		var _splittedImageName 	= _sectionElement.dataset.background.split(new RegExp(/\.(jpe?g|png|gif)$/,'i'));
		return _splittedImageName[0] + '-blur' + '.' + _splittedImageName[1];
	}

	this.getElement = function() {
		return _sectionElement;
	}

	this.getDatasets = function() {
		return _sectionElement.dataset;
	}

	this.getClasses = function() {
		return _sectionElement.getAttribute('class');
	}

	this.isHaveClass = function(className) {
		console.log(new RegExp(className,'i').test(this.getClasses()));
		return new RegExp(/image-only/,'i').test(this.getClasses());
	}

	this.getStyle = function() {
		return _sectionElement.getAttribute('style');
	}

	this.setStyle = function(style) {
		_sectionElement.setAttribute('style', style);
	}

	this.isHavingDataset = function(datasetName) {
		return _sectionElement.dataset.hasOwnProperty(datasetName);
	}
	
	this.isHaveCustomBackgroundImage = function() {
		return _sectionElement.dataset.hasOwnProperty('background');
	}
}

function Slide(section) {

	const _defCenterGradient	= .3,
		  _defEdgeGradient 		= .6,
		  _bgDivStyleArray 		= (function(){

		  }());

	function setStyle(centerGradientTransparency, edgeGradientTransprency) {

		return  {
			bgDiv: function() {
		  		var div		= document.querySelector('div.slide-background.present'),
					newStyle 		 	= `background:-webkit-radial-gradient(center, circle cover, rgba(250,250,250,`+ centerGradientTransparency + `) 0%, rgba(20,20,20,`+ edgeGradientTransprency +`) 100%),url('` + section.getOriginalBgImage() + `');
			   							   background:-moz-radial-gradient(center, circle cover, rgba(250,250,250,`+ centerGradientTransparency + `) 0%, rgba(20,20,20,`+ edgeGradientTransprency +`) 100%),url('` + section.getOriginalBgImage() + `');
			   							   background-size:cover;background-repeat:no-repeat;`;
		  		

		  		var originalDivStyle 	= div.getAttribute('style').split(/;\s*/);

		  		originalDivStyle.forEach((item) => {

		  			if ( !/background-image/.test(item) ) {
		  				newStyle += item;
		  			}

		  		});

				console.log(newStyle);
			   	div.setAttribute('style', newStyle);
				
				return true;

			}(),
			section: function() {
				section.setStyle(section.getStyle() + `background-image: -webkit-linear-gradient(0deg, rgba(255,255,255,.6), rgba(255,255,255,.6)), url('` + section.getBlurBgImage() + `');
				      	background-image: -moz-linear-gradient(0deg, rgba(255,255,255,.6), rgba(255,255,255,.6)),url('` + section.getBlurBgImage() + `');
				      	background-repeat: no-repeat;
					    background-attachment: fixed;
					    -moz-background-size: cover;
					    -o-background-size: cover;
					    -webkit-background-size: cover;
					    background-size: cover;
					    border-radius: 5px;
					    border: 1px solid rgba(245,245,245,.4);
					    box-shadow: 0 25px 37px rgba(10,20,30,1);
					    padding-top: 0px;`);
				return true;
			}()
		};
	}

	this.applyBackground = function() {
		var centerGradientTransparency = _defCenterGradient,
			edgeGradientTransprency = _defEdgeGradient;

		if ( section.getElement().dataset.hasOwnProperty('backgroundTransparency') ) {

			var transparency = section.getElement().dataset.backgroundTransparency.split(/\s+/);

			if ( transparency.length > 1 && transparency.length < 3 ) {
				centerGradientTransparency = typeof(transparency[0]) === 'number' ? transparency[0] : _defCenterGradient;
				edgeGradientTransprency = typeof(transparency[1]) === 'number' ? transparency[1] : _defEdgeGradient;
			} else {
				centerGradientTransparency = _defCenterGradient;
				edgeGradientTransprency = _defEdgeGradient;
			}
		}

		setStyle(centerGradientTransparency, edgeGradientTransprency).bgDiv.section;
	}

}

document.addEventListener('DOMContentLoaded', () => {

	function SSlide(event) {
		
		const _imagesPath 			= 'http://slide.seminar.sw/public/images/',
			  _defBg 				= 'cover-bg-small.jpg';
		var   _defCenterGradient 	= .3,
			  _defEdgeGradient 		= .6,
			  _backgroundDiv		= document.querySelector('div.slide-background.present');
		
		var _section = (new function() {

		  	var section = document.querySelector('section.present');

			return {
				element:section,
				isHaveCustomBackgrund: function(){
					return section.dataset.hasOwnProperty('background');
				},
				isContainClass: function(className) {
					return new RegExp(className,'i').test(elementClasses);
				},
				getClasses: function () {
					return section.getAttribute('class');
				}
			}
		}());

		function getStyle(centerGradientTransparency, edgeGradientTransprency) {

			var imagePath = typeof(image) === 'undefined' ? getImagePath(_defBg) : getImagePath(image);

			return  {
				divBackground: function() {

					var originalDivStyle = _backgroundDiv.getAttribute('style').split(/;\s*/),
						newStyle 		 =  `background:-webkit-radial-gradient(center, circle cover, rgba(250,250,250,`+ centerGradientTransparency + `) 0%, rgba(20,20,20,`+ edgeGradientTransprency +`) 100%),url('` + imagePath.original + `');
				   							 background:-moz-radial-gradient(center, circle cover, rgba(250,250,250,`+ centerGradientTransparency + `) 0%, rgba(20,20,20,`+ edgeGradientTransprency +`) 100%),url('` + imagePath.original + `');
				   							 background-size:cover;background-repeat:no-repeat;`;

					originalDivStyle.forEach((item) => {
						if ( /background-image/.test(item) ){
							
						}
					});	



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
						    border: 1px solid rgba(245,245,245,.4);
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
	
		this.applyBackground = function() {

		};
	};

	Reveal.initialize({
		transition:'convex',
		backgroundTransition:'fade',
		history:true,
		controls:false,
		progress: false
	});

	Reveal.addEventListener('slidechanged', () => {
		var x = new Section;
		if ( !x.isHaveClass('(image-only|stacked-slide)') && x.isHaveCustomBackgroundImage() ) {
			var slide = new Slide(x);
			slide.applyBackground();
		}
	});

});