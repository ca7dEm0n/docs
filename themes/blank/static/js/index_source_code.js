/*
 * @Author: cA7dEm0n
 * @Blog: http://www.a-cat.cn
 * @Since: 2021-07-21 22:25:20
 * @Motto: 欲目千里，更上一层
 * @message: JS脚本
 */
const book_daxue = ['大学之道，在明明德，在亲民，在止于至善。', '知止而后有定；定而后能静；静而后能安；安而后能虑；虑而后能得。物有本末，事有终始。知所先后，则近道矣。', '古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知；致知在格物。', '物格而后知至；知至而后意诚；意诚而后心正；心正而后身修；身修而后家齐；家齐而后国治；国治而后天下平。自天子以至于庶人，壹是皆以修身为本。其本乱而末治者，否矣。其所厚者薄，而其所薄者厚，未之有也。此谓知本，此谓知之至也。', '所谓诚其意者，毋自欺也。如恶恶臭，如好好色，此之谓自谦。故君子必慎其独也。小人闲居为不善，无所不至；见君子而后厌然，揜其不善而著其善。人之视己，如见其肺肝然，则何益矣？此谓诚于中，形于外。故君子必慎其独也。曾子曰：“十目所视，十手所指，其严乎！”富润屋，德润身，心广体胖。故君子必诚其意。', '《诗》云：“瞻彼淇澳，菉竹猗猗。有斐君子，如切如磋，如琢如磨。瑟兮僴兮，赫兮喧兮。有斐君子，终不可喧兮。”如切如磋者，道学也；如琢如磨者，自修也；瑟兮僴兮者，恂慄也；赫兮喧兮者，威仪也；有斐君子，终不可喧兮者，道盛德至善，民之不能忘也。', '《诗》云：“於戏，前王不忘！”君子贤其贤而亲其亲，小人乐其乐而利其利，此以没世不忘也。《康诰》曰：“克明德。”《大甲》曰：“顾諟天之明命。”《帝典》曰：“克明峻德。”皆自明也。', '汤之盘铭曰：“苟日新，日日新，又日新。”《康诰》曰：“作新民。”《诗》曰：“周虽旧邦，其命维新。”是故君子无所不用其极。', '《诗》云：“邦畿千里，惟民所止。”《诗》云：“缗蛮黄鸟，止于丘隅。”子曰：“于止，知其所止，可以人而不如鸟乎？”《诗》云：“穆穆文王，於缉熙敬止。”为人君，止于仁；为人臣，止于敬；为人子，止于孝；为人父，止于慈；与国人交，止于信。子曰：“听讼，吾犹人也。必也使无讼乎！”无情者，不得尽其辞，大畏民志。此谓知本。', '谓修身在正其心者：身有所忿懥，则不得其正；有所恐惧，则不得其正。有所好乐，则不得其正。有所忧患，则不得其正。心不在焉，视而不见，听而不闻，食而不知其味。此谓修身在正其心。', '所谓齐其家在修其身者：人之其所亲爱而辟焉，之其所贱恶而辟焉，之其所畏敬而辟焉，之其所哀矜而辟焉，之其所敖惰而辟焉。故好而知其恶，恶而知其美者，天下鲜矣。故谚有之曰：“人莫知其子之恶，莫知其苗之硕。”此谓身不修，不可以齐其家。', '所谓治国必先齐其家者，其家不可教，而能教人者，无之。故君子不出家，而成教于国。孝者，所以事君也；弟者，所以事长也；慈者，所以使众也。《康诰》曰：“如保赤子”，心诚求之，虽不中，不远矣。未有学养子而后嫁者也。一家仁，一国兴仁；一家让，一国兴让；一人贪戾，一国作乱。其机如此，此谓一言偾事，一人定国。', '尧舜率天下以仁，而民从之；桀纣率天下以暴，而民从之。其所令反其所好，而民不从。是故君子有诸己而后求诸人，无诸己而后非诸人。所藏乎身不恕，而能喻诸人者，未之有也。故治国在齐其家。', '《诗》云：“桃之夭夭，其叶蓁蓁。之子于归，宜其家人。”宜其家人，而后可以教国人。《诗》云：“宜兄宜弟。”宜兄宜弟，而后可以教国人。《诗》云：“其仪不忒，正是四国。”其为父子兄弟足法，而后民法之也。此谓治国在齐其家。', '所谓平天下在治其国者，上老老而民兴孝；上长长而民兴悌；上恤孤而民不倍；是以君子有絜矩之道也。所恶于上，毋以使下；所恶于下，毋以事上；所恶于前，毋以先后；所恶于后，毋以从前；所恶于右，毋以交左；所恶于左，毋以交于右：此之谓絜矩之道。', '《诗》云：“乐只君子，民之父母”。民之所好好之，民之所恶恶之，此之谓民之父母。诗云：“节彼南山，维石岩岩；赫赫师尹，民具尔瞻。”有国者不可以不慎，辟，则为天下僇矣！', '《诗》云：“殷之未丧师，克配上帝；仪监于殷，峻命不易。”道得众则得国；失众则失国。是故君子先慎乎德：有德此有人，有人此有土，有土此有财，有财此有用。德者，本也；财者，末也。外本内末，争民施夺。是故财聚则民散，财散则民聚。是故言悖而出者，亦悖而入；货悖而入者，亦悖而出。', '《康诰》曰：“惟命不于常。”道善则得之，不善则失之矣。《楚书》曰：“楚国无以为宝，惟善以为宝。”舅犯曰：“亡人无以为宝，仁亲以为宝。”《秦誓》曰：“若有一介臣，断断兮，无他技；其心休休焉，其如有容焉。人之有技，若己有之；人之彦圣，其心好之；不啻若自其口出，寔能容之，以能保我子孙黎民，尚亦有利哉。人之有技，媢疾以恶之；人之彦圣，而违之俾不通；寔不能容，以不能保我子孙黎民，亦曰殆哉。”', '唯仁人放流之，迸诸四夷，不与同中国。此谓惟仁人为能爱人，能恶人。见贤而不能举，举而不能先，命也；见不善而不能退，退而不能远，过也。好人之所恶，恶人之所好，是谓拂人之性，菑必逮夫身。是故君子有大道，必忠信以得之，骄泰以失之。', '生财有大道：生之者众，食之者寡；为之者疾，用之者舒；则财恒足矣。仁者以财发身，不仁者以身发财。未有上好仁，而下不好义者也；未有好义，其事不终者也；未有府库财，非其财者也。孟献子曰：“畜马乘，不察于鸡豚；伐冰之家，不畜牛羊；百乘之家，不畜聚敛之臣；与其有聚敛之臣，宁有盗臣。”此谓国不以利为利，以义为利也。长国家而务财用者，必自小人矣；彼为善之。小人之使为国家，菑害并至，虽有善者，亦无如之何矣。此谓国不以利为利，以义为利也。']

