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

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions3 = require("egov-ui-kit/redux/form/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

var _api = require("egov-ui-kit/utils/api");

var _reactRedux = require("react-redux");

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _actions4 = require("egov-ui-kit/redux/app/actions");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _CountDetails = require("./components/CountDetails");

var _CountDetails2 = _interopRequireDefault(_CountDetails);

var _actions5 = require("egov-ui-kit/redux/common/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllComplaints = function (_Component) {
  (0, _inherits3.default)(AllComplaints, _Component);

  function AllComplaints() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AllComplaints);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AllComplaints.__proto__ || Object.getPrototypeOf(AllComplaints)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      complaintNo: "",
      mobileNo: "",
      complaints: [],
      search: false,
      value: 0,
      sortPopOpen: false,
      errorText: ""
    }, _this.style = {
      iconStyle: {
        height: "30px",
        width: "30px"
      }
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this$props, role, userInfo, numCSRComplaint, numEmpComplaint, renderCustomTitle, prepareFinalObject, form, rawRole, _fetchComplaints, complaintCountRequest, payloadCount, assignedTotalComplaints, unassignedTotalComplaints, inputType, input;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, role = _this$props.role, userInfo = _this$props.userInfo, numCSRComplaint = _this$props.numCSRComplaint, numEmpComplaint = _this$props.numEmpComplaint, renderCustomTitle = _this$props.renderCustomTitle, prepareFinalObject = _this$props.prepareFinalObject, form = _this$props.form;

              _this.props.fetchpgrConstants();
              _this.props.fetchUiCommonConfig();
              _this.props.fetchComplaintCategories();
              _this.props.resetCityFieldValue();
              _this.props.resetMohallaFieldValue();
              _this.props.resetFormData();
              rawRole = userInfo && userInfo.roles && userInfo.roles[0].code.toUpperCase();
              //const numberOfComplaints = role === "employee" ? numEmpComplaint : role === "csr" ? numCSRComplaint : 0;

              if (!(rawRole === "PGR-ADMIN")) {
                _context.next = 12;
                break;
              }

              _this.props.history.push("/report/rainmaker-pgr/DepartmentWiseReport");
              _context.next = 28;
              break;

            case 12:
              _fetchComplaints = _this.props.fetchComplaints;
              complaintCountRequest = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, {
                key: "status",
                value: role === "csr" ? "assigned,open,reassignrequested" : "assigned,reassignrequested"
              }];
              _context.next = 16;
              return (0, _api.httpRequest)("rainmaker-pgr/v1/requests/_count", "_search", complaintCountRequest);

            case 16:
              payloadCount = _context.sent;

              if (role === "csr") {
                payloadCount ? payloadCount.count ? renderCustomTitle(payloadCount.count) : renderCustomTitle("0") : renderCustomTitle("0");
              }

              complaintCountRequest = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, {
                key: "status",
                value: "assigned"
              }];
              _context.next = 21;
              return (0, _api.httpRequest)("rainmaker-pgr/v1/requests/_count", "_search", complaintCountRequest);

            case 21:
              assignedTotalComplaints = _context.sent;

              complaintCountRequest = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, {
                key: "status",
                value: "open,reassignrequested"
              }];
              _context.next = 25;
              return (0, _api.httpRequest)("rainmaker-pgr/v1/requests/_count", "_search", complaintCountRequest);

            case 25:
              unassignedTotalComplaints = _context.sent;

              prepareFinalObject("pgrComplaintCount", {
                assignedTotalComplaints: assignedTotalComplaints.count,
                unassignedTotalComplaints: unassignedTotalComplaints.count,
                employeeTotalComplaints: payloadCount.count
              });

              if (role === "ao") {
                _fetchComplaints([{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, {
                  key: "status",
                  value: "assigned"
                }], true, false);
                _fetchComplaints([{
                  key: "status",
                  value: "open,reassignrequested"
                }, { key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }], true, false);
              } else {
                _fetchComplaints([{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, {
                  key: "status",
                  value: rawRole === "EMPLOYEE" ? "assigned,reassignrequested" : "assigned,open,reassignrequested"
                }], true, true);
              }

            case 28:
              inputType = document.getElementsByTagName("input");

              for (input in inputType) {
                if (inputType[input].type === "number") {
                  inputType[input].addEventListener("mousewheel", function () {
                    this.blur();
                  });
                }
              }

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.componentWillReceiveProps = function (nextProps) {
      var _this$props2 = _this.props,
          role = _this$props2.role,
          renderCustomTitle = _this$props2.renderCustomTitle;

      if (!(0, _isEqual2.default)(_this.props.transformedComplaints, nextProps.transformedComplaints)) {
        var numberOfComplaints = role === "employee" ? 0 : role === "csr" ? nextProps.numCSRComplaint : 0;
        renderCustomTitle(numberOfComplaints);
      }
    }, _this.closeSortDialog = function () {
      _this.setState({
        sortPopOpen: false
      });
    }, _this.onSortClick = function () {
      _this.setState({
        sortPopOpen: true
      });
    }, _this.onComplaintClick = function (complaintNo) {
      _this.props.history.push("/complaint-details/" + complaintNo);
    }, _this.onComplaintChange = function (e) {
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
      var _this$props3 = _this.props,
          fetchComplaints = _this$props3.fetchComplaints,
          toggleSnackbarAndSetText = _this$props3.toggleSnackbarAndSetText;

      var queryObj = [];
      if (complaintNo) {
        queryObj.push({ key: "serviceRequestId", value: complaintNo });
      }
      if (mobileNo) {
        queryObj.push({ key: "phone", value: mobileNo });
      }

      // if (complaintNo || mobileNo) {
      //   fetchComplaints(queryObj, true, true);
      // }

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
      _this.setState({ search: true });
    }, _this.clearSearch = function () {
      var fetchComplaints = _this.props.fetchComplaints;

      fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }]);
      _this.setState({ mobileNo: "", complaintNo: "", search: false });
    }, _this.onChange = function (value) {
      _this.setState({ value: value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AllComplaints, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          loading = _props.loading,
          history = _props.history;
      var _state = this.state,
          mobileNo = _state.mobileNo,
          complaintNo = _state.complaintNo,
          search = _state.search,
          sortPopOpen = _state.sortPopOpen,
          errorText = _state.errorText;


      var tabStyle = {
        letterSpacing: "0.6px"
      };

      var onComplaintClick = this.onComplaintClick,
          onSortClick = this.onSortClick,
          closeSortDialog = this.closeSortDialog,
          style = this.style;
      var _props2 = this.props,
          assignedComplaints = _props2.assignedComplaints,
          unassignedComplaints = _props2.unassignedComplaints,
          csrComplaints = _props2.csrComplaints,
          employeeComplaints = _props2.employeeComplaints,
          role = _props2.role,
          searchFilterEmployeeComplaints = _props2.searchFilterEmployeeComplaints,
          assignedTotalComplaints = _props2.assignedTotalComplaints,
          unassignedTotalComplaints = _props2.unassignedTotalComplaints,
          employeeTotalComplaints = _props2.employeeTotalComplaints;

      var hintTextStyle = {
        letterSpacing: "0.7px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "90%",
        overflow: "hidden"
      };

      return role === "ao" ? _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          {
            className: "sort-button rainmaker-displayInline",
            style: { padding: "20px 20px 0px 0px", justifyContent: "flex-end" }
          },
          _react2.default.createElement(
            "div",
            {
              className: "rainmaker-displayInline",
              style: { cursor: "pointer", marginRight: "20px" },
              onClick: onSortClick
            },
            _react2.default.createElement(_translationNode2.default, {
              label: "ES_SORT_BUTTON",
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              containerStyle: { marginRight: 5 },
              labelStyle: { fontWeight: 500 }
            }),
            _react2.default.createElement(_components.Icon, {
              style: style.iconStyle,
              action: "action",
              name: "swap-vert",
              color: "rgba(0, 0, 0, 0.8700000047683716)"
            })
          ),
          _react2.default.createElement(
            "div",
            {
              className: "rainmaker-displayInline",
              style: { cursor: "pointer" },
              onClick: function onClick() {
                return history.push("search-complaint");
              }
            },
            _react2.default.createElement(_translationNode2.default, {
              label: "ES_SEARCH_BUTTON",
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              containerStyle: { marginRight: 5 },
              labelStyle: { fontWeight: 500 }
            }),
            _react2.default.createElement(_components.Icon, {
              style: style.iconStyle,
              action: "action",
              name: "search",
              color: "rgba(0, 0, 0, 0.8700000047683716)"
            })
          ),
          _react2.default.createElement(_common.SortDialog, {
            sortPopOpen: sortPopOpen,
            closeSortDialog: closeSortDialog
          })
        ),
        _react2.default.createElement(_components.Tabs, {
          className: "employee-complaints-tab",
          onChange: this.onChange,
          tabs: [{
            label: _react2.default.createElement(
              "div",
              { className: "inline-Localization-text" },
              _react2.default.createElement(_translationNode2.default
              //labelClassName = "unassigned-label-text"
              , { labelClassName: this.state.value === 0 ? "selected-tab-label-text" : "unselected-tab-label-text"
                //color={this.state.value === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"}
                , bold: true,
                label: "ES_ALL_COMPLAINTS_UNASSIGNED_TAB_LABEL",
                labelStyle: tabStyle
              })
            ),
            children: _react2.default.createElement(
              _common.Screen,
              { className: "gro-screen", loading: loading },
              _react2.default.createElement(
                "div",
                { className: "tab1-content form-without-button-cont-generic" },
                _react2.default.createElement(_CountDetails2.default, {
                  count: unassignedComplaints.length,
                  total: unassignedTotalComplaints,
                  status: "unassigned"
                }),
                _react2.default.createElement(_common.Complaints, {
                  noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_TO_ASSIGN",
                  onComplaintClick: onComplaintClick,
                  complaints: unassignedComplaints,
                  complaintLocation: true,
                  role: role,
                  heightOffset: "116px"
                })
              )
            )
          }, {
            label: _react2.default.createElement(
              "div",
              { className: "inline-Localization-text" },
              _react2.default.createElement(_translationNode2.default
              // labelClassName="assigned-label-text"
              , { labelClassName: this.state.value === 1 ? "selected-tab-label-text" : "unselected-tab-label-text"
                //color={this.state.value === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"}
                , bold: true,
                label: "ES_ALL_COMPLAINTS_ASSIGNED_TAB_LABEL",
                labelStyle: tabStyle
              })
            ),
            children: _react2.default.createElement(
              _common.Screen,
              { className: "gro-screen", loading: loading },
              _react2.default.createElement(
                "div",
                { className: "tab2-content form-without-button-cont-generic" },
                _react2.default.createElement(_CountDetails2.default, {
                  count: assignedComplaints.length,
                  total: assignedTotalComplaints,
                  status: "assigned"
                }),
                _react2.default.createElement(_common.Complaints, {
                  noComplaintMessage: "ES_MYCOMPLAINTS_NO_ASSIGNED_COMPLAINTS",
                  onComplaintClick: onComplaintClick,
                  complaints: assignedComplaints,
                  complaintLocation: true,
                  role: role,
                  heightOffset: "116px"
                })
              )
            )
          }]
        })
      ) : role === "csr" ? _react2.default.createElement(
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
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_common.Complaints, {
            noComplaintMessage: search ? "ES_NO_SEARCH_RESULTS" : "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED",
            onComplaintClick: onComplaintClick,
            complaints: csrComplaints,
            role: role,
            complaintLocation: true
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "floating-button-cont csr-add-button" },
          _react2.default.createElement(
            _FloatingActionButton2.default,
            {
              id: "mycomplaints-add",
              onClick: function onClick(e) {
                history.push("/create-complaint");
              },
              className: "floating-button",
              backgroundColor: "#fe7a51"
            },
            _react2.default.createElement(_components.Icon, { action: "content", name: "add" })
          )
        )
      ) : _react2.default.createElement(
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
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_CountDetails2.default, {
            count: search ? searchFilterEmployeeComplaints.length : employeeComplaints.length,
            total: employeeTotalComplaints,
            status: "open"
          }),
          _react2.default.createElement(_common.Complaints, {
            noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED",
            onComplaintClick: onComplaintClick,
            complaints: search ? searchFilterEmployeeComplaints : employeeComplaints,
            role: role,
            complaintLocation: true
          })
        )
      );
    }
  }]);
  return AllComplaints;
}(_react.Component);

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

