(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./node_modules/uslug/lib/N.js":
/*!*************************************!*\
  !*** ./node_modules/uslug/lib/N.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * List of Unicode code that are flagged as number.
 *
 * Contains Unicode code of:
 * - Nd = Number, decimal digit
 * - Nl = Number, letter
 * - No = Number, other
 *
 * This list has been computed from http://unicode.org/Public/UNIDATA/UnicodeData.txt
 * curl -s http://unicode.org/Public/UNIDATA/UnicodeData.txt | grep -E ';Nd;|;Nl;|;No;' | cut -d \; -f 1 | xargs -I{} printf '%d, ' 0x{}
 *
 */
exports.N = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 178, 179, 185, 188, 189, 190, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541, 2542, 2543, 2548, 2549, 2550, 2551, 2552, 2553, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2918, 2919, 2920, 2921, 2922, 2923, 2924, 2925, 2926, 2927, 2930, 2931, 2932, 2933, 2934, 2935, 3046, 3047, 3048, 3049, 3050, 3051, 3052, 3053, 3054, 3055, 3056, 3057, 3058, 3174, 3175, 3176, 3177, 3178, 3179, 3180, 3181, 3182, 3183, 3192, 3193, 3194, 3195, 3196, 3197, 3198, 3302, 3303, 3304, 3305, 3306, 3307, 3308, 3309, 3310, 3311, 3430, 3431, 3432, 3433, 3434, 3435, 3436, 3437, 3438, 3439, 3440, 3441, 3442, 3443, 3444, 3445, 3558, 3559, 3560, 3561, 3562, 3563, 3564, 3565, 3566, 3567, 3664, 3665, 3666, 3667, 3668, 3669, 3670, 3671, 3672, 3673, 3792, 3793, 3794, 3795, 3796, 3797, 3798, 3799, 3800, 3801, 3872, 3873, 3874, 3875, 3876, 3877, 3878, 3879, 3880, 3881, 3882, 3883, 3884, 3885, 3886, 3887, 3888, 3889, 3890, 3891, 4160, 4161, 4162, 4163, 4164, 4165, 4166, 4167, 4168, 4169, 4240, 4241, 4242, 4243, 4244, 4245, 4246, 4247, 4248, 4249, 4969, 4970, 4971, 4972, 4973, 4974, 4975, 4976, 4977, 4978, 4979, 4980, 4981, 4982, 4983, 4984, 4985, 4986, 4987, 4988, 5870, 5871, 5872, 6112, 6113, 6114, 6115, 6116, 6117, 6118, 6119, 6120, 6121, 6128, 6129, 6130, 6131, 6132, 6133, 6134, 6135, 6136, 6137, 6160, 6161, 6162, 6163, 6164, 6165, 6166, 6167, 6168, 6169, 6470, 6471, 6472, 6473, 6474, 6475, 6476, 6477, 6478, 6479, 6608, 6609, 6610, 6611, 6612, 6613, 6614, 6615, 6616, 6617, 6618, 6784, 6785, 6786, 6787, 6788, 6789, 6790, 6791, 6792, 6793, 6800, 6801, 6802, 6803, 6804, 6805, 6806, 6807, 6808, 6809, 6992, 6993, 6994, 6995, 6996, 6997, 6998, 6999, 7000, 7001, 7088, 7089, 7090, 7091, 7092, 7093, 7094, 7095, 7096, 7097, 7232, 7233, 7234, 7235, 7236, 7237, 7238, 7239, 7240, 7241, 7248, 7249, 7250, 7251, 7252, 7253, 7254, 7255, 7256, 7257, 8304, 8308, 8309, 8310, 8311, 8312, 8313, 8320, 8321, 8322, 8323, 8324, 8325, 8326, 8327, 8328, 8329, 8528, 8529, 8530, 8531, 8532, 8533, 8534, 8535, 8536, 8537, 8538, 8539, 8540, 8541, 8542, 8543, 8544, 8545, 8546, 8547, 8548, 8549, 8550, 8551, 8552, 8553, 8554, 8555, 8556, 8557, 8558, 8559, 8560, 8561, 8562, 8563, 8564, 8565, 8566, 8567, 8568, 8569, 8570, 8571, 8572, 8573, 8574, 8575, 8576, 8577, 8578, 8581, 8582, 8583, 8584, 8585, 9312, 9313, 9314, 9315, 9316, 9317, 9318, 9319, 9320, 9321, 9322, 9323, 9324, 9325, 9326, 9327, 9328, 9329, 9330, 9331, 9332, 9333, 9334, 9335, 9336, 9337, 9338, 9339, 9340, 9341, 9342, 9343, 9344, 9345, 9346, 9347, 9348, 9349, 9350, 9351, 9352, 9353, 9354, 9355, 9356, 9357, 9358, 9359, 9360, 9361, 9362, 9363, 9364, 9365, 9366, 9367, 9368, 9369, 9370, 9371, 9450, 9451, 9452, 9453, 9454, 9455, 9456, 9457, 9458, 9459, 9460, 9461, 9462, 9463, 9464, 9465, 9466, 9467, 9468, 9469, 9470, 9471, 10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10111, 10112, 10113, 10114, 10115, 10116, 10117, 10118, 10119, 10120, 10121, 10122, 10123, 10124, 10125, 10126, 10127, 10128, 10129, 10130, 10131, 11517, 12295, 12321, 12322, 12323, 12324, 12325, 12326, 12327, 12328, 12329, 12344, 12345, 12346, 12690, 12691, 12692, 12693, 12832, 12833, 12834, 12835, 12836, 12837, 12838, 12839, 12840, 12841, 12872, 12873, 12874, 12875, 12876, 12877, 12878, 12879, 12881, 12882, 12883, 12884, 12885, 12886, 12887, 12888, 12889, 12890, 12891, 12892, 12893, 12894, 12895, 12928, 12929, 12930, 12931, 12932, 12933, 12934, 12935, 12936, 12937, 12977, 12978, 12979, 12980, 12981, 12982, 12983, 12984, 12985, 12986, 12987, 12988, 12989, 12990, 12991, 42528, 42529, 42530, 42531, 42532, 42533, 42534, 42535, 42536, 42537, 42726, 42727, 42728, 42729, 42730, 42731, 42732, 42733, 42734, 42735, 43056, 43057, 43058, 43059, 43060, 43061, 43216, 43217, 43218, 43219, 43220, 43221, 43222, 43223, 43224, 43225, 43264, 43265, 43266, 43267, 43268, 43269, 43270, 43271, 43272, 43273, 43472, 43473, 43474, 43475, 43476, 43477, 43478, 43479, 43480, 43481, 43504, 43505, 43506, 43507, 43508, 43509, 43510, 43511, 43512, 43513, 43600, 43601, 43602, 43603, 43604, 43605, 43606, 43607, 43608, 43609, 44016, 44017, 44018, 44019, 44020, 44021, 44022, 44023, 44024, 44025, 65296, 65297, 65298, 65299, 65300, 65301, 65302, 65303, 65304, 65305, 65799, 65800, 65801, 65802, 65803, 65804, 65805, 65806, 65807, 65808, 65809, 65810, 65811, 65812, 65813, 65814, 65815, 65816, 65817, 65818, 65819, 65820, 65821, 65822, 65823, 65824, 65825, 65826, 65827, 65828, 65829, 65830, 65831, 65832, 65833, 65834, 65835, 65836, 65837, 65838, 65839, 65840, 65841, 65842, 65843, 65856, 65857, 65858, 65859, 65860, 65861, 65862, 65863, 65864, 65865, 65866, 65867, 65868, 65869, 65870, 65871, 65872, 65873, 65874, 65875, 65876, 65877, 65878, 65879, 65880, 65881, 65882, 65883, 65884, 65885, 65886, 65887, 65888, 65889, 65890, 65891, 65892, 65893, 65894, 65895, 65896, 65897, 65898, 65899, 65900, 65901, 65902, 65903, 65904, 65905, 65906, 65907, 65908, 65909, 65910, 65911, 65912, 65930, 65931, 66273, 66274, 66275, 66276, 66277, 66278, 66279, 66280, 66281, 66282, 66283, 66284, 66285, 66286, 66287, 66288, 66289, 66290, 66291, 66292, 66293, 66294, 66295, 66296, 66297, 66298, 66299, 66336, 66337, 66338, 66339, 66369, 66378, 66513, 66514, 66515, 66516, 66517, 66720, 66721, 66722, 66723, 66724, 66725, 66726, 66727, 66728, 66729, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67705, 67706, 67707, 67708, 67709, 67710, 67711, 67751, 67752, 67753, 67754, 67755, 67756, 67757, 67758, 67759, 67835, 67836, 67837, 67838, 67839, 67862, 67863, 67864, 67865, 67866, 67867, 68028, 68029, 68032, 68033, 68034, 68035, 68036, 68037, 68038, 68039, 68040, 68041, 68042, 68043, 68044, 68045, 68046, 68047, 68050, 68051, 68052, 68053, 68054, 68055, 68056, 68057, 68058, 68059, 68060, 68061, 68062, 68063, 68064, 68065, 68066, 68067, 68068, 68069, 68070, 68071, 68072, 68073, 68074, 68075, 68076, 68077, 68078, 68079, 68080, 68081, 68082, 68083, 68084, 68085, 68086, 68087, 68088, 68089, 68090, 68091, 68092, 68093, 68094, 68095, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68221, 68222, 68253, 68254, 68255, 68331, 68332, 68333, 68334, 68335, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68521, 68522, 68523, 68524, 68525, 68526, 68527, 68858, 68859, 68860, 68861, 68862, 68863, 69216, 69217, 69218, 69219, 69220, 69221, 69222, 69223, 69224, 69225, 69226, 69227, 69228, 69229, 69230, 69231, 69232, 69233, 69234, 69235, 69236, 69237, 69238, 69239, 69240, 69241, 69242, 69243, 69244, 69245, 69246, 69714, 69715, 69716, 69717, 69718, 69719, 69720, 69721, 69722, 69723, 69724, 69725, 69726, 69727, 69728, 69729, 69730, 69731, 69732, 69733, 69734, 69735, 69736, 69737, 69738, 69739, 69740, 69741, 69742, 69743, 69872, 69873, 69874, 69875, 69876, 69877, 69878, 69879, 69880, 69881, 69942, 69943, 69944, 69945, 69946, 69947, 69948, 69949, 69950, 69951, 70096, 70097, 70098, 70099, 70100, 70101, 70102, 70103, 70104, 70105, 70113, 70114, 70115, 70116, 70117, 70118, 70119, 70120, 70121, 70122, 70123, 70124, 70125, 70126, 70127, 70128, 70129, 70130, 70131, 70132, 70384, 70385, 70386, 70387, 70388, 70389, 70390, 70391, 70392, 70393, 70864, 70865, 70866, 70867, 70868, 70869, 70870, 70871, 70872, 70873, 71248, 71249, 71250, 71251, 71252, 71253, 71254, 71255, 71256, 71257, 71360, 71361, 71362, 71363, 71364, 71365, 71366, 71367, 71368, 71369, 71472, 71473, 71474, 71475, 71476, 71477, 71478, 71479, 71480, 71481, 71482, 71483, 71904, 71905, 71906, 71907, 71908, 71909, 71910, 71911, 71912, 71913, 71914, 71915, 71916, 71917, 71918, 71919, 71920, 71921, 71922, 74752, 74753, 74754, 74755, 74756, 74757, 74758, 74759, 74760, 74761, 74762, 74763, 74764, 74765, 74766, 74767, 74768, 74769, 74770, 74771, 74772, 74773, 74774, 74775, 74776, 74777, 74778, 74779, 74780, 74781, 74782, 74783, 74784, 74785, 74786, 74787, 74788, 74789, 74790, 74791, 74792, 74793, 74794, 74795, 74796, 74797, 74798, 74799, 74800, 74801, 74802, 74803, 74804, 74805, 74806, 74807, 74808, 74809, 74810, 74811, 74812, 74813, 74814, 74815, 74816, 74817, 74818, 74819, 74820, 74821, 74822, 74823, 74824, 74825, 74826, 74827, 74828, 74829, 74830, 74831, 74832, 74833, 74834, 74835, 74836, 74837, 74838, 74839, 74840, 74841, 74842, 74843, 74844, 74845, 74846, 74847, 74848, 74849, 74850, 74851, 74852, 74853, 74854, 74855, 74856, 74857, 74858, 74859, 74860, 74861, 74862, 92768, 92769, 92770, 92771, 92772, 92773, 92774, 92775, 92776, 92777, 93008, 93009, 93010, 93011, 93012, 93013, 93014, 93015, 93016, 93017, 93019, 93020, 93021, 93022, 93023, 93024, 93025, 119648, 119649, 119650, 119651, 119652, 119653, 119654, 119655, 119656, 119657, 119658, 119659, 119660, 119661, 119662, 119663, 119664, 119665, 120782, 120783, 120784, 120785, 120786, 120787, 120788, 120789, 120790, 120791, 120792, 120793, 120794, 120795, 120796, 120797, 120798, 120799, 120800, 120801, 120802, 120803, 120804, 120805, 120806, 120807, 120808, 120809, 120810, 120811, 120812, 120813, 120814, 120815, 120816, 120817, 120818, 120819, 120820, 120821, 120822, 120823, 120824, 120825, 120826, 120827, 120828, 120829, 120830, 120831, 125127, 125128, 125129, 125130, 125131, 125132, 125133, 125134, 125135, 127232, 127233, 127234, 127235, 127236, 127237, 127238, 127239, 127240, 127241, 127242, 127243, 127244];


