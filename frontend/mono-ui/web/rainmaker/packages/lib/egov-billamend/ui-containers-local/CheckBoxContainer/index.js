"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _styles = require("@material-ui/core/styles");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    color: "#FE7A51",
    "&$checked": {
      color: "#FE7A51"
    }
  },
  checked: {}
};

var CheckBoxContainer = function CheckBoxContainer(props) {
  var classes = props.classes,
      content = props.content,
      labelName = props.labelName,
      labelKey = props.labelKey,
      checked = props.checked,
      name = props.name,
      changeMethod = props.changeMethod;


  return _react2.default.createElement(
    _FormGroup2.default,
    { row: true },
    _react2.default.createElement(_FormControlLabel2.default, {
      classes: { label: "checkbox-label" },
      control: _react2.default.createElement(_Checkbox2.default, {
        checked: checked ? false : true,
        onChange: function onChange(event) {
          return changeMethod(event.target.name);
        }
        // value={this.state.checkedG}
        , classes: {
          root: classes.root,
          checked: classes.checked
        },
        name: name
      }),
      label: labelKey && _react2.default.createElement(_LabelContainer2.default
      // className={classes.formLabel}
      , { className: "amend-checkbox-label",
        labelName: labelName,
        labelKey: labelKey
      })
    })
  );
};

CheckBoxContainer.propTypes = {};

exports.default = (0, _styles.withStyles)(styles)(CheckBoxContainer);