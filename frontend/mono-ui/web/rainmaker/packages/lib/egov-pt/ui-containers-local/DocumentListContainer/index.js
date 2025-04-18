"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _styles = require("@material-ui/core/styles");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiMoleculesLocal = require("../../ui-molecules-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none !important"
    }
  };
};

var DocumentListContainer = function (_Component) {
  (0, _inherits3.default)(DocumentListContainer, _Component);

  function DocumentListContainer() {
    (0, _classCallCheck3.default)(this, DocumentListContainer);
    return (0, _possibleConstructorReturn3.default)(this, (DocumentListContainer.__proto__ || Object.getPrototypeOf(DocumentListContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(DocumentListContainer, [{
    key: "render",
    value: function render() {
      var rest = (0, _objectWithoutProperties3.default)(this.props, []);

      return _react2.default.createElement(_uiMoleculesLocal.DocumentList, rest);
    }
  }]);
  return DocumentListContainer;
}(_react.Component);
// parentValue


var filterDropdownFunction = function filterDropdownFunction(rowObject, preparedFinalObject, filterConditon) {
  if (!filterConditon) {
    return true;
  } else {
    if (filterConditon.parentArrayJsonPath) {
      var returnValue = false;
      var objectArray = (0, _get2.default)(preparedFinalObject, filterConditon.parentArrayJsonPath, []);
      objectArray.map(function (object) {
        if (rowObject.parentValue.includes(object[filterConditon.parentJsonpath])) {
          returnValue = true;
        }
      });
      return returnValue;
    }
    var objectValue = (0, _get2.default)(preparedFinalObject, filterConditon.parentJsonpath, '');
    if (rowObject.parentValue.includes(objectValue)) {
      return true;
    } else {
      return false;
    }
  }
};
var filterFunction = function filterFunction(rowObject, preparedFinalObject, filterConditon) {
  if (!filterConditon) {
    return true;
  } else {
    if (filterConditon.onArray) {
      var returnValue = false;
      var objectArray = (0, _get2.default)(preparedFinalObject, filterConditon.jsonPath, []);
      if (filterConditon.arrayAttribute == "ownerType") {
        objectArray = objectArray.filter(function (object) {
          return !(object.isDeleted === false);
        });
      }

      objectArray.map(function (object) {
        if (!filterConditon.filterValue.includes(object[filterConditon.arrayAttribute])) {
          returnValue = true;
        }
      });
      return returnValue;
    }
    var objectValue = (0, _get2.default)(preparedFinalObject, filterConditon.jsonPath, '');
    if (!filterConditon.filterValue.includes(objectValue)) {
      return true;
    } else {
      return false;
    }
  }
};
var mapStateToProps = function mapStateToProps(state) {
  var preparedFinalObject = (0, _get2.default)(state, 'screenConfiguration.preparedFinalObject', {});
  var reasonForTransfer = (0, _get2.default)(preparedFinalObject, 'Property.additionalDetails.reasonForTransfer', '');
  var documentsList = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.documentsContract", []);
  documentsList.map(function (documentList) {
    documentList.cards.map(function (document) {
      if (document.code.includes("TRANSFERREASONDOCUMENT")) {
        document.dropdown.value = reasonForTransfer;
        document.dropdown.disabled = true;
      }
      document.dropdown.menu = document.dropdown.menu.filter(function (menu) {
        return filterDropdownFunction(menu, preparedFinalObject, document.dropdownFilter);
      });
      document.dropdown.menu.map(function (item, key) {
        document.dropdown.menu[key].name = item.label;
      });
    });
    documentList.cards = documentList.cards.filter(function (document) {
      return filterFunction(document, preparedFinalObject, document.filterCondition);
    });
  });
  return { documentsList: documentsList, preparedFinalObject: preparedFinalObject };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DocumentListContainer));