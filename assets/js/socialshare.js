/*
PLEASE SEE ICONS/FREEBIE-LICENSE.txt AS THE ICONS ARE FROM http://www.dreamstale.com AND ARE SUBJECT TO A DIFFERENT LICENSE

Copyright 2019 github.com/thekodester and thekodester.ca

CONTRIBUTIONS:
NOVEMBER 2019: github.com/tuxrafa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function() {
  var urlFinal;
  var socialNetworks = {
      twitter: {
        name: "Twitter",
        url: "http://twitter.com/home?status={title}%20{url}"
      },
      facebook: {
        name: "Facebook",
        url: "http://www.facebook.com/sharer.php?u={url}&amp;t={title}"
      },
      whatsapp: {
        name: "Whatsapp",
        url: "https://api.whatsapp.com/send?text={title}%0A{description}%0A{url}"
      },
      email: {
        name: "Email",
        url: "mailto:?to=&amp;subject={title}&body={url}%0A{description}"
      },
      link: {
        tinyurl: {
          name: "TinyURL",
          url: "https://tinyurl.com/create.php?url={url}"
        },
        copy: {
          name: "Copy Link",
          url: "#socialShareCopy",
        }
      },
      print: {
        name: "Print",
        url: "#socialSharePrint"
      },
      // ONLY THE ABOVE ICONS AND ONE BELOW ARE VISIBLE BY DEFAULT (THE MORE BUTTON LOADS A MODAL WITH THE OTHERS)
      add: {
        name: "More",
        url: "#socialShareMore"
      },
      blogger: {
        name: "Blogger",
        url: "http://www.blogger.com/blog_this.pyra?t=&amp;u={url}&amp;n={title}"
      },
      diigo: {
        name: "Diigo",
        url: "http://www.diigo.com/post?url={url}&amp;title={title}&amp;desc={desc}"
      },
      evernote: {
        name: "Evernote",
        url: "https://www.evernote.com/clip.action?url={url}&amp;title={title}"
      },
      flipboard: {
        name: "FlipBoard",
        url: "https://share.flipboard.com/bookmarklet/popout?title={title}&url={url}"
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
      skype: {
        name: "Skype",
        url: "https://web.skype.com/share?url={url}&text={title}"
      },
      telegram: {
        name: "Telegram",
        url: "https://t.me/share/url?url={url}&text={title}&to="
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
      wordpress: {
        name: "Wordpress",
        url: "https://wordpress.com/wp-admin/press-this.php?u={url}&s={description}"
      }
    },
    totalNetworks = Object.keys(socialNetworks).length;

  /**
   * @description Initial function in generating the social share widget. This function auto excutes.
   */
  (function() {
    var socialShareWidget;
    var socialShareWidgets = document.getElementsByClassName('social-share');

    for (i = 0; i < socialShareWidgets.length; i++) {
      socialShareWidget = socialShareWidgets[i];
      socialShareMenu = (socialShareWidget) ? socialShareWidget.getElementsByClassName("dropdown-menu")[0] : "";

      if (socialShareMenu) {
        // GENERATE THE DROPDOWN MENU
        let urlShare = socialShareWidget.getAttribute("data-share-url");

        let dataStr = socialShareWidget.getAttribute("data-social-share"),
          jsonStr = stringifyJson(dataStr),
          jsonObj = parseJson(jsonStr),
          printSrc = arrayKeyExists(jsonObj, "printSrc", "html"),
          iconSrc = arrayKeyExists(jsonObj, "iconSrc", ""),
          title = arrayKeyExists(jsonObj, "title", document.title),
          image = arrayKeyExists(jsonObj, "image", ""),
          description = arrayKeyExists(jsonObj, "description", ""),
          menu = createMenu(iconSrc, title, image, description, urlShare);

        socialShareMenu.innerHTML = menu; // INSERT THE DROPDOWN MENU
        setSocialShareModal(socialShareWidget); // SETS THE MORE BUTTON/OPTION (ALLOWS A MODAL TO DISPLAY WITH OTHER NETWORKS)
        setPrint(socialShareWidget, printSrc); // SETS THE PRINT BUTTON/OPTION (PRINTS WHOLE PAGE OR SELECTORS CONTENT)
        setCopy(socialShareWidget); // SETS THE COPY BUTTON/OPTION (ALLOWS A MODAL TO DISPLAY WHEN CLIPBOARD ACCESS IS NOT ALLOWED)

        // SET BUTTON AS VERTICAL FOR LARGE DEVICES (ONLY IF USING ONE BUTTON NEED ID OF 'socialShareBtnText')
        const largeDevice = window.matchMedia("(min-width: 992px)")
        largeDevice.addListener( verticalBtn );
        verticalBtn( largeDevice );
      }
    }
  })();

  /**
   * @description verticalBtn used by the initial function to covert the button text to vertical.
   */
  function verticalBtn( largeDevice ) {
    let socialShareBtnText = document.getElementById( 'socialShareBtnText' );
    if (socialShareBtnText != null) {
      socialShareBtnText.innerHTML = "\u27A5 Share";
      if ( largeDevice.matches ) {
        socialShareBtnText.innerHTML = "S\r\nh\r\na\r\nr\r\ne\r\n\u27A5";
      }
    }
  }

  /**
   * @description createMenu is used to generate the html dropdown menu.
   */
  function createMenu(iconSrc, title, image, description, urlShare) {
    let limit = 7,
      total = 1,
      items = "",
      menu = "";

    for (let brand in socialNetworks) {
      let socialNetwork = socialNetworks[brand];

      // CHECK IF THE BRAND HAS SUB BRANDS BEFORE CREATING MENU ITEM
      if (!('name' in socialNetwork)) {
        for (let subBrand in socialNetwork) {
          let network = socialNetwork[subBrand];
          item = createMenuItem(brand, network, iconSrc, title, image, description, urlShare);
          items += item;
        }
      } else {
        item = createMenuItem(brand, socialNetwork, iconSrc, title, image, description, urlShare);
        items += item;
      }

      // CHECK IF LIMIT REACHED (LIMITS WHAT IS INITIALLY SEE ABLE AND HIDES OTHERS FOR MODAL)
      if (total === limit) {
        menu += "<div class='dropdown-row'><div class='sr-only'>Share!</div>" + items + "</div>";
        items = "";
      } else if (total === totalNetworks) {
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
  function createMenuItem(brand, network, iconSrc, title, image, description, urlShare) {
    let icon = "",
      item = "",
      name = network.name,
      url = network.url;

    if (urlShare) {
      var thisURL = urlShare;
    } else {
      var thisURL = location.protocol + '//' + location.host + location.pathname;
    }
    // CREATE THE ICON AS SPAN USING CSS BY DEFAULT, UNLESS ICONSRC IS SPECIFIED THEN USE IMG TAG
    icon = "<span class='icn-dreamstale icn-dreamstale-" + brand + "' aria-hidden='hidden'></span><p>" + name + "</p>";
    if (iconSrc) {
      icon = "<img src='" + iconSrc + brand + ".svg' width='45' height='45' alt='" + name + " Icon'><p>" + name + "</p>";
    }

    // ENCODE THE URL AND SET THE SHARE BUTTON WITH ICON
    url = url.replace(/\{url\}/, encodeURIComponent(thisURL))
      .replace(/\{title\}/, encodeURIComponent(title))
      .replace(/\{image\}/, encodeURIComponent(image))
      .replace(/\{description\}/, encodeURIComponent(description))
      .replace(/\'/g, '%27');
    item = "<a class='dropdown-item' href='" + url + "' target='_blank' rel='noreferrer'>" + icon + "</a>";
    urlFinal = thisURL;

    // RETURN MENU ITEM AS HTML STRING
    return item;
  }

  /**
   * @description setSocialShareModal is used to generate the modal that displays hidden networks.
   */
  function setSocialShareModal(element) {
    if (element.querySelector('[href="#socialShareMore"]') != null) {
      element.querySelector('[href="#socialShareMore"]').addEventListener('click', function(e) {
        e.preventDefault();

        // REMOVE ANY EXISTING MODAL
        let ssmodal = document.getElementById('ssmodal');
        if (ssmodal) {
          document.body.removeChild(ssmodal);
        }

        // GET HIDDEN SHARE BUTTONS
        let dropdownRowHidden = document.getElementById('dropdownRowHidden');

        // CREATE AND DISPLAY MODAL
        if (dropdownRowHidden) {
          let modal = "<div class='modal fade' id='socialShareModal' tabindex='-1' role='dialog' aria-labelledby='socialShareModalTitle' aria-hidden='true'><div class='modal-dialog modal-dialog-centered' role='document'>",
            div = document.createElement('div');

          modal += "<div class='modal-content'><div class='modal-body text-center'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
          modal += "<h1 class='sr-only'>Additional Share Options</h1><div class='mt-4'>" + dropdownRowHidden.innerHTML + "</div>";
          modal += "<a class='small text-muted' href='https://thekodester.github.io/socialshare/' target='_blank' rel='noopener'>created with SocialShare</a>";
          modal += "<p class='small text-muted m-0'>Referenced platforms are not affiliated or endorsement.</p>";
          modal += "<p class='small text-muted m-0'>Also all images and logos are owned by the respective third parties.</p>";
          modal += "</div></div></div></div>";

          div.id = "ssmodal";
          div.innerHTML = modal;
          document.body.appendChild(div);

          $('#socialShareModal').modal('show');
        }
      });
    }
  }


  /**
   * @description setPrint is used to generate a printable page.
   */
  function setPrint(element, printSrc) {
    if (element.querySelector('[href="#socialSharePrint"]') != null) {
      element.querySelector('[href="#socialSharePrint"]').addEventListener('click', function(e) {
        e.preventDefault();
        var popup = open("", "Popup", "width=1025,height=900");

        if (printSrc != "html") {
          var printDiv = true;
          popup.document.write('<html><head></head><body class="sharecontent print">');
          var printHTML = $(printSrc)[0].innerHTML;
        } else {
          var printDiv = false;
          var printHTML = $("html")[0].innerHTML;
        }
        popup.document.write(printHTML);

        // Hides the share button on the print
        var elementClasses = "." + element.className.split(" ").join(".");
        popup.document.head.insertAdjacentHTML('beforeend', '<style>' + elementClasses + ' .btn-group, ' + elementClasses + ' .dropdown-menu { display: none} </style>');

        // Sets bootstrap css for the print
        let bootstrapStylesheet = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
        popup.document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="' + bootstrapStylesheet + '" type="text/css">');

        // You can set a stylesheet for the print popup, just uncomment bellow and set the path to the css file
        // This is useful to hide unnecessary content when printing
        // let stylelist = window.location.protocol+"//"+window.location.host+"/style.css";
        // popup.document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="'+stylelist+'" type="text/css">');

        if (printDiv) {
          popup.document.write('</body></html>');
        }

        setTimeout(function() {
          // Precaution inorder to be sure that file was loaded
          popup.window.print();
          popup.window.close();
        }, 500);
      });
    }
  }

  /**
   * @description setCopy creates a mini form that allows the user to copy the pages link (must be used inside the modal).
   */
  function setCopy(element) {
    if (element.querySelector('[href="#socialShareCopy"]') != null) {
      element.querySelector('[href="#socialShareCopy"]').addEventListener('click', function(e) {
        e.preventDefault();

        // Show modal only if cannot copy automatically
        modalCopy = document.createElement('div');
        copyForm = "<div id='modal-copy-container' class='modal-copy-container'>";
        copyForm += "<div class='modal modal-copy'>";
        copyForm += "<button type='button' class='close' onclick='modalCopy.parentNode.removeChild(modalCopy)' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";
        copyForm += "<h1>Copiar link</h1>";
        copyForm += "<div class='form-group my-4'>";
        copyForm += "<label for='linkCopierInput' class='sr-only'>Link</label><input class='form-control w-100' id='linkCopierInput' name='link' value='" + (urlFinal) + "' readonly='readonly'/>";
        copyForm += "<button class='btn btn-lg btn-primary my-2' id='linkCopierButton' type='button'>Copy</button>";
        copyForm += "</div>";
        copyForm += "</div>";
        copyForm += "</div>";
        modalCopy.innerHTML = copyForm;
        document.body.appendChild(modalCopy);

        copyInput = document.getElementById('linkCopierInput');
        document.getElementById('modal-copy-container').classList.add("copying");
        document.getElementById('modal-copy-container').classList.remove("show");
        copySuccess = copyText(copyInput);
        if (copySuccess) {
          modalCopy.parentNode.removeChild(modalCopy);
        } else {
          copyInput.addEventListener('click', function(e) {
            copySuccess = copyText(copyInput);
            if (copySuccess) {
              modalCopy.parentNode.removeChild(modalCopy);
            }
          });
          document.getElementById('linkCopierButton').addEventListener('click', function(e) {
            copySuccess = copyText(copyInput);
            if (copySuccess) {
              modalCopy.parentNode.removeChild(modalCopy);
            }
          });
          document.getElementById('modal-copy-container').classList.add("show");
          document.getElementById('modal-copy-container').classList.remove("copying");
        }
      });
    }
  }

  /**
   * @description copyText used by setCopy selects the text in an element and copies it
   */
  function copyText(element) {
    try {
      element.focus();
      element.select();
      document.execCommand('copy');
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }

  /**
   * @description stringifyJson used by the initial function to convert data-social-share to json.
   */
  function stringifyJson(str) {
    let stringify = '';
    if (str) {
      stringify = str.replace(/[\"\\<\>\|\^\~\[\]\\]/g, '');
      stringify = replaceString(stringify, /\{\s?\'/g, '{"');
      stringify = replaceString(stringify, /\'\s?\}/g, '"}');
      stringify = replaceString(stringify, /\'\s?\:/g, '":');
      stringify = replaceString(stringify, /\:\s?\'/g, ': "');
      stringify = replaceString(stringify, /\'\s?\,/g, '",');
      stringify = replaceString(stringify, /\,\s?\'/g, ',"');
    }
    return stringify;
  }

  /**
   * @description parseJson used by the initial function to convert a string to json.
   */
  function parseJson(str) {
    let json = '';
    if (str) {
      try {
        json = JSON.parse(str);
      } catch (ex) {}
    }
    return json;
  }

  /**
   * @description replaceString used by stringifyJson to replace a specific set of strings.
   */
  function replaceString(str, search, replacement) {
    return str.split(search).join(replacement);
  }

  /**
   * @description arrayKeyExists used by initial functions to confirm is a ket exist in a json array.
   */
  function arrayKeyExists(array, key, fallback) {
    if (array && array.hasOwnProperty(key)) {
      return array[key];
    }
    return fallback;
  }
})();
