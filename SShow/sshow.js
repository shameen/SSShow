//Shameen's SShow slideshow
//The variables at the top change how it works

//Margin, pixels
var SShowMargin = 5;
//Duration, milliseconds (1000 = 1 second)
var SShowDelay = 3000;
//List of images
var SSimgs = [];
SSimgs[0]=["images/img001.jpg", 400, 299];
SSimgs[1]=["images/img002.jpg", 328, 420];
SSimgs[2]=["images/img003.jpg", 275, 208];

//everything else (jQuery stuff)
var SSheight = 0;
var SSwidth = 0;
var SShow = false;
var SStimer;
var SSobj = '';
var SScur = -1;
function SShowNext() {
	if (SShow) {
		var L = SSimgs.length;
		SScur++;
		if (SScur >= L) { SScur = 0; }
		var C = SSimgs[SScur];
		var dheight = C[2];
		var dwidth = C[1];
		if (C[1]<C[2]) {
			//tall image
			dheight = SSheight - SShowMargin*2;
			dwidth = Math.round(C[1] / C[2] * dheight);
		}
		else {
			//wide image
			dwidth = SSwidth - SShowMargin*2;
			dheight = Math.round(C[2] / C[1] * dwidth);
		}
		//if its small enough, make it original size
		if (dheight>C[2] && dwidth>C[1]) {dwidth=C[1];dheight=C[2];}
		$(SSobj+' img').fadeOut('fast',function() {
			$(SSobj+' img').attr('src',C[0]);
			$(SSobj+' img').attr('width',dwidth);
			$(SSobj+' img').attr('height',dheight);
			$(SSobj+' img').css('width',dwidth);
			$(SSobj+' img').css('height',dheight);
			$(SSobj+' img').css('max-height',C[2]);
			$(SSobj+' img').css('max-width',C[1]);
			$(SSobj+' img').css('margin-top',(SSheight - dheight) /2);
			$(SSobj+' img').css('margin-left',(SSwidth - dwidth) /2);
		});
		$(SSobj+' img').fadeIn('fast');
		/*
		var dleft = $(SSobj).offset().left;
		$(SSobj).animate({left:(dleft+50),opacity:0},500, function() {
			$(SSobj).html('<img src="'+escape(C[0])+'" width="'+dwidth+'" height="'+dheight+'" style="max-width:'+C[1]+'px;max-height:'+C[2]+'px" alt="" />');
			$(SSobj).offset().left = dleft-50;
			$(SSobj).animate({left:dleft,opacity:1},500, function() {
				SShow = setInterval(function(){SShowNext(SSobj)},SShowDelay);
			});
		});
		*/
		SStimer = setTimeout(function(){SShowNext();},SShowDelay);
	}
}
function SShowStart(obj) {
	$(obj).html('<img src="loading.gif" width="16" height="16" alt="" />');
	SSobj = obj;
	SSheight = $(obj).height();
	SSwidth = $(obj).width();
	SShow = true;
	SScur = -1;
	clearTimeout(SStimer);
	SStimer = setTimeout(function() {SShowNext();}, 0);
}