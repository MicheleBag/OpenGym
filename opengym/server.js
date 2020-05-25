const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "opengym",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("db connesso");
  else
    console.log("connessione db fallita :" + JSON.stringify(err, undefined, 2));
});

app.listen(5000, () => console.log("express server e runnato alla porta 5000"));

app.get("/", function (req, res, next) {
  res.send("Server runnning on port 5000");
});

app.post("/account", (req, res) => {
  let inp = req.body;
  let utente = {
    email: inp.email,
    nome: inp.name,
    cognome: inp.surname,
    password: inp.password,
  };
  console.log(utente);
  mysqlConnection.query("INSERT INTO utente SET ?", utente, function (
    err,
    result
  ) {
    if (!err) res.json({done: true});
    else {
      console.log(err);
      res.json({done: false});
    }
  });
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    mysqlConnection.query(
      "SELECT * FROM utente WHERE email = ? AND password = ?",
      [email, password],
      (err, results, fields) => {
        if (results.length > 0) {
          const token = jwt.sign(
            {
              email: results[0].email,
              nome: results[0].nome,
              cognome: results[0].cognome,
            },
            "SEGRETO",
            { expiresIn: 120 }
          );
          res.json({ done: true, token: token });
        } else {
          res.json({ done: false });
        }
      }
    );
  } else {
    res.json({done: false});
  }
});

app.post("/reservation", (req, res) => {
  let inp, date, prenotazione;
  console.log(req.body);
  inp = req.body;
  row_data = inp.data; 
  date = ChangeDateFormat2(row_data); 
  console.log(date);
  prenotazione = {
    id_palestra: inp.id_palestra,
    email: inp.email,
    data: date,
    orario_inizio: inp.orario_inizio,
    orario_fine: inp.orario_fine
  };
  mysqlConnection.query(
    "INSERT INTO prenotazione SET ?",
    prenotazione,
    (err, results) => {
      if (!err) res.send({done: true});
      else res.send({done: false});
    }
  );
});

app.get("/search", (req, res) => {
  let word = "'" + req.query.word + "?'";
  mysqlConnection.query(
    "SELECT id_palestra,nome,indirizzo,città,immagine FROM palestra WHERE active = ? AND nome REGEXP " + word,true,
    (err, results) => {
      if(!err){
        let json_searched_names = JSON.parse(JSON.stringify(results));
        console.log(json_searched_names)
        res.json(json_searched_names);
        
      }
      else{
        res.json({done: false})
      } 
    }
  );
});

app.get("/reservation", (req, res) => {
  let id_palestra = req.query.id_palestra;
  let business_hours;
  let time_slots = [];
  let reservation;
  let res_data = [];
  let days_off;
  let days_data=[];
  let date1 = new Date();
  let date2 = new Date();
  let date_tmp = new Date(date1);
  
  mysqlConnection.query(
    "SELECT orario_apertura,orario_chiusura,capacità FROM palestra WHERE id_palestra = ?", id_palestra,
    (err, results) => {
      if(!err){
        business_hours = JSON.parse(JSON.stringify(results));
        InsertTimeSlots(business_hours,time_slots);
          mysqlConnection.query(
            "SELECT days_off FROM chiusura WHERE id_palestra = ?",[id_palestra],
              (err, resul) => {
                if(!err){
                  days_off = JSON.parse(JSON.stringify(resul));            
                  SetTime0toDates(date1,date2,date_tmp);            
                  mysqlConnection.query(
                    "SELECT data,orario_inizio,orario_fine FROM prenotazione WHERE id_palestra = ? AND data >= ? AND data <= ?",[id_palestra,date1,date2],
                      (err, resul) => {
                      if(!err){  
                        reservation = JSON.parse(JSON.stringify(resul));
                        days_data = {day0:[],day1:[],day2:[],day3:[],day4:[],day5:[],day6:[]};
                        res_data = {day0:[],day1:[],day2:[],day3:[],day4:[],day5:[],day6:[]};                                      
                        daysDataInsert(reservation,days_data,date1);    
                        console.log(res_data);
                        sessionInsert(time_slots,days_data,res_data,business_hours);
                        dateStatusInsert(date_tmp,days_off,res_data);  
                        res.json(res_data);
                      }
                      else{
                        res.json({done: false});
                      }
                      }        
                  );
                }
                else{
                  res.json({done: false});
                }
              }
          );
      }
      else{
        res.json({done: false});
      }  
    }
  ); 
});

app.delete("/reservation", (req, res) => {
  inp = req.query;
  id_palestra = inp.id_palestra;
  email = inp.email;
  row_data = inp.data; 
  date = ChangeDateFormat2(row_data); 
  mysqlConnection.query(
    "DELETE FROM prenotazione WHERE id_palestra = ? AND email = ? AND data = ?",[id_palestra, email, date],
    (err, results) => {
      if(!err){
        res.json({done: true})        
      }
      else{
        res.json({done: false})
      } 
    }
  );
});