const book_yinfujin = ['观天之道，执天之行，尽矣。', '故天有五贼，见之者昌。', '五贼在心，施行于天。', '宇宙在乎手，万化生乎身。', '天性人也，人心机也。立天之道，以定人也。', '天发杀机，移星易宿；地发杀机，龙蛇起陆；人发杀机，天地反覆；天人合发，万化定基。', '性有巧拙，可以伏藏。九窍之邪，在乎三要，可以动静。', '火生于木，祸发必克；奸生于国，时动必溃。知之修炼，谓之圣人。', '天生天杀，道之理也。天地万物之盗，万物人之盗，人万物之盗。三盗既宜，三才既安。', '故曰食其时，百骸理；动其机，万化安。人知其神之神，不知不神之所以神也。', '日月有数，大小有定，圣功生焉，神明出焉。', '其盗机也，天下莫能见，莫能知。君子得之固躬，小人得之轻命。', '瞽者善听，聋者善视。绝利一源，用师十倍。三返昼夜，用师万倍。', '心生于物，死于物，机在目。', '天之无恩而大恩生。迅雷烈风莫不蠢然。', '至乐性余，至静性廉。天之至私，用之至公。', '禽之制在气。生者死之根，死者生之根。恩生于害，害生于恩。', '愚人以天地文理圣，我以时物文理哲。', '人以愚虞圣，我以不愚虞圣；人以期其圣，我以不期其圣。故曰：沉水入火，自取灭亡。', '自然之道静，故天地万物生。天地之道浸，故阴阳胜。阴阳相推而变化顺矣。', '是故圣人知自然之道不可违，因而制之至静之道，律历所不能契。', '爰有奇器，是生万象，八卦甲子，神机鬼藏。阴阳相胜之术，昭昭乎进乎象矣。']

