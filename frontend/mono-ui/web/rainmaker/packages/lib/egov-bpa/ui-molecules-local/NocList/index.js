"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends4 = require("babel-runtime/helpers/extends");

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _index = require("../../ui-config/screens/specs/utils/index.js");

var _UploadCard = require("../UploadCard");

var _UploadCard2 = _interopRequireDefault(_UploadCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themeStyles = function themeStyles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentSubCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "10px",
      border: "#d6d6d6",
      borderStyle: "solid",
      borderWidth: "1px"
    },
    documentIcon: {
      backgroundColor: "#FFFFFF",
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "0.83px",
      lineHeight: "24px"
    },
    documentSuccess: {
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39CB74",
      color: "white"
    },
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none"
    },
    iconDiv: {
      display: "flex",
      alignItems: "center"
    },
    descriptionDiv: {
      alignItems: "center",
      display: "block",
      marginTop: "20px"
    },
    formControl: {
      minWidth: 250,
      padding: "0px"
    },
    fileUploadDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingTop: "5px"
    }
  };
};

var styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  documentName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  },
  dropdownLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px"
  }
};

var requiredIcon = _react2.default.createElement(
  "sup",
  { style: { color: "#5b5b5b", fontSize: "12px", paddingLeft: "5px" } },
  "*"
);

