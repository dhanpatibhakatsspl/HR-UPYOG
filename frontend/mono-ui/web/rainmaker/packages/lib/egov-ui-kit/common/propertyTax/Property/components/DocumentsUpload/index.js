"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _actions2 = require("egov-ui-kit/redux/mdms/actions");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _DocumentListContainer = require("../../../../common/DocumentListContainer");

var _DocumentListContainer2 = _interopRequireDefault(_DocumentListContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentsUpload = function (_Component) {
  (0, _inherits3.default)(DocumentsUpload, _Component);

  function DocumentsUpload() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DocumentsUpload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DocumentsUpload.__proto__ || Object.getPrototypeOf(DocumentsUpload)).call.apply(_ref, [this].concat(args))), _this), _this.prepareDocumentsUploadData = function () {
      var documents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


      documents = documents.filter(function (item) {
        return item.active;
      });
      var documentsContract = [];
      var tempDoc = {};
      documents.forEach(function (doc) {
        var card = {};
        card["code"] = doc.documentType;
        card["title"] = doc.documentType;
        card["cards"] = [];
        tempDoc[doc.documentType] = card;
      });

      documents.forEach(function (doc) {
        // Handle the case for multiple muildings

        var card = {};
        card["name"] = doc.code;
        card["code"] = doc.code;
        card["required"] = doc.required ? true : false;
        // doc.additionalDetails=doc.additionalDetails?doc.additionalDetails:{};
        // doc.additionalDetails.enabledActions={};
        // doc.additionalDetails.enabledActions.assess={disableUpload:true,disableDropdown:true};
        // doc.additionalDetails.enabledActions.reassess={disableUpload:true,disableDropdown:true};
        // doc.additionalDetails.enabledActions.update={disableUpload:true,disableDropdown:true};
        // doc.additionalDetails.enabledActions.create={disableUpload:false,disableDropdown:false};
        if (doc.additionalDetails && doc.additionalDetails.filterCondition) {
          card["filterCondition"] = doc.additionalDetails.filterCondition;
        }
        if (doc.additionalDetails && doc.additionalDetails.dropdownFilter) {
          card["dropdownFilter"] = doc.additionalDetails.dropdownFilter;
        }
        if (doc.additionalDetails && doc.additionalDetails.enabledActions) {
          card["enabledActions"] = doc.additionalDetails.enabledActions;
        }
        if (doc.hasDropdown && doc.dropdownData) {
          var dropdown = {};
          dropdown.label = "PT_MUTATION_SELECT_DOC_LABEL";
          dropdown.required = true;
          dropdown.menu = doc.dropdownData.filter(function (item) {
            return item.active;
          });
          dropdown.menu = dropdown.menu.map(function (item) {
            var menuItem = { code: item.code, label: (0, _commons.getTransformedLocale)(item.code) };
            if (item.parentValue) {
              menuItem['parentValue'] = item.parentValue;
            }
            return (0, _extends3.default)({}, menuItem);
          });
          card["dropdown"] = dropdown;
        }
        tempDoc[doc.documentType].cards.push(card);
      });

      Object.keys(tempDoc).forEach(function (key) {
        documentsContract.push(tempDoc[key]);
      });

      _this.props.prepareFinalObject("documentsContract", documentsContract);
    }, _this.getMdmsData = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var tenantId, respo, _this$props$Documents, Documents;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              //  let tenantId = process.env.REACT_APP_NAME === "Employee" ?  getTenantId() : JSON.parse(getUserInfo()).permanentCity;
              tenantId = (0, _formUtils.getCommonTenant)();
              _context.next = 3;
              return _this.props.fetchDocuments(tenantId);

            case 3:
              respo = _context.sent;
              _this$props$Documents = _this.props.Documents, Documents = _this$props$Documents === undefined ? [] : _this$props$Documents;

              if (respo) {}

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DocumentsUpload, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.prepareFinalObject("documentsContract", []);
      this.getMdmsData();
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          Documents = _props.Documents,
          documentsContract = _props.documentsContract;

      if (Documents.length > 0 && documentsContract.length == 0) {
        this.prepareDocumentsUploadData(Documents);
      }
      var listProps = {
        documents: documentsContract,

        buttonLabel: {
          labelName: "UPLOAD FILE",
          labelKey: "PT_MUTATION_DOCUMENT_DETAILS_BUTTON_UPLOAD_FILE"
        },
        // description: "Only .jpg and .pdf files. 6MB max file size.",
        inputProps: {
          accept: "image/*, .pdf, .png, .jpeg"
        },
        maxFileSize: 5000
      };

      return _react2.default.createElement(_DocumentListContainer2.default, listProps);
    }
  }]);
  return DocumentsUpload;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration,
      mdms = state.mdms;
  var _screenConfiguration$ = screenConfiguration.preparedFinalObject,
      preparedFinalObject = _screenConfiguration$ === undefined ? {} : _screenConfiguration$;
  var _preparedFinalObject$ = preparedFinalObject.documentsContract,
      documentsContract = _preparedFinalObject$ === undefined ? [] : _preparedFinalObject$;
  var _mdms$applyScreenMdms = mdms.applyScreenMdmsData,
      applyScreenMdmsData = _mdms$applyScreenMdms === undefined ? {} : _mdms$applyScreenMdms;
  var _applyScreenMdmsData$ = applyScreenMdmsData.PropertyTax,
      PropertyTax = _applyScreenMdmsData$ === undefined ? {} : _applyScreenMdmsData$;
  var _PropertyTax$Document = PropertyTax.Documents,
      Documents = _PropertyTax$Document === undefined ? [] : _PropertyTax$Document;


  return { Documents: Documents, documentsContract: documentsContract };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    },
    fetchDocuments: function fetchDocuments(tenantId) {
      return dispatch((0, _actions2.fetchDocuments)(tenantId));
    }
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DocumentsUpload);