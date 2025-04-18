"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchAndPrintPdf = exports.searchAndDownloadPdf = exports.printPDFFileUsingBase64 = exports.openPDFFileUsingBase64 = exports.downloadPDFFileUsingBase64 = exports.generatePDF = exports.loadUlbLogo = exports.getEstimateCardDetailsBillAmend = exports.getEstimateCardDetails = exports.generateKeyValueForModify = exports.generateKeyValue = exports.getDocumentsCard = exports.getMultipleItemCard = exports.getMultiItems = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _store = require("egov-ui-framework/ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons.js");

var _lodash = require("lodash");

var _pdfmake = require("pdfmake/build/pdfmake");

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _api = require("../api");

var _localStorageUtils = require("../localStorageUtils");

var _formUtils = require("../PTCommon/FormWizardUtils/formUtils");

var _logoNotFound = require("./logoNotFound.png");

var _logoNotFound2 = _interopRequireDefault(_logoNotFound);

var _vfs_fonts = require("./vfs_fonts");

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const getLogoUrl = (tenantId)=>{
//     let logoUrl=`/${commonConfig.tenantId}-egov-assets/${tenantId}/logo.png`;
//     const state=store.getState()||{};
//     const {common={}}=state;
//     const {cities=[]}=common;
//     cities.map(city=>{if(city.code==tenantId){
//         logoUrl=city.logoId;
//     }})
//     return logoUrl;
// }

var vfs = (0, _extends3.default)({}, _vfs_fonts2.default.vfs);
var font = {
    Camby: {
        normal: 'Cambay-Regular.ttf',
        bold: 'Cambay-Regular.ttf',
        italics: 'Roboto-Regular.ttf',
        bolditalics: 'Cambay-Regular.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Regular.ttf',
        italics: 'Roboto-Regular.ttf',
        bolditalics: 'Roboto-Regular.ttf'
    },
    en_IN: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Regular.ttf',
        italics: 'Roboto-Regular.ttf',
        bolditalics: 'Roboto-Regular.ttf'
    },
    hi_IN: {
        normal: 'Cambay-Regular.ttf',
        bold: 'Cambay-Regular.ttf',
        italics: 'Roboto-Regular.ttf',
        bolditalics: 'Cambay-Regular.ttf'
    },
    pn_IN: {
        normal: 'BalooPaaji2-Regular.ttf',
        bold: 'BalooPaaji2-Bold.ttf',
        italics: 'Roboto-Regular.ttf',
        bolditalics: 'Roboto-Regular.ttf'
    },
    od_IN: {
        normal: 'BalooBhaina2-Regular.ttf',
        bold: 'BalooBhaina2-Bold.ttf',
        italics: 'Roboto-Regular.ttf',
        bolditalics: 'Roboto-Regular.ttf'
    }
};
_pdfmake2.default.vfs = vfs;
_pdfmake2.default.fonts = font;
var getLabel = function getLabel(value) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key';

    var label = {};
    switch (type) {
        case 'key':
            label = {
                "text": value ? value : 'NA',
                "style": "pdf-card-key",
                "border": [false, false, false, false]
            };
            break;
        case 'value':
            label = {
                "text": value ? value : 'NA',
                "style": "pdf-card-value",
                "border": [false, false, false, false]
            };
            break;

        case 'header':
            label = {
                "text": value ? value : ' ',
                "style": "pdf-card-sub-header",
                "border": [false, false, false, false]
            };
            break;
        case 'totalAmount':
            label = {
                "text": value ? value : ' ',
                "style": "pdf-card-sub-header",
                "border": [false, true, false, false]
            };
            break;
        case 'amount':
            label = {
                "text": value ? value : ' ',
                "style": "pdf-application-no",
                "border": [false, false, false, false]
            };
            break;
        default:
            label = {
                "text": value ? value : ' ',
                "style": "pdf-card-key",
                "border": [false, false, false, false]
            };
    }

    return label;
};
var getMultiCard = function getMultiCard() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'grey';

    var card = [];

    items.map(function (item) {
        if (item.header) {
            var row = [];
            row.push(getLabel((0, _commons2.getLocaleLabels)(item.header, item.header), 'header'));
            for (var i = 0; i < 3; i++) {
                row.push(getLabel(' ', 'header'));
            }
            card.push(row);
        }
        var newCard = getCard(item.items, color);
        card.push.apply(card, (0, _toConsumableArray3.default)(newCard.stack[0].table.body));
    });

    var tableCard = {
        "style": color == "grey" ? "pdf-table-card" : "pdf-table-card-white",
        "table": {
            "widths": [125, 125, 125, 125],
            "body": [].concat(card)
        },
        "layout": {}
    };
    return tableCard;
};
var getHeader = function getHeader(header) {
    var cardWithHeader = header ? [{
        "text": header == '-1' ? " " : (0, _commons2.getLocaleLabels)(header, header),
        "style": header == '-1' ? "pdf-card-no-title" : "pdf-card-title"
    }] : [];

    return cardWithHeader;
};
var getCard = function getCard() {
    var keyValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'grey';

    var card = [];
    var keys = [];
    var values = [];
    keyValues.map(function (keyValue) {
        keys.push(getLabel(keyValue.key, 'key'));
        values.push(getLabel(keyValue.value, 'value'));
        if (keys.length == 4 && values.length == 4) {
            card.push([].concat((0, _toConsumableArray3.default)(keys)));
            card.push([].concat((0, _toConsumableArray3.default)(values)));
            keys = [];
            values = [];
        }
    });
    if (keys.length != 0 && values.length != 0) {
        for (var i = keys.length; i < 4; i++) {
            keys.push(getLabel(' ', 'key'));
            values.push(getLabel(' ', 'value'));
        }
        card.push([].concat((0, _toConsumableArray3.default)(keys)));
        card.push([].concat((0, _toConsumableArray3.default)(values)));
    }
    var tableCard = {

        stack: [(0, _extends3.default)({}, getCustomCard([].concat(card), [125, 125, 125, 125], {}, color))]
    };
    return tableCard;
};
var getCardWithHeader = function getCardWithHeader(header, keyValue, color) {
    var cardWithHeader = header ? [{
        "text": header == '-1' ? " " : (0, _commons2.getLocaleLabels)(header, header),
        "style": header == '-1' ? "pdf-card-no-title" : "pdf-card-title"
    }] : [];
    cardWithHeader.push(getCard(keyValue, color));
    return cardWithHeader;
};
var getMultiItemCard = function getMultiItemCard(header, items) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'grey';

    var cardWithHeader = header ? [{
        "text": (0, _commons2.getLocaleLabels)(header, header),
        "style": "pdf-card-title"
    }] : [];

    cardWithHeader.push(getMultiCard(items, color));
    return cardWithHeader;
};

