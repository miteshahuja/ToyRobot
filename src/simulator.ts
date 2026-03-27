import { Robot } from "./robot";
import { parseCommand } from "./parser";

export class Simulator {
  private readonly robot: Robot;

  constructor(boardSize = 5) {
    this.robot = new Robot(boardSize);
  }

  public execute(input: string): string | null {
    const command = parseCommand(input);
    if (!command) return null;

    if (!this.robot.isPlaced() && command.type !== "PLACE") {
      return null;
    }

    switch (command.type) {
      case "PLACE":
        this.robot.place(command.x, command.y, command.facing);
        return null;
      case "MOVE":
        this.robot.move();
        return null;
      case "LEFT":
        this.robot.left();
        return null;
      case "RIGHT":
        this.robot.right();
        return null;
      case "REPORT":
        return this.robot.report();
      default:
        return null;
    }
  }

  public executeMany(inputs: string[]): string[] {
    const outputs: string[] = [];

    for (const input of inputs) {
      const result = this.execute(input);
      if (result !== null) {
        outputs.push(result);
      }
    }

    return outputs;
  }
}