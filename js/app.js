// Dom7
var $$ = Dom7;


// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [{
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },


  //app1

  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  //search bar
  // App routes
  routes: routes,
});
// var app = new Framework7();

// // create searchbar
var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});
var catalogView1 = app.views.create('#view-category', {
  url: '/category/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});

//easyweb: login thành công, thiết lập accesstoken vào header
var apibackend = 'http://103.199.18.44:2990/api';
axios.defaults.baseURL = apibackend;
axios.defaults.headers.common['Authorization'] = localStorage.accessToken;

app.on('pageInit', function (page) {
  // localStorage.isAuthenticated = 'false'  ; //để debug
  if (localStorage.isAuthenticated == 'true') {
    //đã đăng nhập
  } else {
    //chưa đăng nhập: có thể hiện ra login
    app.loginScreen.open('#my-login-screen');
  }
});


// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  //easyweb
  login();

  // Alert username and password
  //app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

//Easyweb
function login() {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  //easyweb
  var credentials = {
    username: username,
    password: password
  }; //đặt tên là credentials: thông tin bảo mật

  axios.post('/Users/login', credentials)
    .then(function (response) {
      console.log(response.data)
      if (response.data) {
        var data = response.data; //dữ liệu trả về bởi loopback3
        localStorage.isAuthenticated = 'true'; //là string, ko phải bool
        localStorage.accessToken = data.id;
        localStorage.userId = data.userId;
        localStorage.ttl = data.ttl; //ttl: time to lease, thời gian mà accesstoken hết hạn

        axios.defaults.headers.common['Authorization'] = localStorage.accessToken;

        getUserInfo();
        // Close login screen
        app.loginScreen.close('#my-login-screen');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getUserInfo() {
  console.log('getUserInfo()')
  if (localStorage.isAuthenticated !== 'true') {
    //lấy thông tin đầy đủ của user
    axios.get('/Users/' + localStorage.userId)
      .then(function (response) {
        console.log(response.data)
        var data = response.data;
        localStorage.username = data.username;
        localStorage.email = data.email;
        localStorage.isAuthenticated = 'true'
      })
      .catch(function (error) {
        localStorage.userId = '';
        localStorage.isAuthenticated = 'false';
      })
    return true;
  } else {
    return false;
  }
}

function getNews() {
  axios.get('/BaiViets', {
      params: {
        trangThai: PUBLISHED
      }
    })
    .then(function (response) {
      console.log('get news', response);
    })
    .catch(function (error) {
      console.log('get news', error);
    });
}
// var app2  = new Framework7({
//   root: '#app', // App root element
//   id: 'io.framework7.testapp', // App bundle ID
//   name: 'Framework7', // App name
//   theme: 'auto', // Automatic theme detection
//   // App root data
//   data: function () {
//     return {
//       user: {
//         firstName: 'Mis Lan',
//         lastName: 'Thi',
//       },
//       // Demo products for Catalog section
//       products: [
//         {
//           id: '1',
//           title: 'Apple iPhone 4',
//           description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
//         },
//         {
//           id: '2',
//           title: 'Apple iPhone x',
//           description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
//         },
//         {
//           id: '3',
//           title: 'Apple iPhone x',
//           description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
//         },
//       ]
//     };
//   },


//   //app1

//   // App root methods
//   methods: {
//     helloWorld: function () {
//       app2.dialog.alert('Hello World!');
//     },
//   },
//   // App routes
//   routes: routes,
// });
$$('.open-preloader-indicator').on('click', function () {
  app.preloader.show();
  setTimeout(function () {
    app.preloader.hide();
  }, 3000);
});
//Dialog
// Alert
$$('.open-alert').on('click', function () {
  app.dialog.alert('Hello');
});

// Confirm
$$('.open-confirm').on('click', function () {
  app.dialog.confirm('Are you feel good today?', function () {
    app.dialog.alert('Great!');
  });
});

// Prompt
$$('.open-prompt').on('click', function () {
  app.dialog.prompt('What is your name?', function (name) {
    app.dialog.confirm('Are you sure that your name is ' + name + '?', function () {
      app.dialog.alert('Ok, your name is ' + name);
    });
  });
});

// Login
$$('.open-login').on('click', function () {
  app.dialog.login('Enter your username and password', function (username, password) {
    app.dialog.alert('Thank you!<br>Username:' + username + '<br>Password:' + password);
  });
});

// Password
$$('.open-password').on('click', function () {
  app.dialog.password('Enter your username and password', function (password) {
    app.dialog.alert('Thank you!<br>Password:' + password);
  });
});

// Vertical Buttons
$$('.open-vertical').on('click', function () {
  app.dialog.create({
    title: 'Vertical Buttons',
    text: 'Dialog with vertical buttons',
    buttons: [
      {
        text: 'Button 1',
      },
      {
        text: 'Button 2',
      },
      {
        text: 'Button 3',
      },
    ],
    verticalButtons: true,
  }).open();
});

// Preloader
$$('.open-preloader').on('click', function () {
  app.dialog.preloader();
  setTimeout(function () {
    app.dialog.close();
  }, 3000);
});

// Preloader with custom text
$$('.open-preloader-custom').on('click', function () {
  app.dialog.preloader('My text...');
  setTimeout(function () {
    app.dialog.close();
  }, 3000);
});

// Progress
$$('.open-progress').on('click', function () {
  var progress = 0;
  var dialog = app.dialog.progress('Loading assets', progress);
  dialog.setText('Image 1 of 10');
  var interval = setInterval(function () {
    progress += 10;
    dialog.setProgress(progress);
    dialog.setText('Image ' + ((progress) / 10) + ' of 10');
    if (progress === 100) {
      clearInterval(interval);
      dialog.close();
    }
  }, 300)
});

// Progress Infinite
$$('.open-progress-infinite').on('click', function () {
  app.dialog.progress();
  setTimeout(function () {
    app.dialog.close();
  }, 3000);
});
//Secrch bar
// create searchbar
  var searchbar = app.searchbar.create({
  el: '.searchbar',
  searchContainer: '.list',
  searchIn: '.item-title',
  on: {
    search(sb, query, previousQuery) {
      console.log(query, previousQuery);
    }
  }
});
//Scorll
// Loading flag
var allowInfinite = true;

// Last loaded index
var lastItemIndex = $$('.list li').length;

// Max items to load
var maxItems = 200;

// Append items per load
var itemsPerLoad = 20;

// Attach 'infinite' event handler
$$('.infinite-scroll-content').on('infinite', function () {
  // Exit, if loading in progress
  if (!allowInfinite) return;

  // Set loading flag
  allowInfinite = false;

  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    allowInfinite = true;

    if (lastItemIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      app.infiniteScroll.destroy('.infinite-scroll-content');
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }

    // Generate new items HTML
    var html = '';
    for (var i = lastItemIndex + 1; i <= lastItemIndex + itemsPerLoad; i++) {
      html += '<li>Item ' + i + '</li>';
    }

    // Append new items
    $$('.list ul').append(html);

    // Update last loaded index
    lastItemIndex = $$('.list li').length;
  }, 1000);
});
//Defaulrt Canldender
var calendarDefault = app.calendar.create({
  inputEl: '#demo-calendar-default',
});
//Custom
var calendarDateFormat = app.calendar.create({
  inputEl: '#demo-calendar-date-format',
  dateFormat: 'DD, MM dd, yyyy'
});
//Multil Value
var calendarMultiple = app.calendar.create({
  inputEl: '#demo-calendar-multiple',
  dateFormat: 'M dd yyyy',
  multiple: true
});
//Rang Picker
var calendarRange = app.calendar.create({
  inputEl: '#demo-calendar-range',
  dateFormat: 'M dd yyyy',
  rangePicker: true
});
//Model
var calendarModal = app.calendar.create({
  inputEl: '#demo-calendar-modal',
  openIn: 'customModal',
  header: true,
  footer: true,
  dateFormat: 'MM dd yyyy',
});
//Envent
var today = new Date();
var weekLater = new Date().setDate(today.getDate() + 7);
var calendarEvents = app.calendar.create({
    inputEl: '#demo-calendar-events',
    dateFormat: 'M dd yyyy',
    events: {
      from: today,
      to: weekLater
    }
});
//Disbale Date
var today = new Date();
var weekLater = new Date().setDate(today.getDate() + 7);
var calendarDisabled = app.calendar.create({
    inputEl: '#demo-calendar-disabled',
    dateFormat: 'M dd yyyy',
    disabled: {
      from: today,
      to: weekLater
    }
});
//config
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
var calendarInline = app.calendar.create({
  containerEl: '#demo-calendar-inline-container',
  value: [new Date()],
  weekHeader: false,
  renderToolbar: function () {
    return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
      '<div class="toolbar-inner">' +
        '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>';
  },
  on: {
    init: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
      $$('.calendar-custom-toolbar .left .link').on('click', function () {
        calendarInline.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
        calendarInline.nextMonth();
      });
    },
    monthYearChangeStart: function (c) {
      $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
    }
  }
});
//Form Data
$$('.convert-form-to-data').on('click', function(){
  var formData = app.form.convertToData('#my-form');
  alert(JSON.stringify(formData));
});

$$('.fill-form-from-data').on('click', function(){
  var formData = {
    'name': 'John',
    'email': 'john@doe.com',
    'gender': 'female',
    'toggle': ['yes'],
  }
  app.form.fillFromData('#my-form', formData);
});
//Photo Browser
/*=== Default standalone ===*/
var myPhotoBrowserStandalone = app.photoBrowser.create({
    photos : [
        'http://lorempixel.com/1024/1024/sports/1/',
        'http://lorempixel.com/1024/1024/sports/2/',
        'http://lorempixel.com/1024/1024/sports/3/',
    ]
});
//Open photo browser on click
$$('.pb-standalone').on('click', function () {
    myPhotoBrowserStandalone.open();
});

/*=== Popup ===*/
var myPhotoBrowserPopup = app.photoBrowser.create({
    photos : [
        'http://lorempixel.com/1024/1024/sports/1/',
        'http://lorempixel.com/1024/1024/sports/2/',
        'http://lorempixel.com/1024/1024/sports/3/',
    ],
    type: 'popup'
});
$$('.pb-popup').on('click', function () {
    myPhotoBrowserPopup.open();
});

/*=== As Page ===*/
var myPhotoBrowserPage = app.photoBrowser.create({
    photos : [
        'http://lorempixel.com/1024/1024/sports/1/',
        'http://lorempixel.com/1024/1024/sports/2/',
        'http://lorempixel.com/1024/1024/sports/3/',
    ],
    type: 'page',
    backLinkText: 'Back'
});
$$('.pb-page').on('click', function () {
    myPhotoBrowserPage.open();
});

/*=== Standalone Dark ===*/
var myPhotoBrowserDark = app.photoBrowser.create({
    photos : [
        'http://lorempixel.com/1024/1024/sports/1/',
        'http://lorempixel.com/1024/1024/sports/2/',
        'http://lorempixel.com/1024/1024/sports/3/',
    ],
    theme: 'dark'
});
$$('.pb-standalone-dark').on('click', function () {
    myPhotoBrowserDark.open();
});

/*=== Popup Dark ===*/
var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos : [
        'http://lorempixel.com/1024/1024/sports/1/',
        'http://lorempixel.com/1024/1024/sports/2/',
        'http://lorempixel.com/1024/1024/sports/3/',
    ],
    theme: 'dark',
    type: 'popup'
});
$$('.pb-popup-dark').on('click', function () {
    myPhotoBrowserPopupDark.open();
});

/*=== With Captions ===*/
var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos : [
        {
            url: 'http://lorempixel.com/1024/1024/sports/1/',
            caption: 'Caption 1 Text'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/2/',
            caption: 'Second Caption Text'
        },
        // This one without caption
        {
            url: 'http://lorempixel.com/1024/1024/sports/3/',
        },
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-standalone-captions').on('click', function () {
    myPhotoBrowserPopupDark.open();
});

