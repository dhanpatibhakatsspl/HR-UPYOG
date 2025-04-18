"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../ui-utils/commons");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginBottom: "16px"
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
      opacity: 0
    }
  };
};
var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px"
};
// const S3_BUCKET = {
//   endPoint: "filestore/v1/files"
// };

var DocumentList = function (_Component) {
  (0, _inherits3.default)(DocumentList, _Component);

  function DocumentList() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DocumentList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DocumentList.__proto__ || Object.getPrototypeOf(DocumentList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      uploadedDocIndex: 0,
      uploadedIndex: [],
      uploadedDocuments: []
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          prepareFinalObject = _this$props.prepareFinalObject,
          uploadedDocuments = _this$props.uploadedDocsInRedux,
          documents = _this$props.documents;

      if (uploadedDocuments && Object.keys(uploadedDocuments).length) {
        var simplified = Object.values(uploadedDocuments).map(function (item) {
          return item[0];
        });
        var uploadedDocumentsArranged = documents.reduce(function (acc, item, ind) {
          var index = simplified.findIndex(function (i) {
            return i.documentType === item.name;
          });
          !(0, _isUndefined2.default)(index) && (acc[ind] = [simplified[index]]);
          return acc;
        }, {});

        var uploadedIndex = Object.keys(uploadedDocumentsArranged).reduce(function (res, curr) {
          if (uploadedDocumentsArranged[curr].length > 0) {
            res.push(parseInt(curr)); //returns string so convert to integer
          }
          return res;
        }, []);
        _this.setState({
          uploadedDocuments: uploadedDocumentsArranged,
          uploadedIndex: uploadedIndex
        });
      }
      // getQueryArg(window.location.href, "action") !== "edit" &&
      //   Object.values(uploadedDocuments).forEach((item, index) => {
      //     prepareFinalObject(
      //       `Licenses[0].tradeLicenseDetail.applicationDocuments[${index}]`,
      //       { ...item[0] }
      //     );
      //   });
    }, _this.onUploadClick = function (uploadedDocIndex) {
      _this.setState({ uploadedDocIndex: uploadedDocIndex });
    }, _this.handleDocument = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file) {
        var _this$state, uploadedDocIndex, uploadedDocuments, _this$props2, prepareFinalObject, documents, tenantId, _documents$uploadedDo, jsonPath, name;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, uploadedDocIndex = _this$state.uploadedDocIndex, uploadedDocuments = _this$state.uploadedDocuments;
                _this$props2 = _this.props, prepareFinalObject = _this$props2.prepareFinalObject, documents = _this$props2.documents, tenantId = _this$props2.tenantId;
                _documents$uploadedDo = documents[uploadedDocIndex], jsonPath = _documents$uploadedDo.jsonPath, name = _documents$uploadedDo.name;

                uploadedDocuments = (0, _extends4.default)({}, uploadedDocuments, (0, _defineProperty3.default)({}, uploadedDocIndex, [{
                  fileName: file.name,
                  documentType: file.name
                }]));

                prepareFinalObject("LicensesTemp[0].uploadedDocsInRedux", (0, _extends4.default)({}, uploadedDocuments));
                prepareFinalObject(jsonPath, file);
                _this.setState({ uploadedDocuments: uploadedDocuments });
                _this.getFileUploadStatus(true, uploadedDocIndex);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.removeDocument = function (remDocIndex) {
      var uploadedDocuments = _this.state.uploadedDocuments;
      var _this$props3 = _this.props,
          prepareFinalObject = _this$props3.prepareFinalObject,
          documents = _this$props3.documents,
          preparedFinalObject = _this$props3.preparedFinalObject;

      var jsonPath = documents[remDocIndex].jsonPath;
      (0, _commons.getQueryArg)(window.location.href, "action") === "edit" && uploadedDocuments[remDocIndex][0].id && prepareFinalObject("LicensesTemp[0].removedDocs", [].concat((0, _toConsumableArray3.default)((0, _get2.default)(preparedFinalObject, "LicensesTemp[0].removedDocs", [])), [(0, _extends4.default)({}, uploadedDocuments[remDocIndex][0], {
        active: false
      })]));
      uploadedDocuments[remDocIndex] = [];
      prepareFinalObject(jsonPath, uploadedDocuments[remDocIndex]);
      prepareFinalObject("LicensesTemp[0].uploadedDocsInRedux", uploadedDocuments);
      _this.setState({ uploadedDocuments: uploadedDocuments });
      _this.getFileUploadStatus(false, remDocIndex);
    }, _this.getFileUploadStatus = function (status, index) {
      var uploadedIndex = _this.state.uploadedIndex;

      if (status) {
        uploadedIndex.push(index);
        _this.setState({ uploadedIndex: uploadedIndex });
      } else {
        var deletedIndex = uploadedIndex.findIndex(function (item) {
          return item === index;
        });
        uploadedIndex.splice(deletedIndex, 1);
        _this.setState({ uploadedIndex: uploadedIndex });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DocumentList, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          classes = _props.classes,
          documents = _props.documents,
          documentTypePrefix = _props.documentTypePrefix,
          description = _props.description;
      var uploadedIndex = this.state.uploadedIndex;

      return _react2.default.createElement(
        "div",
        { style: { paddingTop: 10 } },
        documents && documents.map(function (document, key) {
          return _react2.default.createElement(
            "div",
            {
              key: key,
              id: "document-upload-" + key,
              className: classes.documentContainer
            },
            _react2.default.createElement(
              _Grid2.default,
              { container: true },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6, sm: 6, align: "left" },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelName: documentTypePrefix + document.name,
                  labelKey: documentTypePrefix + document.name,
                  style: documentTitle
                }),
                document.required && _react2.default.createElement(
                  "sup",
                  { style: { color: "#E54D42" } },
                  "*"
                ),
                _react2.default.createElement(
                  _Typography2.default,
                  { variant: "caption" },
                  _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelName: description.labelName,
                    labelKey: description.labelKey
                  })
                )
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 12, sm: 5, align: "right" },
                _react2.default.createElement(_uiMoleculesLocal.UploadSingleFile, {
                  classes: _this3.props.classes,
                  id: "upload-button-" + key,
                  handleFileUpload: function handleFileUpload(e) {
                    return (0, _commons2.handleFileUpload)(e, _this3.handleDocument, _this3.props);
                  },
                  uploaded: uploadedIndex.indexOf(key) > -1,
                  removeDocument: function removeDocument() {
                    return _this3.removeDocument(key);
                  },
                  documents: _this3.state.uploadedDocuments[key],
                  onButtonClick: function onButtonClick() {
                    return _this3.onUploadClick(key);
                  },
                  inputProps: _this3.props.inputProps,
                  buttonLabel: _this3.props.buttonLabel
                })
              )
            )
          );
        })
      );
    }
  }]);
  return DocumentList;
}(_react.Component);

DocumentList.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

// const mapStateToProps = state => {
//   const { screenConfiguration } = state;
// const documents = get(
//   screenConfiguration.preparedFinalObject,
//   "LicensesTemp[0].applicationDocuments",
//   []
// );
// const tenantId = get(
//   screenConfiguration.preparedFinalObject,
//   "LicensesTemp[0].tenantId",
//   ""
// );
//   return { screenConfiguration };
// };

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(null, mapDispatchToProps)(DocumentList));