var NocList = function (_Component) {
  (0, _inherits3.default)(NocList, _Component);

  function NocList() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, NocList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = NocList.__proto__ || Object.getPrototypeOf(NocList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      uploadedDocIndex: 0,
      nocDocumentsUploadRedux: []
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          documentsList = _this$props.documentsList,
          prepareFinalObject = _this$props.prepareFinalObject;
      var nocDocumentsUploadRedux = _this.state.nocDocumentsUploadRedux;

      var index = 0;
      documentsList.forEach(function (docType) {
        docType.cards && docType.cards.forEach(function (card) {
          if (card.subCards) {
            card.subCards.forEach(function (subCard) {
              var oldDocType = (0, _get2.default)(nocDocumentsUploadRedux, "[" + index + "].documentType");
              var oldDocCode = (0, _get2.default)(nocDocumentsUploadRedux, "[" + index + "].documentCode");
              var oldDocSubCode = (0, _get2.default)(nocDocumentsUploadRedux, "[" + index + "].documentSubCode");
              if (oldDocType != docType.code || oldDocCode != card.name || oldDocSubCode != subCard.name) {
                nocDocumentsUploadRedux[index] = {
                  documentType: docType.code,
                  documentCode: card.name,
                  documentSubCode: subCard.name
                };
              }
              index++;
            });
          } else {
            var oldDocType = (0, _get2.default)(nocDocumentsUploadRedux, "[" + index + "].documentType");
            var oldDocCode = (0, _get2.default)(nocDocumentsUploadRedux, "[" + index + "].documentCode");
            if (oldDocType != docType.code || oldDocCode != card.name) {
              nocDocumentsUploadRedux[index] = {
                documentType: docType.code,
                documentCode: card.name,
                isDocumentRequired: card.required,
                isDocumentTypeRequired: card.dropDownValues ? card.dropDownValues.required : false
              };
              if (card && card.dropDownValues && card.dropDownValues.menu && card.dropDownValues.menu.length == 1) {
                nocDocumentsUploadRedux[index].dropDownValues = {};
                nocDocumentsUploadRedux[index].dropDownValues.value = card.dropDownValues.menu[0].code;
              }
            }
            index++;
          }
        });
      });
      _this.setState((0, _extends5.default)({}, _this.state, { "nocDocumentsUploadRedux": nocDocumentsUploadRedux }));
    }, _this.prepareDocumentsInEmployee = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(nocDocuments, bpaDetails) {
        var documnts, finalDocs;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                documnts = [];

                if (nocDocuments) {
                  Object.keys(nocDocuments).forEach(function (key) {
                    if (nocDocuments && nocDocuments[key]) {
                      documnts.push(nocDocuments[key]);
                    }
                  });
                }

                finalDocs = [];

                if (documnts && documnts.length > 0) {
                  documnts.forEach(function (documents) {
                    if (documents && documents.documents && documents.dropDownValues && documents.dropDownValues.value) {
                      documents.documents.map(function (docs) {
                        var doc = {};
                        doc.documentType = documents.dropDownValues.value;
                        doc.fileStoreId = docs.fileStoreId;
                        doc.fileStore = docs.fileStoreId;
                        doc.fileName = docs.fileName;
                        doc.fileUrl = docs.fileUrl;
                        doc.isClickable = true;
                        doc.additionalDetails = docs.additionalDetails;
                        if (doc.id) {
                          doc.id = docs.id;
                        }
                        if (bpaDetails.additionalDetails) {

                          finalDocs.push(doc);
                        }
                      });
                    }
                  });
                  _this.props.dispatch((0, _actions.prepareFinalObject)(_this.props.jsonPath, finalDocs));
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.distinct = function (value, index, self) {
      return self.indexOf(value) === index;
    }, _this.onUploadClick = function (uploadedDocIndex) {
      _this.setState({ uploadedDocIndex: uploadedDocIndex });
    }, _this.handleDocument = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file, fileStoreId) {
        var _this$state, uploadedDocIndex, nocDocumentsUploadRedux, _this$props2, prepareFinalObject, bpaDetails, wfState, fileUrl, nocDocuments, isEmployee;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$state = _this.state, uploadedDocIndex = _this$state.uploadedDocIndex, nocDocumentsUploadRedux = _this$state.nocDocumentsUploadRedux;
                _this$props2 = _this.props, prepareFinalObject = _this$props2.prepareFinalObject, bpaDetails = _this$props2.bpaDetails, wfState = _this$props2.wfState;
                fileUrl = (0, _commons.getFileUrlFromAPI)(fileStoreId).then(fileUrl);
                nocDocuments = {};

                if (nocDocumentsUploadRedux[uploadedDocIndex] && nocDocumentsUploadRedux[uploadedDocIndex].documents) {
                  nocDocumentsUploadRedux[uploadedDocIndex].documents.push({
                    fileName: file.name,
                    fileStoreId: fileStoreId,
                    fileUrl: Object.values(fileUrl)[0],
                    isClickable: true,
                    additionalDetails: {
                      uploadedBy: (0, _index.getLoggedinUserRole)(wfState),
                      uploadedTime: new Date().getTime()
                    }
                  });
                  nocDocuments = (0, _extends5.default)({}, nocDocumentsUploadRedux);
                } else {
                  nocDocuments = (0, _extends5.default)({}, nocDocumentsUploadRedux, (0, _defineProperty3.default)({}, uploadedDocIndex, (0, _extends5.default)({}, nocDocumentsUploadRedux[uploadedDocIndex], {
                    documents: [{
                      fileName: file.name,
                      fileStoreId: fileStoreId,
                      fileUrl: Object.values(fileUrl)[0],
                      isClickable: true,
                      additionalDetails: {
                        uploadedBy: (0, _index.getLoggedinUserRole)(wfState),
                        uploadedTime: new Date().getTime()
                      }
                    }]
                  })));
                }

                _this.setState((0, _extends5.default)({}, _this.state, { "nocDocumentsUploadRedux": nocDocuments }));

                isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;


                if (isEmployee) {
                  _this.prepareDocumentsInEmployee(nocDocuments, bpaDetails);
                }

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.removeDocument = function (remDocIndex, docIndex) {
      var _this$props3 = _this.props,
          prepareFinalObject = _this$props3.prepareFinalObject,
          bpaDetails = _this$props3.bpaDetails;
      var nocDocumentsUploadRedux = _this.state.nocDocumentsUploadRedux;

      for (var key in nocDocumentsUploadRedux) {
        if (key === "" + remDocIndex) {
          nocDocumentsUploadRedux[key].documents.splice(docIndex, 1);
        }
      }
      _this.setState((0, _extends5.default)({}, _this.state, { "nocDocumentsUploadRedux": nocDocumentsUploadRedux }));
      _this.forceUpdate();
      var isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
      if (isEmployee) {
        _this.prepareDocumentsInEmployee(nocDocumentsUploadRedux, bpaDetails);
      }
    }, _this.handleChange = function (key, event) {
      var _this$props4 = _this.props,
          prepareFinalObject = _this$props4.prepareFinalObject,
          bpaDetails = _this$props4.bpaDetails;
      var nocDocumentsUploadRedux = _this.state.nocDocumentsUploadRedux;

      var nocDocuments = (0, _extends5.default)({}, nocDocumentsUploadRedux, (0, _defineProperty3.default)({}, key, (0, _extends5.default)({}, nocDocumentsUploadRedux[key], {
        dropDownValues: { value: event.target.value }
      })));
      _this.setState((0, _extends5.default)({}, _this.state, { "nocDocumentsUploadRedux": nocDocuments }));

      var isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;

      if (isEmployee) {
        _this.prepareDocumentsInEmployee(nocDocuments, bpaDetails);
      }
    }, _this.getUploadCard = function (card, key) {
      var _this$props5 = _this.props,
          classes = _this$props5.classes,
          rest = (0, _objectWithoutProperties3.default)(_this$props5, ["classes"]);
      var nocDocumentsUploadRedux = _this.state.nocDocumentsUploadRedux;

      var value = nocDocumentsUploadRedux[key] && nocDocumentsUploadRedux[key].dropDownValues ? nocDocumentsUploadRedux[key].dropDownValues.value : "";
      var jsonPath = _this.props.jsonPath + "-" + (key + 1);
      if (nocDocumentsUploadRedux[key]) {
        card.documents = nocDocumentsUploadRedux[key].documents;
        var mergedDropDownValue = (0, _extends5.default)({}, card.dropDownValues, nocDocumentsUploadRedux[key].dropDownValues);
        card.dropDownValues = mergedDropDownValue;
      }
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_UploadCard2.default, (0, _extends5.default)({
          docItem: card,
          docIndex: key,
          key: key.toString(),
          handleDocument: _this.handleDocument,
          removeDocument: _this.removeDocument,
          onUploadClick: _this.onUploadClick,
          handleFileUpload: _this.handleFileUpload,
          handleChange: _this.handleChange,
          uploadedDocIndex: _this.state.uploadedDocIndex,
          toggleEditClick: _this.toggleEditClick,
          ids: jsonPath,
          jsonPath: "nocDocumentsUploadRedux",
          specificStyles: "bpa_doc_upload_btn"
        }, rest))
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(NocList, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          classes = _props.classes,
          documentsList = _props.documentsList;

      var index = 0;
      return _react2.default.createElement(
        "div",
        null,
        documentsList && documentsList.map(function (container) {
          return _react2.default.createElement(
            "div",
            null,
            container.cards.map(function (card) {
              return _react2.default.createElement(
                "div",
                { className: classes.documentContainer },
                card.hasSubCards && _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelKey: card.name,
                  style: styles.documentTitle
                }),
                card.hasSubCards && card.subCards.map(function (subCard) {
                  return _react2.default.createElement(
                    "div",
                    { className: classes.documentSubCard },
                    _this3.getUploadCard(subCard, index++)
                  );
                }),
                !card.hasSubCards && _react2.default.createElement(
                  "div",
                  null,
                  _this3.getUploadCard(card, index++)
                )
              );
            })
          );
        })
      );
    }
  }]);
  return NocList;
}(_react.Component);

NocList.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var moduleName = screenConfiguration.moduleName;

  var bpaDetails = (0, _get2.default)(screenConfiguration.preparedFinalObject, "BPA", {});
  var wfState = (0, _get2.default)(screenConfiguration.preparedFinalObject.applicationProcessInstances, "state");
  return { moduleName: moduleName, bpaDetails: bpaDetails, wfState: wfState };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(themeStyles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NocList));