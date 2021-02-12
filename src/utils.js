const { DEFAULT_ERROR_MESSAGE } = require('./constants');

module.exports.processApiData = (data) => {
  let parsedData;

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error('The error occured while parsing data.');
    process.exit(1);
  }

  if (parsedData && parsedData.error) {
    const errorMessage = parsedData.error.info || DEFAULT_ERROR_MESSAGE;

    console.error(errorMessage);
    process.exit(1);
  }

  if (parsedData && !parsedData.current) {
    console.error('The are no data about city you provided.');
    process.exit(1);
  }

  const { current } = parsedData;
  const { temperature = '', feelslike = '', humidity = '' } = current;
  const output = [
    `- Temperature: ${temperature}C`,
    `- Feels like: ${feelslike}C`,
    `- Humidity: ${humidity}`,
  ].join('\n');

  console.log(output);
  process.exit(0);
};
