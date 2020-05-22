
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



				
     

});	





