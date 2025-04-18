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

var _reactRedux = require("react-redux");

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _api = require("egov-ui-kit/utils/api");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClosedComplaints = function (_Component) {
  (0, _inherits3.default)(ClosedComplaints, _Component);

  function ClosedComplaints() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ClosedComplaints);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ClosedComplaints.__proto__ || Object.getPrototypeOf(ClosedComplaints)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this$props, fetchComplaints, renderCustomTitle, complaintCountRequest, payloadCount;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, fetchComplaints = _this$props.fetchComplaints, renderCustomTitle = _this$props.renderCustomTitle;

              fetchComplaints([{ key: "status", value: "rejected,resolved,closed" }]);
              complaintCountRequest = [{ key: "tenantId", value: (0, _localStorageUtils.getTenantId)() }, { key: "status", value: "closed,resolved,rejected" }]; // getting tenantId from localStorage

              _context.next = 5;
              return (0, _api.httpRequest)("rainmaker-pgr/v1/requests/_count", "_search", complaintCountRequest);

            case 5:
              payloadCount = _context.sent;

              payloadCount ? payloadCount.count ? renderCustomTitle(payloadCount.count) : renderCustomTitle("0") : renderCustomTitle("0");

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.onComplaintClick = function (complaintNo) {
      _this.props.history.push("/complaint-details/" + complaintNo);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ClosedComplaints, [{
    key: "render",
    value: function render() {
      var onComplaintClick = this.onComplaintClick;
      var _props = this.props,
          closedComplaints = _props.closedComplaints,
          role = _props.role,
          loading = _props.loading;


      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_common.Complaints, {
            noComplaintMessage: "COMMON_NO_COMPLAINTS_MESSAGE",
            onComplaintClick: onComplaintClick,
            complaints: closedComplaints,
            role: role,
            complaintLocation: true
          })
        )
      );
    }
  }]);
  return ClosedComplaints;
}(_react.Component);

var isAssigningOfficer = function isAssigningOfficer(roles) {
  var roleCodes = roles.map(function (role, index) {
    return role.code;
  });
  return roleCodes.indexOf("GRO" || "RO") > -1 ? true : false;
};

var displayStatus = function displayStatus() {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var assignee = arguments[1];

  var statusObj = {};
  if (status.toLowerCase() == "rejected" || status.toLowerCase() == "resolved") {
    statusObj.status = "CS_COMMON_" + status.toUpperCase() + "_UCASE";
  } else {
    statusObj.status = status;
  }
  if (status.toLowerCase() == "open") {
    statusObj.statusMessage = "CS_COMMON_SUBMITTED";
  } else {
    statusObj.statusMessage = "CS_COMMON_" + status.toUpperCase();
  }

  return statusObj;
};

var mapStateToProps = function mapStateToProps(state) {
  var complaints = state.complaints,
      common = state.common;
  var categoriesById = complaints.categoriesById;
  var userInfo = state.auth.userInfo;

  var _ref3 = common || {},
      citizenById = _ref3.citizenById,
      employeeById = _ref3.employeeById;

  var fetchSuccess = complaints.fetchSuccess;

  var loading = fetchSuccess ? false : true;
  var role = isAssigningOfficer(userInfo.roles) ? "ao" : "employee";
  var transformedComplaints = (0, _commons.transformComplaintForComponent)(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  var closedComplaints = (0, _orderBy2.default)(transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus === "CLOSED";
  }), "latestActionTime", "desc");
  var numClosedComplaints = closedComplaints.length;
  return { userInfo: userInfo, closedComplaints: closedComplaints, role: role, loading: loading, numClosedComplaints: numClosedComplaints };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ClosedComplaints);