var getMultiItems = exports.getMultiItems = function getMultiItems(preparedFinalObject, cardInfo, sourceArrayJsonPath) {
    var multiItem = [];
    var removedElements = [];
    var arrayLength = (0, _formUtils.getFromObject)(preparedFinalObject, sourceArrayJsonPath, []).length;
    for (var i = 0; i < arrayLength; i++) {
        var items = [];
        items = generateKeyValue(preparedFinalObject, cardInfo);
        var sourceArray = (0, _formUtils.getFromObject)(preparedFinalObject, sourceArrayJsonPath, []);
        removedElements.push(sourceArray.shift());
        (0, _lodash.set)(preparedFinalObject, sourceArrayJsonPath, sourceArray);
        multiItem.push({ items: items });
    }
    (0, _lodash.set)(preparedFinalObject, sourceArrayJsonPath, removedElements);
    return multiItem;
};
var getMultipleItemCard = exports.getMultipleItemCard = function getMultipleItemCard(itemsInfo) {
    var itemHeader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "COMMON_OWNER";
    var hideHeader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var multipleItems = itemsInfo && itemsInfo.length && itemsInfo[0].items.filter(function (item) {
        return item;
    }) || [];
    if (itemsInfo.length > 1) {
        var items = [];
        itemsInfo.map(function (item, index) {
            var rowElements = { header: (0, _commons2.getLocaleLabels)(itemHeader, itemHeader) + " - " + (index + 1), items: item.items.filter(function (element) {
                    return element;
                }) };
            if (hideHeader) {
                delete rowElements.header;
            }
            items.push(rowElements);
        });
        multipleItems = items;
    }
    return multipleItems;
};
var getDocumentsCard = exports.getDocumentsCard = function getDocumentsCard(documentsUploadRedux) {
    return documentsUploadRedux && Array.isArray(documentsUploadRedux) && documentsUploadRedux.map(function (item) {
        return { key: (0, _commons2.getLocaleLabels)(item.title, item.title), value: item.name };
    });
};

