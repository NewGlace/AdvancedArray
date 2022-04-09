# AdvancedArray
An extension of the "ArrayConstructor" class which aims to modify and add methods 

# Table of contents

- [Example Usage](#examples)

# Examples
```ts
// Import class and Create AdvancedArray
import { AdvancedArray } from "./Array/Class";
const array = new AdvancedArray([
    1, 2, 3, [4, 5, 6, 1], {seven: 8, nine: [10]}, 
    1, 2, 3, [4, 5, 6, 1], {seven: 8, nine: [10]}
]);
```
#### Method includes
An improvement of the includes, you can now include "array", "object" and "mixed array".
```ts
// AdvancedArray
array.includes(1); // true
array.includes([4, 5, 6, 1]); // true
array.includes({seven: 8, nine: [10]}); // true
array.includes({nine: [10], seven: 8}); // true
array.includes(6, {recurive: true}); // true

// ArrayConstructor
array.includes(1); // true
array.includes([4, 5, 6, 1]); // false
array.includes({seven: 8, nine: [10]}); // false
array.includes({nine: [10], seven: 8}); // false

```
#### Method clone
```ts
array.clone();// [1, 2, 3, [4, 5, 6, 1], {seven: 8, nine: [10]}, 
              //  1, 2, 3, [4, 5, 6, 1], {seven: 8, nine: [10]}]
```
#### Method spliceAll
```ts
array.spliceAll(1);
// [2, 3, [ 4, 5, 6, 1], { seven: 8, nine: [10] }, 
//  2, 3, [ 4, 5, 6, 1], { seven: 8, nine: [10] }]
array.spliceAll(1, true);
// [2, 3, [ 4, 5, 6 ], { seven: 8, nine: [10] }, 
//  2, 3, [ 4, 5, 6 ], { seven: 8, nine: [10] }]
array.spliceAll([4, 5, 6, 1]);
//[1, 2, 3, {seven: 8, nine: [10]}, 1, 2, 3, {seven: 8, nine: [10]}]
array.spliceAll({seven: 8, nine: [10]});
// [ 1, 2, 3, [ 4, 5, 6, 1 ], 1, 2, 3, [ 4, 5, 6, 1 ] ]
array.spliceAll({nine: [10], seven: 8});
// [ 1, 2, 3, [ 4, 5, 6, 1 ], 1, 2, 3, [ 4, 5, 6, 1 ] ]
array.spliceAll(1, true);
// [2, 3, [ 4, 5, 6 ], { seven: 8, nine: [10] }, 
//  2, 3, [ 4, 5, 6 ], { seven: 8, nine: [10] }]
```
#### Method lastIndexOf & indexOf
```ts
// AdvancedArray
array.indexOf(2); // 1
array.indexOf([4, 5, 6, 1]); // 3
array.indexOf({seven: 8, nine: [10]}); // 4
array.indexOf({nine: [10], seven: 8}); // 4

array.lastIndexOf(2); // 6
array.lastIndexOf([4, 5, 6, 1]); // 8
array.lastIndexOf({seven: 8, nine: [10]}); // 9
array.lastIndexOf({nine: [10], seven: 8}); // 9

// ArrayConstructor
array.indexOf(2); // 1
array.indexOf([4, 5, 6, 1]); // -1
array.indexOf({seven: 8, nine: [10]}); // -1
array.indexOf({nine: [10], seven: 8}); // -1

array.lastIndexOf(2); // 6
array.lastIndexOf([4, 5, 6, 1]); // -1
array.lastIndexOf({seven: 8, nine: [10]}); // -1
array.lastIndexOf({nine: [10], seven: 8}); // -1
```

# Discord
Join the [Discord](https://discord.gg/6pnDcSs)
