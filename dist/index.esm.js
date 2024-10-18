import { jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

var Cond = function (_a) {
    var condition = _a.condition, then = _a.then, cases = _a.cases, fallback = _a.fallback;
    // Проверка для простого условия
    if (typeof condition === "boolean") {
        return jsx(Fragment, { children: condition ? then : fallback });
    }
    // Проверка для массива cases
    if (Array.isArray(cases)) {
        var matchingCase = cases.find(function (c) { return c.condition; });
        if (matchingCase) {
            return jsx(Fragment, { children: matchingCase.then });
        }
    }
    // Обработка fallback, если нет условий
    return jsx(Fragment, { children: fallback });
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Функции для работы с кэшем
var getFromCache = function (cacheKey) {
    var cachedData = typeof window !== 'undefined' && localStorage.getItem(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
};
var saveToCache = function (cacheKey, data) {
    typeof window !== 'undefined' && localStorage.setItem(cacheKey, JSON.stringify(data));
};
var AsyncCond = function (_a) {
    var asyncFunction = _a.asyncFunction, render = _a.render, elseComponent = _a.else, loading = _a.loading, error = _a.error, polling = _a.polling, cacheKey = _a.cacheKey, onError = _a.onError;
    var _b = useState('loading'), state = _b[0], setState = _b[1];
    var _c = useState(null), data = _c[0], setData = _c[1];
    var execute = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, cachedData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setState('loading');
                    response = void 0;
                    // Проверка наличия данных в кэше
                    if (cacheKey) {
                        cachedData = getFromCache(cacheKey);
                        if (cachedData) {
                            setData(cachedData);
                            setState('success');
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, asyncFunction()];
                case 1:
                    // Выполнение запроса
                    response = _a.sent();
                    if (response) {
                        setData(response);
                        setState('success');
                        if (cacheKey)
                            saveToCache(cacheKey, response);
                    }
                    else {
                        setState('empty');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    setState('error');
                    if (onError)
                        onError(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        execute();
        if (polling) {
            var interval_1 = setInterval(execute, polling * 1000);
            return function () { return clearInterval(interval_1); };
        }
    }, [asyncFunction, polling, cacheKey]);
    if (state === 'loading')
        return jsx(Fragment, { children: loading });
    if (state === 'error')
        return jsx(Fragment, { children: error });
    if (state === 'empty')
        return jsx(Fragment, { children: elseComponent });
    return data ? jsx(Fragment, { children: render(data) }) : null;
};

export { AsyncCond, Cond };
//# sourceMappingURL=index.esm.js.map
