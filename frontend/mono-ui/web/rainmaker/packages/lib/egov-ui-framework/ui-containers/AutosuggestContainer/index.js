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

var _reactRedux = require("react-redux");

var _uiAtoms = require("../../ui-atoms");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const localizationLabels = JSON.parse(getLocalization("localization_en_IN"));
// const transfomedKeys = transformById(localizationLabels, "code");
var AutoSuggestor = function (_Component) {
  (0, _inherits3.default)(AutoSuggestor, _Component);

  function AutoSuggestor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoSuggestor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoSuggestor.__proto__ || Object.getPrototypeOf(AutoSuggestor)).call.apply(_ref, [this].concat(args))), _this), _this.onSelect = function (value) {
      var onChange = _this.props.onChange;
      //Storing multiSelect values not handled yet

      onChange({ target: { value: value ? value.value : null } });
    }, _this.shouldComponentUpdate = function (nextProps, nextState) {
      var _this$props = _this.props,
          value = _this$props.value,
          _this$props$suggestio = _this$props.suggestions,
          suggestions = _this$props$suggestio === undefined ? [] : _this$props$suggestio,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === undefined ? false : _this$props$disabled,
          locale = _this$props.locale,
          required = _this$props.required;
      var valueNew = nextProps.value,
          _nextProps$suggestion = nextProps.suggestions,
          suggestionsNew = _nextProps$suggestion === undefined ? [] : _nextProps$suggestion,
          _nextProps$disabled = nextProps.disabled,
          disabledNew = _nextProps$disabled === undefined ? false : _nextProps$disabled,
          localeNew = nextProps.locale,
          requiredNew = nextProps.required;

      if (locale != localeNew || value != valueNew || disabled != disabledNew || required != requiredNew || Array.isArray(suggestionsNew) != Array.isArray(suggestions) || suggestions.length != suggestionsNew.length) {
        return true;
      }
      return false;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoSuggestor, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          value = _props.value,
          preparedFinalObject = _props.preparedFinalObject,
          label = _props.label,
          placeholder = _props.placeholder,
          suggestions = _props.suggestions,
          className = _props.className,
          localizationLabels = _props.localizationLabels,
          labelsFromLocalisation = _props.labelsFromLocalisation,
          required = _props.required,
          errorText = _props.errorText,
          disabled = _props.disabled,
          localePrefix = _props.localePrefix,
          _props$defaultSort = _props.defaultSort,
          defaultSort = _props$defaultSort === undefined ? true : _props$defaultSort,
          rest = (0, _objectWithoutProperties3.default)(_props, ["value", "preparedFinalObject", "label", "placeholder", "suggestions", "className", "localizationLabels", "labelsFromLocalisation", "required", "errorText", "disabled", "localePrefix", "defaultSort"]);

      var translatedLabel = (0, _commons.getLocaleLabels)(label.labelName, label.labelKey, localizationLabels);
      var translatedPlaceholder = (0, _commons.getLocaleLabels)(placeholder.labelName, placeholder.labelKey, localizationLabels);
      //For multiSelect to be enabled, pass isMultiSelect=true in props.


      //To fetch corresponding labels from localisation for the suggestions, if needed.
      if (labelsFromLocalisation) {
        suggestions = getLocalisedSuggestions(JSON.parse(JSON.stringify(suggestions)), localePrefix, localizationLabels);
      }
      //To find correct option object as per the value (for showing the selected value).
      var selectedItem = (0, _commons.findItemInArrayOfObject)(suggestions, function (item) {
        if (item.code === value) {
          return true;
        } else return false;
      });
      //Make value object as the Autosuggest expects.
      if (selectedItem && selectedItem.name) {
        value = { label: selectedItem.name, value: selectedItem.code };
      }

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_uiAtoms.AutoSuggest, (0, _extends3.default)({
          onSelect: this.onSelect,
          suggestions: suggestions,
          value: value,
          className: className,
          label: translatedLabel,
          placeholder: translatedPlaceholder,
          helperText: required && errorText,
          error: errorText == "Required" && required,
          isClearable: true,
          defaultSort: defaultSort,
          required: required,
          disabled: disabled
        }, rest))
      );
    }
  }]);
  return AutoSuggestor;
}(_react.Component);

var getLocalisedSuggestions = function getLocalisedSuggestions(suggestions, localePrefix, transfomedKeys, defaultSort) {

  var result = suggestions && suggestions.length > 0 && Array.isArray(suggestions) && suggestions.map(function (option, key) {
    option.name = (0, _commons.getLocaleLabels)(option.code, localePrefix && !(0, _isEmpty2.default)(localePrefix) ? (0, _commons.appendModulePrefix)(option.code, localePrefix) : option.name, transfomedKeys);
    return option;
  }) || [];

  return defaultSort ? result && Array.isArray(result) && result.sort(_commons.sortDropdownNames) : result;
};

var getErrorText = function getErrorText(obj, id) {
  var keys = Object.keys(obj);
  var errorText = "";
  for (var i = 0; i < keys.length; i++) {
    if (obj[keys[i]].id == id) {
      errorText = obj[keys[i]].errorText;
      break;
    }
  }
  return errorText;
};

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var _state$app = state.app,
      localizationLabels = _state$app.localizationLabels,
      locale = _state$app.locale;
  var jsonPath = ownprops.jsonPath,
      value = ownprops.value,
      sourceJsonPath = ownprops.sourceJsonPath,
      labelsFromLocalisation = ownprops.labelsFromLocalisation,
      data = ownprops.data,
      localePrefix = ownprops.localePrefix,
      _ownprops$canFetchVal = ownprops.canFetchValueFromJsonpath,
      canFetchValueFromJsonpath = _ownprops$canFetchVal === undefined ? true : _ownprops$canFetchVal,
      helperText = ownprops.helperText,
      id = ownprops.id,
      formName = ownprops.formName,
      _ownprops$defaultSort = ownprops.defaultSort,
      defaultSort = _ownprops$defaultSort === undefined ? true : _ownprops$defaultSort;

  var errorText = helperText ? helperText : formName && state.form[formName] && state.form[formName].fields ? getErrorText(state.form[formName].fields, id) : "";
  var suggestions = data && data.length > 0 ? data : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, sourceJsonPath, []);
  if (canFetchValueFromJsonpath) {
    value = value ? value : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath) ? (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath) : (0, _get2.default)(state.common.prepareFormData, jsonPath);
  }

  return { value: value, jsonPath: jsonPath, suggestions: suggestions, localizationLabels: localizationLabels, errorText: errorText, locale: locale };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AutoSuggestor);