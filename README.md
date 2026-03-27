# Toy Robot — TypeScript

A TypeScript console application that simulates a toy robot moving on a 5x5 tabletop.

## Overview

This project implements the Toy Robot coding challenge as a small, focused console application.

The goal of the solution is to prioritise clarity, correctness, and simplicity. The code is structured to separate concerns cleanly, avoid unnecessary abstractions, and remain easy to reason about and test.

The application accepts commands from either a file or standard input and outputs the robot’s position when requested.

## Requirements

- Node.js (v18 or higher recommended)
- npm

## Installation

```bash
npm install
```

## Running the application

### Using a file (recommended)

```bash
npm run build
npm start sample.txt
```

### Using standard input

```bash
npm run dev
```

Then enter commands line by line, for example:

```txt
PLACE 0,0,NORTH
MOVE
REPORT
```

Exit with:

- Windows: Ctrl + C
- macOS/Linux: Ctrl + C

## Running tests

```bash
npm test
```

The test suite covers:

- the official examples provided in the challenge
- boundary conditions (edge of the board)
- invalid commands and input handling
- behaviour before the first valid `PLACE`

## Supported commands

- `PLACE X,Y,F`
- `MOVE`
- `LEFT`
- `RIGHT`
- `REPORT`

Where `F` is one of:

- `NORTH`
- `SOUTH`
- `EAST`
- `WEST`

Commands are case-insensitive and tolerate minor whitespace variations.

## Behaviour

- The robot operates on a 5x5 grid (coordinates 0–4)
- Commands are ignored until a valid `PLACE` is executed
- Invalid commands are ignored safely
- The robot will not move outside the grid
- A valid `PLACE` command can reposition the robot at any time

## Project structure

```
src/
  index.ts        Entry point and CLI handling
  simulator.ts    Command orchestration
  robot.ts        Robot state and movement logic
  parser.ts       Input parsing and validation
  types.ts        Shared type definitions

tests/
  simulator.test.ts
```

## Design approach

The implementation is intentionally simple and avoids overengineering.

- The robot logic is isolated from input/output concerns
- Command parsing is separated from execution
- The simulator coordinates behaviour without holding complex state
- The CLI layer is kept thin and focused on input handling

This separation makes the core logic easy to test and reason about.

## Design decisions

- TypeScript is used to provide type safety and make the domain model explicit
- No external libraries are used for core logic
- Invalid input is ignored rather than throwing errors, to keep behaviour predictable
- The parser is tolerant to formatting variations without becoming overly permissive

## Example

Input:

```
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```

Output:

```
3,3,NORTH
```

## Assumptions

- The board size is fixed at 5x5
- Only valid directions are accepted
- Commands outside the defined set are ignored
- Input may contain extra whitespace

## Possible extensions

If this were extended further, potential improvements could include:

- configurable board size
- visual representation of the grid
- richer CLI experience
- additional validation feedback for invalid commands

## Author

Mitesh Ahuja