app.put("/account", (req, res) => {
  inp = req.body;
  email = inp.email;
  first_name = inp.first_name;
  last_name = inp.last_name;
  current_password = inp.current_password;
  new_password = inp.new_password;
 
  if (email && current_password) {
    mysqlConnection.query(
      "SELECT * FROM utente WHERE email = ? AND password = ?",
      [email, current_password],
      (err, results) => {
        if (results.length > 0) {
          mysqlConnection.query(
            "UPDATE utente SET nome = ?, cognome = ?, password = ?  WHERE email = ?",[first_name,last_name,new_password,email],
            (err, results) => {
              if(!err){
                res.json({ done: true})
              }
              else{
                res.json({ done: false})
              }
            }
          );
        } else {
          res.json({ done: false });
        }
      }
    );
  } else {
    res.json({done: false});
  }
});

app.get("/userReservationInfo", (req, res) => {
  inp = req.query;
  email = inp.email;
  today_date = new Date();
  today_date.setHours(0,0,0,0);
  console.log(email)
  mysqlConnection.query(
    "SELECT  id_palestra,nome,data,orario_inizio,orario_fine FROM prenotazione INNER JOIN palestra USING(id_palestra) WHERE prenotazione.email = ? AND prenotazione.data >= ?",[req.query.email,today_date],
    (err, results) => {
      if(!err){
        console.log()
        reservations_raw = JSON.parse(JSON.stringify(results));
        for(i=0; i<reservations_raw.length; i++){
          reservation_date = new Date (reservations_raw[i].data);
          reservation_start_time = ChangeTimeFormat(reservations_raw[i].orario_inizio);
          reservation_finish_time = ChangeTimeFormat(reservations_raw[i].orario_fine);
          reservations_raw[i].data = ChangeDateFormat(reservation_date);
          reservations_raw[i].orario_inizio = reservation_start_time;
          reservations_raw[i].orario_fine = reservation_finish_time;
        }
        console.log(reservations_raw)
        res.json(reservations_raw)
      }
      else{
        console.log(err)
        res.json({done: false})
      } 
    }
  );
});

app.post("/adminLogin", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    mysqlConnection.query(
      "SELECT * FROM gym_administrator INNER JOIN palestra USING(id_palestra) WHERE email = ? AND password = ?",
      [email, password],
      (err, results, fields) => {
        if (results.length > 0) {
          console.log(results)
          const token = jwt.sign(
            {
              id_palestra: results[0].id_palestra,
              name: results[0].nome,
              address: results[0].indirizzo,
              city: results[0].città,
              immagine: results[0].immagine,
              capacity: results[0].capacità,
              open_time: results[0].orario_apertura,
              closed_time: results[0].orario_chiusura,
              active: results[0].active
            },
            "SEGRETO",
            { expiresIn: 120 }
          );
          res.json({ done: true, token: token });
        } else {
          res.json({ done: false });
        }
      }
    );
  } else {
    res.json({done: false});
  }
});
app.get("/adminReservationInfo", (req, res) => {
  id_palestra = req.query.id_palestra;
  date = new Date();
  date.setHours(0,0,0,0);
  query_data = [];
  time_slots = [];
  mysqlConnection.query(
    "SELECT orario_inizio,orario_fine,orario_apertura,orario_chiusura,email,utente.nome,cognome FROM prenotazione INNER JOIN palestra USING(id_palestra) INNER JOIN utente using(email) WHERE data = ? AND id_palestra",[date,id_palestra],
    (err, results) => {
      if(!err){
        query_data = JSON.parse(JSON.stringify(results));
        if(query_data.length>0){

        InsertTimeSlots(query_data, time_slots);      
        data_string = JSON.stringify(query_data);
        for(var k = 0; k < time_slots.length; k++) {
          time_slots[k]["users"] = [];
          
            for(i=0; i<query_data.length; i++){
              if(query_data[i].orario_inizio == time_slots[k].start_session && query_data[i].orario_fine == time_slots[k].finish_session){
                time_slots[k]["users"].push({nome: query_data[i].nome+" "+query_data[i].cognome});
               }
            }     
          
        }
        }
        else{
          res.json({empty: true});
        }
        res.json(time_slots);
      }
      else{
        res.json({done: false});
      } 
    }
  );
});
app.put("/palestra", (req, res) => {
  inp = req.body;
  id_palestra = inp.id_palestra;
  dati = {
    
    nome : inp.name,
    indirizzo : inp.address,
    città : inp.city,
    immagine : inp.immagine,
    capacità : inp.capacity,
    orario_apertura : inp.open_time,
    orario_chiusura : inp.closed_time,
    active : true
  }
  mysqlConnection.query("UPDATE palestra SET ? WHERE id_palestra = ?", [dati,inp.id_palestra], (err,result) => {
    if (!err) res.json({done: true});
    else {
      console.log(result)
      console.log(err)
      res.json({done: false});
    }
  });


});

