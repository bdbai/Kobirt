import Faction from './Faction';
import IMedal from './IMedal';

interface IUser {
    AgentId: string,

    // Faction: Faction,
    AP: number,
    Level: number,
    Medals: Array<IMedal>

    CountMedals(name: string): number;
    GetAchieveDate(name: string): string;
}

export default IUser;