const { handler } = require("./index.js");

/*
Input 
{
  date: 18112020121530,
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
describe("Sanitizer", () => {
  it("should remove the date and keep the time", async () => {
    const event = {
      date: 18112020121530,
      temp: "0C",
    };
    const response = await handler(event);

    expect(response.date).toBe("12:15:30");
  });

  describe("Temperature", () => {
    it("should keep C to C", async () => {
      const event = {
        temp: "31.5C",
      };
      const response = await handler(event);

      expect(response.temp).toBe(31.5);
    });

    it("should convert F to C", async () => {
      const event = {
        temp: "105.5F",
      };
      const response = await handler(event);

      expect(response.temp).toBe(40.83);
    });
  });
});
