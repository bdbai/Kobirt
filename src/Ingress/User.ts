import IUser from './IUser';
import IMedal from './IMedal';

class User implements IUser {
    constructor(
        public AgentId: string,
        public Medals: Array<IMedal>,
        public AP: Number,
        public Level: Number
    ) { }
}

export default User;