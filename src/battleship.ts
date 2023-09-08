import prompt from 'prompt-sync';

const ps = prompt();

class Battleship {
  private board: number[][];
  private totalShips: number;

  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.totalShips = 5;
  }

  public placeShips(): void {
    let shipsPlaced = 0;

    while (shipsPlaced < this.totalShips) {
      this.printBoard(true);
      const input = ps(`Place ship ${shipsPlaced + 1} (e.g., 2,3): `);
      const [x, y] = input.split(',').map(Number);

      if (
        Number.isInteger(x) && Number.isInteger(y) &&
        x >= 0 && x < 10 && y >= 0 && y < 10 &&
        this.board[y][x] === 0
      ) {
        this.board[y][x] = 1;
        shipsPlaced++;
      } else {
        console.log('Invalid coordinates or cell already occupied. Please try again.');
      }
    }
  }

  public printBoard(showShips: boolean): void {
    console.log("Current Board:");
    for (let y = 0; y < 10; y++) {
      let row = "";
      for (let x = 0; x < 10; x++) {
        if (this.board[y][x] === 2) row += 'X ';
        else if (showShips && this.board[y][x] === 1) row += 'S ';
        else row += '- ';
      }
      console.log(row);
    }
  }

  public takeShot(x: number, y: number): boolean {
    if (this.board[y][x] === 1) {
      console.log("Hit!");
      this.board[y][x] = 2;
      return true;
    } else {
      console.log("Miss!");
      return false;
    }
  }

  public areAllShipsSunk(): boolean {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.board[y][x] === 1) {
          return false;
        }
      }
    }
    return true;
  }
}

const player1 = new Battleship();
const player2 = new Battleship();

console.log("Player 1, place your ships.");
player1.placeShips();
console.log("\nPlayer 2, place your ships.");
player2.placeShips();

let currentPlayer = 1;

// eslint-disable-next-line no-constant-condition
while (true) {
  console.log(`Player ${currentPlayer}'s turn.`);
  const input = ps('Enter coordinates to attack (e.g., 2,3): ');
  const [x, y] = input.split(',').map(Number);

  if (
    Number.isInteger(x) && Number.isInteger(y) &&
    x >= 0 && x < 10 && y >= 0 && y < 10
  ) {
    let hit = false;

    if (currentPlayer === 1) {
      hit = player2.takeShot(x, y);
    } else {
      hit = player1.takeShot(x, y);
    }

    if (hit && ((currentPlayer === 1 && player2.areAllShipsSunk()) || (currentPlayer === 2 && player1.areAllShipsSunk()))) {
      console.log(`Player ${currentPlayer} wins!`);
      break;
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      player1.printBoard(currentPlayer === 1);
      player2.printBoard(currentPlayer === 2);
    }
  } else {
    console.log('Invalid coordinates. Please try again.');
  }
}
