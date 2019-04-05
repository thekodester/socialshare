/*
PLEASE SEE ICONS/FREEBIE-LICENSE.txt AS THE ICONS ARE FROM http://www.dreamstale.com AND ARE SUBJECT TO A DIFFERENT LICENSE

Copyright 2019 github.com/thekodester and thekodester.ca

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function() {
  const socialNetworks = {
      facebook: {
        name: "Facebook",
        url: "http://www.facebook.com/sharer.php?u={url}&amp;t={title}"
      },
      twitter: {
        name: "Twitter",
        url: "http://twitter.com/home?status={title}%20{url}"
      },
      email: {
        name: "Email",
        url: "mailto:?to=&subject={title}&body={url}%0A{description}"
      },
      print: {
        name: "Print",
        url: "#socialSharePrint" // NETWORKS WITH A HASHTAG RUN A JAVASCRIPT CLICK EVENT
      },
      // ONLY THE ABOVE ICONS AND ONE BELOW ARE VISIBLE BY DEFAULT (THE MORE BUTTON LOADS A MODAL WITH THE OTHERS)
      add: {
        name: "More",
        url: "#socialShareMore"
      },
      bitly: {
        name: "Bitly",
        url: "https://bitly.com/"
      },
      blogger: {
        name: "Blogger",
        url: "http://www.blogger.com/blog_this.pyra?t=&amp;u={url}&amp;n={title}"
      },
      digg: {
        name: "Digg",
        url: "http://digg.com/submit?phase=2&amp;url={url}&amp;title={title}"
      },
      diigo: {
        name: "Diigo",
        url: "http://www.diigo.com/post?url={url}&amp;title={title}"
      },
      evernote: {
        name: "Evernote",
        url: "https://www.evernote.com/clip.action?url={url}&title={title}"
      },
      // YOU CAN GROUP ICONS FROM THE SAME BRAND SO THEY SHARE AN ICON
      google: {
        gmail: {
          name: "Gmail",
          url: "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su={title}&body={url}%0A{description}"
        },
        gbookmark: {
          name: "Google Bookmark",
          url: "http://www.google.com/bookmarks/mark?op=add&bkmk={url}&title={title}"
        }
      },
      linkedin: {
        name: "LinkedIn",
        url: "http://www.linkedin.com/shareArticle?mini=true&amp;url={url}&amp;title={title}&amp;ro=false&amp;summary={description}&amp;source="
      },
      livejournal: {
        name: "LiveJournal",
        url: "https://www.livejournal.com/update.bml?subject={title}&event={description}%20{url}"
      },
      myspace: {
        name: "MySpace",
        url: "http://www.myspace.com/Modules/PostTo/Pages/?u={url}&amp;t={title}"
      },
      pinterest: {
        name: "Pinterest",
        url: "http://www.pinterest.com/pin/create/button/?url={url}&amp;media={image}&amp;description={title}"
      },
      pocket: {
        name: "Pocket",
        url: "http://getpocket.com/save?url={url}&title={title}"
      },
      reddit: {
        name: "Reddit",
        url: "http://reddit.com/submit?url={url}&amp;title={title}"
      },
      tumblr: {
        name: "Tumblr",
        url: "http://www.tumblr.com/share/link?url={url}&amp;name={title}&amp;description={description}"
      },
      yahoo: {
        name: "Yahoo Mail",
        url: "http://compose.mail.yahoo.com/?to=&subject={title}&body={url}%0A{description}"
      },
      qrcode: {
        name: "GoQR.me",
        url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data={url}"
      },
      link: {
        tinyurl: {
          name: "TinyURL",
          url: "https://tinyurl.com/create.php?url={url}"
        }
      }
    },
    totalNetworks = Object.keys(socialNetworks).length;

  /**
   * @description Initial function in generating the social share widget. This function auto excutes.
   */
  (function(){
    // ONLY ALLOW ONE BUTTON ON A PAGE
    const socialShareWidget = document.querySelector( '.social-share' ),
      socialShareMenu = ( socialShareWidget ) ? socialShareWidget.getElementsByClassName( "dropdown-menu" )[ 0 ] : "";

    if ( socialShareMenu ) {
      // GENERATE THE DROPDOWN MENU
      let dataStr = socialShareWidget.getAttribute( "data-social-share" ),
        jsonStr = stringifyJson( dataStr ),
        jsonObj = parseJson( jsonStr ),
        printSrc = arrayKeyExists( jsonObj, "printSrc", "main_content" ),
        iconSrc = arrayKeyExists( jsonObj, "iconSrc", "" ),
        title = arrayKeyExists( jsonObj, "title", document.title ),
        image = arrayKeyExists( jsonObj, "image", "" ),
        description = arrayKeyExists( jsonObj, "description", "" ),
        menu = createMenu( iconSrc, title, image, description );

      socialShareMenu.innerHTML = menu; // INSERT THE DROPDOWN MENU
      setSocialShareModal( socialShareWidget ); // SETS THE MORE BUTTON/OPTION (ALLOWS A MODAL TO DISPLAY WITH OTHER NETWORKS)
      setPrint( socialShareWidget, printSrc ); // SETS THE PRINT BUTTON/OPTION (PRINTS ONLY THE PROVIDE IDs CONTENT)

      // SET BUTTON AS VERTICAL FOR LARGE DEVICES
      const largeDevice = window.matchMedia("(min-width: 992px)")
      largeDevice.addListener( verticalBtn );
      verticalBtn( largeDevice );
    }
  })();

  /**
   * @description createMenu is used to generate the html dropdown menu.
   */
  function createMenu( iconSrc, title, image, description ) {
    let limit = 5,
      total = 1,
      items = "",
      menu = "";

    for ( let brand in socialNetworks ) {
      let socialNetwork = socialNetworks[ brand ];

      // CHECK IF THE BRAND HAS SUB BRANDS BEFORE CREATING MENU ITEM
      if ( !( 'name' in socialNetwork ) ) {
        for ( let subBrand in socialNetwork ) {
          let network = socialNetwork[ subBrand ];
          item = createMenuItem( brand, network, iconSrc, title, image, description );
          items += item;
        }
      } else {
        item = createMenuItem( brand, socialNetwork, iconSrc, title, image, description );
        items += item;
      }

      // CHECK IF LIMIT REACHED (LIMITS WHAT IS INITIALLY SEE ABLE AND HIDES OTHERS FOR MODAL)
      if ( total === limit ) {
        menu += "<div class='dropdown-row'>" + items + "</div>";
        items = "";
      } else if ( total === totalNetworks ) {
        menu += "<div class='dropdown-row d-none' id='dropdownRowHidden'>" + items + "</div>";
        items = "";
      }
      total++;
    }

    // RETURN MENU AS HTML STRING
    return menu;
  }

  /**
   * @description createMenuItem is used to generate the html dropdown menu items that contains the actual share button.
   */
  function createMenuItem( brand, network, iconSrc, title, image, description ) {
    let icon = "",
      item = "",
      name = network.name,
      url = network.url;

    // CREATE THE ICON AS SPAN USING CSS BY DEFAULT, UNLESS ICONSRC IS SPECIFIED THEN USE IMG TAG
    icon = "<span class='icn-dreamstale icn-dreamstale-" + brand + "' aria-hidden='hidden'></span><p>" + name + "</p>";
    if ( iconSrc ) {
      icon = "<img src='" + iconSrc + brand + ".svg' width='48' height='48' alt='" + name + " Icon'/><p>" + name + "</p>";
    }

    // ENCODE THE URL AND SET THE SHARE BUTTON WITH ICON
    url = url.replace( /\{url\}/, encodeURIComponent( location.protocol + '//' + location.host + location.pathname ) )
      .replace( /\{title\}/, encodeURIComponent( title ) )
      .replace( /\{image\}/, encodeURIComponent( image ) )
      .replace( /\{description\}/, encodeURIComponent( description ) )
      .replace( /\'/g, '%27' );
    item = "<a class='dropdown-item' href='" + url + "' target='_blank' rel='noreferrer'>" + icon + "</a>";

    // RETURN MENU ITEM AS HTML STRING
    return item;
  }

  /**
   * @description setSocialShareModal is used to generate the modal that displays hidden networks.
   */
  function setSocialShareModal( element ) {
    element.querySelector( '[href="#socialShareMore"]' ).addEventListener( 'click', function ( e ) {
      e.preventDefault();

      // REMOVE ANY EXISTING MODAL
      let ssmodal = document.getElementById( 'ssmodal' );
      if ( ssmodal ) {
        document.body.removeChild(ssmodal);
      }

      // GET HIDDEN SHARE BUTTONS
      let dropdownRowHidden = document.getElementById( 'dropdownRowHidden' );

      // CREATE AND DISPLAY MODAL
      if ( dropdownRowHidden ) {
        // CREATE MODAL
        let modal = "<div class='modal fade' id='socialShareModal' tabindex='-1' role='dialog' aria-labelledby='socialShareModalTitle' aria-hidden='true'><div class='modal-dialog modal-dialog-centered' role='document'>",
          div = document.createElement( 'div' );

        modal += "<div class='modal-content'><div class='modal-body text-center'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
        modal += "<h1 class='mb-4'>Share This Page</h1>";
        modal += "<div class='dropdown-row w-75' id='ddr'>" + dropdownRowHidden.innerHTML + "</div>";
        modal += "<div class='btn-group-vertical'>";
        modal += "<button class='btn btn-secondary border-bottom' id='ddrUp' type='button'>&#8593;<span class='sr-only'>Scroll Up</span></button>";
        modal += "<button class='btn btn-secondary border-top' id='ddrDown' type='button'>&#8595;<span class='sr-only'>Scroll Down</span></button>";
        modal += "</div>";
        modal += "<div class='input-group'>";
        modal += "<input class='form-control' id='copyLink' name='copyLink' type='text' value='" + ( location.protocol + '//' + location.host + location.pathname ) + "' placeholder='Site Link' aria-label='Copy Site Link' aria-describedby='copyLinkBtn' readonly='readonly'><label class='sr-only' for='copyLink'>Site Link</label>";
        modal += "<div class='input-group-append'><button class='btn btn-outline-secondary' id='copyLinkBtn' type='button'>Copy</button>";
        modal += "</div></div></div></div></div></div>";

        div.id = "ssmodal";
        div.innerHTML = modal;
        document.body.appendChild( div );

        // SHOW MODAL
        $( '#socialShareModal' ).modal( 'show' );

        // SET SCROLL BUTTONS
        document.getElementById( 'ddrUp' ).addEventListener( 'click', function ( e ) {
          const ddr = document.getElementById( 'ddr' );
          ddr.scrollBy(0, -100);
        });
        document.getElementById( 'ddrDown' ).addEventListener( 'click', function ( e ) {
          const ddr = document.getElementById( 'ddr' );
          ddr.scrollBy(0, 100);
        });

        // SET COPY BUTTONS
        document.getElementById( 'copyLink' ).addEventListener( 'click', function ( e ) {
          copyText( this );
        });
        document.getElementById( 'copyLinkBtn' ).addEventListener( 'click', function ( e ) {
          copyText( document.getElementById( 'copyLink' ) );
        });
      }
    });
  }

  /**
   * @description setPrint is used to generate a printable page.
   */
  function setPrint( element, printSrc ) {
    element.querySelector( '[href="#socialSharePrint"]' ).addEventListener( 'click', function ( e ) {
      e.preventDefault();

      // FIND THE PAGES MAIN CONTENT
      let main_content = document.getElementById( printSrc );
      if ( main_content ) {
        main_content = main_content.innerHTML;
        main_content = main_content.replace( /\<img(.*)\>/g, '' );
        main_content += "<p>Printed from " + location.host + "</p>";

        // PRINT ONLY THE MAIN CONTENT OF PAGE
        let printWindow = window.open( '', '_blank' );
        printWindow.document.write( '<title>' + document.title + '</title>' + main_content );
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    });
  }

  /**
   * @description copyText used by setCopy selects the text in an element and copies it, informs the user with a popover.
   */
  function copyText( element ) {
    element.select();
    try {
      document.execCommand( 'copy' );
      $( element ).popover({
        content: 'Copied!',
        placement: 'top'
      });
      $( element ).popover( 'show' );
      setTimeout(function(){ $( element ).popover( 'hide' ); }, 1500);
    } catch ( ex ){
    }
  }

  /**
   * @description stringifyJson used by the initial function to convert data-social-share to json.
   */
  function stringifyJson( str ) {
    let stringify = '';
    if ( str ) {
      stringify = str.replace( /[\"\\<\>\|\^\~\[\]\\]/g, '' );
      stringify = replaceString( stringify, /\{\s?\'/g, '{"' );
      stringify = replaceString( stringify, /\'\s?\}/g, '"}' );
      stringify = replaceString( stringify, /\'\s?\:/g, '":' );
      stringify = replaceString( stringify, /\:\s?\'/g, ': "' );
      stringify = replaceString( stringify, /\'\s?\,/g, '",' );
      stringify = replaceString( stringify, /\,\s?\'/g, ',"' );
    }
    return stringify;
  }

  /**
   * @description parseJson used by the initial function to convert a string to json.
   */
  function parseJson( str ) {
      let json = '';
      if ( str ) {
        try {
          json = JSON.parse( str );
        } catch ( ex ) {
        }
      }
      return json;
  }

  /**
   * @description verticalBtn used by the initial function to covert the button text to vertical.
   */
  function verticalBtn( largeDevice ) {
    if ( largeDevice.matches ) {
      document.getElementById( 'socialShareBtn' ).value = "S\r\nh\r\na\r\nr\r\ne\r\n\u27A5";
    } else {
      document.getElementById( 'socialShareBtn' ).value = "\u27A5 Share";
    }
  }

  /**
   * @description replaceString used by stringifyJson to replace a specific set of strings.
   */
  function replaceString( str, search, replacement ) {
    return str.split( search ).join( replacement );
  }

  /**
   * @description arrayKeyExists used by initial functions to confirm is a ket exist in a json array.
   */
  function arrayKeyExists( array, key, fallback ) {
    if ( array && array.hasOwnProperty( key ) ) {
      return array[ key ];
    }
    return fallback;
  }
})();
