import * as fetch from 'node-fetch';
import IUser from '../IUser';
import IMedal from '../IMedal';

const medalLevels = {
    bronze: 0, silver: 1, gold: 2, platinum: 3, black: 4
}

const requestHeaders = new fetch.Headers();
requestHeaders.append('AS-Key', process.env.ASKey || '');

function GreaterLevel(i1: string, i2: string) {
    if (i1 === 'unacquired') {
        return i2;
    }
    if (i1.startsWith('level')) {
        return parseInt(i1.substr(6)) > parseInt(i2.substr(6)) ? i1 : i2;
    }
    return medalLevels[i1] > medalLevels[i2] ? i1 : i2;
}

export async function loadUserFromId(AgentId: string, startYear = '2012', startMonth = '01', startDay = '01'): Promise<IUser> {
    const date = new Date();
    const response = await fetch(
        `https://api.agent-stats.com/share/${AgentId}/${startYear}-${startMonth}-${startDay}`,
        { headers: requestHeaders });
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

    const Medals = Array<IMedal>();
    let AP = 0;
    let Level = 1;
    for (const medal in resultObj[AgentId].mymedals) {
        const thisMedal = resultObj[AgentId].mymedals[medal] as IMedal;
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
        Medals.push(thisMedal);
    }

    function countingFunc(field: string) {
        return function (name: string) {
            return resultObj[AgentId][field][name];
        }
    }

    return {
        AgentId, Medals, AP, Level,
        CountMedals: countingFunc('medals_total'),
        GetAchieveDate: countingFunc('medals_dates')
    } as IUser;
}

export async function fetchShareFromList() {
    const response = await fetch(
        'https://api.agent-stats.com/share',
        { headers: requestHeaders });
    const list = await response.json() as Array<{
        username: string,
        faction: string,
        direction: string
    }>;
    return list
        .filter(i => i.direction.toLowerCase() === 'from')
        .map(i => i.username);
}