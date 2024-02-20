
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">WorldHeritage</h3>



## 说明
该项目是一个基于[UniApp](https://uniapp.dcloud.net.cn/)的世界遗产项目
UniApp 是一个跨平台的开发框架，开发者编写一套代码，可编译成H5、小程序、App等多个平台的应用，故采用该框架进行开发。
## 安装
### 首先第一步需要安装HBuilderX
[下载地址](https://www.dcloud.io/hbuilderx.html)

### 第二步将项目下载到本地
将项目下载到本地，然后用HBuilderX打开项目，然后依次
- 文件/导入/从本地目录导入
- 设置所需的配置项
```bash
# 这部分设置为自己的后端地址，第三方的登录地址必须保持一致，因为认证域名需要在第三方平台上预设才能正常使用
module.exports = {
    baseUrl: 'http://192.168.0.104:8090/',
    googleAuthenticationUrl: 'http://exam.com/google/auth/redirect',
    twitterAuthenticationUrl: 'http://exam.com/twitter/auth/redirect',
    facebookAuthenticationUrl: 'http://exam.com/facebook/auth/redirect'
}
# 这部分为heroku的地址，如果需要部署到heroku上，需要将上面的baseUrl改为下面的地址
// module.exports = {
//     baseUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/',
//     googleAuthenticationUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/google/auth/redirect',
//     twitterAuthenticationUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/twitter/auth/redirect',
//     facebookAuthenticationUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/facebook/auth/redirect'
// }


```
### 运行项目
依次点击
- 运行/运行到浏览器/选择浏览器

然后在控制台就会出现前端地址，点击即可进入项目


### 逻辑介绍
在 common 文件夹下面，定义了一批Json文件，这些Json文件是静态数据文件，后缀名 `_jp, _en, _cn` 分别代表了日文，英文，中文的数据文件，用于在切换的时候，切换数据文件，从而实现多语言配置。

多语言配置的逻辑为在浏览器的localStorage中存储一个 `local_lang` 的值，然后根据这个值来切换需要显示的数据文件。

如果需要在开发的时候手动切换语言，可以在 `App.vue` 中手动设置 `this.$store.commit('setLocalLanguage', 'en');` 中的 `'cn'` 来切换语言，可以设置的值有`jp, en, cn`。


### 页面介绍

#### 首页介绍
/pages/index/index.vue 为首页, 首页刚进来的时候会加载Google地图，如果开发者的位置在中国区，记得打开VPN，因为Google地图在中国是无法使用的，所以需要开启VPN，然后刷新页面，就可以看到地图了。

刚打开的首页的静态数据是在 `common` 文件夹下面的 `heritage_country_count.json` 文件中的数据，这些数据是每一个国家的世界遗产数量，在未登录的情况下会展示这部分的数据。

##### 首页遗迹点数据
获取首页遗迹点的数据逻辑，首先需要监听谷歌地图的缩放事件，然后根据缩放的级别来获取对应的遗迹点数据，这部分的逻辑在 `pages/index/index.vue` 中的 `initMap()` 方法中，监听了地图的缩放事件，然后根据缩放的级别来获取对应的遗迹点数据。
```javascript
google.maps.event.addListener(map, "zoom_changed", function () {
    let currentZoom = map.getZoom();
    var currentZoom1 = map.getZoom();
    previousZoom = currentZoom1;  // 更新前一个缩放级别
    if (currentZoom >= 5 && currentZoom < 6) {
        loadMarkers(map)
        setCountryMarkerView(false)
        setHeritageMarkerView(true)
        setHeritageBigMarkerView(false)
    } else if (currentZoom >= 6) {
        setCountryMarkerView(false)
        setHeritageMarkerView(false)
        setHeritageBigMarkerView(true)
    } else {
        setCountryMarkerView()
        setHeritageMarkerView(false)
        setHeritageBigMarkerView(false)
        that.markersLoaded = false
    }

});
```

👉 在刚打开应用的时候，如果用户在首页页面没有进行拖动的时候，只是进行了缩放的情况，则会默认获取当前地图的中心点的遗迹点数据，这部分的逻辑在 `pages/index/index.vue` 中的 `initMap()` 方法中，监听了地图的缩放事件，然后根据缩放的级别来获取对应的遗迹点数据。

如果用户在首页页面进行了拖动的情况下，则会判断当前视口的中心距离上一次获取的遗迹点数据的中心点的距离，如果距离大于一定的值，则会重新获取对应的遗迹点数据。
```javascript
      // 监听地图拖动事件
      google.maps.event.addListener(map, 'dragend', function() {
        // 获取当前地图的中心点
        var center = map.getCenter();
        let currentZoom = parseInt(map.getZoom());
        var lat = center.lat();
        var lng = center.lng();

        // 计算当前中心点和上一次获取数据的中心点的距离
        const dist = distance(lat, lng, previousUserCenter.lat, previousUserCenter.lng);
        previousUserCenter = { lat: lat, lng: lng }
        // 如果距离大于10km，并且缩放级别为 5 则重新获取遗迹点数据
        if (dist > 10) {
          if (currentZoom === 5) {
            that.markersLoaded = false
            loadMarkers(map)
          }
        }
      });
    // 记载数据的方法
    function loadMarkers(map) {
        // 在这里编写加载遗迹点数据的代码
        // 包括发起异步请求获取数据、处理数据、渲染标记点等步骤
        // 注意避免重复加载数据
        // 获取当前地图视口的经纬度范围
        if (that.markersLoaded) {
            return;
        }
        var bounds = map.getBounds();
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        var viewportData = {
            lat: previousUserCenter.lat,
            lng: previousUserCenter.lng
        };
        ...
    }
```

对应的后端处理逻辑
```php
public function getHeritageInfoByLocation(Request $request): \Illuminate\Http\JsonResponse
    {
        // 接受前端传递的经纬度
        $lat  = $request->input('lat');
        $lng  = $request->input('lng');

        $distance = 2000000; // 3000 公里

        $heritages = DB::table('heritages')->select('*')
            ->whereRaw('ST_Distance_Sphere(POINT(longitude, latitude), POINT(?, ?)) <= ?', [$lng, $lat, $distance])
            ->get()
            ->toArray();
        return $this->responseWithData($heritages);
    }
```

##### 可点击的遗迹点
当缩放级别大于等于6的时候，会展示大的遗迹点，这个时候的遗迹点可以点击查看详情，这部分的逻辑在 `pages/index/index.vue` 中的 `initMap()` 方法中，监听了地图的缩放事件，然后根据缩放的级别来获取对应的遗迹点数据。

```javascript
// 根据缩放级别显示不同级别marker
google.maps.event.addListener(map, "zoom_changed", function () {
let currentZoom = map.getZoom();
var currentZoom1 = map.getZoom();
previousZoom = currentZoom1;  // 更新前一个缩放级别
if (currentZoom >= 5 && currentZoom < 6) {
  loadMarkers(map)
  setCountryMarkerView(false)
  setHeritageMarkerView(true)
  setHeritageBigMarkerView(false)
} else if (currentZoom >= 6) {
  // 将国家遗迹数量的marker隐藏，也就是刚进入页面的 0/4 这样的marker
  setCountryMarkerView(false)
   // 将小的遗迹点marker隐藏, 小的遗迹点只是按照坐标显示，只能查看无法点击
  setHeritageMarkerView(false)
  // 将大的遗迹点marker显示，大的遗迹点是可以点击弹出窗口的，该方法是Google地图自带的API
  setHeritageBigMarkerView(true)
} else {
  setCountryMarkerView()
  setHeritageMarkerView(false)
  setHeritageBigMarkerView(false)
  that.markersLoaded = false
}

});
// 处理的逻辑为遍历所有的遗迹点，然后根据遗迹点的经纬度来创建对应的marker，并且为marker添加点击事件，再判断当前的设备类型，如果是手机则展示手机的弹窗，如果是PC则展示PC的弹窗
function setHeritageBigMarkerView(is_show = true) {
    if (is_show) {
        heritageData.forEach((property, index) => {
            if (property.latitude !== '' && property.longitude !== '') {
                let position = { lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) }
                const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
                    map,
                    content: buildHeritageBigMark(property, index),
                    position: position,
                    title: property.description,
                });
                advancedMarkerView.addListener("click", ({ domEvent, latLng }) => {
                    let content = '';
                    if (that.deviceType === 'phone') {
                        content = mobileClickContent(property)
                    } else {
                        content = PCClickContent(property)
                    }
                    infoWindow.close();
                    infoWindow.setContent(content);
                    infoWindow.open(advancedMarkerView.map, advancedMarkerView);
                });
                heritageBigMarkers.push(advancedMarkerView);
            }
        });
    } else {
        // 如果不显示，则将所有的大的遗迹点marker隐藏
        heritageBigMarkers.forEach((marker) => {
            marker.setMap(null);
        });
    }
}
```
#### CheckIn页面介绍
/pages/index/check_in.vue 为CheckIn页面, 用户可以在CheckIn页面进行签到，签到的逻辑是用户在这个页面选择对应的遗迹点，然后点击签到按钮，然后会将签到的数据发送到后端，后端会进行签到的逻辑处理，然后返回签到的结果。

##### 数据处理
- check_in页面的静态数据引用了 common/country_heritage_list.json 文件
- 只有在进行筛选的时候，才会进行数据请求和后端产生交互。
- 这个页面的数据是按照国家的A-Z的方式排序的。

页面上如果一次性加载这些数据，会导致页面卡顿，所以采取了模拟分页的方式加载数据，第一次只获取前15条数据，也就是前15个国家的数据遗迹数据，然后当用户滚动到底部的时候，会再次获取下15条数据，然后再次渲染页面。
```javascript
// 列表滚动触底事件
function scrolltolower() {
    // this.countryHeritageListPage = 15
    // 当触底之后, 证明是第一次数据已经加载完毕，列表上显示的已经是0-20的数据，触底之后，就去加载21-40的数据，但是要记住，如果21-40的数据已经加载过了，就需要判断是否加载完毕，如果加载完毕了，就不再加载数据
    this.countryHeritageListPage++
    // 计算当前页数的数据，offset = (page - 1) * limit
    let offset = (this.countryHeritageListPage - 1) * this.countryHeritageListLimit
    let limit = this.countryHeritageListPage * this.countryHeritageListLimit
    let countryHeritageList = country_heritage_list.slice(offset, limit)
    // 添加一个Loading
    uni.showLoading({
        title: 'Loading'
    })
    // 添加500毫秒延迟，模拟网络请求，然后隐藏Loading
    setTimeout(() => {
        if (countryHeritageList.length) {
            this.countryHeritageList = this.countryHeritageList.concat(countryHeritageList)
        }
        uni.hideLoading()
    }, 500)
    return;
}
```


后端的处理逻辑
```php
public function getCheckInInfo(Request $request): \Illuminate\Http\JsonResponse
{
    $continentResult = [
        'rate' => "0",
        'continent_data_list' => [],
        'continent_data' => []
    ];

    // 接收前端传递的遗迹点id
    if ($heritages_ids = $request->post('heritage_ids')) {
        if (is_string($heritages_ids)) {
            $checkHeritageIds = explode(',', $heritages_ids);
        } else {
            $checkHeritageIds = $request->post('heritage_ids');
        }
        // 获取所有的遗迹点和遗迹点的数量
        $heritages   = Heritage::query()->whereIn('id', $checkHeritageIds)->get();
        $heritageCount = DB::table('heritages')->count();
        
        // 获取所有的大洲
        $continentMap = [
            'Europe' => [
                'name_cn' => '欧洲', 'name_en' => 'Europe', 'name_jp' => 'ヨーロッパ', 'name_ko' => '유럽', 'name_en_md5' => md5('Europe')
            ],
            'Africa' => [
                'name_cn' => '非洲', 'name_en' => 'Africa', 'name_jp' => 'アフリカ', 'name_ko' => '아프리카', 'name_en_md5' => md5('Africa')
            ],
            'Asia' => [
                'name_cn' => '亚洲', 'name_en' => 'Asia', 'name_jp' => 'アジア', 'name_ko' => '아시아', 'name_en_md5' => md5('Asia')
            ],
            'North America' => [
                'name_cn' => '北美洲', 'name_en' => 'North America', 'name_jp' => '北米', 'name_ko' => '북미', 'name_en_md5' => md5('North America')
            ],
            'Central America' => [
                'name_cn' => '中美洲', 'name_en' => 'Central America', 'name_jp' => '中米', 'name_ko' => '중미', 'name_en_md5' => md5('Central America')
            ],
            'South America' => [
                'name_cn' => '南美洲', 'name_en' => 'South America', 'name_jp' => '南米', 'name_ko' => '남미', 'name_en_md5' => md5('South America')
            ],
            'Oceania' => [
                'name_cn' => '大洋洲', 'name_en' => 'Oceania', 'name_jp' => 'オセアニア', 'name_ko' => '오세아니아', 'name_en_md5' => md5('Oceania')
            ],
        ];

        // 遍历所有的大洲，然后根据遗迹点的大洲来计算每个大洲的签到数量
        foreach ($continentMap as $key => $item) {
            $count = 0;
            foreach ($heritages as $heritage) {
                if ($heritage->region_en == 'Arab States') {
                    $heritage->region_en = 'Asia';
                }
                if ($heritage->region_en == 'Latin America and the Caribbean') {
                    $heritage->region_en = 'South America';
                }
                // 该遗迹所包含的大洲
                $regionArr = $this->getRegionArr($heritage->region_en);
                // 如果当前大洲出现在该遗迹的大洲列表中，将计数器加1
                if (in_array($item['name_en'], $regionArr)) {
                    $count++;
                }
            }
            $continentResult['continent_data_list'][] = [
                'name_cn' => $item['name_cn'],
                'name_en' => $item['name_en'],
                'name_jp' => $item['name_jp'],
                'count'   => $count
            ];
        }
        $checkInCount  = count($checkHeritageIds);
        $continentResult['rate'] = "$checkInCount/$heritageCount";
        return $this->responseWithData($continentResult);
    }
    return $this->responseWithData($continentResult);
}
```

根据签到的遗迹点的数量，计算每个大洲的签到数量，然后返回给前端，然后再根据这部分的数据来生成把对应的大洲数据附着在世界地图的图片上
- 这里会生成2个Canvas绘制的图片，一个是页面上的背景图，一个是分享的图片，背景图片就是在分享页面的背景图，分享的图片就是分享到社交平台需要保存到本地的图片


#### List页面介绍
/pages/index/list.vue 为List页面, 用户可以在List页面查看所有的遗迹点，然后点击查看详情，然后会跳转到对应的遗迹点详情页面。
- list页面的静态数据引用了 common/country_heritage_list.json 文件
- 只有在进行筛选的时候，才会进行数据请求和后端产生交互。
- 这个页面的数据是按照国家的A-Z的方式排序的。同check_in 页面一样，这个页面也是采取了模拟分页的方式加载数据，第一次只获取前15条数据，也就是前15个国家的数据遗迹数据，然后当用户滚动到底部的时候，会再次获取下15条数据，然后再次渲染页面。

```javascript
function scrolltolower() {
    // 当触底之后, 证明是第一次数据已经加载完毕，列表上显示的已经是0-20的数据，触底之后，就去加载21-40的数据，但是要记住，如果21-40的数据已经加载过了，就需要判断是否加载完毕，如果加载完毕了，就不再加载数据
    this.countryHeritageListPage++
    // 计算当前页数的数据，offset = (page - 1) * limit
    let offset = (this.countryHeritageListPage - 1) * this.countryHeritageListLimit
    let limit = this.countryHeritageListPage * this.countryHeritageListLimit
    let countryHeritageList = country_heritage_list.slice(offset, limit)
    // 添加一个Loading
    uni.showLoading({
        title: 'Loading'
    })
    // 添加500毫秒延迟，模拟网络请求，然后隐藏Loading
    setTimeout(() => {
        if (countryHeritageList.length) {
            this.countryHeritageList = this.countryHeritageList.concat(countryHeritageList)
        }
        uni.hideLoading()
    }, 500)
    return;
},
```
