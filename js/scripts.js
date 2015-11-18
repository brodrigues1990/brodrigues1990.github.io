
jQuery(document).ready(function($) {
"use strict";

//Page Preloader
  $(window).load(function() { 
  	$(".mask").delay(1000).fadeOut("slow");
  });


//Slide Panel    
  var navistatus = 0;
 $("#open-nav").click(function(){
        if(navistatus==0)
        {
            $("#header").clearQueue().animate({
                left: '0'
            },500,'swing');
            $("#page-wrapper").clearQueue().animate({
                left: '260px'
            },500,'swing');

            navistatus = 1;
        } else {
            $("#page-wrapper").clearQueue().animate({
                left: '0'
            },600,'easeOutBounce');
            $("#header").clearQueue().animate({
                left: '-260px'
            },600,'easeOutBounce');

            navistatus = 0;
        }
    });
  $('#open-nav ').click(function () {
      if ($(this).hasClass('fa fa-bars')) {
          $(this).removeClass('ffa fa-bars').addClass('fa fa-times');
      } else {
          $(this).removeClass('fa fa-times').addClass('fa fa-bars');
      }
  });

//Parallax    	
  jQuery(window).load(function(){
  	$('#home').parallax("30%", 0.1);
  	$('#status').parallax("30%", 0.1);
  	$('#another').parallax("30%", 0.1);
    $('#wprocess').parallax("30%", 0.1);
    $('#hire').parallax("30%", 0.1);
    $('#twitter').parallax("30%", 0.1);
  	//$('#parallax-1').parallax("30%", 0.1);
  	//$('#parallax-2').parallax("30%", 0.1);
  		/*add as necessary*/
  });



//onepage nav

      $('#navs,.nav').onePageNav({
        currentClass: 'active',
        filter: ':not(.external)',
        scrollThreshold: 0.25,
        scrollOffset: 0
      });


//Navigations



  
// Appear Animations
	$('*').each(function(){
		if(jQuery(this).attr('data-animation')) {
		var $animationName = jQuery(this).attr('data-animation');
		jQuery(this).appear(function() {
		jQuery(this).addClass('animated').addClass($animationName);
			});
			}
		});

//Twitter
  $('.tweets-list-container').tweetscroll({ 
    username: 'envatowebdesign', 
    time: true, 
    limit: 11,
    replies: true, 
    position: 'append', 
    date_format: 'style2', 
    animation: 'slide_up', 
    visible_tweets: 1 
  });


//tooltips
    $(document).ready(function ()
    { 
      $( 'body' ).tooltip({
        selector: "a[data-toggle=tooltip]"
      });
 });
//Animated Progress Bars
	$('.skill li').each(function () {
		$(this).appear(function() {
		  $(this).animate({opacity:1,left:"0px"},1200);
		  var b = $(this).find("span").attr("data-width");
		  $(this).find("span").animate({
			width: b + "%"
		  }, 1700, "easeOutCirc");
		});	
	});

//Animated Counters
	$('.count').each(function () {
		$(".total-numbers .sum").appear(function() {
		var counter = $(this).html();
		$(this).countTo({
			from: 0,
			to: counter,
			speed: 2000,
			refreshInterval: 60,
			});
		});
	});

			 				

//Responsive slide For blog
	$("#blog-carousel").owlCarousel({
		autoPlay: 3000,
		navigation : false, // Show next and prev buttons
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true
									 
		// "singleItem:true" is a shortcut for:
		// items : 1,
		// itemsDesktop : false,
		// itemsDesktopSmall : false,
		// itemsTablet: false,
		// itemsMobile : false
	});

//Portfolio Isotop
$(window).load(function() {   
 $(function(){
      
      var $container = $('.portfolio-container');
      

                $container.isotope({
                  itemSelector : '.mt',
                  layoutMode : 'masonry'
                  
                });
      
      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });
      });
      
    });

//Masonry Blog
	$(window).load(function(){
		var $container = $('.blog-post-holder');
		$container.isotope({
			 masonry: {	
		  },
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			},	
		});
	});  	




 	//Google Maps
      $('#gmap').gmap3({
        marker:{address:"Haltern am See, Weseler Str. 151", options:{icon: "img/location1.png"}},
        map:{
            options:{
              zoom: 14,
			  scrollwheel: false
            }
           }
      });

				
     //Contact From
    $(document).ready(function ()
    { 
     $('#submit').formValidator({
        scope: '#form'
      });
      
      $('#post-commentsss').formValidator({
        scope: '#comments-form'
      });
      
      $('#submit,#post-commentsss').click(function() {
            $('input.error-input, textarea.error-input').delay(300).animate({marginLeft:0},100).animate({marginLeft:10},100).animate({marginLeft:0},100).animate({marginLeft:10},100);
        });

      // Form plugin

      var options = {

        beforeSubmit: function() {
          $('.sending').show();

        },
        success: function() {
          $('.sending').hide();
          $('#form').hide();
          $(".mess").show().html('<h5>Thanks !</h5><h5>Your message has been sent.</h5>'); // Change Your message post send
          $('.mess').delay(3000).fadeOut(function() {

            $('#form').clearForm();
            $('#form').delay(3500).show();

          });
        }
      };
      

      $('#form').submit(function() {
        $(this).ajaxSubmit(options);
        return false;
      });
        
    });      

});	





