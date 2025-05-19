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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _styles = require("@material-ui/core/styles");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _NocDocDetailCard = require("../../ui-molecules-local/NocDocDetailCard");

var _NocDocDetailCard2 = _interopRequireDefault(_NocDocDetailCard);

var _NocData = require("../../ui-molecules-local/NocData");

var _NocData2 = _interopRequireDefault(_NocData);

var _UploadCard = require("../../ui-molecules-local/UploadCard");

var _UploadCard2 = _interopRequireDefault(_UploadCard);

var _index = require("../../ui-config/screens/specs/utils/index.js");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _utils = require("../../ui-config/screens/specs/utils");

var _api = require("../../ui-utils/api");

var _uiAtomsLocal = require("../../ui-atoms-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import MultiDocDetailCard from "../../ui-molecules-local/MultiDocDetailCard";

// import "./index.css";
var styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    marginBottom: 25,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 10
  },
  whiteCard: {
    // maxWidth: 250,
    width: "100%",
    backgroundColor: "#FFFFFF",
    // paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 3,
    paddingBottom: 10,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 16,
    // marginBottom:4,
    display: "inline-flex"
  },
  fontStyle: {
    fontSize: "12px",
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto"
    // width:150,
    // overflow: "hidden", 
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
    // marginLeft:"7px",
  },
  labelStyle: {
    position: "relative",
    fontFamily: "Roboto",
    fontSize: 14,
    letterSpacing: 0.6,
    padding: "5px 0px",
    display: "inline-block"
  },
  underlineStyle: {
    position: "absolute",
    bottom: -1,
    borderBottom: "2px solid #FE7A51",
    width: "100%"
  },
  dividerStyle: {
    borderBottom: "1px solid rgba(5, 5, 5, 0.12)",
    width: "100%"
  },
  documentContainer: {
    backgroundColor: "#FFFFFF",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  nocTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    wordBreak: "break-word",
    width: "90%",
    marginRight: "7px"
  },
  spanStyle: {
    paddingLeft: "2px"
  }
  // const LightTooltip = withStyles((theme) => ({
  //   tooltip: {
  //     fontSize: 12
  //   }
  // }))(Tooltip);
};
var NocDetailCard = function (_Component) {
  (0, _inherits3.default)(NocDetailCard, _Component);

  function NocDetailCard(props) {
    (0, _classCallCheck3.default)(this, NocDetailCard);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NocDetailCard.__proto__ || Object.getPrototypeOf(NocDetailCard)).call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        nocFinalCardsforPreview = _this$props.nocFinalCardsforPreview,
        rest = (0, _objectWithoutProperties3.default)(_this$props, ["nocFinalCardsforPreview"]);

    _this.state = {
      uploadedDocIndex: 0,
      editableDocuments: null
    };
    return _this;
  }

  (0, _createClass3.default)(NocDetailCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          nocFinalCardsforPreview = _props.nocFinalCardsforPreview,
          documentData = _props.documentData,
          Noc = _props.Noc,
          rest = (0, _objectWithoutProperties3.default)(_props, ["nocFinalCardsforPreview", "documentData", "Noc"]);

      return _react2.default.createElement(
        "div",
        null,
        nocFinalCardsforPreview && nocFinalCardsforPreview.length > 0 && nocFinalCardsforPreview.map(function (card, index) {
          return _react2.default.createElement(
            "div",
            { style: styles.documentTitle },
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                _Grid2.default,
                { container: true },
                _react2.default.createElement(
                  _Grid2.default,
                  { item: true, xs: 3 },
                  _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelKey: (0, _commons.getTransformedLocale)(card.nocType),
                    style: styles.nocTitle
                  }),
                  card.required && process.env.REACT_APP_NAME !== "Citizen" ? _react2.default.createElement(
                    "span",
                    { style: styles.spanStyle },
                    "*"
                  ) : ""
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { item: true, xs: 3 },
                  _react2.default.createElement(_uiAtomsLocal.LinkAtom, {
                    linkDetail: card.additionalDetails.linkDetails
                  })
                ),
                card.additionalDetails.nocNo ? _react2.default.createElement(
                  _Grid2.default,
                  { item: true, xs: 3 },
                  _react2.default.createElement(
                    _Typography2.default,
                    {
                      variant: "subtitle1",
                      style: { fontWeight: "bold", fontSize: "12px" }
                    },
                    _react2.default.createElement(_uiContainers.LabelContainer, {
                      labelKey: "BPA_APPROVAL_NUMBER_LABEL"
                    })
                  ),
                  card.additionalDetails.nocNo ? _react2.default.createElement(
                    "div",
                    { style: styles.fontStyle },
                    card.additionalDetails.nocNo
                  ) : "NA"
                ) : ""
              ),
              _react2.default.createElement(_NocData2.default, (0, _extends3.default)({
                docItem: card,
                docIndex: index,
                key: index.toString()
              }, rest))
            ),
            _react2.default.createElement(
              "div",
              null,
              _this2.getCard(card, index)
            )
          );
        })
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.editableDocuments == null && props.nocFinalCardsforPreview && props.nocFinalCardsforPreview.length > 0 || state.editableDocuments != null && state.editableDocuments.length > 0 && props.nocFinalCardsforPreview.length > 0 && state.editableDocuments.length != props.nocFinalCardsforPreview.length) {
        state.editableDocuments = Array(props.nocFinalCardsforPreview.length).fill({
          editable: false
        });
      }
    }
  }]);
  return NocDetailCard;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentDidMount = function () {
    var _props2 = _this3.props,
        documentsList = _props2.documentsList,
        _props2$nocDocumentDe = _props2.nocDocumentDetailsUploadRedux,
        nocDocumentDetailsUploadRedux = _props2$nocDocumentDe === undefined ? {} : _props2$nocDocumentDe,
        prepareFinalObject = _props2.prepareFinalObject;

    var index = 0;
    documentsList.forEach(function (docType) {
      docType.cards && docType.cards.forEach(function (card) {
        if (card.subCards) {
          card.subCards.forEach(function (subCard) {
            var oldDocType = (0, _get2.default)(nocDocumentDetailsUploadRedux, "[" + index + "].documentType");
            var oldDocCode = (0, _get2.default)(nocDocumentDetailsUploadRedux, "[" + index + "].documentCode");
            var oldDocSubCode = (0, _get2.default)(nocDocumentDetailsUploadRedux, "[" + index + "].documentSubCode");
            if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
              nocDocumentDetailsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                documentSubCode: subCard.name
              };
            }
            index++;
          });
        } else {
          var oldDocType = (0, _get2.default)(nocDocumentDetailsUploadRedux, "[" + index + "].documentType");
          var oldDocCode = (0, _get2.default)(nocDocumentDetailsUploadRedux, "[" + index + "].documentCode");
          if (oldDocType != docType.code || oldDocCode != card.name) {
            nocDocumentDetailsUploadRedux[index] = {
              documentType: docType.code,
              documentCode: card.name,
              isDocumentRequired: card.required,
              isDocumentTypeRequired: card.dropDownValues ? card.dropDownValues.required : false
            };
          }
          index++;
        }
      });
    });
    prepareFinalObject("nocDocumentDetailsUploadRedux", nocDocumentDetailsUploadRedux);
  };

  this.getCard = function (card, key) {
    var _props3 = _this3.props,
        classes = _props3.classes,
        nocFinalCardsforPreview = _props3.nocFinalCardsforPreview,
        rest = (0, _objectWithoutProperties3.default)(_props3, ["classes", "nocFinalCardsforPreview"]);

    if (_this3.state.editableDocuments) return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _this3.state.editableDocuments && _this3.state.editableDocuments.length > 0 && (_this3.state.editableDocuments[key].editable ? _react2.default.createElement(
        "div",
        { style: { backgroundColor: "rgb(255,255,255)", paddingRight: "10px", marginTop: "16px" } },
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
          jsonPath: "nocDocumentDetailsUploadRedux",
          ids: "nocDocumentDetailsUploadRedux",
          specificStyles: "preview_upload_btn"
        }, rest))
      ) : _react2.default.createElement(_NocDocDetailCard2.default, (0, _extends3.default)({
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
      var uploadedDocIndex, _props4, prepareFinalObject, nocDocumentDetailsUploadRedux, nocFinalCardsforPreview, Noc, wfState, fileUrl, documentCode, documentMenu, appDocumentList, fileObj;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              uploadedDocIndex = _this3.state.uploadedDocIndex;
              _props4 = _this3.props, prepareFinalObject = _props4.prepareFinalObject, nocDocumentDetailsUploadRedux = _props4.nocDocumentDetailsUploadRedux, nocFinalCardsforPreview = _props4.nocFinalCardsforPreview, Noc = _props4.Noc, wfState = _props4.wfState;
              _context.next = 4;
              return (0, _commons.getFileUrlFromAPI)(fileStoreId);

            case 4:
              fileUrl = _context.sent;
              documentCode = nocFinalCardsforPreview[uploadedDocIndex].dropDownValues.value;

              if (!documentCode) {
                documentMenu = nocFinalCardsforPreview[uploadedDocIndex].dropDownValues.menu;

                if (documentMenu && documentMenu.length > 0 && documentMenu.length == 1) {
                  documentCode = documentMenu[0].code;
                } else {
                  documentCode = nocFinalCardsforPreview[uploadedDocIndex].documentCode;
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

              if (nocFinalCardsforPreview[uploadedDocIndex] && nocFinalCardsforPreview[uploadedDocIndex].documents) {
                nocFinalCardsforPreview[uploadedDocIndex].documents.push(fileObj);
                appDocumentList = [].concat((0, _toConsumableArray3.default)(nocFinalCardsforPreview));
              } else {
                nocFinalCardsforPreview[uploadedDocIndex]["documents"] = [fileObj];
                appDocumentList = [].concat((0, _toConsumableArray3.default)(nocFinalCardsforPreview));
              }
              // if (Array.isArray(NOCData)) {
              //   if (NOCData.length > 0) {
              //     if (NOCData[0].documents) {
              //       NOCData[0].documents.push(fileObj);
              //     } else {
              //       NOCData[0].documents = [fileObj];
              //     }
              //   }
              // } else {
              //   if (NOCData.documents) {
              //     NOCData.documents.push(fileObj);
              //   } else {
              //     NOCData.documents = [fileObj];
              //   }
              // }
              // prepareFinalObject("NOCData", NOCData);

              prepareFinalObject("nocFinalCardsforPreview", appDocumentList);

              prepareFinalObject("nocDocumentDetailsUploadRedux", appDocumentList);
              // if(appDocumentList && appDocumentList.length > 0) {
              //   for(let data = 0; data < Noc.length; data ++) {
              //     Noc[data].documents = appDocumentList[data].documents
              //     let response = httpRequest(
              //       "post",
              //       "/noc-services/v1/noc/_update",
              //       "",
              //       [],
              //       { Noc: Noc[data] }
              //     );
              //   }

              // }
              // prepareFinalObject("Noc", Noc);

            case 12:
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
    var _props5 = _this3.props,
        prepareFinalObject = _props5.prepareFinalObject,
        nocFinalCardsforPreview = _props5.nocFinalCardsforPreview,
        Noc = _props5.Noc;

    var uploadedDocs = [];
    var fileTobeRemoved = nocFinalCardsforPreview[cardIndex].documents[uploadedDocIndex];

    // if (Array.isArray(Noc)) {
    //   if (Noc.length > 0) {
    //     uploadedDocs = Noc[0].documents;
    //     uploadedDocs = this.getFinalDocsAfterRemovingDocument(uploadedDocs, fileTobeRemoved);
    //     Noc[0].documents = uploadedDocs;
    //   }
    // } else {
    //   uploadedDocs = Noc.documents;
    //   uploadedDocs = this.getFinalDocsAfterRemovingDocument(
    //     uploadedDocs,
    //     fileTobeRemoved
    //   );
    //   Noc.documents = uploadedDocs;
    // }

    nocFinalCardsforPreview[cardIndex].documents.splice(uploadedDocIndex, 1);
    prepareFinalObject("Noc", Noc);
    //uploadedDocs.map()
    prepareFinalObject("nocFinalCardsforPreview", nocFinalCardsforPreview);
    prepareFinalObject("nocDocumentDetailsUploadRedux", nocFinalCardsforPreview);

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
    var _props6 = _this3.props,
        prepareFinalObject = _props6.prepareFinalObject,
        nocFinalCardsforPreview = _props6.nocFinalCardsforPreview;

    var appDocumentList = [];

    appDocumentList = [].concat((0, _toConsumableArray3.default)(nocFinalCardsforPreview));
    appDocumentList[key].dropDownValues.value = event.target.value;
    prepareFinalObject("nocFinalCardsforPreview", appDocumentList);
    prepareFinalObject("nocDocumentDetailsUploadRedux", appDocumentList);
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;

  var nocDocumentDetailsUploadRedux = (0, _get2.default)(screenConfiguration.preparedFinalObject, "nocDocumentDetailsUploadRedux", {});
  var documentsList = (0, _get2.default)(screenConfiguration.preparedFinalObject, "nocBPADocumentsContract", []);
  var nocFinalCardsforPreview = (0, _get2.default)(screenConfiguration.preparedFinalObject, ownProps.jsonPath, []);
  var Noc = (0, _get2.default)(screenConfiguration.preparedFinalObject, "Noc", []);
  var wfState = (0, _get2.default)(screenConfiguration.preparedFinalObject.applicationProcessInstances, "state");

  return { nocDocumentDetailsUploadRedux: nocDocumentDetailsUploadRedux, documentsList: documentsList, nocFinalCardsforPreview: nocFinalCardsforPreview, Noc: Noc, wfState: wfState };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};
exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NocDetailCard));