/***/ }),

/***/ "./node_modules/uslug/lib/Z.js":
/*!*************************************!*\
  !*** ./node_modules/uslug/lib/Z.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * List of Unicode code that are flagged as separator.
 *
 * Contains Unicode code of:
 * - Zs = Separator, space
 * - Zl = Separator, line
 * - Zp = Separator, paragraph
 *
 * This list has been computed from http://unicode.org/Public/UNIDATA/UnicodeData.txt
 * curl -s http://unicode.org/Public/UNIDATA/UnicodeData.txt | grep -E ';Zs;|;Zl;|;Zp;' | cut -d \; -f 1 | xargs -I{} printf '%d, ' 0x{}
 *
 */
exports.Z = [32, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288];


/***/ }),

/***/ "./node_modules/uslug/lib/uslug.js":
/*!*****************************************!*\
  !*** ./node_modules/uslug/lib/uslug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var L = __webpack_require__(/*! ./L */ "./node_modules/uslug/lib/L.js").L,
      N = __webpack_require__(/*! ./N */ "./node_modules/uslug/lib/N.js").N,
      Z = __webpack_require__(/*! ./Z */ "./node_modules/uslug/lib/Z.js").Z,
      M = __webpack_require__(/*! ./M */ "./node_modules/uslug/lib/M.js").M,
      unorm = __webpack_require__(/*! unorm */ "./node_modules/unorm/lib/unorm.js");

  var _unicodeCategory = function(code) {
    if (~L.indexOf(code)) return 'L';
    if (~N.indexOf(code)) return 'N';
    if (~Z.indexOf(code)) return 'Z';
    if (~M.indexOf(code)) return 'M';
    return undefined;
  };

  module.exports = function(string, options) {
    string = string || '';
    options = options || {};
    var allowedChars = options.allowedChars || '-_~';
    var lower = typeof options.lower === 'boolean' ? options.lower : true;
    var spaces = typeof options.spaces === 'boolean' ? options.spaces : false;
    var rv = [];
    var chars = unorm.nfkc(string);
    for(var i = 0; i < chars.length; i++) {
      var c = chars[i];
      var code = c.charCodeAt(0);
      // Allow Common CJK Unified Ideographs
      // See: http://www.unicode.org/versions/Unicode6.0.0/ch12.pdf - Table 12-2 
      if (0x4E00 <= code && code <= 0x9FFF) {
        rv.push(c);
        continue;
      }

      // Allow Hangul
      if (0xAC00 <= code && code <= 0xD7A3) {
        rv.push(c);
        continue;
      }

      // Japanese ideographic punctuation
      if ((0x3000 <= code && code <= 0x3002) || (0xFF01 <= code && code <= 0xFF02)) {
        rv.push(' ');
      }

      if (allowedChars.indexOf(c) != -1) {
        rv.push(c);
        continue;
      }
      var val = _unicodeCategory(code);
      if (val && ~'LNM'.indexOf(val)) rv.push(c);
      if (val && ~'Z'.indexOf(val)) rv.push(' ');
    }
    var slug = rv.join('').replace(/^\s+|\s+$/g, '').replace(/\s+/g,' ');
    if (!spaces) slug = slug.replace(/[\s\-]+/g,'-');
    if (lower) slug = slug.toLowerCase();
    return slug;
  };
}());

