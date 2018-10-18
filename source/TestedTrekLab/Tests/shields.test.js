import { Shield } from "../StarTrek/shields";

describe("shield", () => {
  it("starts out lowered", () => {
    const shield = new Shield();
    expect(shield.isUp).toBeFalsy();
  });

  it("can be raised", () => {
    const shield = new Shield();
    expect(shield.isUp).toBeFalsy();
    shield.setShield(true);
    expect(shield.isUp).toBeTruthy();
  });

  it("should start with an energy level of of 9001", () => {
    const shield = new Shield();
    expect(shield.remainingEnergy).toEqual(9001);
  });

  it("transfers energy to the shield", () => {
    const shield = new Shield();
    expect(shield.remainingEnergy).toEqual(9001);
    shield.transferEnergy(4);
    expect(shield.remainingEnergy).toEqual(9005);
  });

  it("should max out at 10000 energy", () => {
    const shield = new Shield();
    shield.transferEnergy(1000);
    expect(shield.remainingEnergy).toEqual(10000);
  });

  it("should min out at 0 energy", () => {
    const shield = new Shield();
    expect(shield.remainingEnergy).toEqual(9001);
    shield.transferEnergy(-49872);
    expect(shield.remainingEnergy).toEqual(0);
  });

  it("subsystems should take damage ", () => {
    const shield = new Shield();
    expect(shield.transferEnergy(-9002)).toEqual(1);
  });
});