var generateKeyValue = exports.generateKeyValue = function generateKeyValue(preparedFinalObject, containerObject) {
    var keyValue = [];
    Object.keys(containerObject).map(function (keys) {
        var labelObject = (0, _formUtils.getFromObject)(containerObject[keys], 'children.label.children.key.props', (0, _formUtils.getFromObject)(containerObject[keys], 'children.label1.children.key.props', {}));
        var key = (0, _commons2.getLocaleLabels)(labelObject.labelName, labelObject.labelKey);
        var valueObject = (0, _formUtils.getFromObject)(containerObject[keys], 'children.value.children.key.props', (0, _formUtils.getFromObject)(containerObject[keys], 'children.value1.children.key.props', {}));
        var value = valueObject.callBack && typeof valueObject.callBack == "function" ? valueObject.callBack((0, _formUtils.getFromObject)(preparedFinalObject, valueObject.jsonPath, '')) : (0, _formUtils.getFromObject)(preparedFinalObject, valueObject.jsonPath, '');
        value = value !== 'NA' && valueObject.localePrefix ? (0, _commons.appendModulePrefix)(value, valueObject.localePrefix) : value;
        value = containerObject[keys].localiseValue ? (0, _commons2.getLocaleLabels)(value, value) : value;
        keyValue.push({ key: key, value: value });
    });
    return keyValue;
};
var generateKeyValueForModify = exports.generateKeyValueForModify = function generateKeyValueForModify(preparedFinalObject, containerObject) {
    var keyValue = [];
    Object.keys(containerObject).map(function (keys) {
        var labelObject = containerObject[keys].children.label1.children.key.props;
        var key = (0, _commons2.getLocaleLabels)(labelObject.labelName, labelObject.labelKey);
        var valueObject = containerObject[keys].children.value1.children.key.props;
        var value = valueObject.callBack && typeof valueObject.callBack == "function" ? valueObject.callBack((0, _formUtils.getFromObject)(preparedFinalObject, valueObject.jsonPath, '')) : (0, _formUtils.getFromObject)(preparedFinalObject, valueObject.jsonPath, '');
        value = value !== 'NA' && valueObject.localePrefix ? (0, _commons.appendModulePrefix)(value, valueObject.localePrefix) : value;
        value = containerObject[keys].localiseValue ? (0, _commons2.getLocaleLabels)(value, value) : value;
        keyValue.push({ key: key, value: value });
    });
    return keyValue;
};

var tableborder = {
    hLineColor: function hLineColor(i, node) {
        return "#979797";
    },
    vLineColor: function vLineColor(i, node) {
        return "#979797";
    },
    hLineWidth: function hLineWidth(i, node) {
        return 0.5;
    },
    vLineWidth: function vLineWidth(i, node) {
        return 0.5;
    }
};

