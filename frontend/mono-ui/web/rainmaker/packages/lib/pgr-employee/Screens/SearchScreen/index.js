"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _common = require("modules/common");

var _commons = require("egov-ui-kit/utils/commons");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _reactRedux = require("react-redux");

var _actions2 = require("egov-ui-kit/redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roleFromUserInfo = function roleFromUserInfo() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var role = arguments[1];

  var roleCodes = roles.map(function (role) {
    return role.code;
  });
  return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
};

var displayStatus = function displayStatus() {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var statusObj = {};
  if (status.toLowerCase().includes("overdue")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  if (status.toLowerCase().includes("left")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  return statusObj;
};

var SearchScreen = function (_Component) {
  (0, _inherits3.default)(SearchScreen, _Component);

  function SearchScreen() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SearchScreen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SearchScreen.__proto__ || Object.getPrototypeOf(SearchScreen)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      complaintNo: "",
      mobileNo: "",
      complaints: [],
      search: false,
      value: 0,
      errorText: "",
      noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED"
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var inputType, input;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // let { fetchComplaints } = this.props;
              // fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested,closed,rejected,resolved" }], true, true);
              _this.setState({
                noComplaintMessage: ""
              });
              inputType = document.getElementsByTagName("input");

              for (input in inputType) {
                if (inputType[input].type === "number") {
                  inputType[input].addEventListener("mousewheel", function () {
                    this.blur();
                  });
                }
              }

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.onComplaintClick = function (complaintNo) {
      _this.props.history.push("/complaint-details/" + complaintNo);
    }, _this.onComplaintChange = function (e) {
      // const inputValue = e.target.value;
      // this.setState({ complaintNo: inputValue });
      var complaintNo = e.target.value;
      _this.setState({ complaintNo: complaintNo });
      if (complaintNo.length < 6) {
        _this.setState({
          errorText: "ERR_COMPLAINT_NUMBER_SEARCH"
        });
      } else {
        _this.setState({ errorText: "" });
      }
    }, _this.onMobileChange = function (e) {
      var inputValue = e.target.value;
      _this.setState({ mobileNo: inputValue });
    }, _this.onSearch = function () {
      var _this$state = _this.state,
          complaintNo = _this$state.complaintNo,
          mobileNo = _this$state.mobileNo;
      var _this$props = _this.props,
          fetchComplaints = _this$props.fetchComplaints,
          toggleSnackbarAndSetText = _this$props.toggleSnackbarAndSetText;

      var queryObj = [];
      if (complaintNo) {
        queryObj.push({ key: "serviceRequestId", value: complaintNo });
      }
      if (mobileNo) {
        queryObj.push({ key: "phone", value: mobileNo });
      }

      if (complaintNo) {
        if (complaintNo.length >= 6) {
          fetchComplaints(queryObj, true, true);
        } else {
          toggleSnackbarAndSetText(true, {
            labelName: "Entered value is less than 6 characters in length.",
            labelKey: "ERR_VALUE_LESS_THAN_SIX_CHARACTERS"
          }, "error");
        }
      } else if (mobileNo) {
        fetchComplaints(queryObj, true, true);
      }
      // if (complaintNo || mobileNo) {
      //   fetchComplaints(queryObj, true, true);
      // }
      _this.setState({
        search: true,
        noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED"
      });
    }, _this.clearSearch = function () {
      var fetchComplaints = _this.props.fetchComplaints;

      fetchComplaints([{ key: "status", value: null }]);
      _this.setState({
        mobileNo: "",
        complaintNo: "",
        search: false,
        noComplaintMessage: ""
      });
    }, _this.onChange = function (value) {
      _this.setState({ value: value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SearchScreen, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var hintTextStyle = {
        letterSpacing: "0.7px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "90%",
        overflow: "hidden"
      };
      var _props = this.props,
          loading = _props.loading,
          history = _props.history,
          transformedComplaints = _props.transformedComplaints,
          role = _props.role;
      var _state = this.state,
          mobileNo = _state.mobileNo,
          complaintNo = _state.complaintNo,
          search = _state.search,
          errorText = _state.errorText,
          noComplaintMessage = _state.noComplaintMessage;
      var onComplaintClick = this.onComplaintClick;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_components.Card, {
            id: "complaint-search-card",
            className: "complaint-search-main-card",
            textChildren: _react2.default.createElement(
              "div",
              { className: "complaint-search-cont clearfix" },
              _react2.default.createElement(
                "div",
                { className: "col-xs-12", style: { paddingLeft: 8 } },
                _react2.default.createElement(_translationNode2.default, {
                  label: "CORE_COMMON_SEARCH_COMPLAINT",
                  fontSize: 16,
                  dark: true,
                  bold: true
                })
              ),
              _react2.default.createElement(
                "div",
                {
                  className: "col-sm-3 col-xs-12",
                  style: { paddingLeft: 8, paddingRight: 40 }
                },
                _react2.default.createElement(_components.TextField, {
                  id: "mobile-no",
                  name: "mobile-no",
                  type: "number",
                  value: mobileNo,
                  hintText: _react2.default.createElement(_translationNode2.default, {
                    label: "CORE_COMMON_MOBILE_NUMBER_PLACEHOLDER",
                    color: "rgba(0, 0, 0, 0.3799999952316284)",
                    fontSize: 16,
                    labelStyle: hintTextStyle
                  }),
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, {
                    key: 0,
                    label: "ES_CREATECOMPLAINT_MOBILE_NUMBER",
                    color: "rgba(0,0,0,0.60)",
                    fontSize: "12px"
                  }),
                  onChange: function onChange(e, value) {
                    return _this3.onMobileChange(e);
                  },
                  underlineStyle: { bottom: 7 },
                  underlineFocusStyle: { bottom: 7 },
                  hintStyle: { width: "100%" }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-3 col-xs-12", style: { paddingLeft: 8 } },
                _react2.default.createElement(_components.TextField, {
                  id: "complaint-no",
                  name: "complaint-no",
                  value: complaintNo,
                  hintText: _react2.default.createElement(_translationNode2.default, {
                    label: "ES_MYCOMPLAINTS_COMPLAINT_NO",
                    color: "rgba(0, 0, 0, 0.3799999952316284)",
                    fontSize: 16,
                    labelStyle: hintTextStyle
                  }),
                  errorText: _react2.default.createElement(_translationNode2.default, { label: errorText, color: "red" }),
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, {
                    key: 1,
                    label: "CS_COMPLAINT_SUBMITTED_COMPLAINT_NO",
                    color: "rgba(0,0,0,0.60)",
                    fontSize: "12px"
                  }),
                  onChange: function onChange(e, value) {
                    return _this3.onComplaintChange(e);
                  },
                  underlineStyle: {
                    bottom: 7,
                    borderBottom: "1px solid #e0e0e0"
                  },
                  underlineFocusStyle: {
                    bottom: 7,
                    borderBottom: "1px solid #e0e0e0"
                  },
                  hintStyle: { width: "100%" }
                })
              ),
              _react2.default.createElement(
                "div",
                {
                  className: "col-sm-6 col-xs-12 csr-action-buttons",
                  style: { marginTop: 10, paddingRight: 8 }
                },
                _react2.default.createElement(_components.Button, {
                  label: _react2.default.createElement(_translationNode2.default, {
                    buttonLabel: true,
                    label: "ES_MYCOMPLAINTS_SEARCH_BUTTON"
                  }),
                  style: { marginRight: 28, width: "36%" },
                  backgroundColor: "#fe7a51",
                  labelStyle: {
                    letterSpacing: 0.7,
                    padding: 0,
                    color: "#fff"
                  },
                  buttonStyle: { border: 0 },
                  onClick: function onClick() {
                    return _this3.onSearch();
                  }
                }),
                _react2.default.createElement(_components.Button, {
                  label: _react2.default.createElement(_translationNode2.default, {
                    buttonLabel: true,
                    color: "#fe7a51",
                    label: "ES_MYCOMPLAINTS_CLEAR_SEARCH_BUTTON"
                  }),
                  labelStyle: {
                    letterSpacing: 0.7,
                    padding: 0,
                    color: "#fe7a51"
                  },
                  buttonStyle: { border: "1px solid #fe7a51" },
                  style: { width: "36%" },
                  onClick: function onClick() {
                    return _this3.clearSearch();
                  }
                })
              )
            )
          }),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_common.Complaints, {
              noComplaintMessage: noComplaintMessage,
              onComplaintClick: onComplaintClick,
              complaints: noComplaintMessage ? transformedComplaints : [],
              role: role,
              complaintLocation: true
            })
          )
        )
      );
    }
  }]);
  return SearchScreen;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _ref3 = state || {},
      complaints = _ref3.complaints,
      common = _ref3.common;

  var categoriesById = complaints.categoriesById,
      byId = complaints.byId;
  var fetchSuccess = complaints.fetchSuccess,
      loading = complaints.loading;
  //const loading = !isEmpty(categoriesById) ? (fetchSuccess ? false : true) : true;

  var _ref4 = common || {},
      citizenById = _ref4.citizenById,
      employeeById = _ref4.employeeById;

  var userInfo = state.auth.userInfo;

  var role = roleFromUserInfo(userInfo.roles, "GRO") || roleFromUserInfo(userInfo.roles, "DGRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  var transformedComplaints = (0, _commons.transformComplaintForComponent)(complaints, role, employeeById, citizenById, categoriesById, displayStatus);

  return { role: role, loading: loading, transformedComplaints: transformedComplaints };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria, hasUsers, overWrite) {
      return dispatch((0, _actions.fetchComplaints)(criteria, hasUsers, overWrite));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchScreen);