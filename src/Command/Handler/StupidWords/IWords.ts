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
    silentlist: Array<{
        group:number
    }>;
}

export default IWords;