var mapStateToProps = function mapStateToProps(state) {
  var _ref3 = state || {},
      complaints = _ref3.complaints,
      common = _ref3.common,
      _ref3$screenConfigura = _ref3.screenConfiguration,
      screenConfiguration = _ref3$screenConfigura === undefined ? {} : _ref3$screenConfigura;

  var categoriesById = complaints.categoriesById,
      byId = complaints.byId,
      order = complaints.order;
  var fetchSuccess = complaints.fetchSuccess;
  var _screenConfiguration$ = screenConfiguration.preparedFinalObject,
      preparedFinalObject = _screenConfiguration$ === undefined ? {} : _screenConfiguration$;
  var _preparedFinalObject$ = preparedFinalObject.pgrComplaintCount,
      pgrComplaintCount = _preparedFinalObject$ === undefined ? {} : _preparedFinalObject$;
  var _pgrComplaintCount$as = pgrComplaintCount.assignedTotalComplaints,
      assignedTotalComplaints = _pgrComplaintCount$as === undefined ? 0 : _pgrComplaintCount$as,
      _pgrComplaintCount$un = pgrComplaintCount.unassignedTotalComplaints,
      unassignedTotalComplaints = _pgrComplaintCount$un === undefined ? 0 : _pgrComplaintCount$un,
      _pgrComplaintCount$em = pgrComplaintCount.employeeTotalComplaints,
      employeeTotalComplaints = _pgrComplaintCount$em === undefined ? 0 : _pgrComplaintCount$em;

  var loading = !(0, _isEmpty2.default)(categoriesById) ? fetchSuccess ? false : true : true;

  var _ref4 = common || {},
      citizenById = _ref4.citizenById,
      employeeById = _ref4.employeeById;

  var userInfo = state.auth.userInfo;

  var role = roleFromUserInfo(userInfo.roles, "GRO") || roleFromUserInfo(userInfo.roles, "DGRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  var transformedComplaints = (0, _commons.transformComplaintForComponent)(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  var assignedComplaints = [],
      unassignedComplaints = [],
      employeeComplaints = [],
      csrComplaints = [];
  var filteredEmployeeComplaints = transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus === "ASSIGNED" || complaint.rawStatus === "reassignrequested";
  });

  var searchFilterEmployeeComplaints = transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus === "ASSIGNED" || complaint.rawStatus === "reassignrequested" || complaint.complaintStatus === "CLOSED";
  });

  var filteredAssignedComplaints = transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus === "ASSIGNED";
  });
  var filteredUnassignedComplaints = transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus === "UNASSIGNED";
  });

  if (role === "ao") {
    if (order === "Old to New") {
      assignedComplaints = (0, _orderBy2.default)(filteredAssignedComplaints, ["latestCreationTime"], ["asc"]);
      unassignedComplaints = (0, _orderBy2.default)(filteredUnassignedComplaints, ["latestCreationTime"], ["asc"]);
    } else if (order === "SLA") {
      assignedComplaints = (0, _orderBy2.default)(filteredAssignedComplaints, ["SLA"], ["asc"]);
      unassignedComplaints = (0, _orderBy2.default)(filteredUnassignedComplaints, ["SLA"], ["asc"]);
    } else {
      assignedComplaints = (0, _orderBy2.default)(filteredAssignedComplaints, ["latestCreationTime"], ["desc"]);
      unassignedComplaints = (0, _orderBy2.default)(filteredUnassignedComplaints, ["latestCreationTime"], ["desc"]);
    }
  } else if (role === "csr") {
    if (order === "Old to New") {
      csrComplaints = (0, _orderBy2.default)(transformedComplaints, ["latestCreationTime"], ["asc"]);
    } else if (order === "SLA") {
      csrComplaints = (0, _orderBy2.default)(transformedComplaints, ["SLA"], ["asc"]);
    } else {
      csrComplaints = (0, _orderBy2.default)(transformedComplaints, ["latestCreationTime"], ["desc"]);
    }
  } else {
    if (order === "Old to New") {
      employeeComplaints = (0, _orderBy2.default)(filteredEmployeeComplaints, ["latestCreationTime"], ["asc"]);
    } else if (order === "SLA") {
      employeeComplaints = (0, _orderBy2.default)(filteredEmployeeComplaints, ["SLA"], ["asc"]);
    } else {
      employeeComplaints = (0, _orderBy2.default)(filteredEmployeeComplaints, ["latestCreationTime"], ["desc"]);
    }
  }
  transformedComplaints = (0, _orderBy2.default)(transformedComplaints, ["latestCreationTime"], ["desc"]);
  var numEmpComplaint = employeeComplaints.length;
  var numCSRComplaint = transformedComplaints.length;
  return {
    assignedComplaints: assignedComplaints,
    unassignedComplaints: unassignedComplaints,
    csrComplaints: csrComplaints,
    numEmpComplaint: numEmpComplaint,
    numCSRComplaint: numCSRComplaint,
    employeeComplaints: employeeComplaints,
    role: role,
    loading: loading,
    transformedComplaints: transformedComplaints,
    searchFilterEmployeeComplaints: searchFilterEmployeeComplaints,
    assignedTotalComplaints: assignedTotalComplaints,
    unassignedTotalComplaints: unassignedTotalComplaints,
    employeeTotalComplaints: employeeTotalComplaints
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria, hasUsers, overWrite) {
      return dispatch((0, _actions.fetchComplaints)(criteria, hasUsers, overWrite));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions4.toggleSnackbarAndSetText)(open, message, error));
    },
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions2.prepareFinalObject)(jsonPath, value));
    },
    resetCityFieldValue: function resetCityFieldValue() {
      return dispatch((0, _actions3.setFieldProperty)("complaint", "city", "value", ""));
    },
    resetMohallaFieldValue: function resetMohallaFieldValue() {
      return dispatch((0, _actions3.setFieldProperty)("complaint", "mohalla", "value", ""));
    },
    resetFormData: function resetFormData() {
      return dispatch((0, _actions5.prepareFormData)("services", [{}]));
    },
    fetchComplaintCategories: function fetchComplaintCategories() {
      return dispatch((0, _actions.fetchComplaintCategories)());
    },
    fetchpgrConstants: function fetchpgrConstants() {
      return dispatch((0, _actions5.fetchpgrConstants)());
    },
    fetchUiCommonConfig: function fetchUiCommonConfig() {
      return dispatch((0, _actions4.fetchUiCommonConfig)());
    },
    fetchUiCommonConstants: function fetchUiCommonConstants() {
      return dispatch((0, _actions4.fetchUiCommonConstants)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AllComplaints);