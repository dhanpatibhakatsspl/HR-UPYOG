"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOldPropertyData = exports.prefillPTDocuments = exports.setPTDocuments = exports.convertToArray = exports.getCreatePropertyResponse = exports.createAssessmentPayload = exports.createPropertyPayload = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _uniqBy = require("lodash/uniqBy");

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _api = require("egov-ui-kit/utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPropertyPayload = exports.createPropertyPayload = function createPropertyPayload(properties, documentsUploadRedux) {
  var oldUnits = properties && properties[0] && properties[0].units || [];
  properties[0] = (0, _extends3.default)({}, properties[0], properties[0].propertyDetails[0], {
    source: "MUNICIPAL_RECORDS",
    channel: "CFC_COUNTER"
  });
  if (properties[0].owners && properties[0].owners.length) {
    properties[0].owners.map(function (obj) {
      if (obj.documents && Array.isArray(obj.documents) && obj.documents.length) {
        if (!obj.documents[0].documentType || !obj.documents[0].documentUid) {
          delete obj.documents;
        } else {
          obj.documents = obj.documents.map(function (document) {
            document.fileStoreId = document.documentUid;
            return (0, _extends3.default)({}, document);
          });
        }
      }
      obj.ownerType = obj.ownerType || "NONE";
    });
  }
  var floorArray = {};
  properties[0].units.map(function (unit) {
    floorArray[unit.floorNo] = unit.floorNo;
    unit.constructionDetail = {
      builtUpArea: unit.unitArea
    };
    unit.tenantId = properties[0].tenantId;
    unit.usageCategory = unit.usageCategoryMajor + (unit.usageCategoryMinor ? "." + unit.usageCategoryMinor : "") + (unit.usageCategorySubMinor ? "." + unit.usageCategorySubMinor : "") + (unit.usageCategoryDetail ? "." + unit.usageCategoryDetail : "");

    // unit.usageCategory = unit.usageCategoryMajor+"."+unit.usageCategoryMinor+"."+unit.usageCategorySubMinor+"."+unit.usageCategoryDetail;

    unit.unitType = unit.usageCategoryDetail;
    delete unit.usageCategoryMinor;
    delete unit.usageCategoryMajor;
    delete unit.usageCategoryDetail;
    delete unit.usageCategorySubMinor;
    delete unit.unitArea;
  });

  if ((0, _commons.getQueryArg)(window.location.href, "mode") == 'WORKFLOWEDIT') {
    var oldUnit = {};
    oldUnits && oldUnits.map(function (unit) {
      oldUnit[unit.id] = unit;
    });
    var newUnit = {};
    properties[0].units && properties[0].units.map(function (unit) {
      newUnit[unit.id] = unit;
    });
    var newUnitKeys = Object.keys(newUnit);
    Object.keys(oldUnit).map(function (unitId) {
      if (!newUnitKeys.includes(unitId)) {
        properties[0].units.push((0, _extends3.default)({}, oldUnit[unitId], { active: false }));
      }
    });
  }
  if (documentsUploadRedux && Object.keys(documentsUploadRedux) && Object.keys(documentsUploadRedux).length) {
    properties[0].documents = [];
    Object.keys(documentsUploadRedux).map(function (key) {
      if (documentsUploadRedux[key].dropdown && documentsUploadRedux[key].dropdown.value && documentsUploadRedux[key].documents && documentsUploadRedux[key].documents[0].fileStoreId) {
        properties[0].documents.push({
          documentType: documentsUploadRedux[key].dropdown.value,
          fileStoreId: documentsUploadRedux[key].documents[0].fileStoreId,
          documentUid: documentsUploadRedux[key].documents[0].fileStoreId
        });
      }
    });
  }

  if (properties[0].institution) {
    properties[0].institution.nameOfAuthorizedPerson = properties[0].owners[0].name;
    properties[0].institution.tenantId = properties[0].tenantId;
  }
  properties[0].superBuiltUpArea = properties[0].buildUpArea && Number(properties[0].buildUpArea);
  properties[0].superBuiltUpArea = properties[0].superBuiltUpArea && Number(properties[0].superBuiltUpArea.toFixed(2));

  properties[0].propertyType = properties[0].propertySubType === "SHAREDPROPERTY" || properties[0].propertySubType === "INDEPENDENTPROPERTY" ? properties[0].propertyType + "." + properties[0].propertySubType : properties[0].propertyType;
  // Changing usageCategoryMajor to usageCategory
  properties[0].usageCategory = properties[0].usageCategoryMajor + (properties[0].usageCategoryMinor ? "." + properties[0].usageCategoryMinor : "");
  properties[0].ownershipCategory = properties[0].ownershipCategory + (properties[0].subOwnershipCategory ? "." + properties[0].subOwnershipCategory : "");
  // Deleting object keys from request payload which are not required now
  //   delete properties[0].usageCategoryMajor;
  //   delete properties[0].usageCategoryMinor;

  if (properties[0].propertyType.includes("SHAREDPROPERTY")) {
    properties[0].noOfFloors = Object.keys(floorArray).length;
    properties[0].landArea = properties[0].superBuiltUpArea;
  }
  delete properties[0].citizenInfo;
  delete properties[0].propertyDetails;
  delete properties[0].subOwnershipCategory;
  delete properties[0].propertySubType;
  delete properties[0].buildUpArea;
  return properties[0];
};

var createAssessmentPayload = exports.createAssessmentPayload = function createAssessmentPayload(properties, propertyPayload) {
  var Assessment = {
    financialYear: propertyPayload.financialYear,
    tenantId: properties.tenantId,
    propertyId: properties.propertyId,
    source: "MUNICIPAL_RECORDS",
    channel: "CFC_COUNTER"
  };

  return Assessment;
};

