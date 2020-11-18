/*
Input 
{
  date: 18112020T121530,
  temp: "105.5F",
  txt: "Bedroom"
}

Output 
{
  date: "12:15:30",
  temp: "40.72"
  txt: "Bedroom"
}
*/

async function sanitizer(event, context) {
  const response = {
    date: extractTime(`${event.date}`),
    temp: extractAndConvertTemp(event.temp),
    txt: event.txt
  };

  return response;
}

function extractTime(date) {
  const hour = date.substr(8, 2);
  const min = date.substr(10, 2);
  const sec = date.substr(12, 2);
  return hour + ":" + min + ":" + sec;
}

function extractAndConvertTemp(tempAsString) {
  const isFahrenheit = tempAsString.includes("F");
  const removeLastChar = (text) => text.substr(0, text.length - 1);

  let temp = removeLastChar(tempAsString);

  if (isFahrenheit) {
    temp = toCelcius(temp).toFixed(2);
  }
  return Number.parseFloat(temp);
}

function toCelcius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

exports.handler = sanitizer;