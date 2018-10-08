class Settings {
  constructor(apiUrl = 'https://api.jikan.moe', version = 3) {
    this.apiVersion = version;
    this._url = new URL(`/v${version}`, apiUrl);
  }

  /**
   * Gets the api version
   */
  get version() {
    return this.apiVersion;
  }

  /**
   * Sets the API version path
   * @param {number} v - Version number
   */
  set version(v) {
    this.apiVersion = v;
    this._url.pathname = `/v${v}`;
  }

  /**
   * Retuns the full API URL
   */
  get url() {
    return this._url;
  }

  /**
   * Sets the host path of the URL (without protocol)
   * @param {string} host - The host path of the API URL
   */
  set host(host) {
    this._url.host = host;
  }

  get host() {
    return this.url.host;
  }
}

module.exports = new Settings();