var getCreatePropertyResponse = exports.getCreatePropertyResponse = function getCreatePropertyResponse(createPropertyResponse) {
  // createPropertyResponse.Properties[0].propertyDetails = createPropertyResponse.Properties;
  // Documents array coming in reverse order from API
  // createPropertyResponse.Properties[0] && createPropertyResponse.Properties[0].documents && createPropertyResponse.Properties[0].documents.length && createPropertyResponse.Properties[0].documents.reverse();
  try {
    return { Properties: (0, _formUtils.convertToOldPTObject)(createPropertyResponse), newProperties: createPropertyResponse.Properties };
  } catch (e) {
    console.error(e);
    return { Properties: [], newProperties: [] };
  }
};

var convertToArray = exports.convertToArray = function convertToArray(documentsUploadRedux) {
  if (documentsUploadRedux && (typeof documentsUploadRedux === "undefined" ? "undefined" : (0, _typeof3.default)(documentsUploadRedux)) === "object") {
    if (Object.keys(documentsUploadRedux) && Object.keys(documentsUploadRedux).length) {
      var documentsData = [];
      Object.keys(documentsUploadRedux).map(function (key) {
        var dropdownValue = documentsUploadRedux[key] && documentsUploadRedux[key].dropdown && documentsUploadRedux[key].dropdown.value || '';
        var docTitleArray = dropdownValue && dropdownValue.split(".");
        // if (dropdownValue == '' && docTitleArray.length == 1) {
        //   return;
        // }
        if (documentsUploadRedux[key].documents && documentsUploadRedux[key].documents[0].fileUrl && documentsUploadRedux[key].documents[0].fileName) {
          documentsData.push({
            title: docTitleArray && docTitleArray.length > 0 && docTitleArray[docTitleArray.length - 1],
            link: (0, _commons.getFileUrl)(documentsUploadRedux[key].documents[0].fileUrl),
            linkText: "View",
            name: documentsUploadRedux[key].documents[0].fileName
          });
        }
        return documentsData;
      });
      return documentsData;
    }
  }
};

var setPTDocuments = exports.setPTDocuments = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, sourceJsonPath, destJsonPath, dispatch, businessService) {
    var uploadedDocData, fileStoreIds, fileUrlPayload, reviewDocData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            uploadedDocData = (0, _get2.default)(payload, sourceJsonPath);

            uploadedDocData = (0, _uniqBy2.default)(uploadedDocData, 'fileStoreId');
            fileStoreIds = uploadedDocData && uploadedDocData.map(function (item) {
              return item.fileStoreId;
            }).join(",");
            _context.t0 = fileStoreIds;

            if (!_context.t0) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 7:
            _context.t0 = _context.sent;

          case 8:
            fileUrlPayload = _context.t0;
            reviewDocData = uploadedDocData && uploadedDocData.map(function (item, index) {
              return {
                title: (businessService + "_" + item.documentType).replace(".", "_") || "",
                link: fileUrlPayload && fileUrlPayload[item.fileStoreId] && (0, _commons.getFileUrl)(fileUrlPayload[item.fileStoreId]) || "",
                linkText: "View",
                name: fileUrlPayload && fileUrlPayload[item.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrlPayload[item.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1)
              };
            });
            return _context.abrupt("return", reviewDocData);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setPTDocuments(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var prefillPTDocuments = exports.prefillPTDocuments = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(payload, sourceJsonPath, destJsonPath, dispatch, businessService) {
    var documentsUploadRedux, uploadedDocData, uploadedDocs, docs, i;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            documentsUploadRedux = {};
            uploadedDocData = (0, _get2.default)(payload, sourceJsonPath);
            _context2.next = 4;
            return setPTDocuments(payload, "Properties[0].documents", "documentsUploaded", dispatch, "PT");

          case 4:
            uploadedDocs = _context2.sent;

            documentsUploadRedux = uploadedDocs && uploadedDocs.length && uploadedDocs.map(function (item, key) {
              var docUploadRedux = {};
              docUploadRedux[key] = {
                documents: [{
                  fileName: item.name,
                  fileUrl: item.link,
                  fileStoreId: payload.Properties[0].documents[key].fileStoreId
                }]
              };
              docUploadRedux[key].dropdown = { value: payload.Properties[0].documents[key].documentType };
              docUploadRedux[key].isDocumentRequired = true;
              docUploadRedux[key].isDocumentTypeRequired = true;
              return docUploadRedux;
            });
            // documentsUploadRedux && documentsUploadRedux.length && documentsUploadRedux.reverse();
            docs = {};

            if (documentsUploadRedux) {
              for (i = 0; i < documentsUploadRedux.length; i++) {
                docs[i] = documentsUploadRedux[i][i];
              }
            }
            dispatch((0, _actions.prepareFinalObject)(destJsonPath, docs));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function prefillPTDocuments(_x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();

var setOldPropertyData = exports.setOldPropertyData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(search, prepareFinalObject) {
    var propertyId, tenantId, searchPropertyResponse, Property, oldProperty;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
            tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
            _context3.next = 4;
            return (0, _api.httpRequest)("property-services/property/_search", "_search", [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "propertyIds",
              value: propertyId //"PT-107-001278",
            }]);

          case 4:
            searchPropertyResponse = _context3.sent;

            // searchPropertyResponse.Properties[0].owners.reverse(); // Owners are coming in reverse order
            Property = (0, _formUtils.convertToOldPTObject)(searchPropertyResponse);
            oldProperty = Object.create(Property);

            prepareFinalObject("OldProperty", oldProperty[0], null);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setOldPropertyData(_x11, _x12) {
    return _ref3.apply(this, arguments);
  };
}();