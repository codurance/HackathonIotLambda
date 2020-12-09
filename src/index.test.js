const { handler, parseStream } = require("./index.js");

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

  const event = {
    "Records": [
      {
        "kinesis": {
          "data": "ewogIGRhdGU6ICIxMjoxNTozMCIsCiAgdGVtcGVyYXR1cmU6ICIwIiwKICB0eHQ6ICJCZWRyb29tIgp9",
        }
      },
      {
        "kinesis": {
          "data": "ewogIGRhdGU6ICIxMzoyMjoyMCIsCiAgdGVtcGVyYXR1cmU6ICIzMS41IiwKICB0eHQ6ICJCYXRocm9vbSIKfQ==",
        }
      },
      {
        "kinesis": {
          "data": "ewogIGRhdGU6ICIyMTo0MDoxNSIsCiAgdGVtcGVyYXR1cmU6ICIzNS4zIiwKICB0eHQ6ICJLaXRjaGVuIgp9",
        }
      }
    ]
  };

  describe("Regression", async () => {
    it('should sanitize an event', async () => {
      const response = await handler(event);

      expect(response).toBe([
        {
          date: "12:15:30",
          temperature: "0",
          txt: "Bedroom"
        },
        {
          date: "13:22:20",
          temperature: "31.5",
          txt: "Bathroom"
        },
        {
          date: "21:40:15",
          temperature: "35.3",
          txt: "Kitchen"
        }
      ]);
    });
  });

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

  describe("Parser", async () => {
    it("should parse the correct amount of event data",() => {
      const response = parseStream(event);

      expect(response.length).toBe(3);
    });

    it('should contain the base64 encrypted data', () => {
      const response = parseStream(event);

      expect(response).toEqual([
        "ewogIGRhdGU6ICIxMjoxNTozMCIsCiAgdGVtcGVyYXR1cmU6ICIwIiwKICB0eHQ6ICJCZWRyb29tIgp9",
        "ewogIGRhdGU6ICIxMzoyMjoyMCIsCiAgdGVtcGVyYXR1cmU6ICIzMS41IiwKICB0eHQ6ICJCYXRocm9vbSIKfQ==",
        "ewogIGRhdGU6ICIyMTo0MDoxNSIsCiAgdGVtcGVyYXR1cmU6ICIzNS4zIiwKICB0eHQ6ICJLaXRjaGVuIgp9"
      ]);
    });
  });
});
