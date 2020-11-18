const {handler} = require("./index.js");

describe("Sanitizer", () => {
  it("should say hello once called", async () => {
    const response = await handler()
    expect(response.body).toBe('"Hello from Lambda!"')
  });

});
