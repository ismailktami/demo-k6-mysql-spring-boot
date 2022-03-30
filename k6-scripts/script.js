import http from 'k6/http';
import { sleep,check } from 'k6';


export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    { duration: "1m", target: 50 },

    // Stay at rest on 5 VUs for 10s
    { duration: "10s", target: 100 },

    // Ramp-down from 5 to 0 VUs for 5s
    { duration: "1m", target: 200 },    
    
    { duration: "2m", target: 1000 },
  ]
}

export default function () {
    var url="127.0.0.1:6868/api/tutorials";
    var data = {
        "name":"namebook{{bookindex}}",
        "description":"category book{{bookindex}}",
        "published":true}
    
    ;
    let r = http.post("http://host.docker.internal:6868/api/tutorials", JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }});

    //  let r = http.get("http://host.docker.internal:6868/api/tutorials",{timeout: "2m"});

    check(r,{"status is good":(r)=> r.status === 200}
    )
  sleep(1);
}