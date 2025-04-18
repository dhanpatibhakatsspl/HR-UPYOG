"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _index = require("../../ui-config/screens/specs/utils/index.js");

var _MultiDocDetailCard = require("../../ui-molecules-local/MultiDocDetailCard");

var _MultiDocDetailCard2 = _interopRequireDefault(_MultiDocDetailCard);

var _UploadCard = require("../../ui-molecules-local/UploadCard");

var _UploadCard2 = _interopRequireDefault(_UploadCard);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreviewContainer = function (_Component) {
  (0, _inherits3.default)(PreviewContainer, _Component);

  function PreviewContainer(props) {
    (0, _classCallCheck3.default)(this, PreviewContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PreviewContainer.__proto__ || Object.getPrototypeOf(PreviewContainer)).call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        finalCardsforPreview = _this$props.finalCardsforPreview,
        rest = (0, _objectWithoutProperties3.default)(_this$props, ["finalCardsforPreview"]);

    _this.state = {
      uploadedDocIndex: 0,
      editableDocuments: null
    };
    return _this;
  }

  (0, _createClass3.default)(PreviewContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          finalCardsforPreview = _props.finalCardsforPreview,
          documentData = _props.documentData,
          nocDetails = _props.nocDetails,
          rest = (0, _objectWithoutProperties3.default)(_props, ["finalCardsforPreview", "documentData", "nocDetails"]);


      return _react2.default.createElement(
        "div",
        null,
        finalCardsforPreview && finalCardsforPreview.length > 0 && finalCardsforPreview.map(function (card, index) {
          return _react2.default.createElement(
            "div",
            null,
            _this2.getCard(card, index)
          );
        })
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.editableDocuments == null && props.finalCardsforPreview && props.finalCardsforPreview.length > 0 || state.editableDocuments != null && state.editableDocuments.length > 0 && props.finalCardsforPreview.length > 0 && state.editableDocuments.length != props.finalCardsforPreview.length) {
        state.editableDocuments = Array(props.finalCardsforPreview.length).fill({
          editable: false
        });
      }
    }
  }]);
  return PreviewContainer;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    uploadedDocIndex: 0,
    editableDocuments: null
  };

  this.getCard = function (card, key) {
    var _props2 = _this3.props,
        classes = _props2.classes,
        finalCardsforPreview = _props2.finalCardsforPreview,
        rest = (0, _objectWithoutProperties3.default)(_props2, ["classes", "finalCardsforPreview"]);

    if (_this3.state.editableDocuments) return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _this3.state.editableDocuments && _this3.state.editableDocuments.length > 0 && (_this3.state.editableDocuments[key].editable ? _react2.default.createElement(
        "div",
        { style: { backgroundColor: "rgb(255,255,255)", padding: "10px", marginTop: "16px" } },
        _react2.default.createElement(_UploadCard2.default, (0, _extends3.default)({
          docItem: card,
          docIndex: key,
          key: key.toString(),
          handleDocument: _this3.handleDocument,
          removeDocument: _this3.removeDocument,
          onUploadClick: _this3.onUploadClick,
          handleFileUpload: _this3.handleFileUpload,
          handleChange: _this3.handleChange,
          uploadedDocIndex: _this3.state.uploadedDocIndex,
          toggleEditClick: _this3.toggleEditClick,
          isFromPreview: true,
          jsonPath: "documentDetailsUploadRedux",
          specificStyles: "preview_upload_btn"
        }, rest))
      ) : _react2.default.createElement(_MultiDocDetailCard2.default, (0, _extends3.default)({
        docItem: card,
        docIndex: key,
        key: key.toString(),
        handleDocument: _this3.handleDocument,
        removeDocument: _this3.removeDocument,
        onUploadClick: _this3.onUploadClick,
        handleFileUpload: _this3.handleFileUpload,
        handleChange: _this3.handleChange,
        uploadedDocIndex: _this3.state.uploadedDocIndex,
        toggleEditClick: _this3.toggleEditClick
      }, rest)))
    );
  };

  this.onUploadClick = function (uploadedDocIndex) {
    _this3.setState({ uploadedDocIndex: uploadedDocIndex });
  };

  this.toggleEditClick = function (itemIndex) {
    var items = [].concat((0, _toConsumableArray3.default)(_this3.state.editableDocuments));
    var item = (0, _extends3.default)({}, items[itemIndex]);
    item.editable = item.editable ? false : true;
    items[itemIndex] = item;
    _this3.setState({ editableDocuments: items });
  };

  this.handleDocument = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file, fileStoreId) {
      var uploadedDocIndex, _props3, prepareFinalObject, documentDetailsUploadRedux, finalCardsforPreview, nocDetails, wfState, fileUrl, documentCode, documentMenu, appDocumentList, fileObj;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uploadedDocIndex = _this3.state.uploadedDocIndex;
              _props3 = _this3.props, prepareFinalObject = _props3.prepareFinalObject, documentDetailsUploadRedux = _props3.documentDetailsUploadRedux, finalCardsforPreview = _props3.finalCardsforPreview, nocDetails = _props3.nocDetails, wfState = _props3.wfState;
              _context.next = 4;
              return (0, _commons.getFileUrlFromAPI)(fileStoreId);

            case 4:
              fileUrl = _context.sent;
              documentCode = finalCardsforPreview[uploadedDocIndex].dropDownValues.value;

              if (!documentCode) {
                documentMenu = finalCardsforPreview[uploadedDocIndex].dropDownValues.menu;

                if (documentMenu && documentMenu.length > 0 && documentMenu.length == 1) {
                  documentCode = documentMenu[0].code;
                } else {
                  documentCode = finalCardsforPreview[uploadedDocIndex].documentCode;
                }
              }
              appDocumentList = [];
              fileObj = {
                fileName: file.name,
                name: file.name,
                fileStoreId: fileStoreId,
                fileUrl: Object.values(fileUrl)[0],
                isClickable: true,
                link: Object.values(fileUrl)[0],
                title: documentCode,
                documentType: documentCode,
                additionalDetails: {
                  uploadedBy: (0, _index.getLoggedinUserRole)(wfState),
                  uploadedTime: new Date().getTime()
                }

              };

              if (finalCardsforPreview[uploadedDocIndex] && finalCardsforPreview[uploadedDocIndex].documents) {
                finalCardsforPreview[uploadedDocIndex].documents.push(fileObj);
                appDocumentList = [].concat((0, _toConsumableArray3.default)(finalCardsforPreview));
              } else {
                finalCardsforPreview[uploadedDocIndex]["documents"] = [fileObj];
                appDocumentList = [].concat((0, _toConsumableArray3.default)(finalCardsforPreview));
              }
              if (Array.isArray(nocDetails)) {
                if (nocDetails.length > 0) {
                  if (nocDetails[0].documents) {
                    nocDetails[0].documents.push(fileObj);
                  } else {
                    nocDetails[0].documents = [fileObj];
                  }
                }
              } else {
                if (nocDetails.documents) {
                  nocDetails.documents.push(fileObj);
                } else {
                  nocDetails.documents = [fileObj];
                }
              }

              prepareFinalObject("Noc", nocDetails);
              prepareFinalObject("finalCardsforPreview", appDocumentList);
              prepareFinalObject("documentDetailsUploadRedux", appDocumentList);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this3);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.removeDocument = function (cardIndex, uploadedDocIndex) {
    var _props4 = _this3.props,
        prepareFinalObject = _props4.prepareFinalObject,
        finalCardsforPreview = _props4.finalCardsforPreview,
        nocDetails = _props4.nocDetails;

    var uploadedDocs = [];
    var fileTobeRemoved = finalCardsforPreview[cardIndex].documents[uploadedDocIndex];

    if (Array.isArray(nocDetails)) {
      if (nocDetails.length > 0) {
        uploadedDocs = nocDetails[0].documents;
        uploadedDocs = _this3.getFinalDocsAfterRemovingDocument(uploadedDocs);
        nocDetails[0].documents = uploadedDocs;
      }
    } else {
      uploadedDocs = nocDetails.documents;
      uploadedDocs = _this3.getFinalDocsAfterRemovingDocument(uploadedDocs, fileTobeRemoved);
      nocDetails.documents = uploadedDocs;
    }

    finalCardsforPreview[cardIndex].documents.splice(uploadedDocIndex, 1);

    prepareFinalObject("Noc", nocDetails);
    prepareFinalObject("finalCardsforPreview", finalCardsforPreview);
    prepareFinalObject("documentDetailsUploadRedux", finalCardsforPreview);

    _this3.forceUpdate();
  };

  this.getFinalDocsAfterRemovingDocument = function (docs, file) {
    for (var i = 0; i < docs.length; i++) {
      if (docs[i].fileStoreId == file.fileStoreId) {
        docs.splice(i, 1);
        break;
      }
    }
    return docs;
  };

  this.handleChange = function (key, event) {
    var _props5 = _this3.props,
        prepareFinalObject = _props5.prepareFinalObject,
        finalCardsforPreview = _props5.finalCardsforPreview;

    var appDocumentList = [];

    appDocumentList = [].concat((0, _toConsumableArray3.default)(finalCardsforPreview));
    appDocumentList[key].dropDownValues.value = event.target.value;
    prepareFinalObject("finalCardsforPreview", appDocumentList);
    prepareFinalObject("documentDetailsUploadRedux", appDocumentList);
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;


  var documentDetailsUploadRedux = (0, _get2.default)(screenConfiguration.preparedFinalObject, "documentDetailsUploadRedux", []);
  var finalCardsforPreview = (0, _get2.default)(screenConfiguration.preparedFinalObject, "finalCardsforPreview", []);

  var nocDetails = (0, _get2.default)(screenConfiguration.preparedFinalObject, "Noc", {});
  var wfState = (0, _get2.default)(screenConfiguration.preparedFinalObject.applicationProcessInstances, "state");

  return { documentDetailsUploadRedux: documentDetailsUploadRedux, finalCardsforPreview: finalCardsforPreview, nocDetails: nocDetails, wfState: wfState };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null)(PreviewContainer);