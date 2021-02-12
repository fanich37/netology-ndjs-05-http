module.exports = class API {
  constructor(dataFetcher) {
    this.dataFetcher = dataFetcher;
  }

  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.dataFetcher(url, (res) => {
        const { statusCode } = res;

        if (statusCode < 200 || statusCode >= 400) {
          reject({
            message: `The error occured while fetching the data. Server replied with status code: ${statusCode}.`
          });
        }

        res.setEncoding('utf-8');
        const rawData = [];

        res.on('data', (chunk) => {
          rawData.push(chunk);
        });

        res.on('end', () => {
          const data = rawData.join('');

          resolve(data);
        });
      });
    });
  }
}
