import * as fetch from 'node-fetch';
import IUser from '../IUser';
import User from '../User';
import IMedal from '../IMedal';

export async function loadUserFromId(agentId: string, startYear = '2012', startMonth = '01', startDay = '01'): Promise<IUser> {
    const date = new Date();
    const headers = new fetch.Headers();
    headers.append('AS-Key', process.env.ASKey || '');
    const response = await fetch(
        `https://api.agent-stats.com/share/${agentId}/${startYear}-${startMonth}-${startDay}`,
        {
            headers: headers
        });
    const result = await response.text();
    let resultObj;
    if (result.match(/error/)) {
        throw new Error('User not shared or exists.');
    } else if (result.match(/denied/)) {
        throw new Error('No ASKey specified.');
    } else {
        resultObj = JSON.parse(result);
        console.log(resultObj);
    }

    const medals = Array<IMedal>();
    let AP = 0;
    let Level = 1;
    for (const medal in resultObj[agentId].mymedals) {
        const thisMedal = resultObj[agentId].mymedals[medal] as IMedal;
        thisMedal.name = medal;
        Object.defineProperty(thisMedal, 'CurrentLevel', {
            get: function() {
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
        } else {
            medals.push(thisMedal);
        }
    }

    return new User(agentId, medals, AP, Level);
}