var getCustomCard = function getCustomCard() {
    var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var layout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'grey';

    return {
        "style": color == "grey" ? "pdf-table-card" : "pdf-table-card-white",
        "table": {
            widths: width,
            "body": body
        },
        "layout": layout
    };
};
var totalAmount = function totalAmount(arr) {
    var itmKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

    return arr.map(function (item) {
        return item[itmKey] && !isNaN(Number(item[itmKey])) ? Number(item[itmKey]) : 0;
    }).reduce(function (prev, next) {
        return prev + next;
    }, 0);
};
var getEstimateCardDetails = exports.getEstimateCardDetails = function getEstimateCardDetails() {
    var fees = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var color = arguments[1];
    var firstRowEnable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var lastRowEnable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var customForBillamend = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var estimateCard = {};

    var total = 0;
    if (firstRowEnable || lastRowEnable) {
        total = totalAmount(fees);
    }

    var card = [];
    var row1 = [];

    var row2 = [];

    if (firstRowEnable) {
        row1.push(getLabel(' ', 'amount'));
        row1.push(getLabel(' ', 'amount'));
        row1.push((0, _extends3.default)({}, getLabel((0, _commons2.getLocaleLabels)('TL_COMMON_TOTAL_AMT', 'TL_COMMON_TOTAL_AMT'), 'amount'), { "alignment": "right" }));
        card.push(row1);
        row2.push(getLabel(' ', 'amount'));
        row2.push(getLabel(' ', 'amount'));
        row2.push((0, _extends3.default)({}, getLabel(customForBillamend ? (0, _commons2.getLocaleLabels)(total) : total, 'amount'), { style: "pdf-application-no-value", "alignment": "right" }));
        card.push(row2);
    }

    var rowLast = [];

    fees.map(function (fee, i) {
        var row = [];

        if (customForBillamend) {
            row.push(getLabel((0, _commons2.getLocaleLabels)(fee.name.labelName, fee.name.labelKey), i == 0 ? "value" : 'header'));
            row.push(getLabel(' ', 'header'));
            row.push((0, _extends3.default)({}, getLabel(customForBillamend ? (0, _commons2.getLocaleLabels)(fee.value) : fee.value, i == 0 ? "value" : 'header'), { "alignment": "right" }));
            // customForBillamend?{}:row.push(getLabel(' ', 'header')) ;
        } else {
            row.push(getLabel((0, _commons2.getLocaleLabels)(fee.name.labelName, fee.name.labelKey), 'header'));
            row.push((0, _extends3.default)({}, getLabel(fee.value, 'header'), { "alignment": "right" }));
            row.push(getLabel(' ', 'header'));
        }

        card.push(row);
    });
    if (lastRowEnable) {
        rowLast.push(getLabel((0, _commons2.getLocaleLabels)('TL_COMMON_TOTAL_AMT', 'TL_COMMON_TOTAL_AMT'), 'totalAmount'));
        customForBillamend ? rowLast.push(getLabel(' ', 'totalAmount')) : {};
        rowLast.push((0, _extends3.default)({}, getLabel(total, 'totalAmount'), { "alignment": "right" }));
        customForBillamend ? {} : rowLast.push(getLabel(' ', 'header'));
        card.push(rowLast);
    }

    estimateCard = getCustomCard(card, [250, 150, 108], tableborder, color);

    return estimateCard;
};

var getEstimateCardDetailsBillAmend = exports.getEstimateCardDetailsBillAmend = function getEstimateCardDetailsBillAmend() {
    var fees = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var color = arguments[1];
    var firstRowEnable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var lastRowEnable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var customForBillamend = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    var estimateCard = {};

    var total = 0;
    if (firstRowEnable || lastRowEnable) {
        total = totalAmount(fees);
    }

    var card = [];
    var row1 = [];

    var row2 = [];

    if (firstRowEnable) {
        row1.push(getLabel(' ', 'amount'));
        row1.push(getLabel(' ', 'amount'));
        row1.push((0, _extends3.default)({}, getLabel((0, _commons2.getLocaleLabels)('TL_COMMON_TOTAL_AMT', 'TL_COMMON_TOTAL_AMT'), 'amount'), { "alignment": "right" }));
        card.push(row1);
        row2.push(getLabel(' ', 'amount'));
        row2.push(getLabel(' ', 'amount'));
        row2.push((0, _extends3.default)({}, getLabel(customForBillamend ? (0, _commons2.getLocaleLabels)(total) : total, 'amount'), { style: "pdf-application-no-value", "alignment": "right" }));
        card.push(row2);
    }

    var rowLast = [];

    fees.map(function (fee, i) {
        var row = [];

        if (customForBillamend) {
            row.push(getLabel((0, _commons2.getLocaleLabels)(fee.name.labelName, fee.name.labelKey), i == 0 ? "value" : 'header'));
            // row.push(getLabel(' ', 'header'));
            row.push((0, _extends3.default)({}, getLabel(customForBillamend ? (0, _commons2.getLocaleLabels)(fee.value1) : fee.value1, i == 0 ? "value" : 'header'), { "alignment": "right" }));

            row.push((0, _extends3.default)({}, getLabel(customForBillamend ? (0, _commons2.getLocaleLabels)(fee.value) : fee.value, i == 0 ? "value" : 'header'), { "alignment": "right" }));
            row.push((0, _extends3.default)({}, getLabel(customForBillamend ? (0, _commons2.getLocaleLabels)(fee.value2) : fee.value2, i == 0 ? "value" : 'header'), { "alignment": "right" }));
            // customForBillamend?{}:row.push(getLabel(' ', 'header')) ;
        } else {
            row.push(getLabel((0, _commons2.getLocaleLabels)(fee.name.labelName, fee.name.labelKey), 'header'));
            row.push((0, _extends3.default)({}, getLabel(fee.value, 'header'), { "alignment": "right" }));
            row.push(getLabel(' ', 'header'));
        }

        card.push(row);
    });
    if (lastRowEnable) {
        rowLast.push(getLabel((0, _commons2.getLocaleLabels)('TL_COMMON_TOTAL_AMT', 'TL_COMMON_TOTAL_AMT'), 'totalAmount'));
        customForBillamend ? rowLast.push((0, _extends3.default)({}, getLabel(totalAmount(fees, 'value1'), 'totalAmount'), { "alignment": "right" })) : {};
        if (customForBillamend) {
            rowLast.push((0, _extends3.default)({}, getLabel(total, 'totalAmount'), { "alignment": "right" }));
        }
        rowLast.push((0, _extends3.default)({}, getLabel(customForBillamend ? totalAmount(fees, 'value2') : total, 'totalAmount'), { "alignment": "right" }));
        customForBillamend ? {} : rowLast.push(getLabel(' ', 'header'));
        card.push(rowLast);
    }

    estimateCard = getCustomCard(card, customForBillamend && fees[0].value1 && fees[0].value2 ? [125, 125, 125, 125] : [250, 150, 108], tableborder, color);

    return estimateCard;
};

