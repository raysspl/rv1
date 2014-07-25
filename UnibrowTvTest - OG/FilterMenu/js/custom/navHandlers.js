var menuCount = 0;
var i = 1;
var contentNavMenu = [];
var mainNavIsHidden = false;

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    if (keyCode >= 37 && keyCode <= 40) {
        return false;
    }
};

function initContentNavItems(){

	contentNavMenu = new Array();

	contentNavMenu[0] = '#menuList';
    contentNavMenu[1] = '#contentCol1';
    contentNavMenu[2] = '#contentCol2';
    contentNavMenu[3] = '#contentCol3';
    contentNavMenu[4] = '#contentCol4';
	
	menuItems = new Array();
    
    menuItems[1] = $('#contentItem1');
    menuItems[2] = $('#contentItem2');
    menuItems[3] = $('#contentItem3');
    menuItems[4] = $('#contentItem4');
    menuItems[5] = $('#contentItem5');

    
}

function mainNavHandler(e){

	var moveOverlay = 0;
	var isFilterMenu = false;

	initContentNavItems();

	Mousetrap.bind('down', function(){
		i++;

		$('li.selected').next().addClass('selected').removeClass('menuItem');
		$('li.selected').prev().addClass('menuItem').removeClass('selected');

		$('#menuBarOverlay').animate({width: "0%"}, 500, function(){
				$('#menuBarOverlay').css("top", moveOverlay + "px").html('<div></div>'); 
				isFilterMenu = false;
			});


	});
	
	Mousetrap.bind('up', function(){
		i--;
		moveOverlay -= 50;
		$('li.selected').prev().addClass('selected').removeClass('menuItem');
		$('li.selected').next().addClass('menuItem').removeClass('selected');
		$('#menuBarOverlay').animate({width: "0%"}, 500);
		$('#menuBarOverlay').css("top", moveOverlay + "px");
	});

	Mousetrap.bind('right', function(){

		if (isFilterMenu == true){
			console.log('initiate filter menu');
		} else {
			menuCount++;
			i = 1;
			$(contentNavMenu[menuCount]).focus(contentNavHandler());
			$('li.selected').removeClass('selected');
			menuItems[1].addClass('selected');
		}

	});

	Mousetrap.bind('left', function(){
		//initiate left menu
		if(!mainNavIsHidden){
			if (isFilterMenu == false){
				var overlayPos = $('.selected').position().top;
				isFilterMenu = true;
				$('#menuBarOverlay').css({top: overlayPos});
				$('#menuBarOverlay').animate({width: "100%"}, 500).html('<div id="filterMenu"><ul><li>menu item</li></ul></div>');;
			} else {
				$('#menuBarOverlay').animate({width: "0%"}, 500, function(){
					$('#menuBarOverlay').html('<div></div>'); 
				});
			isFilterMenu = false;

			}
		} else {
			console.log('unhide nav');
			$('#menuContainer').animate({marginLeft: '+=23%'}, 500);
			mainNavIsHidden = false;
		}
		
		
		
	})

	Mousetrap.bind('enter', function(){
		if(!mainNavIsHidden){

			if (i==6){
				$('#menuContainer').animate({marginLeft: "-=23%"}, 500);
				$('#')
				//$('#listingsGrid').toggle();
			}
			$('#menuBarOverlay').animate({width: "0%"}, 500);
			//$('#dashboard').animate({marginLeft: "-=1000%"}, 500).fadeOut("fast");
			$('#listingsGrid').css("marginLeft", "0%");
			$('#contentContainer').animate({marginRight: '+=22%'}, 500);


			/*$('#contentContainer').animate({marginRight: '+=22%'}, 500, function(){
				//$('#listingsGrid').animate({marginLeft: "0%"}, 500);
				$('#listingsGrid').css("marginLeft", "0%");
			});*/

			


			mainNavIsHidden = true;
			//$(contentNavMenu[menuCount]).focus(contentNavHandler());
		} 
	});

}

