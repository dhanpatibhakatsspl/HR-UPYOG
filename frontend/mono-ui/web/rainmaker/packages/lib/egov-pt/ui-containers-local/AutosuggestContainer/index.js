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

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiAtomsLocal = require("../../ui-atoms-local");

var _commons2 = require("../../ui-utils/commons");

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
          required = _this$props.required,
          _this$props$localizat = _this$props.localizationLabels,
          localizationLabels = _this$props$localizat === undefined ? {} : _this$props$localizat;
      var valueNew = nextProps.value,
          _nextProps$suggestion = nextProps.suggestions,
          suggestionsNew = _nextProps$suggestion === undefined ? [] : _nextProps$suggestion,
          _nextProps$disabled = nextProps.disabled,
          disabledNew = _nextProps$disabled === undefined ? false : _nextProps$disabled,
          localeNew = nextProps.locale,
          requiredNew = nextProps.required,
          _nextProps$localizati = nextProps.localizationLabels,
          localizationLabelsNew = _nextProps$localizati === undefined ? {} : _nextProps$localizati;

      if (locale != localeNew || value != valueNew || disabled != disabledNew || required != requiredNew || Array.isArray(suggestionsNew) != Array.isArray(suggestions) || suggestions.length != suggestionsNew.length || Object.keys(localizationLabels).length != Object.keys(localizationLabelsNew).length) {}
      // return true

      // return false
      return true;
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
          localePrefix = _props.localePrefix,
          rest = (0, _objectWithoutProperties3.default)(_props, ["value", "preparedFinalObject", "label", "placeholder", "suggestions", "className", "localizationLabels", "labelsFromLocalisation", "localePrefix"]);

      var translatedLabel = (0, _commons.getLocaleLabels)(label.labelName, label.labelKey, localizationLabels);
      var translatedPlaceholder = (0, _commons.getLocaleLabels)(placeholder.labelName, placeholder.labelKey, localizationLabels);
      //For multiSelect to be enabled, pass isMultiSelect=true in props.

      //To fetch corresponding labels from localisation for the suggestions, if needed.
      if (labelsFromLocalisation) {
        suggestions = getLocalisedSuggestions(JSON.parse(JSON.stringify(suggestions)), localePrefix, localizationLabels);
      }
      //To find correct option object as per the value (for showing the selected value).
      var selectedItem = (0, _commons2.findItemInArrayOfObject)(suggestions, function (item) {
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
        _react2.default.createElement(_uiAtomsLocal.AutoSuggest, (0, _extends3.default)({
          onSelect: this.onSelect,
          suggestions: suggestions,
          value: value,
          className: className,
          label: translatedLabel,
          placeholder: translatedPlaceholder
        }, rest))
      );
    }
  }]);
  return AutoSuggestor;
}(_react.Component);

var getLocalisedSuggestions = function getLocalisedSuggestions(suggestions, localePrefix, transfomedKeys) {
  return suggestions && Array.isArray(suggestions) && suggestions.length > 0 && suggestions.map(function (option, key) {
    option.name = (0, _commons.getLocaleLabels)(option.code, localePrefix && !(0, _isEmpty2.default)(localePrefix) ? (0, _commons.appendModulePrefix)(option.code, localePrefix) : option.name, transfomedKeys);
    return option;
  }).sort(_commons.sortDropdownNames);
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
      localePrefix = ownprops.localePrefix;

  var suggestions = data && data.length > 0 ? data : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, sourceJsonPath, []);
  value = value ? value : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath);

  // console.log(value, suggestions);
  return { value: value, jsonPath: jsonPath, suggestions: suggestions, localizationLabels: localizationLabels, locale: locale };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AutoSuggestor);