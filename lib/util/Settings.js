
class Settings {
    constructor() {
        this.baseURL = "https://api.jikan.moe";
        this.version = 3;
    }

    getBaseURL() {
        return this.baseURL + "/v" + this.version;
    }

    setBaseURL(baseURL, version) {
        this.baseURL = baseURL;
        this.version = version;
    }
}

module.exports = new Settings();