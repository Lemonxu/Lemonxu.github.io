if(!self.define){let e,i={};const a=(a,d)=>(a=new URL(a+".js",d).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(d,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let s={};const n=e=>a(e,c),f={module:{uri:c},exports:s,require:n};i[c]=Promise.all(d.map((e=>f[e]||n(e)))).then((e=>(r(...e),s)))}}define(["./workbox-afb8f5db"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2023/05/18/html/html/index.html",revision:"7520dff5d10d87a95f023f7e5804b367"},{url:"2023/05/31/responsive-html/responsive-html/index.html",revision:"ce7aca8e1017ceea190060cdb55c9a6c"},{url:"2023/06/07/hello-world/index.html",revision:"9c57aa66c2db2811586f6f0d7f312c24"},{url:"404.html",revision:"bc2024301aedc0833257a628eec4982d"},{url:"archives/2023/05/index.html",revision:"2dc0f44fe9948efbd208800e8144e6a1"},{url:"archives/2023/06/index.html",revision:"c344e8085da1662f841d0bb83ef9b8f1"},{url:"archives/2023/index.html",revision:"fd1c3198aa83426ad5e89e5a880cfa34"},{url:"archives/index.html",revision:"cc0cbac55aed0d39146b26365b4c2458"},{url:"categories/index.html",revision:"23471c804341761dd8e22332b5e1c4f6"},{url:"categories/前端响应式/HTML/CSS/index.html",revision:"42ef53cd7244dec977c7cc90a800f107"},{url:"categories/前端响应式/HTML/index.html",revision:"0f258ee421e26d9fe4e4a0bba0881765"},{url:"categories/前端响应式/index.html",revision:"83324913f2f6c832537b35622b432a4e"},{url:"categories/前端基础/HTML/index.html",revision:"9dffa4aa18012cb4c50cea28e30a2910"},{url:"categories/前端基础/index.html",revision:"c73073040f38aaa7422f89dd519c9d96"},{url:"css/index.css",revision:"f5fd260b34558b9cdec1bd8dcff69df6"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"images/apple-touch-icon-next.png",revision:"a2b1828fc11dd579b0deccfccfc6d481"},{url:"images/bg/640.jpg",revision:"89302ba665314a058b303a22a04851d8"},{url:"images/bg/641.jpg",revision:"6fdcba0ab51d7634d9f9b17860c47e7a"},{url:"images/bg/642.jpg",revision:"9d6ad0b86878e7ecc25633357787b875"},{url:"images/bg/643.jpg",revision:"8965cb66c66dce53e3fbe329c31841e2"},{url:"images/bg/644.jpg",revision:"7a11a4b4b52e4281ceadae17965e8405"},{url:"images/bg/645.jpg",revision:"35c8bdaae1501af5e7b79d086af04999"},{url:"images/bg/646.jpg",revision:"c7a1e2d656d53643fc9fb9764ac4ef44"},{url:"images/bg/647.jpg",revision:"7d08f2edc8f34a7527eb8a94af8355bd"},{url:"images/bg/648.jpg",revision:"9bc0b42740e10beb9d74f375d87e6e6f"},{url:"images/bg/649.jpg",revision:"5d036ee256cb49c0235b55fa6832a2f1"},{url:"images/favicon-16x16-next.png",revision:"90f3a564f9928b9bb70c72d5302d53fd"},{url:"images/favicon-32x32-next.png",revision:"90f3a564f9928b9bb70c72d5302d53fd"},{url:"images/hygge3.png",revision:"29603a7b29fc55d28dcfd0ea1c6bf7a5"},{url:"images/post/responsive-html/css-media-type.png",revision:"8327bee331c94c05af743d3eff37097a"},{url:"images/top_img.png",revision:"cb259d297d52b87ba7e7124d7b4d2545"},{url:"images/user.jpg",revision:"d89e17a5a1084621563360248c9b9107"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"index.html",revision:"a81e43dd0df5382452073602b220a7fe"},{url:"js/main.js",revision:"4802a927bf0b57f3859b3be8ed0b0351"},{url:"js/search/algolia.js",revision:"5e2a2c65f28bddbb3d94529453e91716"},{url:"js/search/local-search.js",revision:"2e3ff3d156bb208f752d95375ebca557"},{url:"js/tw_cn.js",revision:"fd395fc3b4df9c7da17e730d173cfbea"},{url:"js/utils.js",revision:"a0c72193c089d7ef2c3d5359379c4516"},{url:"link/index.html",revision:"2478ee6c0c2406bbe1c199a34f008541"},{url:"tags/HTML/index.html",revision:"44c2adf44ede6f103b125d7344b4be08"},{url:"tags/index.html",revision:"530ba607ca322e7a7799091976db351e"},{url:"tags/前端响应式/index.html",revision:"8ca712529908a70163ada3d06b64d8d1"}],{})}));
//# sourceMappingURL=service-worker.js.map
