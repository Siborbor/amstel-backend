const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM USER", (err, rows) => {
      if (err) return res.send(err);
      res.json(rows);
    });
  });
});

routes.post("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);
    //VALIDAMOS SI EL CODIGO ESTA REPETIDO
    conn.query(
      "SELECT codigo from USER WHERE codigo = ?",
      [req.body.codigo],
      (err, rows) => {
        if (err) return res.send(err);
        let respuesta = rows.length;
        //SI EL CODIGO NO ESTA REPETIDO PASAMOS EL PRIMER CONTROL
        if (respuesta === 0) {
          //VALIDAMOS SI EL CODIGO SE ENCUENTRA EN EL SISTEMA
          conn.query(
            "SELECT codigoservidor from codigo WHERE codigoservidor = ?",
            [req.body.codigo],
            (err, rows) => {
              let lengthcodigos = rows.length;
              //SI EL CODIGO SE ENCUENTRA EN EL SISTEMA AGREGAMOS EL CODIGO EN LA
              if (lengthcodigos > 0) {
                console.log("codigo match correcto");
                conn.query(
                  "INSERT INTO USER set ?",
                  [req.body],
                  (err, rows) => {
                    if (err) return res.send(err);
                    res.send({
                      codigo: 200,
                      mensaje: "codigo agregado exitosamente",
                    });
                  }
                );
              } else {
                res.send({
                  codigo: 100,
                  mensaje: "codigo no existe en el sistema",
                });
              }
            }
          );
        } else {
          res.send({
            codigo: 400,
            mensaje: "codigo ingresado repetido",
          });
        }
      }
    );
  });
});

module.exports = routes;