/*=== With Video ===*/
var myPhotoBrowserPopupDark = app.photoBrowser.create({
    photos : [
        {
            html: '<iframe src="//www.youtube.com/embed/lmc21V-zBq0" frameborder="0" allowfullscreen></iframe>',
            caption: 'Woodkid - Run Boy Run (Official HD Video)'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/2/',
            caption: 'Second Caption Text'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/3/',
        },
    ],
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-standalone-video').on('click', function () {
    myPhotoBrowserPopupDark.open();
});
 //noti
var app = new Framework7();
var $$ = Dom7;
// Create full-layout notification
var notificationFull = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Framework7',
  titleRightText: 'now',
  subtitle: 'This is a subtitle',
  text: 'This is a simple notification message',
  closeTimeout: 3000,
});

// Create notification with close button
var notificationWithButton = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Framework7',
  subtitle: 'Notification with close button',
  text: 'Click (x) button to close me',
  closeButton: true,
});

// Create notification with click to close
var notificationClickToClose = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Framework7',
  titleRightText: 'now',
  subtitle: 'Notification with close on click',
  text: 'Click me to close',
  closeOnClick: true,
})

// With callback on close
var notificationCallbackOnClose = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Framework7',
  titleRightText: 'now',
  subtitle: 'Notification with close on click',
  text: 'Click me to close',
  closeOnClick: true,
  on: {
    close: function () {
      app.dialog.alert('Notification closed');
    },
  },
});

