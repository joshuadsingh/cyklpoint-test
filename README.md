# Cyklpoint - Frontend Dev - Technical task
We need to create a single page application which once it is launched it will show a page
that displays some data. Data can be in a json file, no reason for any API integration. See
the datasource below for example:

```javascript
[
    {
        "id" : 1,
        "name:"John",
        "country": 0
    },
    {
        "id" : 2,
        "name:"Grace",
        "country ": 1
    },
    {
        "id" : 3,
        "name:"Eliot",
        "country ": 2
    },
...
]
```

The first field is an integer, the second is a string and the third gets the data from a
datasource (drop down) as below:
```javascript
0 - Malta
1 - UK
2 - Italy
...
```
The page should support the below functionality:
- Filtering to all the columns
- Adding a new entry
- Editing and deleting an existing entry
- Paging (10 rows per page by default, ability to select 25 and 50)


The page should be responsive.

The decision on how to display the data, where to place the controls, how the CRUD will work are up to you. The only restriction is that we need to use React.

If you have any questions don't hesitate to contact me.