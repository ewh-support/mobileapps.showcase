routes = [{
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html'
  },
    {
    path: '/chip-tags/',
    url: './pages/chip-tags.html'
  },
  {
    path: '/formInput/',
    url: './pages/formInput.html'
  },
  {
  path: '/data-table/',
    url: './pages/data-table.html'
  },
  {
    name:'radio-button',
    path:'/radio-button/',
    url:'./pages/radio-button.html'
  },
   {
    name:'floattingactionbutton',
    path:'/floattingactionbutton/',
    url:'./pages/floattingactionbutton.html'
  },
  {
    name:'checkbox',
    path:'/checkbox/',
    url:'./pages/checkbox.html'
  },
  {
    name:'contact-list',
    path:'/contact-list/',
    url:'./pages/contact-list.html',
  },
  {
    name:'timeline',
    path:'/timeline/',
    url:'./pages/timeline.html',
  },
  {
    name:'calender-timeline',
    path:'/calender-timeline/',
    url:'./pages/sub-timeline/calender-timeline.html'
  },
  {
    name:'horizontal-timeline',
    path:'/horizontal-timeline/',
    url:'./pages/sub-timeline/horizontal-timeline.html'
  },
  {
    name:'vertical-timeline',
    path:'/vertical-timeline/',
    url:'./pages/sub-timeline/vertical-timeline.html'
  },
  {
    path: '/scroll/',
    componentUrl: './pages/scroll.html',
  },
  {
    name:'chip-tags',
    path:'/chip-tags/',
    url:'./pages/chip-tags.html',
  },
    {
    name:'contentBlock',
    path:'/contentBlock/',
    url:'./pages/contentBlock.html',
  },
 {
    path: '/progessbar/',
    componentUrl: './pages/progessbar.html',
  },
   {
    path: '/photoBrowers/',
    componentUrl: './pages/photoBrowers.html',
  },
    {
    name:'cards',
    path:'/cards/',
    url:'./pages/cards.html',
  },
    {
    name:'basic-card',
    path:'/basic-card/',
    url:'./pages/sub-card/basic-card.html',
  },
    {
    name:'card-facebook',
    path:'/card-facebook/',
    url:'./pages/sub-card/card-facebook.html',
  },
    {
    name:'stylle-card',
    path:'/stylle-card/',
    url:'./pages/sub-card/stylle-card.html',
  },
      {
    name:'Badge',
    path:'/Badge/',
    url:'./pages/Badge.html',
  },
        {
    name:'fabmod',
    path:'/fabmod/',
    url:'./pages/sub-fab/fabmod.html',
  },
        {
    name:'fabcolor',
    path:'/fabcolor/',
    url:'./pages/sub-fab/fabcolor.html',
  },
        {
    name:'fabfull',
    path:'/fabfull/',
    url:'./pages/sub-fab/fabfull.html',
  },
   {
    path: '/dialog/',
    componentUrl: './pages/dialog.html',
  },
     {
    path: '/formStorage/',
    componentUrl: './pages/formStorage.html',
  },
    {
    path: '/preload/',
    componentUrl: './pages/preload.html',
  },
     {
    path: '/searchbar/',
    componentUrl: './pages/searchbar.html',
  },
       {
    path: '/formData/',
    componentUrl: './pages/formData.html',
  },
  {
    path: '/map/',
    url: './pages/map.html',
    on: {
      pageInit: function (e, page) {
        var map = new google.maps.Map(document.getElementById('gmap'), {
          center: {
            lat: -34.397,
            lng: 150.644
          },
          zoom: 8
        });
      }
    }
  },
{
     path: '/scroll/',
    componentUrl: './pages/scroll.html',
  },
  {
     path: '/canlender/',
    componentUrl: './pages/canlender.html',
  },
  {
     path: '/catalog/',
    componentUrl: './pages/catalog.html',
  },
  {
    path: '/category/',
    componentUrl: './pages/category.html',
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
          axios.patch('/Users/' + formData.id, formData)
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
      axios.get('/Users/' + localStorage.userId)
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
        .catch(function (error) {})
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
        .catch(function (error) {})
      // Hide Preloader
      app.preloader.hide();
      return true;
    }
  },
  {
    path: '/suKien/',
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
            templateUrl: './pages/suKien.html',
          }, {
            context: {
              data_news: data, //chỉ cần truyền thông tin ngoài form
            }
          });
        })
        .catch(function (error) {})
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
        .catch(function (error) {})
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