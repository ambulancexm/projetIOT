export const meteoAPI =
function receiveAPI() {
    let apiKey = 'e0d3505562b0333fb73fd10f0e9dac52';
    let city = 'toulouse';
    let urlw = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  
  
    //var url = 'https://api.github.com/users/rsp';
  
    request.get({
      url: urlw,
      json: true,
      headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
      if (err) {
        objdata = { "req": "meteo", "data": [{ "ville": "non defini" }, { "temp": "0" }] };
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is already parsed as JSON:
        console.log(data.name + " : " + data.main.temp);
        //console.log(data);
        objdata = { "req": "meteo", "data": [{ "ville": data.name }, { "temp": data.main.temp }] };
        console.log(objdata);
        return objdata;
      }
    });
  
  
  }