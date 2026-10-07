console.log('=== Частина 3: функції ===');

// 1.2.25 — Triangular, destructuring assignment зі значеннями за замовчуванням
function Triangular(...args) {
  const [a = 3, b = 4, c = 5] = args;
  return { a, b, c };
}

// 1.2.26
console.log(Triangular());
console.log(Triangular(6, 8, 10));
console.log(Triangular(5, 12, 13));

// 1.2.27 — PiMultiplier (замикання)
function PiMultiplier(k) {
  return function () { return Math.PI * k; };
}

// 1.2.28
const piTimes2 = PiMultiplier(2);
const piTimes2div3 = PiMultiplier(2 / 3);
const piDiv2 = PiMultiplier(1 / 2);
console.log(piTimes2());
console.log(piTimes2div3());
console.log(piDiv2());

// 1.2.29 — Painter
function Painter(color) {
  return function (obj) {
    if (obj && obj.type !== undefined) {
      console.log(`${color} ${obj.type}`);
    } else {
      console.log(`No 'type' property occurred!`);
    }
  };
}

// 1.2.30
const PaintBlue = Painter('blue');
const PaintRed = Painter('red');
const PaintYellow = Painter('yellow');

// 1.2.31 — об'єкти з таблиці 12
const obj1 = { maxSpeed: 280, type: 'Sportcar', color: 'magenta' };
const obj2 = { type: 'Truck', 'avg speed': 90, 'load capacity': 2400 };
const obj3 = { maxSpeed: 180, color: 'purple', isCar: true };

for (const o of [obj1, obj2, obj3]) {
  PaintBlue(o);
  PaintRed(o);
  PaintYellow(o);
}
