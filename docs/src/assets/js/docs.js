!function($){
	// Scrollspy
    var $window = $(window)
    var $body   = $(document.body)

    $body.scrollspy({
      target: '.liwy-sidebar'
    })
    $window.on('load', function () {
      $body.scrollspy('refresh')
    })

    // Sidenav affixing
    var $sideBar = $('.liwy-sidebar')
  	$sideBar.affix({
  		offset: {
  			top: function () {
            	var offsetTop      = $sideBar.offset().top;
            	var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10);
            	var navOuterHeight = $('header').height()+20;
            	console.log(offsetTop);
            	console.log(sideBarMargin);
            	console.log(navOuterHeight);
            	return (this.top = offsetTop)
          	}
  		}
  	});

}(jQuery)