app.post("/palestra", (req, res) => {
  inp = req.body;
  email = inp.email;
  password = inp.password;
  dati = {
    nome : "default",
    indirizzo : "default",
    città : "default",
    immagine : "",
    capacità : "0",
    orario_apertura : "00:00:00",
    orario_chiusura : "00:00:00",
    active : false
  };
  mysqlConnection.query("INSERT INTO palestra SET ?", [dati], (err,result) => {
    if (!err){
      mysqlConnection.query("SELECT id_palestra FROM palestra WHERE id_palestra NOT IN(SELECT id_palestra FROM gym_administrator)", (err,result) => {
        if (!err){
          account = {
            id_palestra: result[0].id_palestra,
            email: email,
            password: password
          };
          mysqlConnection.query("INSERT INTO gym_administrator SET ?",[account], (err, result) =>{
            if(!err){
              res.json({done: true})
            }
            else{
              res.json({done: false})
              console.log(err)
            }
          });
        }
        else {
          res.json({done: false});
          console.log("2")
        }
      });
    }
    else {
      res.json({done: false});
      console.log("3")
    }
  });

  


});

function ChangeDateFormat(date){
  
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return day + '-' + month + '-' + year;
}

function ChangeDateFormat2(row){

  row_data = row.split("-")
  date = new Date(row_data[2]+"-"+row_data[1]+"-"+row_data[0])
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  
  return year + '-' + month + '-' + day +" "+"00:00:00";
  
}
function ChangeTimeFormat(time){
  t = time.split(':')
  return t[0]+":"+t[1];
}

function InsertTimeSlots(business_hours, time_slots){
  
  open_hours = business_hours[0].orario_apertura;
  closed_hours = business_hours[0].orario_chiusura;      
  split_open = open_hours.split(':');
  split_closed = closed_hours.split(":");
  total_time_open = (split_open[0] * 60 * 60) + (split_open[1] * 60) + (split_open[2]);
  total_time_closed = (split_closed[0] * 60 * 60) + (split_closed[1] * 60) + (split_closed[2]);
  tot_hours = parseInt(((total_time_closed - total_time_open) / (60 * 60)) / 100);
  tmp = open_hours;
  for (i = 1; i <= tot_hours; i++) {
    if (tot_hours == i) {
      time_slots.push({ slot: "slot" + i, start_session: tmp, finish_session: closed_hours });
      break;
    }
    finish = (split_open[0] * 1 + i) + ":" + split_open[1] + ":" + split_open[2];
    time_slots.push({ slot: "slot" + i, start_session: tmp, finish_session: finish })
    tmp = finish;
  }
  
}

function SetTime0toDates(date1,date2,date_tmp){
  date1.setHours(0,0,0,0);
  date2.setHours(0,0,0,0);
  date2.setDate(date2.getDate()+7);
  date_tmp.setHours(0,0,0,0);

}

function daysDataInsert(reservation,days_data,date1){
  for(i=0; i<7; i++){
    d = "day"+i;
    for(var k = 0; k < reservation.length; k++) {
      var obj = reservation[k];
      reservation_date = new Date(obj.data);
      if(date1.getTime() === reservation_date.getTime()){
        days_data[d].push({start_session: obj.orario_inizio, finish_session: obj.orario_fine});                          
      }
    } 
    date1.setDate(date1.getDate()+1);
  }            
}

function sessionInsert(time_slots,days_data,res_data,business_hours){
  count_users=[];
  for(l=0; l<7;l++){
    d = "day"+l;
      for (z = 0; z < time_slots.length; z++) {
        count_users[z] = 0;
        for (k = 0; k < days_data[d].length; k++) {
          if (time_slots[z].start_session == days_data[d][k].start_session && time_slots[z].finish_session == days_data[d][k].finish_session) {
            count_users[z] += 1;
          }                            
        }
        
          res_data[d].push({  start_session: ChangeTimeFormat(time_slots[z].start_session),  finish_session: ChangeTimeFormat(time_slots[z].finish_session), remaining_places: (business_hours[0].capacità - count_users[z]) });                            
      }
    }
}

function dateStatusInsert(date_tmp,days_off,res_data){
  for(m=0; m<7; m++){
    d = "day"+m;
    status = true;
    start_day = date_tmp.getDay();
    for(n=0; n<days_off.length; n++){
      if(start_day == days_off[n].days_off){
        status = false;
      }
    } 
    if(status){
      res_data[d].push({status_opened: true, date: ChangeDateFormat(date_tmp)})
    }
    else{
      res_data[d].push({status_opened: false, date: ChangeDateFormat(date_tmp)})
      status = true
    }
    date_tmp.setDate(date_tmp.getDate()+1);  
  }
}