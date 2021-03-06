/* Shameen's JavaScript/jQuery SlideShow (SSShow)
 * github.com/shameen/shameen.info
 *
 * Copyright 2011 Shameen Azeez
 * Licensed under the GPL v3 
 * http://www.gnu.org/licenses/gpl.html 
 */

var SSShow = [];
var SSShow_is_enabled = false;
var SSShow_timers = [];

function SSShow_newInstance(target, imgs, delay, margin) {
    /* Make an instance of SSShow using the arguments given.
     */
    var O = {};
    O.target = target;
    O.height = $(target).height();
    O.width = $(target).width();
    O.cur = -1;
    O.margin = margin;
    O.delay = delay;
    O.imgs = imgs;
    return O;
}

function SSShow_next(id) {
    /* Changes to the next image in the slideshow, then sets the timer for the next image.
     */
    if (SSShow_is_enabled) {
        //Set the new current image
        
        SSShow[id].cur++;
        if (SSShow[id].cur >= SSShow[id].imgs.length) { SSShow[id].cur = 0; }
        
        //Start setting attributes to display the new image
        var SSSimg = $(SSShow[id].target+' img');
        SSSimg.fadeOut('fast',function() {
            //set image source (doing it early so it has a bit longer to load)
            SSSimg.attr('src',SSShow[id].imgs[SSShow[id].cur][0]);
            
            //Sets an image's dimensions to fit its container
            var C = SSShow[id].imgs[SSShow[id].cur];
            var dheight = C[2];
            var dwidth = C[1];

            if (dheight>dwidth) {
                //for a tall image:
                
                //set max height, so it'll fit
                dheight = SSShow[id].height - SSShow[id].margin*2;
                //using the height, calculate the width
                dwidth = Math.round(C[1] / C[2] * dheight);
            }
            else {
                //for a wide image:
                
                //set max width, so it'll fit
                dwidth = SSShow[id].width - SSShow[id].margin*2;
                //using the width, calculate the height
                dheight = Math.round(C[2] / C[1] * dwidth);
            }
            //if it's small enough, make it original size
            if (dheight>C[2] && dwidth>C[1]) {dwidth=C[1];dheight=C[2];}

            //Set attributes
            SSSimg.attr('width',dwidth);
            SSSimg.attr('height',dheight);
            SSSimg.attr('alt','image '+id);
            SSSimg.css('width',dwidth);
            SSSimg.css('height',dheight);
            SSSimg.css('max-height',C[2]);
            SSSimg.css('max-width',C[1]);
            SSSimg.css('margin-top',(SSShow[id].height - dheight) /2);
            SSSimg.css('margin-left',(SSShow[id].width - dwidth) /2);

            //Finish up by showing image and resetting timer
            SSSimg.fadeIn('fast');

            SSShow_timers[id] = setTimeout(function(){SSShow_next(id);},SSShow[id].delay);

        });
    }
}

function SSShow_prev(id) {
    /* Set the index 'cur' so the next time SSShow_next is called,
     * it will show the previous image.
     */
    SSShow[id].cur -= 2;
    if (SSShow[id].cur <= -2) {
        SSShow[id].cur = SSShow[id].imgs.length-2;
    }
    SSShow_timers[id] = setTimeout(function(){SSShow_next(id);},SSShow[id].delay);
}

function SSShow_start(target, imgs, delay, margin) {
    /* Makes a new instance of SSShow and starts the slideshow.
     * This is the only function you need to run (via a webpage) for basic usage.
     * 
     *      target = the object/identifier of the slideshow's container. (jQuery)
     *      imgs = An array of images and their dimensions: [source,width,height]
     *      delay = The time (in milliseconds) the image is shown for. (optional)
     *      margin = The minimum space (in pixels) between the image and it's container.
     */
    $(target).html('<img src="loading.gif" width="16" height="16" alt="loading..." />');
    
    //To set defaults on optional variables
    delay = (typeof delay == 'undefined') ? 5000 : delay;
    margin = (typeof margin== 'undefined') ? 5 : margin;
     
    SSShow.push(SSShow_newInstance(target, imgs, delay, margin));
    var id = SSShow.length-1;
    SSShow_is_enabled = true;
    SSShow_timers[id] = setTimeout(function(){SSShow_next(id);}, 0);
    return id;
}