// Open Notifications
$$('.open-full').on('click', function () {
  notificationFull.open();
});
$$('.open-with-button').on('click', function () {
  notificationWithButton.open();
});
$$('.open-click-to-close').on('click', function () {
  notificationClickToClose.open();
});
$$('.open-callback-on-close').on('click', function () {
  notificationCallbackOnClose.open();
});
  //SortTable
  var app = new Framework7();

app.on('sortableSort', function (listEl, indexes) {
  console.log(indexes);
})
var app = new Framework7();



// Create bottom toast
var toastBottom = app.toast.create({
  text: 'This is default bottom positioned toast',
  closeTimeout: 2000,
});
// Create top toast
var toastTop = app.toast.create({
  text: 'Top positioned toast',
  position: 'top',
  closeTimeout: 2000,
});
// Create center toast
var toastCenter = app.toast.create({
  text: 'I\'m on center',
  position: 'center',
  closeTimeout: 2000,
});
// Create toast with icon
var toastIcon = app.toast.create({
  icon: app.theme === 'ios' ? '<i class="f7-icons">star</i>' : '<i class="material-icons">star</i>',
  text: 'I\'m with icon',
  position: 'center',
  closeTimeout: 2000,
});
// Create toast with large message
var toastLargeMessage = app.toast.create({
  text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore.',
  closeTimeout: 2000,
});
// Create toast with button
var toastWithButton = app.toast.create({
  text: 'Toast with additional close button',
  closeButton: true,
});
// Create toast with custom button text
var toastWithCustomButton = app.toast.create({
  text: 'Custom close button',
  closeButton: true,
  closeButtonText: 'Close Me',
  closeButtonColor: 'red',
});
// Create toast with callback on close
var toastWithCallback = app.toast.create({
  text: 'Callback on close',
  closeButton: true,
  on: {
    close: function () {
      app.dialog.alert('Toast closed');
    },
  }
});

// Open toasts
$$('.open-toast-bottom').on('click', function () {
  toastBottom.open();
});
$$('.open-toast-top').on('click', function () {
  toastTop.open();
});
$$('.open-toast-center').on('click', function () {
  toastCenter.open();
});
$$('.open-toast-icon').on('click', function () {
  toastIcon.open();
});
$$('.open-toast-large').on('click', function () {
  toastLargeMessage.open();
});
$$('.open-toast-button').on('click', function () {
  toastWithButton.open();
});
$$('.open-toast-custom-button').on('click', function () {
  toastWithCustomButton.open();
});
$$('.open-toast-callback').on('click', function () {
  toastWithCallback.open();
});