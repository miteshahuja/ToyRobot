import { Command, Direction } from "./types";

const VALID_DIRECTIONS = new Set<Direction>(["NORTH", "EAST", "SOUTH", "WEST"]);

export function parseCommand(input: string): Command | null {
  const line = input.trim().toUpperCase();

  if (!line) return null;

  if (line === "MOVE") return { type: "MOVE" };
  if (line === "LEFT") return { type: "LEFT" };
  if (line === "RIGHT") return { type: "RIGHT" };
  if (line === "REPORT") return { type: "REPORT" };

  const placeMatch = line.match(
    /^PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|EAST|SOUTH|WEST)$/
  );

  if (!placeMatch) return null;

  const [, xRaw, yRaw, facingRaw] = placeMatch;
  const x = Number(xRaw);
  const y = Number(yRaw);
  const facing = facingRaw as Direction;

  if (!Number.isInteger(x) || !Number.isInteger(y)) return null;
  if (!VALID_DIRECTIONS.has(facing)) return null;

  return {
    type: "PLACE",
    x,
    y,
    facing,
  };
}