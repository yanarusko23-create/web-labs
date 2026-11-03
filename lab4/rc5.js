// Лабораторна робота №4. Симетричні алгоритми шифрування: RC5-32/12/16
"use strict";

const W = 32;          // розмір слова, біт
const R = 12;          // кількість раундів
const B = 16;          // довжина ключа, байт
const P32 = 0xB7E15163; // магічна константа Pw (від числа e)
const Q32 = 0x9E3779B9; // магічна константа Qw (від золотого перетину)

const rotl = (x, n) => { n &= 31; return ((x << n) | (x >>> (32 - n))) >>> 0; };
const rotr = (x, n) => { n &= 31; return ((x >>> n) | (x << (32 - n))) >>> 0; };
const add = (a, b) => (a + b) >>> 0;
const sub = (a, b) => (a - b) >>> 0;

// Розширення ключа: key (16 байт) -> таблиця S з 2*(R+1) = 26 слів
function expandKey(key) {
  const c = Math.max(1, Math.ceil(B / 4)); // 4 слова в масиві L
  const L = new Array(c).fill(0);
  for (let i = B - 1; i >= 0; i--) {
    L[Math.floor(i / 4)] = add((L[Math.floor(i / 4)] << 8) >>> 0, key[i] & 0xFF);
  }
  const t = 2 * (R + 1);
  const S = new Array(t);
  S[0] = P32;
  for (let i = 1; i < t; i++) S[i] = add(S[i - 1], Q32);

  let A = 0, Bw = 0, i = 0, j = 0;
  const n = 3 * Math.max(t, c);
  for (let k = 0; k < n; k++) {
    A = S[i] = rotl(add(add(S[i], A), Bw), 3);
    Bw = L[j] = rotl(add(add(L[j], A), Bw), add(A, Bw));
    i = (i + 1) % t;
    j = (j + 1) % c;
  }
  return S;
}

function encryptBlock(A, B_, S) {
  A = add(A, S[0]);
  B_ = add(B_, S[1]);
  for (let i = 1; i <= R; i++) {
    A = add(rotl((A ^ B_) >>> 0, B_), S[2 * i]);
    B_ = add(rotl((B_ ^ A) >>> 0, A), S[2 * i + 1]);
  }
  return [A, B_];
}

function decryptBlock(A, B_, S) {
  for (let i = R; i >= 1; i--) {
    B_ = (rotr(sub(B_, S[2 * i + 1]), A) ^ A) >>> 0;
    A = (rotr(sub(A, S[2 * i]), B_) ^ B_) >>> 0;
  }
  return [sub(A, S[0]), sub(B_, S[1])];
}

// байти (little-endian) <-> слова
const bytesToWord = (b, o) =>
  ((b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0);
function wordToBytes(w, out) {
  out.push(w & 0xFF, (w >>> 8) & 0xFF, (w >>> 16) & 0xFF, (w >>> 24) & 0xFF);
}

/**
 * Task1 — шифрування / дешифрування за RC5-32/12/16
 * @param {number[]} source        масив байтів (шістнадцяткові числа)
 * @param {number}   sourceSize    кількість елементів масиву source
 * @param {number[]} key           ключ, 16 байт
 * @param {boolean}  encryptionMode true — шифрування, false — дешифрування
 * @returns {string} hex-байти великими літерами через пробіл, без префікса 0x
 */
function Task1(source, sourceSize, key, encryptionMode) {
  const S = expandKey(key);
  const data = Array.from(source).slice(0, sourceSize).map(x => x & 0xFF);
  while (data.length % 8 !== 0) data.push(0); // доповнення нулями до блоку 64 біт

  const out = [];
  for (let p = 0; p < data.length; p += 8) {
    const A = bytesToWord(data, p);
    const Bw = bytesToWord(data, p + 4);
    const [x, y] = encryptionMode ? encryptBlock(A, Bw, S) : decryptBlock(A, Bw, S);
    wordToBytes(x, out);
    wordToBytes(y, out);
  }
  return out.map(b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ");
}

if (typeof module !== "undefined") module.exports = { Task1 };