var loadUlbLogo = exports.loadUlbLogo = function loadUlbLogo(tenantid) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        _store2.default.dispatch((0, _actions.prepareFinalObject)("UlbLogoForPdf", canvas.toDataURL()));
        localStorage.setItem("UlbLogoForPdf", canvas.toDataURL());
        canvas = null;
    };
    img.src = "/" + _common2.default.tenantId + "-egov-assets/" + tenantid + "/logo.png";
};

var getHeaderCard = function getHeaderCard(applicationData, logo) {
    var applicationHeader = {
        style: applicationData.qrcode ? "pdf-head-qr-code" : "pdf-header",
        table: {
            widths: applicationData.qrcode ? [120, "*", 120] : [120, "*", 40],
            body: []
        },
        layout: "noBorders"
    };
    var body = [];
    logo = logo != null && logo || _logoNotFound2.default;
    body.push({
        image: logo,
        width: 60,
        height: 61.25,
        margin: [51, 12, 10, 10]
    });
    body.push({
        stack: [{
            text: (0, _commons2.getLocaleLabels)(("TENANT_TENANTS_" + applicationData.tenantId.replace('.', '_')).toUpperCase(), ("TENANT_TENANTS_" + applicationData.tenantId.replace('.', '_')).toUpperCase()) + " " + (0, _commons2.getLocaleLabels)(("CORPORATION", "CMN_ACK_CORPORATION_HEADER").toUpperCase(), ("CORPORATION", "CMN_ACK_CORPORATION_HEADER").toUpperCase()),
            style: "pdf-header-text"
        }, {
            text: (0, _commons2.getLocaleLabels)(applicationData.header, applicationData.header) || "",
            style: "pdf-header-sub-text"
        }],
        alignment: "left",
        margin: [10, 13, 0, 0]
    });
    if (applicationData.qrcode) {
        body.push({
            image: applicationData.qrcode,
            width: 70,
            height: 70,
            margin: [50, 8, 8, 8],
            alignment: "right"
        });
    }

    applicationHeader.table.body.push(body);
    return applicationHeader;
};
var generatePDF = exports.generatePDF = function generatePDF(logo) {
    var applicationData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fileName = arguments[2];
    var isCustomforBillamend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    logo = logo || localStorage.getItem("UlbLogoForPdf");
    var data = void 0;
    var tableborder = {
        hLineWidth: function hLineWidth(i, node) {
            return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
        },
        vLineWidth: function vLineWidth(i, node) {
            return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
        },
        hLineColor: function hLineColor(i, node) {
            return i === 0 || i === node.table.body.length ? "#979797" : "#979797";
        },
        vLineColor: function vLineColor(i, node) {
            return i === 0 || i === node.table.widths.length ? "#979797" : "#979797";
        }
    };

    var borderKey = [true, true, false, true];
    var borderValue = [false, true, true, true];
    var receiptTableWidth = ["*", "*", "*", "*"];

    data = {
        defaultStyle: {
            font: 'Camby'
        },
        content: [(0, _extends3.default)({}, getHeaderCard(applicationData, logo)), {
            "style": "pdf-application-no",
            "columns": [{
                "text": [{
                    "text": applicationData.applicationNoHeader ? (0, _commons2.getLocaleLabels)(applicationData.applicationNoHeader, applicationData.applicationNoHeader) + ' ' : '',
                    bold: true
                }, {
                    "text": applicationData.applicationNoValue ? (0, _commons2.getLocaleLabels)(applicationData.applicationNoValue, applicationData.applicationNoValue) : '',
                    italics: true,
                    "style": "pdf-application-no-value"
                }],
                "alignment": "left"
            }, {
                "text": [{
                    "text": applicationData.additionalHeader ? (0, _commons2.getLocaleLabels)(applicationData.additionalHeader, applicationData.additionalHeader) + ' ' : '',
                    bold: true
                }, {
                    "text": applicationData.additionalHeaderValue ? (0, _commons2.getLocaleLabels)(applicationData.additionalHeaderValue, applicationData.additionalHeaderValue) : '',
                    italics: true,
                    "style": "pdf-application-no-value"
                }],
                "alignment": "right"
            }]
        }],
        pageBreakBefore: function pageBreakBefore(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            //check if signature part is completely on the last page, add pagebreak if not

            var nodeLength = followingNodesOnPage.length;
            followingNodesOnPage.map(function (node, ind) {
                if (node.style == 'pdf-table-card') {
                    nodeLength = ind;
                }
            });
            if (currentNode.startPosition.verticalRatio > 0.80 && currentNode.style == 'pdf-card-title') {
                return true;
            }
            if (currentNode.startPosition.verticalRatio > 0.75 && currentNode.style == 'pdf-card-title' && nodeLength > 19) {
                return true;
            }
            return false;
        },
        styles: {
            "pdf-header": {
                "fillColor": "#F2F2F2",
                "margin": [-70, -41, -81, 10]
            },
            "pdf-application-no-value": {
                "fontSize": isCustomforBillamend ? 11 : 12,
                "font": "Roboto",
                italics: true,
                "margin": [-18, 8, 0, 0],
                "color": "#484848"
            },
            "pdf-header-text": {
                "color": "#484848",
                "fontSize": 20,
                bold: true,
                "letterSpacing": 0.74,
                "margin": [0, 0, 0, 5]
            },
            "pdf-header-sub-text": {
                "color": "#484848",
                "fontSize": 15,
                "letterSpacing": 0.6
            },
            "pdf-application-no": {
                "fontSize": isCustomforBillamend ? 9 : 12,
                bold: true,
                "margin": [-18, 8, 0, 0],
                "color": "#484848"
            },
            "pdf-card-title": {
                "fontSize": 11,
                bold: true,
                "margin": [-18, 16, 8, 8],
                "color": "#484848",
                "fontWeight": 500
            },
            "pdf-card-no-title": {
                "fontSize": 11,
                bold: true,
                "color": "#484848",
                "fontWeight": 500
            },
            "pdf-table-card-white": {
                "fillColor": "white",
                "fontSize": 7,
                "color": "#484848",
                "margin": [-20, -2, -8, -8]
            },
            "pdf-table-card": {
                "fillColor": "#F2F2F2",
                "fontSize": 7,
                "color": "#484848",
                "margin": [-20, -2, -8, -8]
            },
            "pdf-card-key": {
                "color": "rgba(0, 0, 0, 0.54)",
                "fontSize": 8,
                "margin": [0, 1, 0, 0]
            },
            "pdf-card-sub-header": {
                "color": "rgba(0, 0, 0, 0.94)",
                "fontSize": 9,
                bold: true,
                "margin": [0, 3, 0, 0]
            },
            "pdf-card-value": {
                "fontSize": 10,
                "color": "rgba(0, 0, 0, 0.87)",
                "margin": [0, 0, 0, 1]
            },
            "pdf-head-qr-code": {
                fillColor: "#F2F2F2",
                margin: [-70, -41, -81, 0]
            }
        }
    };
    applicationData.cards.map(function (card) {
        switch (card.type) {
            case "singleItem":
                if (!card.hide && card.items && card.items.length) {
                    var _data$content;

                    (_data$content = data.content).push.apply(_data$content, (0, _toConsumableArray3.default)(getCardWithHeader(card.header, card.items, card.color)));
                }
                break;
            case "header":
                if (!card.hide && card.header) {
                    var _data$content2;

                    (_data$content2 = data.content).push.apply(_data$content2, (0, _toConsumableArray3.default)(getHeader(card.header)));
                }
                break;
            case "multiItem":
                if (!card.hide && card.items && card.items.length) {
                    var _data$content3;

                    (_data$content3 = data.content).push.apply(_data$content3, (0, _toConsumableArray3.default)(getMultiItemCard(card.header, card.items, card.color)));
                }
                break;
            case "estimate":
                if (!card.hide && card.items && card.items) {
                    data.content.push((0, _extends3.default)({}, card.items));
                }
                break;
            default:
                if (!card.hide && card.items && card.items.length) {
                    var _data$content4;

                    (_data$content4 = data.content).push.apply(_data$content4, (0, _toConsumableArray3.default)(getCardWithHeader(card.header, card.items, card.color)));
                }
        }
    });
    var locale = (0, _localStorageUtils.getLocale)() || 'en_IN';
    var Camby = font[locale] || font["Camby"];
    _pdfmake2.default.vfs = vfs;
    _pdfmake2.default.fonts = (0, _extends3.default)({}, font, { Camby: (0, _extends3.default)({}, Camby) });
    try {
        if (fileName != 'print') {
            var pdfData = _pdfmake2.default.createPdf(data);
            downloadPDFFileUsingBase64(pdfData, fileName);
        } else {
            var _pdfData = _pdfmake2.default.createPdf(data);
            printPDFFileUsingBase64(_pdfData, fileName);
            // data && pdfMake.createPdf(data).open();
        }
    } catch (e) {}
};

