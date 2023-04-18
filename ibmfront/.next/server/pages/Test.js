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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass Test extends react__WEBPACK_IMPORTED_MODULE_1__.Component {\n    componentDidMount() {\n        this.callBackendAPI().then((res)=>this.setState({\n                data: res.express\n            })).catch((err)=>console.log(err));\n    }\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    children: \"Welcome to React\"\n                }, void 0, false, {\n                    fileName: \"/Users/hector/Desktop/IBMProject/Software_planning16/ibmfront/pages/Test.js\",\n                    lineNumber: 29,\n                    columnNumber: 15\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: this.state.data\n                }, void 0, false, {\n                    fileName: \"/Users/hector/Desktop/IBMProject/Software_planning16/ibmfront/pages/Test.js\",\n                    lineNumber: 30,\n                    columnNumber: 13\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/hector/Desktop/IBMProject/Software_planning16/ibmfront/pages/Test.js\",\n            lineNumber: 28,\n            columnNumber: 13\n        }, this);\n    }\n    constructor(...args){\n        super(...args);\n        this.state = {\n            data: null\n        };\n        // fetching the GET route from the Express server which matches the GET route from server.js\n        this.callBackendAPI = async ()=>{\n            const response = await fetch(\"http://localhost:5000/express_backend\");\n            const body = await response.json();\n            if (response.status !== 200) {\n                console.error(\"a\");\n                throw Error(body.message);\n            }\n            return body;\n        };\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Test);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9UZXN0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF5QztBQUV6QyxNQUFNRSxhQUFhRCw0Q0FBU0E7SUFLdEJFLG9CQUFvQjtRQUNsQixJQUFJLENBQUNDLGNBQWMsR0FDaEJDLElBQUksQ0FBQ0MsQ0FBQUEsTUFBTyxJQUFJLENBQUNDLFFBQVEsQ0FBQztnQkFBRUMsTUFBTUYsSUFBSUcsT0FBTztZQUFDLElBQzlDQyxLQUFLLENBQUNDLENBQUFBLE1BQU9DLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDOUI7SUFhQUcsU0FBUztRQUNQLHFCQUVJLDhEQUFDQzs7OEJBQ0MsOERBQUNDOzhCQUFHOzs7Ozs7OEJBQ04sOERBQUNDOzhCQUFHLElBQUksQ0FBQ0MsS0FBSyxDQUFDVixJQUFJOzs7Ozs7Ozs7Ozs7SUFHekI7OzthQTdCRlUsUUFBUTtZQUNKVixNQUFNLElBQUk7UUFDWjtRQU9FLDRGQUE0RjthQUM5RkosaUJBQWlCLFVBQVk7WUFDM0IsTUFBTWUsV0FBVyxNQUFNQyxNQUFNO1lBQzdCLE1BQU1DLE9BQU8sTUFBTUYsU0FBU0csSUFBSTtZQUVoQyxJQUFJSCxTQUFTSSxNQUFNLEtBQUssS0FBSztnQkFDM0JYLFFBQVFZLEtBQUssQ0FBQztnQkFDZCxNQUFNQyxNQUFNSixLQUFLSyxPQUFPLEVBQUM7WUFDM0IsQ0FBQztZQUNELE9BQU9MO1FBQ1Q7O0FBV0Y7QUFFQSxpRUFBZW5CLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pYm1mcm9udC8uL3BhZ2VzL1Rlc3QuanM/NTc2OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBUZXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgICAgZGF0YTogbnVsbFxuICAgICAgfTtcblxuICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuY2FsbEJhY2tlbmRBUEkoKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiB0aGlzLnNldFN0YXRlKHsgZGF0YTogcmVzLmV4cHJlc3MgfSkpXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgIH1cbiAgICAgICAgLy8gZmV0Y2hpbmcgdGhlIEdFVCByb3V0ZSBmcm9tIHRoZSBFeHByZXNzIHNlcnZlciB3aGljaCBtYXRjaGVzIHRoZSBHRVQgcm91dGUgZnJvbSBzZXJ2ZXIuanNcbiAgICAgIGNhbGxCYWNrZW5kQVBJID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjUwMDAvZXhwcmVzc19iYWNrZW5kJyk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcImFcIik7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoYm9keS5tZXNzYWdlKSBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9keTtcbiAgICAgIH07XG5cbiAgICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgxPldlbGNvbWUgdG8gUmVhY3Q8L2gxPlxuICAgICAgICAgICAgPHA+e3RoaXMuc3RhdGUuZGF0YX08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGRlZmF1bHQgVGVzdDsiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJUZXN0IiwiY29tcG9uZW50RGlkTW91bnQiLCJjYWxsQmFja2VuZEFQSSIsInRoZW4iLCJyZXMiLCJzZXRTdGF0ZSIsImRhdGEiLCJleHByZXNzIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwicmVuZGVyIiwiZGl2IiwiaDEiLCJwIiwic3RhdGUiLCJyZXNwb25zZSIsImZldGNoIiwiYm9keSIsImpzb24iLCJzdGF0dXMiLCJlcnJvciIsIkVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/Test.js\n");

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