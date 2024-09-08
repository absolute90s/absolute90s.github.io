$(document).ready(function(){

	"use strict";


	//// Preloader
    //$( window ).load(function() {
   	//	$(".page-loader").delay(1000).fadeOut(600);
    //});




	// Parallax Background Images
	function parallaxMobile(){
		var mq = window.matchMedia("(min-width: 1200px)");
		if (mq.matches) {
			$('[data-type="parallax"]').each(function(){
				$(this).addClass('fixed');
		 		$(this).parallax("50%", 0.3);
	 		});
		} else{
			$('[data-type="parallax"]').each(function(){
				$(this).removeClass('fixed');
		 		$(this).parallax("50%", 0);
	 		});
		};
	}
	parallaxMobile();
	$(window).resize(function(){
		parallaxMobile();
	});




	// Full Screen Header
	function headerHeight(){
		var winHeight = $(window).height();
		$('.header').css({'height': winHeight,});
	}
	headerHeight();
	$(window).resize(function(){
		headerHeight();
	});




	// Smooth Scroll
	$(function(){
		smoothScroll.init({
			speed: 700,
			easing: 'easeInOutCubic'
		});
	});

	


	// Skills
	$('.skills').waypoint(function() {
		if ($().easyPieChart) {
			var count = 0;
			var colors = ['#03a9f4'];
			$('.chart').each(function(){
				var imagePos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				if (imagePos < topOfWindow+2000) {
					$(this).easyPieChart({
						barColor: colors[count],
						trackColor: 'rgba(0,0,0,0.2)',
						scaleColor: false,
						scaleLength: false,
						lineCap: 'butt',
						lineWidth: 8,
						size: 120,
						animate: 1500,
						onStep: function(from, to, percent) {
							$(this.el).find('.skill-percent').text(Math.round(percent));
						}
					});
				}
				count++;
				if (count >= colors.length) { count = 0};
			});
		}
	});
	



	// Cube Portfolio
	jQuery(function(){
		var gridContainer = jQuery('#grid-container'),
			filtersContainer = $('#filters-container');

		// Initialise Cube Portfolio
		gridContainer.cubeportfolio({
			defaultFilter: '*',
	        animationType: 'flipOutDelay',
	        gapHorizontal: 30,
	        gapVertical: 30,
	        gridAdjustment: 'responsive',
	        caption: 'pushTop',
	        displayType: 'lazyLoading',
	        displayTypeSpeed: 100,

	        // lightbox
	        lightboxDelegate: '.cbp-lightbox',
	        lightboxGallery: true,
	        lightboxTitleSrc: 'data-title',
	        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

	        // singlePage popup
	        singlePageDelegate: '.cbp-singlePage',
	        singlePageDeeplinking: false,
	        singlePageStickyNavigation: false,
	        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
	        singlePageCallback: function (url, element) {

            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 5000
            })
                .done(function (result) {
                    t.updateSinglePage(result);
                })
                .fail(function () {
                    t.updateSinglePage("Error! Please refresh the page!");
                });
        	},

	        // singlePageInline
	        singlePageInlineDelegate: '.cbp-singlePageInline',
	        singlePageInlinePosition: 'above',
	        singlePageInlineInFocus: true,
	        singlePageInlineCallback: function (url, element) {
	            // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
	        }
		});

		//Active Filters
		filtersContainer.on('click', 'div', function (e) {
	        // cache current button clicked
	        var me = jQuery(this);
	        // add class cbp-filter-item-active on the current button clicked and remove from other buttons
	        me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
	        // call cubeportfolio filter function
	        gridContainer.cubeportfolio('filter', me.data('filter'));
	    });

	    //Load More Items
	    $('.cbp-l-loadMore-button-link').on('click.cbp', function (e) {

        e.preventDefault();

        var clicks, me = $(this),
            oMsg;

        if (me.hasClass('cbp-l-loadMore-button-stop')) {
            return;
        }

        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks) ? ++clicks : 1;
        $.data(this, 'numberOfClicks', clicks);

        // set loading status
        oMsg = me.text();
        me.text('LOADING...');

        // perform ajax request
        $.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        }).done(function (result) {
            var items, itemsNext;

            // find current container
            items = $(result).filter(function () {
                return $(this).is('div' + '.cbp-loadMore-block' + clicks);
            });

            gridContainer.cubeportfolio('appendItems', items.html(),
                function () {
                    // put the original message back
                    me.text(oMsg);

                    // check if we have more works
                    itemsNext = $(result).filter(function () {
                        return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                    });

                    if (itemsNext.length === 0) {
                        me.text('NO MORE WORKS');
                        me.addClass('cbp-l-loadMore-button-stop');
                    }

                });

	        }).fail(function () {
	            // error
	        });
	    });
	});



	// Owl Carousels

		// Testimonials
		$(function(){
			$("#testimonials-carousel").owlCarousel({
				items : 1,
				singleItem : true,
				itemsScaleUp : false,
				autoPlay : true
			})
		});

		// Clients
		$(function(){
			$("#clients-carousel").owlCarousel({
				items : 4,
				itemsScaleUp : false,
				autoPlay : true
			})
		});




    // CountTo
    $('.company-stats').waypoint(function() {
		$('.timer').countTo({
    		speed: 3000
    	});
	});


	//// Tweetie
	//$('.tweet').twittie({
    //    dateFormat: '%d  %b %Y',
    //    template: '<p>{{tweet}}</p><p>{{screen_name}} - {{date}}</p>',
    //    count: 1,
    //    username: 'envato'
    //});





	// Wow
	$(function(){
		new WOW({
			animateClass: 'animated',
			mobile: false
		}).init();
	});
	



	// Google Maps

	function initialize() {

	var firstMap = $('.view-map:first()');
	var lat = firstMap.attr("lat");
	var lng = firstMap.attr("lng");
	var myLatlng = new google.maps.LatLng(lat, lng);

	var mapOptions = {
	zoom: 15,
	center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

	map.setOptions({'scrollwheel': false});

	var styles = [{
		elementType : "geometry",
		stylers : [{
			invert_lightness : true
		}, {
			gamma : 1.23
		}, {
			saturation : -100
		}, {
			lightness : 7
		}]
	}, {
		elementType : "labels.text.fill",
		stylers : [{
			"color" : "#ffffff"
		}]
	}, {
		elementType : "labels.text.stroke",
		stylers : [{
			weight : 0.1
		},
		{ color: "#000000"}]
	} ,{
		    featureType: "road.highway",
		    elementType: "labels.icon",
		    stylers: [
		      { visibility: "on" },
		      { hue : "#000000"},
		      { saturation : "-100"},
		      { gamma : 1.0 },
		      { lightness : 2}
		    ]
		},
		{
 		    featureType: "road",
 		    elementType: "labels",
 		    stylers: [
 		      { visibility: "on" },
 		      { hue : "#000000"},
 		      { saturation : "-100"},
 		      { gamma : 1.0 },
 		      { lightness : 2}
 		    ]
 		},
	];

	map.setOptions({styles: styles});

	var marker = new google.maps.Marker({
	position: myLatlng,
	map: map,
	});
	}

	//google.maps.event.addDomListener(window, 'load', initialize);


	$('.view-map').click(function(){
		var newMap = $(this);
		var lat = newMap.attr("lat");
		var lng = newMap.attr("lng");

		var myLatlng = new google.maps.LatLng(lat, lng);

		var mapOptions = {
		zoom: 15,
		center: myLatlng
		}
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

		map.setOptions({'scrollwheel': false});

		var styles = [{
			elementType : "geometry",
			stylers : [{
				invert_lightness : true
			}, {
				gamma : 1.23
			}, {
				saturation : -100
			}, {
				lightness : 7
			}]
		}, {
			elementType : "labels.text.fill",
			stylers : [{
				"color" : "#ffffff"
			}]
		}, {
			elementType : "labels.text.stroke",
			stylers : [{
				weight : 0.1
			},
			{ color: "#000000"}]
		} ,{
			    featureType: "road.highway",
			    elementType: "labels.icon",
			    stylers: [
			      { visibility: "on" },
			      { hue : "#000000"},
			      { saturation : "-100"},
			      { gamma : 1.0 },
			      { lightness : 2}
			    ]
			},
			{
	 		    featureType: "road",
	 		    elementType: "labels",
	 		    stylers: [
	 		      { visibility: "on" },
	 		      { hue : "#000000"},
	 		      { saturation : "-100"},
	 		      { gamma : 1.0 },
	 		      { lightness : 2}
	 		    ]
	 		},
		];
		map.setOptions({styles: styles});

		var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		});


		//google.maps.event.addDomListener(window, 'load', initialize);
	});




}); // Document ready end