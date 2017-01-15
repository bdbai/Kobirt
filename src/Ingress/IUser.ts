import Faction from './Faction';
import IMedal from './IMedal';

interface IUser {
    AgentId: string,

    // Faction: Faction,
    AP: Number,
    Level: Number,
    Medals: Array<IMedal>
}

export default IUser;