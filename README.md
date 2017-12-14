## Quick Start
How Cube is work?
```javascript

// This is an array of data from server
let entities = [
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]

// This is the data scheme we need to obtain
let schema = [
    { name: 'cities', keyProps: ['city']},
    { name: 'companies', keyProps: ['company']},
    { name: 'age', keyProps: ['minAgePlane', 'maxAgePlane']},
    { name: 'prices', keyProps: ['price'], dependency: 'cities' },
    { name: 'counts', keyProps: ['planesCount'], dependency: ['cities', 'companies']},
]

// We send it all to the constructor
let cube = new Cube(entities, schema);

```
Now cube will be:

```js
{
    measurements: {
        cities: [
            { id: 1, city: 'New York' },
            { id: 2, city: 'Paris' },
            { id: 3, city: 'Moscow' },
        ],
        companies: [
            { id: 1, company: 'AirLine' },
            { id: 2, company: 'SkyLine' },
        ],
        age: [
            { id: 1, minAgePlane: '1 year', minAgePlane: '5 year' },
            { id: 1, minAgePlane: '5 year', minAgePlane: '10 year' },
        ],
        prices: [
            { id: 1, price: '$20' },
            { id: 2, price: '$10' },
            { id: 3, price: '$20' },
            { id: 4, price: '$25' },
        ],
        counts: [
            { id: 1, planesCount: 1 },
            { id: 2, planesCount: 1 },
            { id: 3, planesCount: 1 },
            { id: 4, planesCount: 1 },
            { id: 5, planesCount: 2 },
        ]
    },
    normalizedData: [
        { id: 1, cities_id: 1, companies_id: 1, age_id: 1, price_id: 1, counts_id: 1 },
        { id: 2, cities_id: 2, companies_id: 2, age_id: 2, price_id: 2, counts_id: 2 },
        { id: 3, cities_id: 2, companies_id: 1, age_id: 2, price_id: 2, counts_id: 3 },
        { id: 4, cities_id: 3, companies_id: 1, age_id: 1, price_id: 3, counts_id: 4 },
        { id: 5, cities_id: 3, companies_id: 2, age_id: 1, price_id: 4, counts_id: 5 },
    ]
}
```
How get list back:

```javascript
cube.getList()

```
```js
[
    { id: 1, city: 'New York', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 2, city: 'Paris', company: 'SkyLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 3, city: 'Paris', company: 'AirLine', minAgePlane: '5 year', maxAgePlane: '10 year', planesCount: 1, price: '10$'},
    { id: 4, city: 'Moscow', company: 'AirLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 1, price: '20$'},
    { id: 5, city: 'Moscow', company: 'SkyLine', minAgePlane: '1 year', maxAgePlane: '5 year', planesCount: 2, price: '25$'},
]
```

How to take normal data:

```javascript
cube.unique('prices')
```

```js
[
    { id: 1, price: "20$" },
    { id: 2, price: "10$" },
    { id: 3, price: "20$" },
    { id: 4, price: "25$" },
]
```
or for dependent
```javascript
let city = { id: 3 /** city: "Moscow"*/ }; // other parameters are optional
cube.unique('prices', { 'cities': city })
```

```js
[
    { id: 3, price: "20$" },
    { id: 4, price: "25$" },
]
```