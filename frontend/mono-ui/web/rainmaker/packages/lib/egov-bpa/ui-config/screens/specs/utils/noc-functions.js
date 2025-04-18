"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prepareDocsInEmployee = exports.requiredDocumentsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _groupBy = require("lodash/groupBy");

var _groupBy2 = _interopRequireDefault(_groupBy);

var _index = require("./index");

var _api = require("../../../../ui-utils/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDocumentCodes = function getDocumentCodes(documentType) {
    var code = (0, _commons.getTransformedLocale)(documentType);
    code = code.substring(0, code.lastIndexOf("_"));
    return code;
};

var requiredDocumentsData = exports.requiredDocumentsData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, action) {
        var mdmsData, applicationNumber, tenantId, queryObject, wfPayload, wfState, appState, documents, proInstance, nextActions, isVisibleTrue;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        mdmsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData");
                        applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
                        tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
                        queryObject = [{ key: "businessIds", value: applicationNumber }, { key: "tenantId", value: tenantId }];
                        _context.next = 7;
                        return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

                    case 7:
                        wfPayload = _context.sent;
                        wfState = (0, _get2.default)(wfPayload, "ProcessInstances[0]");
                        appState = void 0;

                        dispatch((0, _actions.prepareFinalObject)("applicationProcessInstances", (0, _get2.default)(wfPayload, "ProcessInstances[0]")));

                        if (mdmsData && mdmsData.BPA && wfState) {
                            documents = mdmsData.BPA.DocTypeMapping;

                            documents.forEach(function (doc) {
                                if (doc.WFState === wfState.state.state) {
                                    appState = wfState.state.state;
                                }
                            });
                        };
                        proInstance = wfPayload.ProcessInstances[0];
                        nextActions = (0, _get2.default)(proInstance, "nextActions");
                        isVisibleTrue = false;

                        if (nextActions && nextActions.length > 0) isVisibleTrue = true;
                        prepareDocumentsView(state, dispatch, action, appState, isVisibleTrue);
                        _context.next = 23;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context["catch"](0);

                        console.log(_context.t0);

                    case 23:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 20]]);
    }));

    return function requiredDocumentsData(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var prepareDocumentsView = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch, action, appState, isVisibleTrue) {
        var documentsPreview, Noc, applicantDocuments, uploadedAppDocuments, allDocuments, fileStoreIds, fileUrls, isEmployee;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        documentsPreview = [];

                        // Get all documents from response

                        Noc = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", {});
                        applicantDocuments = _jsonpath2.default.query(Noc, "$.documents.*");
                        uploadedAppDocuments = [];
                        allDocuments = [].concat((0, _toConsumableArray3.default)(applicantDocuments));
                        fileStoreIds = _jsonpath2.default.query(allDocuments, "$.*.fileStoreId");

                        if (!(fileStoreIds.length > 0)) {
                            _context2.next = 12;
                            break;
                        }

                        _context2.next = 9;
                        return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

                    case 9:
                        _context2.t0 = _context2.sent;
                        _context2.next = 13;
                        break;

                    case 12:
                        _context2.t0 = {};

                    case 13:
                        fileUrls = _context2.t0;

                        allDocuments.map(function (doc, index) {
                            uploadedAppDocuments.push(doc);
                            var obj = {};
                            obj.title = (0, _commons.getTransformedLocale)(doc.documentType);
                            obj.fileStoreId = doc.fileStoreId;
                            obj.linkText = "View";
                            obj.wfState = doc.wfState;
                            if (doc.auditDetails) {
                                obj["createdTime"] = doc.auditDetails.createdTime;
                            }

                            obj["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
                            obj["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                            obj.createdBy = (0, _index.getLoggedinUserRole)(doc.wfState);
                            obj.additionalDetails = doc.additionalDetails;
                            obj['auditDetails'] = doc.auditDetails;
                            documentsPreview.push(obj);
                            return obj;
                        });
                        dispatch((0, _actions.prepareFinalObject)("documentDetailsPreview", documentsPreview));
                        isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;

                        if (isEmployee && isVisibleTrue || !isEmployee && isVisibleTrue) {
                            prepareDocsInEmployee(state, dispatch, action, appState, uploadedAppDocuments, documentsPreview);
                        } else {
                            prepareFinalCards(state, dispatch, documentsPreview, [], isVisibleTrue);
                        }

                    case 18:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function prepareDocumentsView(_x4, _x5, _x6, _x7, _x8) {
        return _ref2.apply(this, arguments);
    };
}();

var prepareFinalCards = function prepareFinalCards(state, dispatch, documentsPreview, requiredDocsFromMdms, isVisibleTrue) {
    var cards = [];
    documentsPreview.forEach(function (item) {
        item.documentCode = getDocumentCodes(item.title);
    });
    var documentCards = (0, _groupBy2.default)(documentsPreview, 'documentCode');
    var bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Noc", {});
    var cardReadOnly = false;
    var readOnly = false;
    if (isVisibleTrue === false) {
        cardReadOnly = true;
        readOnly = true;
    }

    documentCards && Object.keys(documentCards).map(function (doc) {
        var card = {
            documentCode: doc,
            documents: documentCards[doc],
            wfState: documentCards[doc].wfState,
            readOnly: readOnly
        };
        cards.push(card);
    });
    if (requiredDocsFromMdms.length > 0) {
        var _ref3;

        var allCards = (_ref3 = []).concat.apply(_ref3, (0, _toConsumableArray3.default)(requiredDocsFromMdms.map(function (_ref4) {
            var cards = _ref4.cards;
            return cards || [];
        })));

        allCards && allCards.map(function (mdmsCard) {
            var found = false;
            mdmsCard.documentCode = (0, _commons.getTransformedLocale)(mdmsCard.code);
            for (var i = 0; i < cards.length; i++) {
                if (mdmsCard.documentCode == cards[i].documentCode) {
                    cards[i].readOnly = cardReadOnly;
                    var mergedCard = (0, _extends3.default)({}, cards[i], mdmsCard);
                    cards[i] = (0, _extends3.default)({}, mergedCard);
                    found = true;
                }
            }

            if (!found) {
                mdmsCard.readOnly = cardReadOnly;
                cards.push(mdmsCard);
            }
        });
    }
    /**
     * @Todo should be handled at component level
     */
    cards.map(function (card) {
        if (card.documents) {
            card.documents.map(function (item) {
                if (!item.fileName) {
                    item.fileName = item.name;
                }
            });
        }
    });
    dispatch((0, _actions.prepareFinalObject)("finalCardsforPreview", cards));
};

var prepareDocsInEmployee = exports.prepareDocsInEmployee = function prepareDocsInEmployee(state, dispatch, action, appState, uploadedAppDocuments, documentsPreview) {
    var applicationDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.NOC.DocumentTypeMapping", []);
    var documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);

    var documents = [];
    var nocType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Noc.nocType", "");

    applicationDocuments.forEach(function (doc) {
        if (doc.applicationType === "NEW" && doc.nocType === nocType) {
            documents.push(doc.docTypes);
        }
    });

    var documentsList = [];
    if (documents[0] && documents[0].length > 0) {
        documents[0].forEach(function (doc) {
            var code = doc.documentType;
            doc.dropDownValues = [];
            documentsDropDownValues.forEach(function (value) {
                var values = value.code.slice(0, code.length);
                if (code === values) {
                    doc.hasDropdown = true;
                    doc.dropDownValues.push(value);
                }
            });
            documentsList.push(doc);
        });
    }
    var bpaDocuments = documentsList;
    var documentsContract = [];
    var tempDoc = {};

    if (bpaDocuments && bpaDocuments.length > 0) {
        bpaDocuments.forEach(function (doc) {
            var card = {};
            card["code"] = doc.documentType.split(".")[0];
            card["title"] = doc.documentType.split(".")[0];
            card["cards"] = [];
            tempDoc[doc.documentType.split(".")[0]] = card;
        });
        bpaDocuments.forEach(function (doc) {
            var card = {};
            card["name"] = doc.documentType;
            card["code"] = doc.documentType;
            card["required"] = doc.required ? true : false;
            if (doc.hasDropdown && doc.dropDownValues) {
                var dropDownValues = {};
                dropDownValues.label = "BPA_SELECT_DOCS_LABEL";
                dropDownValues.required = doc.required;
                dropDownValues.menu = doc.dropDownValues.filter(function (item) {
                    return true;
                });
                dropDownValues.menu = dropDownValues.menu.map(function (item) {
                    return { code: item.code, label: item.code };
                });
                card["dropDownValues"] = dropDownValues;
            }
            tempDoc[doc.documentType.split(".")[0]].cards.push(card);
        });
    }

    if (tempDoc) {
        Object.keys(tempDoc).forEach(function (key) {
            documentsContract.push(tempDoc[key]);
        });
    }
    var finalDocuments = [];
    if (documentsContract && documentsContract.length > 0) {

        var documentsCodes = [];

        documentsContract.forEach(function (documents) {
            documents.cards.forEach(function (cardDoc) {
                documentsCodes.push(cardDoc.code);
            });
        });

        var documentsDocTypes = [];
        uploadedAppDocuments.forEach(function (appDoc) {
            if (appDoc && appDoc.documentType) {
                var code = appDoc.documentType.split('.')[0] + '.' + appDoc.documentType.split('.')[1];
                documentsDocTypes.push(code);
            }
        });

        var result = void 0;
        if (documentsDocTypes && documentsDocTypes.length > 0) {
            documentsCodes.map(function (docs) {
                documentsDocTypes.map(function (doc) {
                    if (docs === doc) {
                        documentsContract[0].cards.map(function (items) {
                            if (items && items.code === doc) return items.required = false;
                        });
                    }
                });
                return docs;
            });
            result = documentsCodes;
        } else {
            result = documentsCodes;
        }

        var finalDocs = [];

        documentsContract.forEach(function (doc) {
            var cards = [];

            var _loop = function _loop(i) {
                var codes = result[i];
                doc.cards.forEach(function (docCards) {
                    if (docCards.code === codes) {
                        cards.push(docCards);
                    }
                });
            };

            for (var i = 0; i < result.length > 0; i++) {
                _loop(i);
            }
            finalDocs.push({
                cards: cards,
                code: doc.code,
                title: doc.code
            });
        });

        if (finalDocs && finalDocs.length > 0) {
            finalDocs.forEach(function (fDoc) {
                if (fDoc && fDoc.cards && fDoc.cards.length > 0) {
                    finalDocuments.push(fDoc);
                }
            });
        };

        if (finalDocuments && finalDocuments.length > 0) {
            dispatch((0, _actions.prepareFinalObject)("documentsContract", finalDocuments));
        }
    }
    prepareFinalCards(state, dispatch, documentsPreview, finalDocuments);
};