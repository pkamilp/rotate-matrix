# rotate-matrix

This program rotates square matrix in anti-clockwise direction

**2x2 matrix**
```
1 2
3 4

After rotation

2 4
1 3
```

**3x3 matrix**
```
1 2 3
4 5 6
7 8 9

After rotation

2 3 6
1 5 9
4 7 8
```

## Build
```
npm install
npm run build
```

## Test
```
npm run test
```

## Use
After building package you can use it like
```
node cli.js input.csv > output.csv
```
The input file is the first and only argument to the program.
Output is written to stdout

#### Example input.csv
*json* is a flat array of numbers
```
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
2,"[40, 20, 90, 10]"
3,"[-5]"
9,"[2, -0]"
5,"[2, -5, -5]"
8,"[1, 1, 1, 1, 1]"
```
