"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svgIcons = exports.Loader = exports.FilterDropdown = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterDropdown = exports.FilterDropdown = _react2.default.memo(function (_ref) {
  var header = _ref.header,
      name = _ref.name,
      value = _ref.value,
      id = _ref.id,
      t = _ref.t,
      _ref$showOptionAll = _ref.showOptionAll,
      showOptionAll = _ref$showOptionAll === undefined ? true : _ref$showOptionAll,
      onChangeFunction = _ref.onChangeFunction,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "inbox-filter-dropdown" : _ref$className,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data;

  return _react2.default.createElement(
    "div",
    { className: "jk-inbox-pointer " + className + " " },
    header && _react2.default.createElement(
      "label",
      null,
      "     ",
      t(header)
    ),
    _react2.default.createElement(
      "select",
      { name: name, value: value, id: id, onChange: onChangeFunction },
      showOptionAll && _react2.default.createElement(
        "option",
        { value: "ALL" },
        t("CS_INBOX_SELECT_ALL")
      ),
      data && data.map(function (item) {
        return _react2.default.createElement(
          "option",
          { value: item.value },
          t(item.key)
        );
      })
    )
  );
});

var Loader = exports.Loader = function Loader(_ref2) {
  var cancelSignal = _ref2.cancelSignal,
      t = _ref2.t;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "jk-spinner-wrapper" },
      _react2.default.createElement("div", { className: "jk-sm-inbox-loader" })
    ),
    _react2.default.createElement(
      "div",
      { className: "jk-spinner-wrapper" },
      t("CS_LOADING")
    ),
    _react2.default.createElement(
      "div",
      { className: "cancel-inbox-api" },
      _react2.default.createElement(
        "button",
        { onClick: cancelSignal },
        " ",
        t("CS_CANCEL")
      )
    )
  );
};

var ArrowBack = function ArrowBack(_ref3) {
  var className = _ref3.className,
      onClick = _ref3.onClick;
  return _react2.default.createElement(
    "span",
    { className: className, onClick: onClick },
    '<'
  )
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} onClick={onClick} width="18px" height="18px">
  //   <path d="M0 0h24v24H0z" fill="none" />
  //   <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
  // </svg>
  ;
};

var ArrowForward = function ArrowForward(_ref4) {
  var className = _ref4.className,
      onClick = _ref4.onClick;
  return _react2.default.createElement(
    "span",
    { className: className, onClick: onClick },
    '>'
  )
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className} onClick={onClick} width="18px" height="18px">
  //   <path d="M0 0h24v24H0z"  fill="none" />
  //   <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
  // </svg>
  ;
};

var ArrowToFirst = function ArrowToFirst(_ref5) {
  var className = _ref5.className,
      onClick = _ref5.onClick;
  return _react2.default.createElement(
    "span",
    { className: className, onClick: onClick },
    '<<'
  )
  // <svg width="18px" height="18px" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick} >
  //   <path d="M12.41 10.59L7.82 6L12.41 1.41L11 0L5 6L11 12L12.41 10.59ZM0 0H2V12H0V0Z" fill="#505a5f"></path>
  // </svg>
  ;
};

var ArrowToLast = function ArrowToLast(_ref6) {
  var className = _ref6.className,
      onClick = _ref6.onClick;
  return _react2.default.createElement(
    "span",
    { className: className, onClick: onClick },
    '>>'
  )
  // <svg width="18px" height="18px" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
  //   <path d="M0.589844 1.41L5.17984 6L0.589844 10.59L1.99984 12L7.99984 6L1.99984 0L0.589844 1.41ZM10.9998 0H12.9998V12H10.9998V0Z" fill="#505a5f" />
  // </svg>
  ;
};

var SortDown = function SortDown(style) {
  return _react2.default.createElement(
    "svg",
    {
      style: (0, _extends3.default)({ display: "inline-block", height: "16px" }, style),
      xmlns: "http://www.w3.org/2000/svg",
      enableBackground: "new 0 0 24 24",
      height: "24",
      viewBox: "0 0 24 24",
      width: "24"
    },
    _react2.default.createElement("rect", { fill: "none", height: "24", width: "24" }),
    _react2.default.createElement("path", { d: "M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z" })
  );
};

var SortUp = function SortUp(style) {
  return _react2.default.createElement(
    "svg",
    {
      style: (0, _extends3.default)({ display: "inline-block", height: "16px" }, style),
      xmlns: "http://www.w3.org/2000/svg",
      enableBackground: "new 0 0 24 24",
      height: "24",
      viewBox: "0 0 24 24",
      width: "24"
    },
    _react2.default.createElement("rect", { fill: "none", height: "24", width: "24" }),
    _react2.default.createElement("path", { d: "M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" })
  );
};

var svgIcons = exports.svgIcons = {
  ArrowBack: ArrowBack,
  ArrowToLast: ArrowToLast,
  ArrowToFirst: ArrowToFirst,
  ArrowForward: ArrowForward,
  SortDown: SortDown,
  SortUp: SortUp
};