const { handler } = require("./index.js");

/*
Input 
{
  date: "202011180832-8",
  temperature: "105.5F",
  txt: "Bedroom"
}

Output 
{
  date: "12:15:30",
  temperature: "40.72"
  txt: "Bedroom"
}
*/
describe("Sanitizer", () => {
  describe("Date and time", () => {
    it("should remove the date and keep the time", async () => {
      const event = {
        date: "20201118083211-8",
        temperature: "0C",
      };
      const response = await handler(event);
  
      expect(response.date).toBe("16:32:11");
    });

    it("should remove the date and keep the time for biger time zones", async () => {
      const event = {
        date: "20201118023211+11",
        temperature: "0C",
      };
      const response = await handler(event);
  
      expect(response.date).toBe("15:32:11");
    });
  });

  describe("temperatureerature", () => {
    it("should keep C to C", async () => {
      const event = {
        date: "19000101000000+1",
        temperature: "31.5C",
      };
      const response = await handler(event);

      expect(response.temperature).toBe(31.5);
    });

    it("should convert F to C", async () => {
      const event = {
        date: "19000101000000+1",
        temperature: "105.5F",
      };
      const response = await handler(event);

      expect(response.temperature).toBe(40.83);
    });
  });

  describe("Text", () => {
    it("should return the text as it is", async () => {
      const event = {
        date: "19000101000000+1",
        temperature: "0C",
        txt: "Bedroom"
      };
      const response = await handler(event);
  
      expect(response.txt).toBe("Bedroom");
    });
  });
});
