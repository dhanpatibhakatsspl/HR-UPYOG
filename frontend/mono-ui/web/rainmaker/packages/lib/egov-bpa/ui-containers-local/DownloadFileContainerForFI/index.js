"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _MultiDownloadCard = require("../../ui-molecules-local/MultiDownloadCard");

var _MultiDownloadCard2 = _interopRequireDefault(_MultiDownloadCard);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.scss");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _MultiDocDetailCard = require("../../ui-molecules-local/MultiDocDetailCard");

var _MultiDocDetailCard2 = _interopRequireDefault(_MultiDocDetailCard);

var _groupBy = require("lodash/groupBy");

var _groupBy2 = _interopRequireDefault(_groupBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownloadFileContainerForFI = function (_React$Component) {
  (0, _inherits3.default)(DownloadFileContainerForFI, _React$Component);

  function DownloadFileContainerForFI() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DownloadFileContainerForFI);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DownloadFileContainerForFI.__proto__ || Object.getPrototypeOf(DownloadFileContainerForFI)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: []
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this$props, docs, documentData, bpaDetails, rest, fiDocumentsPreview, fileStoreIds, fileUrls, cards, documentCards;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, docs = _this$props.docs, documentData = _this$props.documentData, bpaDetails = _this$props.bpaDetails, rest = (0, _objectWithoutProperties3.default)(_this$props, ["docs", "documentData", "bpaDetails"]);
              fiDocumentsPreview = [];

              docs && docs.forEach(function (fiDoc) {
                fiDocumentsPreview.push({
                  documentCode: fiDoc.documentType.split('.')[0] + "_" + fiDoc.documentType.split('.')[1],
                  title: (0, _commons.getTransformedLocale)(fiDoc.documentType),
                  fileStoreId: fiDoc.fileStoreId,
                  linkText: "View",
                  additionalDetails: fiDoc.additionalDetails
                });
              });

              fileStoreIds = _jsonpath2.default.query(fiDocumentsPreview, "$.*.fileStoreId");

              if (!(fileStoreIds.length > 0)) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

            case 7:
              _context.t0 = _context.sent;
              _context.next = 11;
              break;

            case 10:
              _context.t0 = {};

            case 11:
              fileUrls = _context.t0;

              docs = fiDocumentsPreview.map(function (doc, index) {
                doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
                doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                return doc;
              });
              cards = [];
              documentCards = (0, _groupBy2.default)(docs, 'documentCode');

              documentCards && Object.keys(documentCards).map(function (doc) {
                var finalCard = {
                  documentCode: doc,
                  documents: documentCards[doc],
                  wfState: documentCards[doc].wfState,
                  readOnly: true
                };
                cards.push(finalCard);
              });
              _this.setState({ data: cards });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.getCard = function (card, key) {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_MultiDocDetailCard2.default, {
          docItem: card,
          docIndex: key,
          key: key.toString()
        })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DownloadFileContainerForFI, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          documentData = _props.documentData,
          bpaDetails = _props.bpaDetails,
          rest = (0, _objectWithoutProperties3.default)(_props, ["documentData", "bpaDetails"]);

      return _react2.default.createElement(
        "div",
        null,
        this.state.data && this.state.data.length > 0 && this.state.data.map(function (card, index) {
          return _react2.default.createElement(
            "div",
            null,
            _this3.getCard(card, index)
          );
        })
      );
    }
  }]);
  return DownloadFileContainerForFI;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;

  var docs = (0, _get2.default)(screenConfiguration.preparedFinalObject, ownProps.jsonPath, []);
  var documentData = (0, _get2.default)(screenConfiguration.preparedFinalObject, "documentDetailsUploadRedux", []);
  var bpaDetails = (0, _get2.default)(screenConfiguration.preparedFinalObject, "BPA", {});
  return { docs: docs, documentData: documentData, bpaDetails: bpaDetails };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(DownloadFileContainerForFI);