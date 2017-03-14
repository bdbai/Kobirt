interface IWords {
    words: Array<{
        kw: Array<string>,
        text: Array<string>
    }>;
    blacklist: Array<{
        qq: number,
        retry: number,
        text: Array<string>
    }>;
}

export default IWords;