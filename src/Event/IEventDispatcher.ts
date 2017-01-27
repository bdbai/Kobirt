import IMessage from '../Message/IMessage';

interface IEventDispatcher {
    (message: IMessage): void;
}

export default IEventDispatcher;