"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _MultiDownloadCard = require("../../ui-molecules-local/MultiDownloadCard");

var _MultiDownloadCard2 = _interopRequireDefault(_MultiDownloadCard);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownloadFileContainer = function (_Component) {
  (0, _inherits3.default)(DownloadFileContainer, _Component);

  function DownloadFileContainer() {
    (0, _classCallCheck3.default)(this, DownloadFileContainer);
    return (0, _possibleConstructorReturn3.default)(this, (DownloadFileContainer.__proto__ || Object.getPrototypeOf(DownloadFileContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(DownloadFileContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          data = _props.data,
          documentData = _props.documentData,
          bpaDetails = _props.bpaDetails,
          rest = (0, _objectWithoutProperties3.default)(_props, ["data", "documentData", "bpaDetails"]);

      var isValid = window.location.pathname.includes('apply');
      {
        if (isValid && documentData) {
          for (var key in documentData) {
            documentData[key].previewdocuments && documentData[key].previewdocuments.map(function (docs) {
              if (docs.wfState === "SEND_TO_CITIZEN") {
                docs.createdBy = "BPA_ARCHITECT";
              } else if (docs.wfState === "DOC_VERIFICATION_PENDING") {
                docs.createdBy = "BPA_DOC_VERIFIER";
              } else if (docs.wfState === "FIELDINSPECTION_PENDING") {
                docs.createdBy = "BPA_FIELD_INSPECTOR";
              } else if (docs.wfState === "NOC_VERIFICATION_PENDING") {
                docs.createdBy = "BPA_NOC_VERIFIER";
              } else {
                docs.createdBy = "BPA_ARCHITECT";
              }
              data.push(docs);
            });
          }
        }
      }
      return _react2.default.createElement(_MultiDownloadCard2.default, (0, _extends3.default)({ data: data, documentData: documentData }, rest));
    }
  }]);
  return DownloadFileContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;

  var data = (0, _get2.default)(screenConfiguration.preparedFinalObject, ownProps.sourceJsonPath, []);
  var documentData = (0, _get2.default)(screenConfiguration.preparedFinalObject, "documentDetailsUploadRedux", []);
  var bpaDetails = (0, _get2.default)(screenConfiguration.preparedFinalObject, "BPA", {});
  return { data: data, documentData: documentData, bpaDetails: bpaDetails };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(DownloadFileContainer);