function scrollContentLeft(){
		
		var menuPos = $(contentNavMenu[menuCount]).position().left;
		
		
		var contentWidth = $('.selected').width();

		if ((i > 0) && (i < 5)){
			$(contentNavMenu[menuCount]).animate({ 
				"left" : "-=" + contentWidth + "px"
			}, "slow" );
		}

		//if ((menuPos == 0) && (i == 1)){
		/*if(i == 0){
			console.log(i);
			console.log('switch menus');
			i = 1;
			menuCount = 0;
			$('div.selected').removeClass('selected');
			$('#menuList').focus(mainNavHandler());
			$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');

		} */

		/*if ((menuPos != 0) && (i != 1)){
			$(contentNavMenu[menuCount]).animate({ 
				"left" : "-=" + contentWidth + "px"
			}, "slow" );
		} */



}

function scrollContentRight(){
		
		var menuPos = $(contentNavMenu[menuCount]).position().left;
		var contentPos = $('#contentNav').position().top;
		var contentWidth = $('.selected').width();

		if (i == 0){
			i = 1;
			menuCount = 0;
			$('div.selected').removeClass('selected');
			$('#menuList').focus(mainNavHandler());
			$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');
			
			if(contentPos < 0){
				$('#contentNav').animate({ 
				"top" : 0
			}, "slow" );
			}
			

		} else if(menuPos < 0){
			
			$(contentNavMenu[menuCount]).animate({ 
				"left" : "+=" + contentWidth + "px"
			}, "slow" );

		}

		/*else if ((i >= 1) && (i < menuItems.length)) {
			$(contentNavMenu[menuCount]).animate({ 
				"left" : "+=" + contentWidth + "px"
			}, "slow" );
		}*/
}


function scrollContentDown(){
		
		var contentPos = $('#contentNav').position().top;
		var colHeight = $(contentNavMenu[menuCount]).height();
			$('#contentNav').animate({ 
				"top" : "-=" + colHeight + "px"
			}, "slow" );
}

function scrollContentUp(){
		
		var contentPos = $('#contentNav').position().top;
		var colHeight = $(contentNavMenu[menuCount]).height();

		console.log(contentPos);

		if (menuCount < 1){
			$('#contentNav').animate({ 
				scrollTop : 0
			}, "slow" );
		} else if(contentPos < 0){

			$('#contentNav').animate({ 
				"top" : "+=" + colHeight + "px"
			}, "slow" );
		//} 

		}
		
}

function contentNavHandler(e){

	initContentNavItems();
	$('#menuList').unbind(mainNavHandler());

	var next = 1;
	var prev;

	Mousetrap.bind('down', function(){
		console.log(menuCount);

		if (menuCount < (contentNavMenu.length) - 1){
			$('div.selected').removeClass('selected');
			menuCount++;

			i = 1;

			$(contentNavMenu[menuCount]).focus(contentNavHandler());
			$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected');
		
			$(contentNavMenu[menuCount -1]).animate({
				"left" : 0
			}, "slow");

		scrollContentDown();
		} 


	});
	
	Mousetrap.bind('up', function(){
		
		menuCount--;
		i = 1;
		
		$(contentNavMenu[menuCount]).focus(contentNavHandler());
		$('.selected').removeClass('selected');

		if (menuCount == 0){
			$('#contentNav').animate({ 
				top: 0
			});
			//$('#menuList > :nth-child(' + i + ')').addClass('selected');
			$('#menuList').focus(mainNavHandler());
		}

		$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');
		
		$(contentNavMenu[menuCount + 1]).animate({
			"left" : 0
		}, "slow");

		scrollContentUp();



	});

	Mousetrap.bind('left', function(){
		next--;
		prev = next + 1;

		$('div.selected').prev().addClass('selected');
		$('div.selected').next().removeClass('selected');

		i--;

		scrollContentRight();



	});

	Mousetrap.bind('right', function(){
		next++;
		prev = next - 1;

		$('div.selected').next().addClass('selected');
		$('div.selected').prev().removeClass('selected');

		i++; 

		scrollContentLeft()

	});



}

