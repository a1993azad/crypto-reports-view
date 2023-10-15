import ls from "localstorage-slim";
import md5 from "md5";

//cache API response
export default class FetchWithCache {
  constructor({ url, method='GET', data, headers, cacheTime = null }) {
    this.url = url;
    this.method = String(method).toUpperCase();
    this.data = data ?? {};
    this.headers = headers ?? {};
    this.cacheTime = cacheTime;
    this.loading = false;
  }
  getCacheKey() {
    return md5(
      this.url +
        JSON.stringify(this.data) +
        this.method +
        JSON.stringify(this.headers)
    );
  }
  getCacheData() {
    return ls.get(this.getCacheKey());
  }
  setCacheData(data) {
    return ls.set(this.getCacheKey(), data, { ttl: this.cacheTime });
  }
  async fetchData(force = false) {
    if (!force) {
      let cacheData = this.getCacheData();
      if (cacheData) {
        return cacheData;
      }
    }
    return await this.fetch();
  }
  async fetch() {
    this.abortController = new AbortController();
    const res = await fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: this.method==='GET' || this.method==='HEAD'?undefined:JSON.stringify(this.data),
      signal: this.abortController.signal,
    });
    const data = await res.json();
    this.setCacheData(data);
    return data;
  }
  deleteCache() {
    return ls.remove(this.getCacheKey());
  }
  cancelFetch() {
    return this.abortController?.abort();
  }
}
