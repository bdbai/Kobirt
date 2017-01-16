"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetch = require("node-fetch");
const User_1 = require("../User");
const medalLevels = {
    bronze: 0, silver: 1, gold: 2, platinum: 3, black: 4
};
const requestHeaders = new fetch.Headers();
requestHeaders.append('AS-Key', process.env.ASKey || '');
function GreaterLevel(i1, i2) {
    if (i1 === 'unacquired') {
        return i2;
    }
    if (i1.startsWith('level')) {
        return parseInt(i1.substr(6)) > parseInt(i2.substr(6)) ? i1 : i2;
    }
    return medalLevels[i1] > medalLevels[i2] ? i1 : i2;
}
function loadUserFromId(agentId, startYear = '2012', startMonth = '01', startDay = '01') {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const response = yield fetch(`https://api.agent-stats.com/share/${agentId}/${startYear}-${startMonth}-${startDay}`, { headers: requestHeaders });
        const result = yield response.text();
        let resultObj;
        if (result.match(/error/)) {
            throw new Error('User not shared or exists.');
        }
        else if (result.match(/denied/)) {
            throw new Error('No ASKey specified.');
        }
        else {
            resultObj = JSON.parse(result);
            console.log(resultObj);
        }
        const medals = Array();
        let AP = 0;
        let Level = 1;
        for (const medal in resultObj[agentId].mymedals) {
            const thisMedal = resultObj[agentId].mymedals[medal];
            thisMedal.name = medal;
            Object.defineProperty(thisMedal, 'CurrentLevel', {
                get: function () {
                    let lastLevel = 'unacquired';
                    for (const level in this.date) {
                        if (this.date[level] === 1) {
                            lastLevel = GreaterLevel(lastLevel, level);
                        }
                    }
                    return lastLevel;
                }
            });
            if (medal === 'ap') {
                AP = thisMedal.progression.total;
                Level = parseInt(thisMedal.CurrentLevel.replace('level ', ''));
            }
            else {
                medals.push(thisMedal);
            }
        }
        return new User_1.default(agentId, medals, AP, Level);
    });
}
exports.loadUserFromId = loadUserFromId;
function fetchShareFromList() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://api.agent-stats.com/share', { headers: requestHeaders });
        const list = yield response.json();
        return list
            .filter(i => i.direction.toLowerCase() === 'from')
            .map(i => i.username);
    });
}
exports.fetchShareFromList = fetchShareFromList;
//# sourceMappingURL=ShareAPI.js.map