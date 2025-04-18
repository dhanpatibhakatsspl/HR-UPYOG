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

var _api = require("egov-ui-kit/utils/api");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _createReceipt = require("../../../PaymentStatus/Components/createReceipt");

var _receipt = require("../../../PaymentStatus/Components/receipt");

var _receipt2 = _interopRequireDefault(_receipt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  customWidth: {
    width: 120,
    backgroundColor: "#F0F0F0",
    height: "25px",
    paddingLeft: "10px"
  },
  iconStyle: { top: "-13px", fill: "#484848", width: "35px" },
  underlineStyle: { display: "none" },
  hintStyle: { color: "#484848", top: 0 }
};

var DropDown = function (_Component) {
  (0, _inherits3.default)(DropDown, _Component);

  function DropDown() {
    var _ref,
        _this3 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DropDown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      imageUrl: ""
    }, _this.componentDidMount = function () {
      var item = _this.props.item;

      var tenantId = item && item.tenantId;
      tenantId && _this.convertImgToDataURLviaCanvas(_this.createImageUrl(tenantId), function (data) {
        this.setState({ imageUrl: data });
      }.bind(_this));
    }, _this.convertImgToDataURLviaCanvas = function (url, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    }, _this.createImageUrl = function (tenantId) {
      return "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/" + tenantId + "/logo.png";
    }, _this.onSelectFieldChange = function (event, key, payload, imageUrl) {
      var _this$props = _this.props,
          generalMDMSDataById = _this$props.generalMDMSDataById,
          history = _this$props.history,
          item = _this$props.item,
          _this$props$singleAss = _this$props.singleAssessmentByStatus,
          singleAssessmentByStatus = _this$props$singleAss === undefined ? [] : _this$props$singleAss;
      var _this2 = _this,
          downloadReceipt = _this2.downloadReceipt;

      var callReciept = function callReciept() {
        var isEmployeeReceipt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        item.consumerCode = item.propertyId;
        downloadReceipt(item, generalMDMSDataById, isEmployeeReceipt, imageUrl);
      };
      switch (payload) {
        case "Re-Assess":
          history && history.push((0, _formUtils.getPropertyLink)(item.propertyId, item.tenantId, "reassess", item.financialYear, item.latestAssessmentNumber));
          break;
        case "Download Receipt":
          //Need 1. Property, 2. Property Details, 3. receiptdetails
          //&& assessment.receiptInfo.status == "Paid"
          // call receiptcreate func
          callReciept();

          break;
        case "Download Citizen Receipt":
          callReciept();
          break;
        case "Download Employee Receipt":
          callReciept(true);

          break;
        case "Complete Payment":
          history && history.push((0, _formUtils.getPropertyLink)(item.propertyId, item.tenantId, "assess", item.financialYear, item.assessmentNo, true));
          break;
      }
    }, _this.downloadReceipt = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item, generalMDMSDataById, isEmployeeReceipt, imageUrl) {
        var queryObj, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryObj = [{ key: "tenantId", value: item.tenantId }, { key: "consumerCode", value: item.consumerCode }]; //todo Consumer code uniqueness

                _context.prev = 1;
                _context.next = 4;
                return (0, _api.httpRequest)("/collection-services/receipts/_search", "_search", queryObj, {}, [], { ts: 0 });

              case 4:
                payload = _context.sent;

                // const lastAmount = payload && payload.Receipt && get(payload.Receipt[0], "Bill[0].billDetails[0].totalAmount");
                // const totalAmountBeforeLast =
                //   payload &&
                //   payload.Receipt &&
                //   payload.Receipt.reduce((acc, curr, index) => {
                //     if (index !== 0) {
                //       acc += get(curr, "Bill[0].billDetails[0].amountPaid");
                //     }
                //     return acc;
                //   }, 0);
                // const totalAmountToPay = lastAmount + totalAmountBeforeLast;
                // const totalAmountPaid =
                //   payload &&
                //   payload.Receipt &&
                //   payload.Receipt.reduce((acc, curr) => {
                //     acc += get(curr, "Bill[0].billDetails[0].amountPaid");
                //     return acc;
                //   }, 0);
                payload.Receipt.forEach(function (receipt) {
                  if (item.propertyDetails.receiptInfo.fromPeriod == receipt.Bill[0].billDetails[0].fromPeriod) {
                    var receiptDetails = payload && payload.Receipt && (0, _createReceipt.createReceiptDetails)(item.property, item.propertyDetails, receipt, item.localizationLabels, item.cities, (0, _get2.default)(receipt, "Bill[0].billDetails[0].totalAmount"), (0, _get2.default)(receipt, "Bill[0].billDetails[0].amountPaid"));
                    (0, _localStorageUtils.localStorageSet)("rd-propertyId", item.propertyId);
                    (0, _localStorageUtils.localStorageSet)("rd-assessmentNumber", item.propertyDetails.assessmentNumber);
                    receiptDetails && (0, _receipt2.default)("pt-reciept-citizen", receiptDetails, generalMDMSDataById, imageUrl, isEmployeeReceipt, { itemData: item, property: item.property, receipt: payload.Receipt });
                  }
                });

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);

                console.log(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this3, [[1, 8]]);
      }));

      return function (_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DropDown, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var item = this.props.item;
      var imageUrl = this.state.imageUrl;

      var userType = (0, _localStorageUtils.getUserInfo)() && JSON.parse((0, _localStorageUtils.getUserInfo)()).type;
      return _react2.default.createElement(
        "div",
        { style: { float: 'right' } },
        _react2.default.createElement(
          _SelectField2.default,
          {
            autoWidth: true,
            className: "pt-action-dropDown",
            hintText: _react2.default.createElement(_translationNode2.default, { label: "PT_SELECT_ACTION" }),
            underlineStyle: styles.underlineStyle,
            iconStyle: styles.iconStyle,
            style: styles.customWidth,
            hintStyle: styles.hintStyle,
            onChange: function onChange(event, key, payload) {
              return _this4.onSelectFieldChange(event, key, payload, imageUrl);
            }
          },
          userType === "CITIZEN" && item.status !== "Pending" && _react2.default.createElement(_MenuItem2.default, { value: "Download Receipt", primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_DOWNLOAD_RECEIPT" }) }),
          userType === "EMPLOYEE" && item.status !== "Pending" && _react2.default.createElement(_MenuItem2.default, { value: "Download Citizen Receipt", primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_DOWNLOAD_CITIZEN_RECEIPT" }) }),
          userType === "EMPLOYEE" && item.status !== "Pending" && _react2.default.createElement(_MenuItem2.default, { value: "Download Employee Receipt", primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_DOWNLOAD_EMPLOYEE_RECEIPT" }) }),
          (item.status === "Paid" || item.status === "Partially Paid" || item.status === "Pending") && _react2.default.createElement(_MenuItem2.default, { value: "Re-Assess", primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_RE_ASSESS" }) }),
          item.status === "Pending" && _react2.default.createElement(_MenuItem2.default, { value: "Complete Payment", primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_COMPLETE_PAYMENT" }) }),
          item.status === "Partially Paid" && _react2.default.createElement(_MenuItem2.default, { value: "Complete Payment", primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_COMPLETE_PAYMENT" }) })
        )
      );
    }
  }]);
  return DropDown;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var properties = state.properties;

  var _ref3 = properties || {},
      _ref3$singleAssessmen = _ref3.singleAssessmentByStatus,
      singleAssessmentByStatus = _ref3$singleAssessmen === undefined ? [] : _ref3$singleAssessmen;

  return {
    singleAssessmentByStatus: singleAssessmentByStatus
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(DropDown);