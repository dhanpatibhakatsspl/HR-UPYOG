"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _components = require("components");

var _reactRedux = require("react-redux");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _CustomSelectForm = require("../CustomSelectForm");

var _CustomSelectForm2 = _interopRequireDefault(_CustomSelectForm);

var _GenericForm = require("egov-ui-kit/common/GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloorDetails = function (_React$Component) {
  (0, _inherits3.default)(FloorDetails, _React$Component);

  function FloorDetails() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FloorDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FloorDetails.__proto__ || Object.getPrototypeOf(FloorDetails)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      floors: _this.cacheFloors ? _this.cacheFloors : []
    }, _this.configureFloors = function (props) {
      var noFloors = props.noFloors,
          componentDetails = props.componentDetails,
          disabled = props.disabled,
          form = props.form;

      var updatedFloors = [].concat((0, _toConsumableArray3.default)(Array(parseInt(noFloors)))).map(function (item, key) {
        var units = [];

        var unitKeys = Object.keys(form).filter(function (item) {
          return item.startsWith(componentDetails.copyName + "_" + key + "_unit_");
        });

        if (unitKeys.length === 0) {
          var formKey = componentDetails.copyName + "_" + key + "_unit_0";
          units.push({
            component: (0, _form2.default)((0, _extends3.default)({}, componentDetails, { copyName: formKey, disabled: disabled, isCoreConfiguration: true }))(_GenericForm2.default),
            formKey: formKey
          });
        } else {
          unitKeys.forEach(function (formKey, ind) {
            units.push({
              component: (0, _form2.default)((0, _extends3.default)({}, componentDetails, { copyName: formKey, disabled: disabled, isCoreConfiguration: true }))(_GenericForm2.default),
              formKey: formKey
            });
          });
        }
        return {
          floorId: key,
          floorDropDown: (0, _form2.default)({
            formKey: "customSelect",
            makeCopy: true,
            copyName: "customSelect_" + key,
            path: "PropertyTaxPay",
            disabled: disabled,
            isCoreConfiguration: true
          })(_CustomSelectForm2.default),
          units: units
        };
      });
      _this.setState({
        floors: noFloors > 0 ? [].concat((0, _toConsumableArray3.default)(updatedFloors)) : []
      });
    }, _this.renderFloors = function (floors, noFloors) {
      var _this2 = _this,
          renderUnits = _this2.renderUnits;
      var disabled = _this.props.disabled;


      return floors.map(function (floor, key) {
        var floorId = floor.floorId,
            FloorDropDown = floor.floorDropDown,
            units = floor.units;

        return _react2.default.createElement(_components.Card, {
          key: key,
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(FloorDropDown, { noFloors: noFloors, disabled: disabled }),
            _react2.default.createElement(
              "div",
              { className: "col-xs-12" },
              renderUnits(units, floorId)
            )
          )
        });
      });
    }, _this.handleAddUnit = function (floorIndex) {
      var _this$props = _this.props,
          componentDetails = _this$props.componentDetails,
          form = _this$props.form;
      var floors = _this.state.floors;

      var unitKeys = Object.keys(form).filter(function (key) {
        return key.startsWith("floorDetails_" + floorIndex + "_unit_");
      });
      var index = parseInt(unitKeys[unitKeys.length - 1].split("unit_")[1]);
      var formKey = componentDetails.copyName + "_" + floorIndex + "_unit_" + (index + 1);
      floors[floorIndex].units.push({
        component: (0, _form2.default)((0, _extends3.default)({}, componentDetails, { copyName: formKey, isCoreConfiguration: true }))(_GenericForm2.default),
        formKey: formKey
      });
      _this.setState({
        floors: floors
      });
    }, _this.handleRemoveUnit = function (floorIndex, unitIndex, formKey) {
      var floors = _this.state.floors;

      floors[floorIndex].units.splice(unitIndex, 1);
      _this.props.removeForm(formKey);
      _this.setState({
        floors: floors
      });
    }, _this.renderUnits = function (units, floorId) {
      var disabled = _this.props.disabled;
      var _this3 = _this,
          handleAddUnit = _this3.handleAddUnit,
          handleRemoveUnit = _this3.handleRemoveUnit;

      return _react2.default.createElement(
        "div",
        null,
        units.map(function (unit, key) {
          var Unit = unit.component;
          return _react2.default.createElement(Unit, {
            key: key,
            className: "grayout",
            handleRemoveItem: key !== 0 ? !disabled ? function () {
              return handleRemoveUnit(floorId, key, unit.formKey);
            } : undefined : undefined,
            disabled: disabled,
            formName: _react2.default.createElement(
              "div",
              { style: { display: "flex" } },
              _react2.default.createElement(_translationNode2.default, { label: "PT_UNIT" }),
              _react2.default.createElement(_translationNode2.default, { label: "-" }),
              _react2.default.createElement(_translationNode2.default, { label: "" + (key + 1) })
            )
          });
        }),
        !disabled && _react2.default.createElement(
          "div",
          { className: "pt-add-owner-btn", onClick: function onClick() {
              return handleAddUnit(floorId);
            }, style: { color: "#fe7a51", float: "right", cursor: "pointer" } },
          _react2.default.createElement(_translationNode2.default, { label: "+", color: "#fe7a51", containerStyle: { marginRight: 5 } }),
          _react2.default.createElement(_translationNode2.default, { label: "PT_ADD_UNIT", color: "#fe7a51" }),
          _react2.default.createElement(_components.ToolTipUi, { id: "form-wizard-tooltip", title: "PT_FLOOR_DETAILS_ADD_ONE_MORE_UNIT_INFO", style: { fontSize: 24 } })
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FloorDetails, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.configureFloors(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.noFloors !== this.props.noFloors) {
        this.configureFloors(nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var renderFloors = this.renderFloors;
      var floors = this.state.floors;
      var noFloors = this.props.noFloors;

      return _react2.default.createElement(
        "div",
        null,
        renderFloors(floors, noFloors)
      );
    }
  }]);
  return FloorDetails;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var form = _ref2.form;
  var plotDetails = form.plotDetails;

  var noFloors = parseInt((0, _get2.default)(plotDetails, "fields.floorCount.value")) || 0;
  return { noFloors: noFloors, form: form };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    removeForm: function removeForm(formKey) {
      return dispatch((0, _actions.removeForm)(formKey));
    },
    toggleSpinner: function toggleSpinner() {
      return dispatch((0, _actions2.toggleSpinner)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FloorDetails);