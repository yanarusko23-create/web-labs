console.log('=== Частина 2: класи ES6 ===');

const sinDeg = (deg) => Math.sin(deg * Math.PI / 180);

// 1.2.12 – 1.2.15
class Square {
  constructor(a) { this.a = a; }

  static help() {
    console.log('Квадрат — чотирикутник з рівними сторонами та прямими кутами (90°). P = 4a, S = a².');
  }

  length() { console.log(`Сума довжин сторін: ${4 * this.a}`); }
  square() { console.log(`Площа: ${this.a ** 2}`); }

  info() {
    console.log('Квадрат');
    console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
    console.log('Величини кутів: 90°, 90°, 90°, 90°');
    this.length();
    this.square();
  }
}

// 1.2.16 – 1.2.17
class Rectangle extends Square {
  constructor(a, b) {
    super(a);
    this.b = b;
  }

  static help() {
    console.log('Прямокутник — чотирикутник із прямими кутами; протилежні сторони рівні. P = 2(a + b), S = a·b.');
  }

  length() { console.log(`Сума довжин сторін: ${2 * (this.a + this.b)}`); }
  square() { console.log(`Площа: ${this.a * this.b}`); }

  info() {
    console.log('Прямокутник');
    console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
    console.log('Величини кутів: 90°, 90°, 90°, 90°');
    this.length();
    this.square();
  }
}

// 1.2.18 – 1.2.19, 1.2.22 (ґеттери та сеттери)
class Rhombus extends Square {
  constructor(a, alpha, beta) {
    super(a);
    this.alpha = alpha;
    this.beta = beta;
  }

  get a() { return this._a; }
  set a(value) {
    if (value <= 0) throw new RangeError('Сторона має бути додатною');
    this._a = value;
  }
  get alpha() { return this._alpha; }
  set alpha(value) {
    if (value <= 90 || value >= 180) throw new RangeError('Тупий кут має бути в (90°, 180°)');
    this._alpha = value;
  }
  get beta() { return this._beta; }
  set beta(value) {
    if (value <= 0 || value >= 90) throw new RangeError('Гострий кут має бути в (0°, 90°)');
    this._beta = value;
  }

  static help() {
    console.log('Ромб — чотирикутник з рівними сторонами; протилежні кути рівні. P = 4a, S = a²·sin(α).');
  }

  length() { console.log(`Сума довжин сторін: ${4 * this.a}`); }
  square() { console.log(`Площа: ${(this.a ** 2 * sinDeg(this.alpha)).toFixed(2)}`); }

  info() {
    console.log('Ромб');
    console.log(`Довжини сторін: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
    console.log(`Величини кутів: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
    this.length();
    this.square();
  }
}

// 1.2.20 – 1.2.21
class Parallelogram extends Rectangle {
  constructor(a, b, alpha, beta) {
    super(a, b);
    this.alpha = alpha;
    this.beta = beta;
  }

  static help() {
    console.log('Паралелограм — чотирикутник з попарно паралельними сторонами. P = 2(a + b), S = a·b·sin(α).');
  }

  length() { console.log(`Сума довжин сторін: ${2 * (this.a + this.b)}`); }
  square() { console.log(`Площа: ${(this.a * this.b * sinDeg(this.alpha)).toFixed(2)}`); }

  info() {
    console.log('Паралелограм');
    console.log(`Довжини сторін: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
    console.log(`Величини кутів: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
    this.length();
    this.square();
  }
}

// 1.2.23 — виклик help
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// 1.2.24 — об'єкти та info
new Square(5).info();
new Rectangle(6, 4).info();
new Rhombus(5, 120, 60).info();
new Parallelogram(7, 3, 120, 60).info();
