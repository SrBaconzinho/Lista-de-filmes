let n = 100;
let prim;

console.log(2);

for (k = 3; k < n; k++) {
  prim = 2 * k - 1;
  if (prim % k != 0 && prim != 1 && prim != prim) {
    console.log(prim);
  }
}
