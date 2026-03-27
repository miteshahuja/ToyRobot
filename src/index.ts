import fs from "node:fs";
import readline from "node:readline";
import { Simulator } from "./simulator";

const simulator = new Simulator();

function runLines(lines: string[]): void {
  const outputs = simulator.executeMany(lines);
  outputs.forEach((output) => console.log(output));
}

function runFromFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    runLines(lines);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown file read error";
    console.error(`Failed to read input file: ${message}`);
    process.exit(1);
  }
}

function runFromStdin(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", (line) => {
    const result = simulator.execute(line);
    if (result !== null) {
      console.log(result);
    }
    rl.prompt();
  });

  rl.on("SIGINT", () => {
    rl.close();
  });

  rl.on("close", () => {
    process.exit(0);
  });
}

const filePath = process.argv[2];

if (filePath) {
  runFromFile(filePath);
} else {
  runFromStdin();
}