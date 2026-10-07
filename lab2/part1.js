console.log('=== Частина 1: об\'єкти та Truck (без класів ES6) ===');

const MY_NAME = 'Yana_Rusko';
// 1.2.3 — через new Object()
const car1 = new Object();
car1.color = 'red';
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = MY_NAME;
car1.driver.category = 'C';
car1.driver['personal limitations'] = 'No driving at night';
car1.tuning = true;
car1['number of accidents'] = 0;

// 1.2.4 — через літерал об'єкта
const car2 = {
  color: 'blue',
  maxSpeed: 180,
  driver: {
    name: MY_NAME,
    category: 'B',
    'personal limitations': null
  },
  tuning: false,
  'number of accidents': 2
};

// 1.2.5, 1.2.6 — методи drive
car1.drive = function () { console.log('I am not driving at night'); };
car2.drive = function () { console.log('I can drive anytime'); };

car1.drive();
car2.drive();

// 1.2.7 — конструктор Truck; 1.2.9 — метод trip створюється в конструкторі
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;

  this.trip = function () {
    if (!this.driver) {
      console.log('No driver assigned');
      return;
    }
    let message = 'Driver ' + this.driver.name;
    message += this.driver.nightDriving ? ' drives at night' : ' does not drive at night';
    message += ' and has ' + this.driver.experience + ' years of experience';
    console.log(message);
  };
}

// 1.2.8 — метод через prototype
Truck.prototype.AssignDriver = function (name, nightDriving, experience) {
  this.driver = {
    name: name,
    nightDriving: nightDriving,
    experience: experience
  };
};

// 1.2.10 — демонстрація
const truck1 = new Truck('white', 12000, 85.5, 'Volvo', 'FH16');
const truck2 = new Truck('blue', 9000, 78.2, 'MAN', 'TGX');
const truck3 = new Truck('green', 7000, 80.0, 'DAF', 'XF');

truck1.AssignDriver(MY_NAME, true, 7);
truck2.AssignDriver('Petro Ivanenko', false, 3);

truck1.trip();
truck2.trip();
truck3.trip(); // додатково: водія не призначено
