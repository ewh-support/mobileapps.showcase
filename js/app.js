// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
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
      products: [
        {
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
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
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
  if (localStorage.isAuthenticated == 'true')  {
    //đã đăng nhập
  }else {
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
function login(){
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  //easyweb
  var credentials = { username: username, password: password }; //đặt tên là credentials: thông tin bảo mật

  axios.post('/Users/login', credentials)
  .then(function (response) {
    console.log(response.data)
    if (response.data)  {
      var data = response.data; //dữ liệu trả về bởi loopback3
      localStorage.isAuthenticated = 'true' ; //là string, ko phải bool
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
  if (localStorage.isAuthenticated !== 'true')  {
    //lấy thông tin đầy đủ của user
    axios.get('/Users/' + localStorage.userId)
    .then(function(response){
      console.log(response.data)
      var data = response.data;
      localStorage.username = data.username;
      localStorage.email = data.email;
      localStorage.isAuthenticated = 'true'
    })
    .catch(function(error) {
      localStorage.userId = '';
      localStorage.isAuthenticated = 'false';
    })
    return true;
  }else {
    return false;
  }
}

function getNews(){
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
