import Ship from "../StarTrek/ship";
import { Shield } from "../StarTrek/shields";

describe("ship", () => {

    it("creates a ship", () => {
        const ship = new Ship();
    });
    
    it("ship has a shield", () => {
        const ship = new Ship();
        expect(ship.shield).toBeTruthy();
    });
    
    it("ship has correct starting energy", () => {
        const ship = new Ship(10);
        expect(ship.energySource.remaining).toEqual(10);
    });
    it("reserve energy is deducted when energy is transferred to shields", () => {
        const ship = new Ship(10);
        ship.transferReserveEnergyToShields(6);
        expect(ship.energySource.remaining).toEqual(4);
    });
    it("ship can be instanced by passing in a shield", () => {
        const ship = new Ship(10, new Shield(10));
        expect(ship.shield.energyRemaining).toEqual(10);
    });

    it("shield energy is incremented when energy is transferred to shields", () => {
        const ship = new Ship(10, new Shield(10));
        ship.transferReserveEnergyToShields(5);
        expect(ship.shield.energyRemaining).toEqual(15);
    });

    it("ship can be hit", () => {
        var shield = new Shield(10);
        const ship = new Ship(10, shield);
        ship.receiveHit(5);
        expect(shield.energyRemaining).toEqual(5);
    });

    it("when damage in excess of shield amount is dealt, shields are damaged", () => {
        const ship = new Ship(10, new Shield(10));
        ship.receiveHit(15);
        expect(ship.shield.damage).toEqual(5);        
    });

    // it("when damage in excess of shield amount is dealt random subsystem is damaged", () => {
    //     const ship = new Ship(10, new Shield(10));
    //     expect(ship.subSystems).toBeTruthy();        
    //     //
    // });
    //transfer negative energy to shields
    
    
    //if ship reserves go to 0, you lose the game

});