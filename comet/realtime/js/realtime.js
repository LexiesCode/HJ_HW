const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  if (isFirst) {
    console.log(event.data);
    let data = JSON.parse(event.data);
    data
      .reverse()
      .forEach(res => realtime.addData([res.online], res.time));
    isFirst = false;
  } else {
    console.log(event.data);
    let res = JSON.parse(event.data);
    realtime.removeData();
    realtime.addData([res.online], res.time);
  }
});