var mobileCheck = function mobileCheck() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var downloadPDFFileUsingBase64 = exports.downloadPDFFileUsingBase64 = function downloadPDFFileUsingBase64(receiptPDF, filename) {
    if (window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File && mobileCheck()) {
        // we are running under webview
        receiptPDF.getBase64(function (data) {
            window.mSewaApp.downloadBase64File(data, filename);
        });
    } else {
        // we are running in browser
        receiptPDF.download(filename);
    }
};

var openPDFFileUsingBase64 = exports.openPDFFileUsingBase64 = function openPDFFileUsingBase64(receiptPDF, filename) {
    if (window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File && mobileCheck()) {
        // we are running under webview
        receiptPDF.getBase64(function (data) {
            window.mSewaApp.downloadBase64File(data, filename);
        });
    } else {
        // we are running in browser
        receiptPDF.open();
    }
};

var printPDFFileUsingBase64 = exports.printPDFFileUsingBase64 = function printPDFFileUsingBase64(receiptPDF, filename) {
    if (window && window.mSewaApp && window.mSewaApp.isMsewaApp && window.mSewaApp.isMsewaApp() && window.mSewaApp.downloadBase64File && mobileCheck()) {
        // we are running under webview
        receiptPDF.getBase64(function (data) {
            window.mSewaApp.downloadBase64File(data, filename);
        });
    } else {
        // we are running in browser
        receiptPDF.print();
    }
};

var searchAndDownloadPdf = exports.searchAndDownloadPdf = function searchAndDownloadPdf(url, queryObj, fileName, onSuccess) {
    (0, _api.downloadPdfFile)(url, 'post', queryObj, {}, {}, false, fileName, onSuccess);
};

var searchAndPrintPdf = exports.searchAndPrintPdf = function searchAndPrintPdf(url, queryObj) {
    (0, _api.downloadPdfFile)(url, 'post', queryObj, {}, {}, false, 'print');
};