# webpack_standard

Webサイトを作成するときの構成をつくる

### 出力のイメージ

```
/
├assets （画像とか動画とかはひとまとめ、ページの構造と同じにする）
│　└images
│　　└members（membersのページで使う画像）
│　　　├icon.png
│　　　└thumbnail.jpg
│
├common （サイト全体で共通のCSSやJS）
│　├css
│　│　└common.css
│　│
│　└js
│　　　└common.js
│
├index.html （HOME用）
│
├css （HOME用）
│　└index.css
│
├js （HOME用）
│　└index.js
│
├about
│　└index.html
│
└members 
　├index.html
　├taro.html
　│
　├common （members配下で共通のCSSやJS）
　│　└css
　│　　└style.css
　│
　└css （members配下でそれぞれのページ固有のCSS）
　　　├index.css
　　　└taro.css
```
