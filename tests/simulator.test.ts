import { describe, expect, it } from "vitest";
import { Simulator } from "../src/simulator";

describe("Simulator", () => {
  it("produces expected output for example A", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 0,0,NORTH",
      "MOVE",
      "REPORT",
    ]);

    expect(outputs).toEqual(["0,1,NORTH"]);
  });

  it("produces expected output for example B", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 0,0,NORTH",
      "LEFT",
      "REPORT",
    ]);

    expect(outputs).toEqual(["0,0,WEST"]);
  });

  it("produces expected output for example C", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 1,2,EAST",
      "MOVE",
      "MOVE",
      "LEFT",
      "MOVE",
      "REPORT",
    ]);

    expect(outputs).toEqual(["3,3,NORTH"]);
  });

  it("ignores commands before the first valid PLACE", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "MOVE",
      "LEFT",
      "REPORT",
      "PLACE 0,0,NORTH",
      "REPORT",
    ]);

    expect(outputs).toEqual(["0,0,NORTH"]);
  });

  it("ignores invalid PLACE commands", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 5,5,NORTH",
      "REPORT",
      "PLACE 1,1,EAST",
      "REPORT",
    ]);

    expect(outputs).toEqual(["1,1,EAST"]);
  });

  it("ignores moves that would cause the robot to fall", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 0,4,NORTH",
      "MOVE",
      "REPORT",
    ]);

    expect(outputs).toEqual(["0,4,NORTH"]);
  });

  it("allows a later valid PLACE to reposition the robot", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 0,0,NORTH",
      "PLACE 2,2,SOUTH",
      "REPORT",
    ]);

    expect(outputs).toEqual(["2,2,SOUTH"]);
  });

  it("accepts PLACE commands with extra whitespace", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE   1, 2, EAST",
      "REPORT",
    ]);

    expect(outputs).toEqual(["1,2,EAST"]);
  });

  it("ignores unknown commands safely", () => {
    const simulator = new Simulator();

    const outputs = simulator.executeMany([
      "PLACE 0,0,NORTH",
      "JUMP",
      "SPIN",
      "REPORT",
    ]);

    expect(outputs).toEqual(["0,0,NORTH"]);
  });
});