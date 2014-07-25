var menuCount = 0;
var i = 1;
var contentNavMenu = [];
var timeOut = 1500;

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
    
    menuItems[1] = '#contentItem1';
    menuItems[2] = '#contentItem2';
    menuItems[3] = '#contentItem3';
    menuItems[4] = '#contentItem4';
    menuItems[5] = '#contentItem5';

    
}

function flipCard(){
	
	if((menuCount == 2) && (i == 2) && ($('#contentInfo').length == 0)){
		$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').flip({
				direction: 'rl',
				content: '<div id="contentInfo"><img src="res/images/flipCard.png"></div>',
				color:'#131a20'
		});
	} else if ((menuCount != 2) && (i != 2) && ($('#contentInfo').length != 0)){
		$(contentNavMenu[2] + '> :nth-child(' + 2 + ')').revertFlip();

	}
	
}


function mainNavHandler(e){

	initContentNavItems();

	Mousetrap.bind('down', function(){
		i++;
		$('li.selected').next().addClass('selected').removeClass('menuItem');
		$('li.selected').prev().addClass('menuItem').removeClass('selected');
	});
	
	Mousetrap.bind('up', function(){
		i--;
		$('li.selected').prev().addClass('selected').removeClass('menuItem');
		$('li.selected').next().addClass('menuItem').removeClass('selected');
	});

	Mousetrap.bind('right', function(){
		menuCount++;
		i=1;
		$(contentNavMenu[menuCount]).focus(contentNavHandler());
		$('li.selected').removeClass('selected');
		
		$(menuItems[1]).addClass('selected');

	});

	Mousetrap.bind('enter', function(){

		if (i==6){
			$('#listingsGrid').toggle();
		}
	});
}

function scrollContentDown(){
		
		var contentPos = $('#contentNav').position().top;
		var selectPos = $('#contentContainer').position().top - $('.selected').position().top;

		var contentHeight = $('.selected').height();
		
		if (contentPos < 310){
			$('#contentNav').animate({ 
				//"top" : "-=" + contentHeight + "px"
				"top" : selectPos + 10
			}, "slow" );
		} 

		
}

function scrollContentUp(){
		
		var contentPos = $('#contentNav').position().top;
		var selectPos = $('#contentContainer').position().top - $('.selected').position().top;

		var contentHeight = $('.selected').height();

		if (contentPos < 0){
			$('#contentNav').animate({ 
				//"top" : "+=" + contentHeight + "px"
				"top" : selectPos - 80
			}, "slow", function(){
				setTimeout( function(){ flipCard(); }, timeOut);
			} );
		} 

}

function scrollBack(){
		//scroll back if selected item is off page
		var selectPos = $('#contentContainer').position().top - $('.selected').position().top;
		
		if (selectPos < 139){
		
			$('#contentNav').animate({ 
				"top" : selectPos - 80
			}, "slow", function(){
				setTimeout( function(){ flipCard(); }, timeOut);
			});
		}
}

function contentNavHandler(e){

	initContentNavItems();
	$('#menuList').unbind(mainNavHandler());

	var next = 1;
	var prev;

	Mousetrap.bind('down', function(){

		next++;
		prev = next - 1;

			$('div.selected').next().addClass('selected');
			$('div.selected').prev().removeClass('selected');

			i++;

			scrollContentDown();
			
			
	});
	
	Mousetrap.bind('up', function(){

		next--;
		prev = next + 1;

		$('div.selected').prev().addClass('selected');
		$('div.selected').next().removeClass('selected');

		i--;

		scrollContentUp();

		scrollBack();

	});

	Mousetrap.bind('left', function(){
		$(contentNavMenu[menuCount]).focus(contentNavHandler());
		$('.selected').removeClass('selected');
		setTimeout( function(){ flipCard(); }, timeOut);

		menuCount--;

		if (menuCount == 0){
			
			$('#contentNav').animate({ 
				top: 0
			});

			$('#menuList').focus(mainNavHandler());
			i = 1;
		}

		$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected').removeClass('menuItem');

		if(i != 1){
			scrollBack();
		}



	});

	Mousetrap.bind('right', function(){

		$('div.selected').removeClass('selected');
		setTimeout( function(){ flipCard(); }, timeOut);

		menuCount++;
		console.log(menuCount);

		$(contentNavMenu[menuCount]).focus(contentNavHandler());
		$('.selected').removeClass('selected');

		$(contentNavMenu[menuCount] + '> :nth-child(' + i + ')').addClass('selected');
		
		if(i != 1){
			scrollBack();
		}
		

	});


}

