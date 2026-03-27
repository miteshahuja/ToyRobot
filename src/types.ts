export type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

export interface Position {
  x: number;
  y: number;
  facing: Direction;
}

export type Command =
  | { type: "PLACE"; x: number; y: number; facing: Direction }
  | { type: "MOVE" }
  | { type: "LEFT" }
  | { type: "RIGHT" }
  | { type: "REPORT" };