/***/ }),

/***/ "./node_modules/vue-markdown/dist/vue-markdown.common.js":
/*!***************************************************************!*\
  !*** ./node_modules/vue-markdown/dist/vue-markdown.common.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * vue-markdown v2.2.4
 * https://github.com/miaolz123/vue-markdown
 * MIT License
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(/*! babel-runtime/core-js/get-iterator */ "./node_modules/babel-runtime/core-js/get-iterator.js"), __webpack_require__(/*! babel-runtime/core-js/object/keys */ "./node_modules/babel-runtime/core-js/object/keys.js"), __webpack_require__(/*! markdown-it */ "./node_modules/markdown-it/index.js"), __webpack_require__(/*! markdown-it-emoji */ "./node_modules/markdown-it-emoji/index.js"), __webpack_require__(/*! markdown-it-sub */ "./node_modules/markdown-it-sub/index.js"), __webpack_require__(/*! markdown-it-sup */ "./node_modules/markdown-it-sup/index.js"), __webpack_require__(/*! markdown-it-footnote */ "./node_modules/markdown-it-footnote/index.js"), __webpack_require__(/*! markdown-it-deflist */ "./node_modules/markdown-it-deflist/index.js"), __webpack_require__(/*! markdown-it-abbr */ "./node_modules/markdown-it-abbr/index.js"), __webpack_require__(/*! markdown-it-ins */ "./node_modules/markdown-it-ins/index.js"), __webpack_require__(/*! markdown-it-mark */ "./node_modules/markdown-it-mark/index.js"), __webpack_require__(/*! markdown-it-toc-and-anchor */ "./node_modules/markdown-it-toc-and-anchor/dist/index.js"), __webpack_require__(/*! markdown-it-katex */ "./node_modules/markdown-it-katex/index.js"), __webpack_require__(/*! markdown-it-task-lists */ "./node_modules/markdown-it-task-lists/index.js"));
	else {}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(1);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(2);

	var _keys2 = _interopRequireDefault(_keys);

	var _markdownIt = __webpack_require__(3);

	var _markdownIt2 = _interopRequireDefault(_markdownIt);

	var _markdownItEmoji = __webpack_require__(4);

	var _markdownItEmoji2 = _interopRequireDefault(_markdownItEmoji);

	var _markdownItSub = __webpack_require__(5);

	var _markdownItSub2 = _interopRequireDefault(_markdownItSub);

	var _markdownItSup = __webpack_require__(6);

	var _markdownItSup2 = _interopRequireDefault(_markdownItSup);

	var _markdownItFootnote = __webpack_require__(7);

	var _markdownItFootnote2 = _interopRequireDefault(_markdownItFootnote);

	var _markdownItDeflist = __webpack_require__(8);

	var _markdownItDeflist2 = _interopRequireDefault(_markdownItDeflist);

	var _markdownItAbbr = __webpack_require__(9);

	var _markdownItAbbr2 = _interopRequireDefault(_markdownItAbbr);

	var _markdownItIns = __webpack_require__(10);

	var _markdownItIns2 = _interopRequireDefault(_markdownItIns);

	var _markdownItMark = __webpack_require__(11);

	var _markdownItMark2 = _interopRequireDefault(_markdownItMark);

	var _markdownItTocAndAnchor = __webpack_require__(12);

	var _markdownItTocAndAnchor2 = _interopRequireDefault(_markdownItTocAndAnchor);

	var _markdownItKatex = __webpack_require__(13);

	var _markdownItKatex2 = _interopRequireDefault(_markdownItKatex);

	var _markdownItTaskLists = __webpack_require__(14);

	var _markdownItTaskLists2 = _interopRequireDefault(_markdownItTaskLists);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  md: new _markdownIt2.default(),

	  template: '<div><slot></slot></div>',

	  data: function data() {
	    return {
	      sourceData: this.source
	    };
	  },


	  props: {
	    watches: {
	      type: Array,
	      default: function _default() {
	        return ['source', 'show', 'toc'];
	      }
	    },
	    source: {
	      type: String,
	      default: ''
	    },
	    show: {
	      type: Boolean,
	      default: true
	    },
	    highlight: {
	      type: Boolean,
	      default: true
	    },
	    html: {
	      type: Boolean,
	      default: true
	    },
	    xhtmlOut: {
	      type: Boolean,
	      default: true
	    },
	    breaks: {
	      type: Boolean,
	      default: true
	    },
	    linkify: {
	      type: Boolean,
	      default: true
	    },
	    emoji: {
	      type: Boolean,
	      default: true
	    },
	    typographer: {
	      type: Boolean,
	      default: true
	    },
	    langPrefix: {
	      type: String,
	      default: 'language-'
	    },
	    quotes: {
	      type: String,
	      default: '“”‘’'
	    },
	    tableClass: {
	      type: String,
	      default: 'table'
	    },
	    taskLists: {
	      type: Boolean,
	      default: true
	    },
	    toc: {
	      type: Boolean,
	      default: false
	    },
	    tocId: {
	      type: String
	    },
	    tocClass: {
	      type: String,
	      default: 'table-of-contents'
	    },
	    tocFirstLevel: {
	      type: Number,
	      default: 2
	    },
	    tocLastLevel: {
	      type: Number
	    },
	    tocAnchorLink: {
	      type: Boolean,
	      default: true
	    },
	    tocAnchorClass: {
	      type: String,
	      default: 'toc-anchor'
	    },
	    tocAnchorLinkSymbol: {
	      type: String,
	      default: '#'
	    },
	    tocAnchorLinkSpace: {
	      type: Boolean,
	      default: true
	    },
	    tocAnchorLinkClass: {
	      type: String,
	      default: 'toc-anchor-link'
	    },
	    anchorAttributes: {
	      type: Object,
	      default: function _default() {
	        return {};
	      }
	    },
	    prerender: {
	      type: Function,
	      default: function _default(sourceData) {
	        return sourceData;
	      }
	    },
	    postrender: {
	      type: Function,
	      default: function _default(htmlData) {
	        return htmlData;
	      }
	    }
	  },

	  computed: {
	    tocLastLevelComputed: function tocLastLevelComputed() {
	      return this.tocLastLevel > this.tocFirstLevel ? this.tocLastLevel : this.tocFirstLevel + 1;
	    }
	  },

	  render: function render(createElement) {
	    var _this = this;

	    this.md = new _markdownIt2.default().use(_markdownItSub2.default).use(_markdownItSup2.default).use(_markdownItFootnote2.default).use(_markdownItDeflist2.default).use(_markdownItAbbr2.default).use(_markdownItIns2.default).use(_markdownItMark2.default).use(_markdownItKatex2.default, { "throwOnError": false, "errorColor": " #cc0000" }).use(_markdownItTaskLists2.default, { enabled: this.taskLists });

	    if (this.emoji) {
	      this.md.use(_markdownItEmoji2.default);
	    }

	    this.md.set({
	      html: this.html,
	      xhtmlOut: this.xhtmlOut,
	      breaks: this.breaks,
	      linkify: this.linkify,
	      typographer: this.typographer,
	      langPrefix: this.langPrefix,
	      quotes: this.quotes
	    });
	    this.md.renderer.rules.table_open = function () {
	      return '<table class="' + _this.tableClass + '">\n';
	    };
	    var defaultLinkRenderer = this.md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
	      return self.renderToken(tokens, idx, options);
	    };
	    this.md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	      (0, _keys2.default)(_this.anchorAttributes).map(function (attribute) {
	        var aIndex = tokens[idx].attrIndex(attribute);
	        var value = _this.anchorAttributes[attribute];
	        if (aIndex < 0) {
	          tokens[idx].attrPush([attribute, value]); // add new attribute
	        } else {
	          tokens[idx].attrs[aIndex][1] = value;
	        }
	      });
	      return defaultLinkRenderer(tokens, idx, options, env, self);
	    };

	    if (this.toc) {
	      this.md.use(_markdownItTocAndAnchor2.default, {
	        tocClassName: this.tocClass,
	        tocFirstLevel: this.tocFirstLevel,
	        tocLastLevel: this.tocLastLevelComputed,
	        anchorLink: this.tocAnchorLink,
	        anchorLinkSymbol: this.tocAnchorLinkSymbol,
	        anchorLinkSpace: this.tocAnchorLinkSpace,
	        anchorClassName: this.tocAnchorClass,
	        anchorLinkSymbolClassName: this.tocAnchorLinkClass,
	        tocCallback: function tocCallback(tocMarkdown, tocArray, tocHtml) {
	          if (tocHtml) {
	            if (_this.tocId && document.getElementById(_this.tocId)) {
	              document.getElementById(_this.tocId).innerHTML = tocHtml;
	            }

	            _this.$emit('toc-rendered', tocHtml);
	          }
	        }
	      });
	    }

	    var outHtml = this.show ? this.md.render(this.prerender(this.sourceData)) : '';
	    outHtml = this.postrender(outHtml);

	    this.$emit('rendered', outHtml);
	    return createElement('div', {
	      domProps: {
	        innerHTML: outHtml
	      }
	    });
	  },
	  beforeMount: function beforeMount() {
	    var _this2 = this;

	    if (this.$slots.default) {
	      this.sourceData = '';
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.$slots.default), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var slot = _step.value;

	          this.sourceData += slot.text;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    this.$watch('source', function () {
	      _this2.sourceData = _this2.prerender(_this2.source);
	      _this2.$forceUpdate();
	    });

	    this.watches.forEach(function (v) {
	      _this2.$watch(v, function () {
	        _this2.$forceUpdate();
	      });
	    });
	  }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ])
});
;

/***/ })

}]);
//# sourceMappingURL=54-9683468d50df9acaff4c.chunk.js.map