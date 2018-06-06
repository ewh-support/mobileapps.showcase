// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'VinaAS', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      apibackend : 'https://backend.vinaas.com/api',
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
var apibackend = 'https://backend.vinaas.com/api';
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

$$('#my-signup-screen .signup-button').on('click', function () {

  var formData = app.form.convertToData('#form-signup');
  if (!formData.username || !formData.password) {
    app.dialog.alert("Hãy điền Tên và Mật Khẩu của bạn")
    return;
  }
  if (!formData.email) {
    formData.email = formData.username + '@vinaas.com';
  }
  // axios.post('/EasyUsers', formData)
  //   .then(function (response) {
  //     console.log('Đăng Ký thành công', response)
  //     localStorage.isAuthenticated = 'true';
  //     localStorage.username = data.username;
  //     localStorage.accessToken = data.id;
  //     localStorage.userId = data.userId;
  //     axios.defaults.headers.common['Authorization'] = localStorage.accessToken;
  //   }).catch(function (error) {
  //    // app.dialog.alert("Đăng Ký không thành công do tên bị trùng! Hãy thử lại với tên khác")
  //   })

    app.popup.close('#my-signup-screen');
    app.loginScreen.close('#my-login-screen'); //Bao: đóng luôn popup đăng nhập đã mở nếu có
    app.router.navigate('/dashboard/')
});

$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();
  //app.router.load('/dashboard/')

  localStorage.isAuthenticated = 'true'; //là string, ko phải bool
  app.loginScreen.close('#my-login-screen');
  //easyweb
  //login();

});

//Easyweb
function login() {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  //easyweb
  var credentials = { username: username, password: password }; //đặt tên là credentials: thông tin bảo mật

  axios.post('/EasyUsers/login', credentials)
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
    axios.get('/EasyUsers/' + localStorage.userId)
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
