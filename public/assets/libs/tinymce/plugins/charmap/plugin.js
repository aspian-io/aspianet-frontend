!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let t=(e,t)=>e.dispatch("insertCustomChar",{chr:t}),r=(e,r)=>{let a=t(e,r).chr;e.execCommand("mceInsertContent",!1,a)},a=(e,t,r)=>{var a;return!!r(e,t.prototype)||(null===(a=e.constructor)||void 0===a?void 0:a.name)===t.name},n=e=>{let t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&a(e,String,(e,t)=>t.isPrototypeOf(e))?"string":t},i=e=>t=>e===t,o=e=>"array"===n(e),s=i(null),l=i(void 0),c=e=>null==e,u=e=>!c(e),g=e=>"function"==typeof e,h=()=>!1;class m{constructor(e,t){this.tag=e,this.value=t}static some(e){return new m(!0,e)}static none(){return m.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?m.some(e(this.value)):m.none()}bind(e){return this.tag?e(this.value):m.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:m.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return u(e)?m.some(e):m.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}m.singletonNone=new m(!1);let p=Array.prototype.push,d=(e,t)=>{let r=e.length,a=Array(r);for(let n=0;n<r;n++){let r=e[n];a[n]=t(r,n)}return a},f=(e,t)=>{for(let r=0,a=e.length;r<a;r++){let a=e[r];t(a,r)}},y=(e,t,r)=>{for(let a=0,n=e.length;a<n;a++){let n=e[a];if(t(n,a))return m.some(n);if(r(n,a))break}return m.none()},b=(e,t)=>y(e,t,h),w=e=>{let t=[];for(let r=0,a=e.length;r<a;++r){if(!o(e[r]))throw Error("Arr.flatten item "+r+" was not an array, input: "+e);p.apply(t,e[r])}return t},v=(e,t)=>w(d(e,t));var k=tinymce.util.Tools.resolve("tinymce.util.Tools");let C=e=>t=>t.options.get(e),x=e=>{let t=e.options.register,r=e=>g(e)||o(e);t("charmap",{processor:r}),t("charmap_append",{processor:r})},A=C("charmap"),q=C("charmap_append"),O=k.isArray,T="User Defined",E=()=>[{name:"Currency",characters:[[36,"dollar sign"],[162,"cent sign"],[8364,"euro sign"],[163,"pound sign"],[165,"yen sign"],[164,"currency sign"],[8352,"euro-currency sign"],[8353,"colon sign"],[8354,"cruzeiro sign"],[8355,"french franc sign"],[8356,"lira sign"],[8357,"mill sign"],[8358,"naira sign"],[8359,"peseta sign"],[8360,"rupee sign"],[8361,"won sign"],[8362,"new sheqel sign"],[8363,"dong sign"],[8365,"kip sign"],[8366,"tugrik sign"],[8367,"drachma sign"],[8368,"german penny symbol"],[8369,"peso sign"],[8370,"guarani sign"],[8371,"austral sign"],[8372,"hryvnia sign"],[8373,"cedi sign"],[8374,"livre tournois sign"],[8375,"spesmilo sign"],[8376,"tenge sign"],[8377,"indian rupee sign"],[8378,"turkish lira sign"],[8379,"nordic mark sign"],[8380,"manat sign"],[8381,"ruble sign"],[20870,"yen character"],[20803,"yuan character"],[22291,"yuan character, in hong kong and taiwan"],[22278,"yen/yuan character variant one"]]},{name:"Text",characters:[[169,"copyright sign"],[174,"registered sign"],[8482,"trade mark sign"],[8240,"per mille sign"],[181,"micro sign"],[183,"middle dot"],[8226,"bullet"],[8230,"three dot leader"],[8242,"minutes / feet"],[8243,"seconds / inches"],[167,"section sign"],[182,"paragraph sign"],[223,"sharp s / ess-zed"]]},{name:"Quotations",characters:[[8249,"single left-pointing angle quotation mark"],[8250,"single right-pointing angle quotation mark"],[171,"left pointing guillemet"],[187,"right pointing guillemet"],[8216,"left single quotation mark"],[8217,"right single quotation mark"],[8220,"left double quotation mark"],[8221,"right double quotation mark"],[8218,"single low-9 quotation mark"],[8222,"double low-9 quotation mark"],[60,"less-than sign"],[62,"greater-than sign"],[8804,"less-than or equal to"],[8805,"greater-than or equal to"],[8211,"en dash"],[8212,"em dash"],[175,"macron"],[8254,"overline"],[164,"currency sign"],[166,"broken bar"],[168,"diaeresis"],[161,"inverted exclamation mark"],[191,"turned question mark"],[710,"circumflex accent"],[732,"small tilde"],[176,"degree sign"],[8722,"minus sign"],[177,"plus-minus sign"],[247,"division sign"],[8260,"fraction slash"],[215,"multiplication sign"],[185,"superscript one"],[178,"superscript two"],[179,"superscript three"],[188,"fraction one quarter"],[189,"fraction one half"],[190,"fraction three quarters"]]},{name:"Mathematical",characters:[[402,"function / florin"],[8747,"integral"],[8721,"n-ary sumation"],[8734,"infinity"],[8730,"square root"],[8764,"similar to"],[8773,"approximately equal to"],[8776,"almost equal to"],[8800,"not equal to"],[8801,"identical to"],[8712,"element of"],[8713,"not an element of"],[8715,"contains as member"],[8719,"n-ary product"],[8743,"logical and"],[8744,"logical or"],[172,"not sign"],[8745,"intersection"],[8746,"union"],[8706,"partial differential"],[8704,"for all"],[8707,"there exists"],[8709,"diameter"],[8711,"backward difference"],[8727,"asterisk operator"],[8733,"proportional to"],[8736,"angle"]]},{name:"Extended Latin",characters:[[192,"A - grave"],[193,"A - acute"],[194,"A - circumflex"],[195,"A - tilde"],[196,"A - diaeresis"],[197,"A - ring above"],[256,"A - macron"],[198,"ligature AE"],[199,"C - cedilla"],[200,"E - grave"],[201,"E - acute"],[202,"E - circumflex"],[203,"E - diaeresis"],[274,"E - macron"],[204,"I - grave"],[205,"I - acute"],[206,"I - circumflex"],[207,"I - diaeresis"],[298,"I - macron"],[208,"ETH"],[209,"N - tilde"],[210,"O - grave"],[211,"O - acute"],[212,"O - circumflex"],[213,"O - tilde"],[214,"O - diaeresis"],[216,"O - slash"],[332,"O - macron"],[338,"ligature OE"],[352,"S - caron"],[217,"U - grave"],[218,"U - acute"],[219,"U - circumflex"],[220,"U - diaeresis"],[362,"U - macron"],[221,"Y - acute"],[376,"Y - diaeresis"],[562,"Y - macron"],[222,"THORN"],[224,"a - grave"],[225,"a - acute"],[226,"a - circumflex"],[227,"a - tilde"],[228,"a - diaeresis"],[229,"a - ring above"],[257,"a - macron"],[230,"ligature ae"],[231,"c - cedilla"],[232,"e - grave"],[233,"e - acute"],[234,"e - circumflex"],[235,"e - diaeresis"],[275,"e - macron"],[236,"i - grave"],[237,"i - acute"],[238,"i - circumflex"],[239,"i - diaeresis"],[299,"i - macron"],[240,"eth"],[241,"n - tilde"],[242,"o - grave"],[243,"o - acute"],[244,"o - circumflex"],[245,"o - tilde"],[246,"o - diaeresis"],[248,"o slash"],[333,"o macron"],[339,"ligature oe"],[353,"s - caron"],[249,"u - grave"],[250,"u - acute"],[251,"u - circumflex"],[252,"u - diaeresis"],[363,"u - macron"],[253,"y - acute"],[254,"thorn"],[255,"y - diaeresis"],[563,"y - macron"],[913,"Alpha"],[914,"Beta"],[915,"Gamma"],[916,"Delta"],[917,"Epsilon"],[918,"Zeta"],[919,"Eta"],[920,"Theta"],[921,"Iota"],[922,"Kappa"],[923,"Lambda"],[924,"Mu"],[925,"Nu"],[926,"Xi"],[927,"Omicron"],[928,"Pi"],[929,"Rho"],[931,"Sigma"],[932,"Tau"],[933,"Upsilon"],[934,"Phi"],[935,"Chi"],[936,"Psi"],[937,"Omega"],[945,"alpha"],[946,"beta"],[947,"gamma"],[948,"delta"],[949,"epsilon"],[950,"zeta"],[951,"eta"],[952,"theta"],[953,"iota"],[954,"kappa"],[955,"lambda"],[956,"mu"],[957,"nu"],[958,"xi"],[959,"omicron"],[960,"pi"],[961,"rho"],[962,"final sigma"],[963,"sigma"],[964,"tau"],[965,"upsilon"],[966,"phi"],[967,"chi"],[968,"psi"],[969,"omega"]]},{name:"Symbols",characters:[[8501,"alef symbol"],[982,"pi symbol"],[8476,"real part symbol"],[978,"upsilon - hook symbol"],[8472,"Weierstrass p"],[8465,"imaginary part"]]},{name:"Arrows",characters:[[8592,"leftwards arrow"],[8593,"upwards arrow"],[8594,"rightwards arrow"],[8595,"downwards arrow"],[8596,"left right arrow"],[8629,"carriage return"],[8656,"leftwards double arrow"],[8657,"upwards double arrow"],[8658,"rightwards double arrow"],[8659,"downwards double arrow"],[8660,"left right double arrow"],[8756,"therefore"],[8834,"subset of"],[8835,"superset of"],[8836,"not a subset of"],[8838,"subset of or equal to"],[8839,"superset of or equal to"],[8853,"circled plus"],[8855,"circled times"],[8869,"perpendicular"],[8901,"dot operator"],[8968,"left ceiling"],[8969,"right ceiling"],[8970,"left floor"],[8971,"right floor"],[9001,"left-pointing angle bracket"],[9002,"right-pointing angle bracket"],[9674,"lozenge"],[9824,"black spade suit"],[9827,"black club suit"],[9829,"black heart suit"],[9830,"black diamond suit"],[8194,"en space"],[8195,"em space"],[8201,"thin space"],[8204,"zero width non-joiner"],[8205,"zero width joiner"],[8206,"left-to-right mark"],[8207,"right-to-left mark"]]}],S=e=>k.grep(e,e=>O(e)&&2===e.length),N=e=>O(e)?S(e):"function"==typeof e?e():[],I=(e,t)=>{let r=A(e);r&&(t=[{name:T,characters:N(r)}]);let a=q(e);if(a){let e=k.grep(t,e=>e.name===T);return e.length?(e[0].characters=[...e[0].characters,...N(a)],t):t.concat({name:T,characters:N(a)})}return t},U=e=>{let t=I(e,E());return t.length>1?[{name:"All",characters:v(t,e=>e.characters)}].concat(t):t},z=e=>{let t=()=>U(e),a=t=>{r(e,t)};return{getCharMap:t,insertChar:a}},P=e=>{let t=e,r=e=>{t=e};return{get:()=>t,set:r}},D=(e,t)=>{let r=null,a=()=>{s(r)||(clearTimeout(r),r=null)},n=(...n)=>{a(),r=setTimeout(()=>{r=null,e.apply(null,n)},t)};return{cancel:a,throttle:n}},L=(e,t,r=0,a)=>{let n=e.indexOf(t,r);return -1!==n&&(!!l(a)||n+t.length<=a)},M=String.fromCodePoint,j=(e,t,r)=>!!L(M(e).toLowerCase(),r)||L(t.toLowerCase(),r)||L(t.toLowerCase().replace(/\s+/g,""),r),R=(e,t)=>{let r=[],a=t.toLowerCase();return f(e.characters,e=>{j(e[0],e[1],a)&&r.push(e)}),d(r,e=>({text:e[1],value:M(e[0]),icon:M(e[0])}))},Y="pattern",B=(e,t)=>{let a=()=>[{label:"Search",type:"input",name:Y},{type:"collection",name:"results"}],n=1===t.length?P(T):P("All"),i=(e,r)=>{b(t,e=>e.name===n.get()).each(t=>{let a=R(t,r);e.setData({results:a})})},o=D(e=>{let t=e.getData().pattern;i(e,t)},40),s=1===t.length?{type:"panel",items:a()}:{type:"tabpanel",tabs:d(t,e=>({title:e.name,name:e.name,items:a()}))},l={pattern:"",results:R(t[0],"")},c=e.windowManager.open({title:"Special Character",size:"normal",body:s,buttons:[{type:"cancel",name:"close",text:"Close",primary:!0}],initialData:l,onAction:(t,a)=>{"results"===a.name&&(r(e,a.value),t.close())},onTabChange:(e,t)=>{n.set(t.newTabName),o.throttle(e)},onChange:(e,t)=>{t.name===Y&&o.throttle(e)}});c.focus(Y)},H=(e,t)=>{e.addCommand("mceShowCharmap",()=>{B(e,t)})},_=(e,t)=>{e.ui.registry.addAutocompleter("charmap",{trigger:":",columns:"auto",minChars:2,fetch:(e,r)=>new Promise((r,a)=>{r(R(t,e))}),onAction:(t,r,a)=>{e.selection.setRng(r),e.insertContent(a),t.hide()}})},G=e=>{let t=()=>e.execCommand("mceShowCharmap");e.ui.registry.addButton("charmap",{icon:"insert-character",tooltip:"Special character",onAction:t}),e.ui.registry.addMenuItem("charmap",{icon:"insert-character",text:"Special character...",onAction:t})};e.add("charmap",e=>{x(e);let t=U(e);return H(e,t),G(e),_(e,t[0]),z(e)})}();