!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let t=(e,t,r)=>{var s;return!!r(e,t.prototype)||(null===(s=e.constructor)||void 0===s?void 0:s.name)===t.name},r=e=>{let r=typeof e;return null===e?"null":"object"===r&&Array.isArray(e)?"array":"object"===r&&t(e,String,(e,t)=>t.isPrototypeOf(e))?"string":r},s=e=>t=>r(t)===e,l=s("string"),o=s("object"),i=s("array"),n=e=>"function"==typeof e;var c=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),a=tinymce.util.Tools.resolve("tinymce.EditorManager"),p=tinymce.util.Tools.resolve("tinymce.Env"),u=tinymce.util.Tools.resolve("tinymce.util.Tools");let m=e=>t=>t.options.get(e),f=e=>{let t=e.options.register,r=e=>l(e)||n(e)||o(e);t("importcss_merge_classes",{processor:"boolean",default:!0}),t("importcss_exclusive",{processor:"boolean",default:!0}),t("importcss_selector_converter",{processor:"function"}),t("importcss_selector_filter",{processor:r}),t("importcss_file_filter",{processor:r}),t("importcss_groups",{processor:"object[]"}),t("importcss_append",{processor:"boolean",default:!1})},y=m("importcss_merge_classes"),h=m("importcss_exclusive"),_=m("importcss_selector_converter"),g=m("importcss_selector_filter"),d=m("importcss_groups"),v=m("importcss_append"),b=m("importcss_file_filter"),x=m("skin"),T=m("skin_url"),k=Array.prototype.push,S=(e,t)=>{let r=e.length,s=Array(r);for(let l=0;l<r;l++){let r=e[l];s[l]=t(r,l)}return s},A=e=>{let t=[];for(let r=0,s=e.length;r<s;++r){if(!i(e[r]))throw Error("Arr.flatten item "+r+" was not an array, input: "+e);k.apply(t,e[r])}return t},E=(e,t)=>A(S(e,t)),M=()=>{let e=[],t=[],r={},s=(e,s)=>{r[e]?r[e].push(s):(t.push(e),r[e]=[s])},l=t=>{e.push(t)},o=()=>{let s=E(t,e=>{let t=r[e];return 0===t.length?[]:[{title:e,items:t}]});return s.concat(e)};return{addItemToGroup:s,addItem:l,toFormats:o}},j=/^\.(?:ephox|tiny-pageembed|mce)(?:[.-]+\w+)+$/,O=e=>{let t=p.cacheSuffix;return l(e)&&(e=e.replace("?"+t,"").replace("&"+t,"")),e},R=(e,t)=>{let r=x(e);if(r){let s=T(e),l=s?e.documentBaseURI.toAbsolute(s):a.baseURL+"/skins/ui/"+r,o=a.baseURL+"/skins/content/";return t===l+"/content"+(e.inline?".inline":"")+".min.css"||-1!==t.indexOf(o)}return!1},w=e=>l(e)?t=>-1!==t.indexOf(e):e instanceof RegExp?t=>e.test(t):e,I=e=>e.styleSheet,U=e=>e.selectorText,B=(e,t,r)=>{let s=[],l={},o=(t,l)=>{let i,n=t.href;if(!(!(n=O(n))||r&&!r(n,l)||R(e,n))){u.each(t.imports,e=>{o(e,!0)});try{i=t.cssRules||t.rules}catch(e){}u.each(i,e=>{I(e)?o(e.styleSheet,!0):U(e)&&u.each(e.selectorText.split(","),e=>{s.push(u.trim(e))})})}};u.each(e.contentCSS,e=>{l[e]=!0}),r||(r=(e,t)=>t||l[e]);try{u.each(t.styleSheets,e=>{o(e)})}catch(e){}return s},D=(e,t)=>{let r={},s=/^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(t);if(!s)return;let l=s[1],o=s[2].substr(1).split(".").join(" "),i=u.makeMap("a,img");return s[1]?(r={title:t},e.schema.getTextBlockElements()[l]?r.block=l:e.schema.getBlockElements()[l]||i[l.toLowerCase()]?r.selector=l:r.inline=l):s[2]&&(r={inline:"span",title:t.substr(1),classes:o}),y(e)?r.classes=o:r.attributes={class:o},r},L=(e,t)=>u.grep(e,e=>!e.filter||e.filter(t)),z=e=>u.map(e,e=>u.extend({},e,{original:e,selectors:{},filter:w(e.filter)})),C=(e,t)=>null===t||h(e),P=(e,t,r,s)=>!(C(e,r)?t in s:t in r.selectors),$=(e,t,r,s)=>{C(e,r)?s[t]=!0:r.selectors[t]=!0},q=(e,t,r,s)=>{let l=_(e);return(s&&s.selector_converter?s.selector_converter:l||(()=>D(e,r))).call(t,r,s)},F=e=>{e.on("init",()=>{let t=M(),r={},s=w(g(e)),l=z(d(e)),o=(t,s)=>{if(P(e,t,s,r)){$(e,t,s,r);let l=q(e,e.plugins.importcss,t,s);if(l){let t=l.name||c.DOM.uniqueId();return e.formatter.register(t,l),{title:l.title,format:t}}}return null};u.each(B(e,e.getDoc(),w(b(e))),e=>{if(!j.test(e)&&(!s||s(e))){let r=L(l,e);if(r.length>0)u.each(r,r=>{let s=o(e,r);s&&t.addItemToGroup(r.title,s)});else{let r=o(e,null);r&&t.addItem(r)}}});let i=t.toFormats();e.dispatch("addStyleModifications",{items:i,replace:!v(e)})})},G=e=>{let t=t=>D(e,t);return{convertSelectorToFormat:t}};e.add("importcss",e=>(f(e),F(e),G(e)))}();