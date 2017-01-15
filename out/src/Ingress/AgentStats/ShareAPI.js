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
function loadUserFromId(agentId, startYear = '2012', startMonth = '01', startDay = '01') {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const headers = new fetch.Headers();
        headers.append('AS-Key', process.env.ASKey || '');
        const response = yield fetch(`https://api.agent-stats.com/share/${agentId}/${startYear}-${startMonth}-${startDay}`, {
            headers: headers
        });
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
                            lastLevel = level;
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
//# sourceMappingURL=ShareAPI.js.map