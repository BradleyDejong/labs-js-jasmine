describe("shield", () => {
  it("starts out lowered", () => {
    const shield = new Shield();
    expect(shield.isUp()).toBeFalsy();
  });
});
