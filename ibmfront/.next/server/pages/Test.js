"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/Test";
exports.ids = ["pages/Test"];
exports.modules = {

/***/ "./pages/Test.js":
/*!***********************!*\
  !*** ./pages/Test.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass Test extends react__WEBPACK_IMPORTED_MODULE_1__.Component {\n    componentDidMount() {\n        this.callBackendAPI().then((res)=>this.setState({\n                data: res.express\n            })).catch((err)=>console.log(err));\n    }\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    children: \"Welcome to React\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\x360\\\\Solutio\\\\Software_planning16\\\\ibmfront\\\\pages\\\\Test.js\",\n                    lineNumber: 29,\n                    columnNumber: 15\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: this.state.data\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\x360\\\\Solutio\\\\Software_planning16\\\\ibmfront\\\\pages\\\\Test.js\",\n                    lineNumber: 30,\n                    columnNumber: 13\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\x360\\\\Solutio\\\\Software_planning16\\\\ibmfront\\\\pages\\\\Test.js\",\n            lineNumber: 28,\n            columnNumber: 13\n        }, this);\n    }\n    constructor(...args){\n        super(...args);\n        this.state = {\n            data: null\n        };\n        // fetching the GET route from the Express server which matches the GET route from server.js\n        this.callBackendAPI = async ()=>{\n            const response = await fetch(\"http://localhost:5000/express_backend\");\n            const body = await response.json();\n            if (response.status !== 200) {\n                console.error(\"a\");\n                throw Error(body.message);\n            }\n            return body;\n        };\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Test);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9UZXN0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF5QztBQUV6QyxNQUFNRSxhQUFhRCw0Q0FBU0E7SUFLdEJFLG9CQUFvQjtRQUNsQixJQUFJLENBQUNDLGNBQWMsR0FDaEJDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBTyxJQUFJLENBQUNDLFFBQVEsQ0FBQztnQkFBRUMsTUFBTUYsSUFBSUcsT0FBTztZQUFDLElBQzlDQyxLQUFLLENBQUNDLENBQUFBLE1BQU9DLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDOUI7SUFhQUcsU0FBUztRQUNQLHFCQUVJLDhEQUFDQzs7OEJBQ0MsOERBQUNDOzhCQUFHOzs7Ozs7OEJBQ04sOERBQUNDOzhCQUFHLElBQUksQ0FBQ0MsS0FBSyxDQUFDVixJQUFJOzs7Ozs7Ozs7Ozs7SUFHekI7OzthQTdCRlUsUUFBUTtZQUNKVixNQUFNLElBQUk7UUFDWjtRQU9FLDRGQUE0RjthQUM5RkosaUJBQWlCLFVBQVk7WUFDM0IsTUFBTWUsV0FBVyxNQUFNQyxNQUFNO1lBQzdCLE1BQU1DLE9BQU8sTUFBTUYsU0FBU0csSUFBSTtZQUVoQyxJQUFJSCxTQUFTSSxNQUFNLEtBQUssS0FBSztnQkFDM0JYLFFBQVFZLEtBQUssQ0FBQztnQkFDZCxNQUFNQyxNQUFNSixLQUFLSyxPQUFPLEVBQUM7WUFDM0IsQ0FBQztZQUNELE9BQU9MO1FBQ1Q7O0FBV0Y7QUFFQSxpRUFBZW5CLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pYm1mcm9udC8uL3BhZ2VzL1Rlc3QuanM/NTc2OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgVGVzdCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmNhbGxCYWNrZW5kQVBJKClcclxuICAgICAgICAgIC50aGVuKHJlcyA9PiB0aGlzLnNldFN0YXRlKHsgZGF0YTogcmVzLmV4cHJlc3MgfSkpXHJcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICB9XHJcbiAgICAgICAgLy8gZmV0Y2hpbmcgdGhlIEdFVCByb3V0ZSBmcm9tIHRoZSBFeHByZXNzIHNlcnZlciB3aGljaCBtYXRjaGVzIHRoZSBHRVQgcm91dGUgZnJvbSBzZXJ2ZXIuanNcclxuICAgICAgY2FsbEJhY2tlbmRBUEkgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo1MDAwL2V4cHJlc3NfYmFja2VuZCcpO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcImFcIik7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvcihib2R5Lm1lc3NhZ2UpIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYm9keTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8aDE+V2VsY29tZSB0byBSZWFjdDwvaDE+XHJcbiAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLmRhdGF9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IFRlc3Q7Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiVGVzdCIsImNvbXBvbmVudERpZE1vdW50IiwiY2FsbEJhY2tlbmRBUEkiLCJ0aGVuIiwicmVzIiwic2V0U3RhdGUiLCJkYXRhIiwiZXhwcmVzcyIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsInJlbmRlciIsImRpdiIsImgxIiwicCIsInN0YXRlIiwicmVzcG9uc2UiLCJmZXRjaCIsImJvZHkiLCJqc29uIiwic3RhdHVzIiwiZXJyb3IiLCJFcnJvciIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/Test.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/Test.js"));
module.exports = __webpack_exports__;

})();