var LZString = function () { function o(o, r) { if (!t[o]) { t[o] = {}; for (var n = 0; n < o.length; n++)t[o][o.charAt(n)] = n } return t[o][r] } var r = String.fromCharCode, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = { compressToBase64: function (o) { if (null == o) return ""; var r = i._compress(o, 6, function (o) { return n.charAt(o) }); switch (r.length % 4) { default: case 0: return r; case 1: return r + "==="; case 2: return r + "=="; case 3: return r + "=" } }, decompressFromBase64: function (r) { return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) { return o(n, r.charAt(e)) }) }, compressToUTF16: function (o) { return null == o ? "" : i._compress(o, 15, function (o) { return r(o + 32) }) + " " }, decompressFromUTF16: function (o) { return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) { return o.charCodeAt(r) - 32 }) }, compressToUint8Array: function (o) { for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) { var s = r.charCodeAt(e); n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256 } return n }, decompressFromUint8Array: function (o) { if (null === o || void 0 === o) return i.decompress(o); for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++)n[e] = 256 * o[2 * e] + o[2 * e + 1]; var s = []; return n.forEach(function (o) { s.push(r(o)) }), i.decompress(s.join("")) }, compressToEncodedURIComponent: function (o) { return null == o ? "" : i._compress(o, 6, function (o) { return e.charAt(o) }) }, decompressFromEncodedURIComponent: function (r) { return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) { return o(e, r.charAt(n)) })) }, compress: function (o) { return i._compress(o, 16, function (o) { return r(o) }) }, _compress: function (o, r, n) { if (null == o) return ""; var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [], m = 0, v = 0; for (i = 0; i < o.length; i += 1)if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c; else { if (Object.prototype.hasOwnProperty.call(p, a)) { if (a.charCodeAt(0) < 256) { for (e = 0; h > e; e++)m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++; for (t = a.charCodeAt(0), e = 0; 8 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } else { for (t = 1, e = 0; h > e; e++)m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0; for (t = a.charCodeAt(0), e = 0; 16 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a] } else for (t = s[a], e = 0; h > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u) } if ("" !== a) { if (Object.prototype.hasOwnProperty.call(p, a)) { if (a.charCodeAt(0) < 256) { for (e = 0; h > e; e++)m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++; for (t = a.charCodeAt(0), e = 0; 8 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } else { for (t = 1, e = 0; h > e; e++)m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0; for (t = a.charCodeAt(0), e = 0; 16 > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1 } l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a] } else for (t = s[a], e = 0; h > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; l--, 0 == l && (l = Math.pow(2, h), h++) } for (t = 2, e = 0; h > e; e++)m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; for (; ;) { if (m <<= 1, v == r - 1) { d.push(n(m)); break } v++ } return d.join("") }, decompress: function (o) { return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) { return o.charCodeAt(r) }) }, _decompress: function (o, n, e) { var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [], A = { val: e(0), position: n, index: 1 }; for (i = 0; 3 > i; i += 1)f[i] = i; for (p = 0, c = Math.pow(2, 2), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; switch (t = p) { case 0: for (p = 0, c = Math.pow(2, 8), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; l = r(p); break; case 1: for (p = 0, c = Math.pow(2, 16), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; l = r(p); break; case 2: return "" }for (f[3] = l, s = l, w.push(l); ;) { if (A.index > o) return ""; for (p = 0, c = Math.pow(2, m), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; switch (l = p) { case 0: for (p = 0, c = Math.pow(2, 8), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; f[d++] = r(p), l = d - 1, h--; break; case 1: for (p = 0, c = Math.pow(2, 16), a = 1; a != c;)u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; f[d++] = r(p), l = d - 1, h--; break; case 2: return w.join("") }if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l]; else { if (l !== d) return null; v = s + s.charAt(0) } w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++) } } }; return i }(); "function" == typeof define && define.amd ? define(function () { return LZString }) : "undefined" != typeof module && null != module && (module.exports = LZString);


function changeMode(dom, model) {
    /**
     * @description: 变换形态
     */
    let dom_ = document.getElementsByTagName(dom)[0];
    dom_.setAttribute("class", model);
}

function setVisibilityByTag(name, value) {
    /**
     * @description: 设置是否可见
     */   
    let obj_ = document.getElementsByTagName(name);
    for (var i = 0; i < obj_.length; i++) {
        obj_[i].style.visibility = value;
        if (value == "hidden") {
            obj_[i].style.height = 0;
        } else {
            obj_[i].style.height = "100%";
        }
    }
}

function setVisibilityByID(id_, value) {
    /**
     * @description: 设置是否可见
     */    
    let obj_ = document.getElementById(id_);
    obj_.style.visibility = value;
    if (value == "hidden") {
        obj_.style.height = 0;
    } else {
        obj_.style.height = "100%";
    }
}

// function domRemoveByTag(name) {
//     /**
//      * @description: 删除
//      */
//     document.getElementsByTagName(name)[0].remove();
// }

function change(mode) {
    if (mode == "taiji") {
        setVisibilityByTag("header",  "hidden");
        setVisibilityByTag("aside",  "hidden");
        setVisibilityByTag("footer",  "hidden");
        setVisibilityByID("blog-content", "hidden");

        document.getElementsByTagName("body")[0].style.backgroundColor = "#111";
        changeMode("main", "taiji-mode");
        
        // 显示
        setVisibilityByID("onetalk-content", "visible");
    } else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
        setVisibilityByID("onetalk-content", "hidden");
        changeMode("main", "blog-mode");
        setVisibilityByTag("header",  "visible");
        setVisibilityByTag("aside",  "visible");
        setVisibilityByTag("footer",  "visible");
        setVisibilityByID("blog-content", "visible");
    }
}


function domRemoveByID(name) {
    /**
     * @description: 删除
     */
    document.getElementById(name).remove();
}

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^#________一説曰如';
        this.update = this.update.bind(this);
    };

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise
    };

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    };

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    };
}


const phrases = book_yinfujin;

// 加载<<大学>>
phrases.concat(book_daxue);


setTimeout(
    () => {
        const fx = new TextScramble(
            document.querySelector('#one-talk-text')
        );
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(
                    next, 0.1 * 1000 * phrases[counter].length
                )
            });
            counter = (counter + 1) % phrases.length;
            let url_ =  window.location.href;
            let main_mode = document.getElementsByTagName("main")[0].className;
            let is_blog   =  url_.indexOf("#blog") >= 0 ;
            if (is_blog && main_mode != "blog-mode") {
                change('blog');
            }else if (!is_blog && main_mode != "taiji-mode") {
                change('taiji');
            };
        };
        next();
    }, 300
)
