import { Direction, Position } from "./types";

const MOVE_MAP: Record<Direction, { dx: number; dy: number }> = {
  NORTH: { dx: 0, dy: 1 },
  EAST: { dx: 1, dy: 0 },
  SOUTH: { dx: 0, dy: -1 },
  WEST: { dx: -1, dy: 0 },
};

const LEFT_MAP: Record<Direction, Direction> = {
  NORTH: "WEST",
  WEST: "SOUTH",
  SOUTH: "EAST",
  EAST: "NORTH",
};

const RIGHT_MAP: Record<Direction, Direction> = {
  NORTH: "EAST",
  EAST: "SOUTH",
  SOUTH: "WEST",
  WEST: "NORTH",
};

export class Robot {
  private position: Position | null = null;

  constructor(private readonly boardSize = 5) {}

  public place(x: number, y: number, facing: Direction): void {
    if (!this.isValidCoordinate(x, y)) return;
    this.position = { x, y, facing };
  }

  public move(): void {
    if (!this.position) return;

    const movement = MOVE_MAP[this.position.facing];
    const nextX = this.position.x + movement.dx;
    const nextY = this.position.y + movement.dy;

    if (!this.isValidCoordinate(nextX, nextY)) return;

    this.position = {
      ...this.position,
      x: nextX,
      y: nextY,
    };
  }

  public left(): void {
    if (!this.position) return;

    this.position = {
      ...this.position,
      facing: LEFT_MAP[this.position.facing],
    };
  }

  public right(): void {
    if (!this.position) return;

    this.position = {
      ...this.position,
      facing: RIGHT_MAP[this.position.facing],
    };
  }

  public report(): string | null {
    if (!this.position) return null;
    const { x, y, facing } = this.position;
    return `${x},${y},${facing}`;
  }

  public isPlaced(): boolean {
    return this.position !== null;
  }

  private isValidCoordinate(x: number, y: number): boolean {
    return x >= 0 && x < this.boardSize && y >= 0 && y < this.boardSize;
  }
}