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
//Form Storage
