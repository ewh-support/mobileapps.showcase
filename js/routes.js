routes = [{
  path: '/',
  url: './index.html',
},
{
  path: '/about/',
  url: './pages/about.html',
  on: {
    pageInit: function (e, page) {
      var map = new google.maps.Map(document.getElementById('gmap'), {
        center: {
          lat: 12.7100116,
          lng: 108.23775190000003
        },
        zoom: 8
      });
    }
  }
},
{
  path: '/gop-y/',
  componentUrl: './pages/request.html'
},
{
  path: '/startup/',
  url: './pages/startup.html'
},
{
  path: '/dashboard/',
  url: './pages/dashboard.html'
},
{
  path: '/two/',
  url: './pages/two.html'
},
{
  path: '/map/',
  url: './pages/map.html',
  on: {
    pageInit: function (e, page) {
      var current = {
        lat: 12.7100116,
        lng: 108.23775190000003
      };
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          current = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var map = new google.maps.Map(document.getElementById('gmap'), {
            center: current,
            zoom: 16
          });
          var myMarker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: current
          });
          addYourLocationButton(map, myMarker);
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      function addYourLocationButton(map, marker) {
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'you_location_img';
        firstChild.appendChild(secondChild);

        google.maps.event.addListener(map, 'dragend', function () {
          $$('#you_location_img').css('background-position', '0px 0px');
        });

        firstChild.addEventListener('click', function () {
          var imgX = '0';
          var animationInterval = setInterval(function () {
            if (imgX == '-18') imgX = '0';
            else imgX = '-18';
            $$('#you_location_img').css('background-position', imgX + 'px 0px');
          }, 500);
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              marker.setPosition(latlng);
              map.setCenter(latlng);
              clearInterval(animationInterval);
              $$('#you_location_img').css('background-position', '-144px 0px');
            });
          }
          else {
            clearInterval(animationInterval);
            $$('#you_location_img').css('background-position', '0px 0px');
          }
        });

        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
      }


    }
  }
},
{
  path: '/catalog/',
  componentUrl: './pages/catalog.html',
},
{
  path: '/product/:id/',
  componentUrl: './pages/product.html',
},
{
  path: '/settings/',
  url: './pages/settings.html',
},
// Page Loaders & Router
{
  path: '/page-loader-template7/:user/:userId/:posts/:postId/',
  templateUrl: './pages/page-loader-template7.html',
},
{
  path: '/page-loader-component/:user/:userId/:posts/:postId/',
  componentUrl: './pages/page-loader-component.html',
},
{
  path: '/request-and-load/user/:userId/',
  async: function (routeTo, routeFrom, resolve, reject) {
    // Router instance
    var router = this;

    // App instance
    var app = router.app;

    // Show Preloader
    app.preloader.show();

    // User ID from request
    var userId = routeTo.params.userId;

    // Simulate Ajax Request
    setTimeout(function () {
      // We got user data from request
      var user = {
        firstName: 'Vladimir',
        lastName: 'Kharlampidi',
        about: 'Hello, i am creator of Framework7! Hope you like it!',
        links: [{
          title: 'Framework7 Website',
          url: 'http://framework7.io',
        },
        {
          title: 'Framework7 Forum',
          url: 'http://forum.framework7.io',
        },
        ]
      };
      // Hide Preloader
      app.preloader.hide();

      // Resolve route to load page
      resolve({
        componentUrl: './pages/request-and-load.html',
      }, {
          context: {
            user: user,
          }
        });
    }, 1000);
  },
},
//easyweb
{
  path: '/profiles',
  on: { //tham khảo https://framework7.io/docs/routes.html#route-events
    pageAfterIn: function (e, page) {
      // do something after page gets into the view
    },
    pageInit: function (e, page) {
      console.log('do something when page initialized') // do something when page initialized
      $$('.convert-form-to-data').on('click', function () {
        var formData = app.form.convertToData('#my-profile');

        //easyweb gọi api để cập nhật dữ liệu, lưu ở formData
        console.log(JSON.stringify(formData));
        axios.patch('/EasyUsers/' + formData.id, formData)
          .then(function (response) {
            console.log('cập nhật thành công')
          })
          .catch(function (error) {

          })
      });

      $$('.fill-form-from-data').on('click', function () {
        var oldData = app.form.convertToData('#my-profile');
        console.log('object id', oldData.id);

        var formData = {}; //axios.get()
        app.form.fillFromData('#my-form', formData);
      });
    },
  },
  async: function (routeTo, routeFrom, resolve, reject) {
    // Router instance
    var router = this;
    // App instance
    var app = router.app;
    //var axios = app.axios;
    if (localStorage.isAuthenticated !== 'true') {
      app.dialog.alert('Hãy đăng nhập để truy cập thông tin', 'Thông Báo');
      //chưa đăng nhập: có thể hiện ra login
      app.loginScreen.open('#my-login-screen');
      return;
    }

    // Show Preloader
    app.preloader.show();

    console.log('getUserInfo()')
    //lấy thông tin đầy đủ của user
    axios.get('/EasyUsers/' + localStorage.userId)
      .then(function (response) {
        console.log(response.data)
        var data = response.data;
        data.isAuthenticated = true;

        var formId = 'my-profile';
        app.form.storeFormData(formId, data) //
        // Resolve route to load page
        resolve({
          componentUrl: './pages/profiles.html',
        }, {
            context: {
              username: data.username, //chỉ cần truyền thông tin ngoài form
            }
          }

        );
      })
      .catch(function (error) { })
    // Hide Preloader
    app.preloader.hide();
    return true;
  },
},
{
  path: '/news/',
  async: function (routeTo, routeFrom, resolve, reject) {
    // Router instance
    var router = this;
    // App instance
    var app = router.app;
    // Show Preloader
    app.preloader.show();

    console.log('get news()')

    axios.get('http://128.199.153.64:5000/api/BaiViets', {
      params: {
        filter: {
          "trangThai": "PUBLISHED"
        }
      }
    }).then(function (response) {
      console.log(response.data)
      var data = response.data;

      // Resolve route to load page
      resolve({
        templateUrl: './pages/news.html',
      }, {
          context: {
            data_news: data, //chỉ cần truyền thông tin ngoài form
          }
        });
    })
      .catch(function (error) { })
    // Hide Preloader
    app.preloader.hide();
    return true;
  }
},
{
  /* news detail */
  path: '/pages/news-detail/:id/',
  templateUrl: './pages/news-detail.html',
  async: function (routeTo, routeFrom, resolve, reject) {
    // Router instance
    var router = this;
    // App instance
    var app = router.app;
    // Show Preloader
    app.preloader.show();

    // User ID from request
    var id = routeTo.params.id;

    console.log('news detail | id', id)

    axios.get('http://128.199.153.64:5000/api/BaiViets/' + id).then(function (response) {
      console.log(response.data)
      var data = response.data;

      // Resolve route to load page
      resolve({
        templateUrl: './pages/news-detail.html',
      }, {
          context: {
            news_detail: data, //chỉ cần truyền thông tin ngoài form
          }
        });
    })
      .catch(function (error) { })
    // Hide Preloader
    app.preloader.hide();
    return true;
  }
},
// Default route (404 page). MUST BE THE LAST
{
  path: '(.*)',
  url: './pages/404.html',
},
];
