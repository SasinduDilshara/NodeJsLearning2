const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');


app.use(bodyparser.json());//sure that bodyparse allow jsons.


var mysqlConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: "root",
        password: "",
        database: "nodejstest",
        multipleStatements: true
    }
);
mysqlConnection.connect((err) => {
    if (err) {
        console.log(err, JSON.stringify(err, undefined, 2));
    }
    else {
        console.log("Ok")
    }
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`${port}`));

//get all data

app.get('/employee', (req, res) => {
    mysqlConnection.query("Select * from employee", (err, rows, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(rows);
            console.log(rows)
        }
    });
});

//get a data


app.get('/employee/:id', (req, res) => {
    mysqlConnection.query("Select * from employee where id= ?", [req.params.id], (err, rows, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(rows);
            console.log(rows)
        }
    });
});

//delete data

app.delete('/employee/:id', (req, res) => {
    mysqlConnection.query("delete from employee where id= ?", [req.params.id], (err, rows, fields) => {
        if (err) {
            console.log(err)
        }
        else {
            mysqlConnection.query("Select * from employee", (err, rows, fields) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send(rows);
                    console.log(rows)
                }
            });
        }
    });
});

//insert

app.post('/employee/add', (req, res) => {
    const { name, code, salary } = req.body;
    mysqlConnection.query("INSERT INTO `employee` (`name`, `code`, `salary`) VALUES (? , ? , ?);"
        , [name, code, salary], (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
            else {
                mysqlConnection.query("Select * from employee", (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send(rows);
                        console.log(rows)
                    }
                });
            }
        });
});

//update

app.put('/employee/update/:id', (req, res) => {
    const { name, code, salary } = req.body;
    mysqlConnection.query("UPDATE `employee` SET `name` = ?, `code` = ?, `salary` = ? WHERE `employee`.`id` = ?;"
        , [name, code, salary, req.params.id], (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
            else {
                mysqlConnection.query("Select * from employee", (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.send(rows);
                        console.log(rows)
                    }
                });
            }
        });
});