"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _RenderScreen = require("egov-ui-framework/ui-molecules/RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _utils = require("../../ui-config/screens/specs/utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicMdmsContainer = function (_Component) {
  (0, _inherits3.default)(DynamicMdmsContainer, _Component);

  function DynamicMdmsContainer() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DynamicMdmsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DynamicMdmsContainer.__proto__ || Object.getPrototypeOf(DynamicMdmsContainer)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      var _this$props = _this.props,
          state = _this$props.state,
          moduleName = _this$props.moduleName,
          rootBlockSub = _this$props.rootBlockSub;

      var isMdmsApiTrigger = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.apiTriggered");
      var isMdmsData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms." + moduleName + "." + rootBlockSub + ".MdmsJson");
      !isMdmsData && !isMdmsApiTrigger && _this.triggerInitilaApi();
    }, _this.triggerInitilaApi = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this$props2, rootBlockSub, state, moduleName, masterName, filter, dispatch, callBackEdit, isDependency, dropdownFields, _this$props2$index, index, isDependencyCheck, reqObj;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props2 = _this.props, rootBlockSub = _this$props2.rootBlockSub, state = _this$props2.state, moduleName = _this$props2.moduleName, masterName = _this$props2.masterName, filter = _this$props2.filter, dispatch = _this$props2.dispatch, callBackEdit = _this$props2.callBackEdit, isDependency = _this$props2.isDependency, dropdownFields = _this$props2.dropdownFields, _this$props2$index = _this$props2.index, index = _this$props2$index === undefined ? 0 : _this$props2$index;
              isDependencyCheck = isDependency ? (0, _get2.default)(state.screenConfiguration.preparedFinalObject, isDependency, false) : true;

              if (!isDependencyCheck) {
                _context.next = 9;
                break;
              }

              reqObj = {
                setPath: "DynamicMdms." + moduleName + "." + rootBlockSub + ".MdmsJson",
                setTransformPath: "DynamicMdms." + moduleName + "." + rootBlockSub + "." + rootBlockSub + "Transformed",
                dispatchPath: "DynamicMdms." + moduleName + "." + rootBlockSub,
                moduleName: moduleName,
                name: masterName,
                rootBlockSub: rootBlockSub,
                filter: filter
              };

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.apiTriggered", true));
              _context.next = 7;
              return (0, _commons.getMdmsJson)(state, dispatch, reqObj);

            case 7:
              _this.triggerCallback(null, null, null);
              if ((0, _commons.getQueryArg)(window.location.href, "action") == "edit" || (0, _commons.getQueryArg)(window.location.href, "action") == "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "applicationNumber") != null || (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DYNAMIC_MDMS_Trigger", false)) {
                callBackEdit(state, dispatch);
              } else {
                dropdownFields && dropdownFields.forEach(function (entry, i) {
                  if (entry.defaultValue) {
                    var componentJSONPath = "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + entry.key;
                    _this.onFieldChange('', componentJSONPath, '', entry.defaultValue);
                  }
                });
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.onFieldChange = function (screenKey, componentJsonpath, property, value) {
      var _this$props3 = _this.props,
          dispatch = _this$props3.dispatch,
          dropdownFields = _this$props3.dropdownFields,
          moduleName = _this$props3.moduleName,
          rootBlockSub = _this$props3.rootBlockSub,
          _this$props3$index = _this$props3.index,
          index = _this$props3$index === undefined ? 0 : _this$props3$index;

      value = value === null ? "none" : value;
      dispatch((0, _actions.prepareFinalObject)(componentJsonpath, value));
      var isIndex = null;
      if (componentJsonpath) {
        var last = componentJsonpath.substring(componentJsonpath.lastIndexOf(".") + 1, componentJsonpath.length);
        isIndex = dropdownFields && dropdownFields.findIndex(function (row) {
          return row.key == last;
        });
        dropdownFields && dropdownFields.forEach(function (entry, i) {
          var key = entry.key;

          if (isIndex < i) {
            var removeValuePath = "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key;
            dispatch((0, _actions.prepareFinalObject)(removeValuePath, 'none'));
          }
        });
        _this.triggerCallback(componentJsonpath, value, isIndex);
      }
    }, _this.getLocalTextFromCode = function (localCode) {
      return JSON.parse((0, _localStorageUtils.getLocalization)("localization_" + (0, _localStorageUtils.getLocale)())).find(function (item) {
        return item.code === localCode;
      });
    }, _this.getValueByKey = function (key) {
      var _this$props4 = _this.props,
          state = _this$props4.state,
          rootBlockSub = _this$props4.rootBlockSub,
          moduleName = _this$props4.moduleName;

      if (key) {
        return (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms." + moduleName + "." + rootBlockSub + "." + rootBlockSub + key);
      } else {
        return (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms." + moduleName + "." + rootBlockSub + "." + rootBlockSub + "Transformed", []);
      }
    }, _this.setValueByKey = function (key, dropdownData) {
      var _this$props5 = _this.props,
          rootBlockSub = _this$props5.rootBlockSub,
          moduleName = _this$props5.moduleName,
          dispatch = _this$props5.dispatch,
          _this$props5$index = _this$props5.index,
          index = _this$props5$index === undefined ? 0 : _this$props5$index;

      dispatch((0, _actions.prepareFinalObject)("DynamicMdms." + moduleName + "." + rootBlockSub + "." + key + "Transformed.allDropdown[" + index + "]", dropdownData));
    }, _this.triggerValueByKey = function (keyValue, index) {
      var dropdownFields = _this.props.dropdownFields;

      var dropdownData = [];
      var transformedData = _this.getValueByKey(keyValue);
      if (keyValue && keyValue.match(/\./g).length == index - 1) {
        transformedData = undefined;
      }
      dropdownData = dropdownFields.length - 1 == index ? (0, _commons.getObjectValues)(transformedData) : (0, _commons.getObjectKeys)(transformedData);
      if (transformedData == undefined) {
        for (var j = index; j < dropdownFields.length; j++) {
          _this.setValueByKey(dropdownFields[j].key, transformedData);
        }
      } else {
        _this.setValueByKey(dropdownFields[index].key, dropdownData);
      }
    }, _this.getSelectedPathValues = function () {
      var _this$props6 = _this.props,
          dropdownFields = _this$props6.dropdownFields,
          rootBlockSub = _this$props6.rootBlockSub,
          moduleName = _this$props6.moduleName,
          state = _this$props6.state,
          dispatch = _this$props6.dispatch,
          _this$props6$index = _this$props6.index,
          index = _this$props6$index === undefined ? 0 : _this$props6$index;

      var allValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]");
      var pathValues = [];
      allValues && dropdownFields && dropdownFields.forEach(function (entry, i) {
        allValues[entry.key] && allValues[entry.key] != 'none' && pathValues.push(allValues[entry.key]);
      });
      return pathValues.join(".");
    }, _this.triggerCallback = function (componentJsonpath, value, isIndex) {
      var _this$props7 = _this.props,
          dropdownFields = _this$props7.dropdownFields,
          rootBlockSub = _this$props7.rootBlockSub,
          moduleName = _this$props7.moduleName,
          state = _this$props7.state,
          dispatch = _this$props7.dispatch,
          _this$props7$index = _this$props7.index,
          index = _this$props7$index === undefined ? 0 : _this$props7$index;

      var keyValue = null;
      var transformedValue = _this.getSelectedPathValues();
      if (isIndex == 0 || isIndex) {
        keyValue = "Transformed." + transformedValue;
      } else {
        _this.triggerValueByKey(null, 0);
      }
      if (componentJsonpath) {
        dropdownFields.length > isIndex + 1 && _this.triggerValueByKey(keyValue, isIndex + 1);
        var reqObj = {
          moduleName: moduleName, rootBlockSub: rootBlockSub, keyValue: keyValue, value: value, state: state, dispatch: dispatch, index: index
        };
        typeof dropdownFields[isIndex].callBack == "function" && dropdownFields[isIndex].callBack(reqObj);
      }
    }, _this.checkValueExists = function (path) {
      var state = _this.props.state;

      var isValid = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject." + path, '');
      if (isValid == '' || isValid == 'none') {
        return true;
      }
      return false;
    }, _this.formDropDown = function () {
      var _this$props8 = _this.props,
          dropdownFields = _this$props8.dropdownFields,
          moduleName = _this$props8.moduleName,
          masterName = _this$props8.masterName,
          rootBlockSub = _this$props8.rootBlockSub,
          _this$props8$index = _this$props8.index,
          index = _this$props8$index === undefined ? 0 : _this$props8$index,
          state = _this$props8.state;

      var allObj = {};
      var moduleNameCaps = moduleName.toUpperCase();
      var masterNameCaps = masterName.toUpperCase();
      var gridSm = 12 / dropdownFields.length <= 4 ? 4 : 6;
      dropdownFields && dropdownFields.forEach(function (entry, i) {
        var _props;

        var key = entry.key,
            fieldType = entry.fieldType,
            isDisabled = entry.isDisabled,
            className = entry.className,
            _entry$isRequired = entry.isRequired,
            isRequired = _entry$isRequired === undefined ? false : _entry$isRequired,
            _entry$requiredValue = entry.requiredValue,
            requiredValue = _entry$requiredValue === undefined ? false : _entry$requiredValue;

        isRequired = isRequired ? _this.checkValueExists("DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key) : false;
        requiredValue = requiredValue == false ? isRequired : requiredValue;
        var helperMsg = "Required";
        if ((0, _localStorageUtils.getLocale)() == "hi_IN") {
          helperMsg = "आवश्यक प्रविष्टि";
        }

        allObj[key] = fieldType == "autosuggest" ? {
          uiFramework: "custom-containers",
          componentPath: "AutosuggestContainer",
          jsonPath: "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key,
          componentJsonpath: "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key,
          required: isRequired,
          helperText: isRequired ? helperMsg : '',
          gridDefination: {
            xs: 12,
            sm: gridSm
          },
          props: (_props = {
            style: {
              width: "100%",
              cursor: "pointer"
            },
            className: className,
            label: {
              labelKey: moduleNameCaps + '_' + key.toUpperCase() + '_LABEL'
            },

            placeholder: {
              labelKey: moduleNameCaps + '_' + key.toUpperCase() + "_PLACEHOLDER"
            },
            jsonPath: "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key,
            sourceJsonPath: "DynamicMdms." + moduleName + "." + rootBlockSub + "." + key + "Transformed.allDropdown[" + index + "]",
            setDataInField: true,
            labelsFromLocalisation: true,
            localePrefix: {
              moduleName: moduleNameCaps,
              masterName: masterNameCaps
            },
            fullwidth: true,
            isClearable: true,
            required: isRequired
          }, (0, _defineProperty3.default)(_props, "required", requiredValue), (0, _defineProperty3.default)(_props, "disabled", isDisabled ? isDisabled : false), (0, _defineProperty3.default)(_props, "helperText", isRequired ? helperMsg : ''), (0, _defineProperty3.default)(_props, "inputLabelProps", {
            shrink: true
          }), _props)
        } : (0, _extends3.default)({}, (0, _utils.getSelectField)({
          label: {
            labelKey: moduleNameCaps + '_' + key.toUpperCase() + '_LABEL'
          },
          placeholder: {
            labelKey: moduleNameCaps + '_' + key.toUpperCase() + "_PLACEHOLDER"
          },
          required: requiredValue,
          jsonPath: "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key,
          componentJsonpath: "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + index + "]." + key,
          localePrefix: {
            moduleName: moduleNameCaps,
            masterName: masterNameCaps
          },
          moduleName: moduleNameCaps,
          props: {
            setDataInField: true,
            className: "applicant-details-error",
            disabled: isDisabled ? isDisabled : false
          },
          sourceJsonPath: "DynamicMdms." + moduleName + "." + rootBlockSub + "." + key + "Transformed.allDropdown[" + index + "]",
          gridDefination: {
            xs: 12,
            sm: gridSm
          }
        }));
        //Populate first drop down data if not available 
        if (i == 0) {
          var isCheckData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms." + moduleName + "." + rootBlockSub + "." + key + "Transformed.allDropdown[" + index + "]");
          !isCheckData && _this.triggerValueByKey(null, 0);
        }
      });
      return allObj;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DynamicMdmsContainer, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      var _props2 = this.props,
          state = _props2.state,
          moduleName = _props2.moduleName,
          rootBlockSub = _props2.rootBlockSub;

      var isMdmsApiTrigger = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.apiTriggered");
      var isMdmsData = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms." + moduleName + "." + rootBlockSub + ".MdmsJson");
      !isMdmsData && !isMdmsApiTrigger && this.triggerInitilaApi();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_RenderScreen2.default, {
        components: this.formDropDown(),
        onFieldChange: this.onFieldChange
      });
    }
  }]);
  return DynamicMdmsContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var _preparedFinalObject$ = preparedFinalObject.DynamicMdms,
      DynamicMdms = _preparedFinalObject$ === undefined ? {} : _preparedFinalObject$;
  var dropdownFields = ownprops.dropdownFields,
      moduleName = ownprops.moduleName,
      rootBlockSub = ownprops.rootBlockSub,
      _ownprops$index = ownprops.index,
      index = _ownprops$index === undefined ? 0 : _ownprops$index;

  var newFields = dropdownFields && dropdownFields.map(function (entry, i) {
    var key = entry.key;

    var moduleName1 = DynamicMdms[moduleName] || {};
    var rootBlockSub1 = moduleName1[rootBlockSub] || {};
    var key1 = rootBlockSub1[key + "Transformed"] || {};

    var allDropdown1 = key1['allDropdown'] || [];
    return { moduleName1: moduleName1, rootBlockSub1: rootBlockSub1, key1: key1, allDropdown1: allDropdown1 };
  });
  return { state: state, DynamicMdms: DynamicMdms, newFields: newFields };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(DynamicMdmsContainer);