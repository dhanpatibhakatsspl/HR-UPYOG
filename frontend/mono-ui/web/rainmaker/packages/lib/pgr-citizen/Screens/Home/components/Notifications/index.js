"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Updates = function Updates(_ref) {
  var updates = _ref.updates,
      history = _ref.history;

  var renderUpdate = function renderUpdate(update, index) {
    var title = update.title,
        date = update.date,
        status = update.status,
        action = update.action;

    var transformedstatus = "";
    var titleKey = title && "SERVICEDEFS." + title.toUpperCase();
    if (status) {
      if (status === "open" && action && action === "reopen") {
        transformedstatus = (0, _commons.displayLocalizedStatusMessage)("reopened");
      } else if (status === "assigned" && action && action === "reassign") {
        transformedstatus = (0, _commons.displayLocalizedStatusMessage)("reassigned");
      } else {
        transformedstatus = (0, _commons.displayLocalizedStatusMessage)(status);
      }
    }

    return _react2.default.createElement(_components.Card, {
      style: { margin: "8px 0px" },
      key: index,
      id: "home-notification" + index,
      textChildren: _react2.default.createElement(
        "div",
        {
          className: "update",
          onClick: function onClick() {
            history.push("/complaint-details/" + encodeURIComponent(update.number));
          }
        },
        _react2.default.createElement(
          "div",
          { className: "notification-top-content" },
          _react2.default.createElement(_translationNode2.default, {
            leftWrapperStyle: true,
            fontSize: 16,
            dark: true,
            bold: true,
            label: titleKey,
            containerStyle: { width: "80%" },
            labelStyle: { width: "100%", wordWrap: "break-word" }
          }),
          _react2.default.createElement(_components.Icon, {
            style: { color: "#fe7a51" },
            action: "social",
            name: "notifications-none"
          })
        ),
        _react2.default.createElement(
          "div",
          {
            className: "notification-top-content",
            style: { justifyContent: "flex-start" }
          },
          _react2.default.createElement(_components.Icon, {
            style: { width: "16px", height: "16px" },
            action: "custom",
            name: "calendar"
          }),
          _react2.default.createElement(_translationNode2.default, {
            fontSize: 12,
            label: (0, _commons.getDateFromEpoch)(date),
            labelStyle: { paddingLeft: "5px" },
            containerStyle: { display: "inline-block" }
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "complaint-status", style: { marginTop: "16px" } },
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { display: "inline-block", marginLeft: "4px" },
            dark: true,
            label: transformedstatus
          })
        )
      )
    });
  };

  return _react2.default.createElement(
    "div",
    null,
    updates.map(function (update, index) {
      return renderUpdate(update, index);
    })
  );
};

exports.default = Updates;