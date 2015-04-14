if (Meteor.isClient) {
  Meteor.startup(function() {
    container = document.querySelector( 'div.search-overlay-container' );
    triggerBttn = document.getElementById( 'js-overlay-open' );
    overlay = document.querySelector( 'div.search-overlay' );
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    };
    // transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    // support = { transitions : Modernizr.csstransitions };

    toggleOverlay = function() {
      if( classie.has( overlay, 'open' ) ) {
        classie.remove( overlay, 'open' );
        classie.remove( container, 'overlay-open' );
        classie.add( overlay, 'close' );
        var onEndTransitionFn = function( ev ) {
          // if( ev.propertyName !== 'visibility' ) return;
          // if( support.transitions ) {
          //   this.removeEventListener( transEndEventName, onEndTransitionFn );
          // }
          classie.remove( overlay, 'close' );
        };
        // if( support.transitions ) {
        //   overlay.addEventListener( transEndEventName, onEndTransitionFn );
        // }
        // else {
          onEndTransitionFn();
        // }
      }
      else if( !classie.has( overlay, 'close' ) ) {
        classie.add( overlay, 'open' );
        classie.add( container, 'overlay-open' );
      }
    }
  });
}