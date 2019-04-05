# SocialShare
SocialShare is a mobile friendly and customizable share button generator designed around Bootstrap 4.

## Implementation

##### [Demo Page](https://thekodester.github.io/socialshare/)

**PLEASE NOT THAT MOST OF THE ICONS ARE PROVIDED BY http://www.dreamstale.com AND ARE SUBJECT TO THERE LICENSE. PLEASE SEE icons/freebie-license.txt FOR MORE DETAILS.**

### HTML

#### Step 1:
You'll need to wrap a bootstrap dropdown in a div with the following attributes:

* `class="social-share social-share-sticky"`
* `data-social-share="{'iconSrc': '/path/to/icons/', title': 'Page Title', image: '/path/to/image.jpg', 'description': 'Page Description'}"`

The attribute `data-social-share` is optional. Please see *Customization* for more information.

Example:
```html
<div class="social-share social-share-sticky" data-social-share="{'iconSrc': '/path/to/icons/', title': 'Page Title', image: '/path/to/image.jpg', 'description': 'Page Description'}">
  <div class="btn-group dropright">
    <input class="btn btn-outline-danger dropdown-toggle text-uppercase" id="socialShareBtn" type="button" value="Share" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <label class="sr-only" for="socialShareBtn">Share this page</label>
    <div class="dropdown-menu dropdown-menu-right dropdown-menu-multi"></div>
  </div>
</div>
```

#### Step 2:
Make sure you have all required files.

CSS:
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

<link rel="stylesheet" href="/path/to/css/socialshare.js">
```

JAVASCRIPT:
```html
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<script src="/path/to/javascript/socialshare.js"></script>
```

Currently we have only tested with **BootStrap v4.3.1**, but you are free to try the latest version of Bootstrap just visit https://getbootstrap.com.

### Customization


You can customize the plugin using the `data-social-share` attribute.

|    Name     |  Type  |    Default     | Description |
|-------------|--------|----------------|-------------|
|  printSrc   | String |  main_content  | If used well print the contents of the provide id string. When not used well default to looking for an element with id of *main_content* and print its content. |
|   iconSrc   | String |  css rendered  | If used the icons well be loaded using the `<img>` tag. When not used well default to using css and load the icons as a background image. |
|    title    | String | document.title | Title is used differently by each social network, but provides content to what is being shared (is most commonly used). |
|    image    | String |     empty      | Image is used differently by each social network, but provides content to what is being shared (is rarely used). |
| description | String |     empty      | Description is used differently by each social network, but provides content to what is being shared (is fairly used). |

Example:
```html
data-social-share="{'iconSrc': '/path/to/icons/', title': 'Page Title', image: '/path/to/image.jpg', 'description': 'Page Description'}"
```

## Contributing

#### Report a bug / Request a feature
Feel free to report bugs or request features using the [Issues](https://github.com/thekodester/socialshare/issues) section. Please make sure that their isn't a similar existing issue. Also it helps to include what OS/browser was used (including their versions), steps and/or code to reproduce the bug, and [JSFiddle](http://jsfiddle.net/) would be great.

#### Development
For contribute please follow these steps:

1. Fork the repository
2. Clone the forked repo
3. Work from the `development` branch, create and checkout a new branch to work upon
4. Make your chanes while in that branch
5. Push the changes to your forked repo
6. Submit a pull request from your forked repo
7. Once accepted remember to update the forked repo

#### Keywords
bootstrap, javascript, social share buttons, share buttons, share this
