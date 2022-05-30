let myAside=document.querySelector(".aside")
let myMain=document.querySelector(".main")
let ctx = document.getElementById('myChart').getContext('2d');
let myInput=document.querySelector("input")
let myTitre=document.querySelector("#titre")
var myRequest= new XMLHttpRequest() 
myRequest.onreadystatechange=function(){
  if(myRequest.readyState===4 && myRequest.status===200){
      myJs=JSON.parse(myRequest.response)
      let st=""
      myJs.forEach(e => {
          st+="<div class='divs' id="+e.ISO2+" style=' background-color:#BCE6FF ; :hover :yellow ;border-radius : 8px; padding:5px;margin: 5px; '>"+e.Country+"</div>"
          myAside.innerHTML=`${st}`

          });
      let myDivs=document.querySelectorAll(".divs")
      myDivs.forEach(e => {
          e.addEventListener("click",showData)
      });
      function showCountries(){
        if(myInput.value!=""){
          str=""
        myJs.forEach(ev=>{
          s=""
          for(j=0 ; j<myInput.value.length;j++){
            s+=ev.Country[j]
            if (myInput.value==s){
              str+="<div class='dvs' id="+ev.ISO2+" style=' background-color:#BCE6FF ; :hover :yellow ;border-radius : 8px; padding:5px;margin: 5px; '>"+ev.Country+"</div>"
              myAside.innerHTML=str
          }
        }
      })
        }
        if(myInput.value=="" && myAside.innerHTML.length!=35174){
          myAside.innerHTML=st
        } 
        let mydvs=document.querySelectorAll(".dvs")
        mydvs.forEach(e=>{
          console.log(e)
          e.addEventListener("click",showData)
        })
    } 
      }
      document.addEventListener('keydown',run)
      function run(){
        inn=setInterval(showCountries,50)
      }
      function stop(){
        clearInterval(inn)
      }
      document.addEventListener('keyup',stop)
  }
let myReq=new XMLHttpRequest()
function showData(e){
    url=`https://api.covid19api.com/dayone/country/${e.target.getAttribute("id")}`
    myReq.onreadystatechange=function(){
        let confirmed=[]
        let death=[]
        let recorved=[]
        let lbl=[]
        if(myReq.readyState==4 && myReq.status==200){
            let js=JSON.parse(myReq.response)
            js.forEach(e=>{
               confirmed.push(e.Confirmed)
               death.push(e.Deaths)
               recorved.push(e.Recovered)
            })
            for(let i=0 ; i<js.length; i++){
                lbl.push(i)
            }
        }
        let myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: lbl,
              datasets: [{
                data: confirmed,
                borderColor: "#2DB2B5",
                fill: false,
                label:'CONFIRMED'
              },{
                data: death,
                borderColor: "rgb(137, 253, 137)",
                fill: false,
                label:'DEATHS'
              },{
                data: recorved,
                borderColor: "green",
                fill: false,
                label:'RECORVED' 
              }]
            },
            options: {
              legend: {display: false}
            }
        });
    }
    myReq.onreadystatechange()
    myReq.open("GET",url)
    myReq.send()
}
myRequest.open("GET","https://api.covid19api.com/countries")
myRequest.send()

