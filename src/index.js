async function sanitizer(event, context) {
  const response = {
    date: transformToTime(event.date),
    temperature: extractAndConvertTemperature(event.temperature),
    txt: extractText(event.txt)
  };

  return response;
}

function parseStream(event) {
  return [
    "ewogIGRhdGU6ICIxMjoxNTozMCIsCiAgdGVtcGVyYXR1cmU6ICIwIiwKICB0eHQ6ICJCZWRyb29tIgp9",
    "ewogIGRhdGU6ICIxMzoyMjoyMCIsCiAgdGVtcGVyYXR1cmU6ICIzMS41IiwKICB0eHQ6ICJCYXRocm9vbSIKfQ==",
    "ewogIGRhdGU6ICIyMTo0MDoxNSIsCiAgdGVtcGVyYXR1cmU6ICIzNS4zIiwKICB0eHQ6ICJLaXRjaGVuIgp9"
  ];
}

function transformToTime(eventDate) {
  const utcDate = new Date(extractDate(eventDate) + extractTime(eventDate) + extractTimeZone(eventDate))
  return utcDate.toLocaleTimeString("en-GB");
}

function extractDate(date) {
  const year = date.substr(0, 4);
  const month = date.substr(4, 2);
  const day = date.substr(6, 2);
  return year + "-" + month + "-" + day;
}

function extractTime(date) {
  const hour = date.substr(8, 2);
  const min = date.substr(10, 2);
  const sec = date.substr(12, 2);
  return "T" + hour + ":" + min + ":" + sec;
}

function extractTimeZone(date) {
  const sign = date.substr(14, 1);
  let hours = date.substr(15, 2);
  if(hours < 10){
    hours = "0" + hours
  }
  
  const timeZone = date.substr(14, 3)+":00";
  return sign+hours+":00";
}

function extractText(text) {
  return text;
}

function extractAndConvertTemperature(temperatureAsString) {
  const isFahrenheit = temperatureAsString.includes("F");
  const removeLastChar = (text) => text.substr(0, text.length - 1);

  let temperature = removeLastChar(temperatureAsString);

  if (isFahrenheit) {
    temperature = toCelcius(temperature).toFixed(2);
  }
  return Number.parseFloat(temperature);
}

function toCelcius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

exports.handler = sanitizer;
exports.parseStream = parseStream;