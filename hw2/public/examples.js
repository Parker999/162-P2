// cited from https://stackoverflow.com/questions/52840843/show-text-on-click-of-a-button
// hide main button and show the sub buttons
document.getElementById("button1").addEventListener("click",unhide1);
document.getElementById("button3").addEventListener("click",unhide6);
// document.getElementById("button2").addEventListener("click",unhide2);
document.getElementById("button2").addEventListener("click",submit);
document.getElementById("button2").addEventListener("click",firstone);
document.getElementById("button4").addEventListener("click",unhide4);
document.getElementById("button4").addEventListener("click",secone);
// submitbutton.addEventListener("click",fetch);


window.onload = function(){   //updated by parker
  //得到当前时间
  var date_now = new Date();
  //得到当前年份
  var year = date_now.getFullYear();
  //得到当前月份
  //注：
  //  1：js中获取Date中的month时，会比当前月份少一个月，所以这里需要先加一
  //  2: 判断当前月份是否小于10，如果小于，那么就在月份的前面加一个 '0' ， 如果大于，就显示当前月份
  var month = date_now.getMonth()+1 < 10 ? "0"+(date_now.getMonth()+1) : (date_now.getMonth()+1);
  var date = date_now.getDate() < 10 ? "0"+date_now.getDate() : date_now.getDate();
  console.log(document.getElementById('date1'))
  document.getElementById('date1').setAttribute("max",year+"-"+month+"-"+date);

  // for future dates
  console.log(document.getElementById('date2'))
  document.getElementById('date2').setAttribute("min",year+"-"+month+"-"+date);
};
function unhide1(){  // parker
    var hid = document.getElementsByClassName("subWrapper");
    var Button = document.getElementById('button1');
    var text = document.getElementById('summary');
    //显示隐藏样式
    if(document.getElementById('mainContent').className === 'show'){
      document.getElementById('mainContent').className = 'hide';
      Button.style.display = "none";
      text.style.display = "none";
    }
  
}


function unhide6(){  // parker
  // var hid = document.getElementsByClassName("subWrapper");
  var Button = document.getElementById('button3');
  var text = document.getElementById('result');
  //显示隐藏样式
  if(document.getElementById('mainContent2').className === 'show'){
    document.getElementById('mainContent2').className = 'hide';
    Button.style.display = "none";
    text.style.display = "none";
  }

}
//document.addEventListener("click",unhide1());
// hide sub buttons and show the main button
async function unhide2(event) 
{   //parker
  var check = false;
  var hid = document.getElementById("button2");
    // var subButton = document.getElementsByClassName("button2");
    // var content = document.getElementsByClassName("subWrapper");

  var Button = document.getElementById('button1');
    //显示隐藏样式
  // if(document.getElementById('mainContent').className === 'show'){
  //   document.getElementById('mainContent').className = 'hide';
  //   Button.style.display = "none";
  // }

  //提交数据
  //获取数据
  event.preventDefault();
  let date1 = document.getElementById('date1').value;
  let Activity1 = document.getElementById('Activity1').value;
  let time_distance = document.getElementById('time_distance').value;
  let Units = document.getElementById('Units').value;

  
  if(!date1 || !Activity1 || !time_distance){
    alert('Invalid Past Activity. Please fill in the entire form.');
    return;
  }
  else
  {
    document.getElementById('mainContent').className = 'show';
    Button.style.display = "block";
    check = true;
  }

  const data = {
    date1:date1,
    Activity1:Activity1,
    time_distance:time_distance,
    Units:Units,
  };

  //  fetch('/submission', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     credentials: 'include'
  //   }).then(function(response) {
  //     console.log(response.body)
  //   }).catch(console.error());

  const options= {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data),
  };
fetch('/submission',options);

  if(document.getElementById('mainContent').className === 'hide'){
    document.getElementById('mainContent').className = 'show';
    hid.style.display = "block";
  };

};

// async function sendPostRequest(url,data) {
//   console.log("about to send post request");
//   let response = await fetch(url, {
//     method: 'POST', 
//     headers: {'Content-Type': 'text/plain'},
//     body: data });
//   return response.text();
// }
// function submit(){
// sendPostRequest('/subsmission')
// };
// POST method implementation; sends plain text.

async function sendPostRequest(url,data) {
  console.log("about to send post request");
  let response = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'text/plain'},
    body: data });
  return response.text();
}

// takes a url and data to send as inputs
// returns a promise
function submit(event){
console.log("starting up");
sendPostRequest('/submission','running')
  .then(function (data) {
    console.log("got back the following string");
    console.log(data); 
  })
  .catch(function (error) {
     console.error('Error:', error);
  });
};

function firstone(event) {
  var text = document.getElementById('summary');
  var Result = "Got it" + " " + document.getElementById('Activity1').value + " " + "for" + " " + document.getElementById('time_distance').value + " " + document.getElementById('Units').value + ". Keep it up!";
  // dispWin.document.write(Result);
  document.getElementById('summary').innerHTML= Result;
  text.style.display = "block";
  // var myFrame = document.getElementById('secpart');
  // myFrame.contentDocument.body.innerHTML = 'Hello world!';
};

function collect1()
{
  unhide2(event);
  firstone();
};


function changeUnits(){
  // debugger
  var Activity1 = document.getElementById('Activity1').value;
console.log(Activity1);
  if(Activity1 == 'Walk'){
    document.getElementById("Units").value = 'Km';
  }else{
    document.getElementById("Units").value = 'minutues';
  }
};

var D2;
var A2;
async function unhide4(event) 
{   //parker
    var hid = document.getElementById("button4");
    // var subButton = document.getElementsByClassName("button2");
    // var content = document.getElementsByClassName("subWrapper");

    var Button = document.getElementById('button3');

  //提交数据
  //获取数据
  event.preventDefault();
  var date2 = document.getElementById('date2').value;
  var Activity2 = document.getElementById('Activity2').value;
  // var time_distance = document.getElementById('time_distance').value;
  // var Units = document.getElementById('Units').value;


  if(!date2 || !Activity2)
  {
    alert('Invalid future Activity. Please fill in the entire form.');
    return;
  }
  else
  {
    document.getElementById('mainContent2').className = 'show';
    Button.style.display = "block";
    D2 = date2;
    A2 = Activity2;    
  }
  var data = {
    date2:date2,
    Activity2:Activity2,
  };
console.log("hello u4");
fetch('/submission', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(function(response) {
    console.log(response.body)
  });
};


function secone(event) {
  var text = document.getElementById('result');
  var Result = "Sounds good! Don't forget to come back to update your session for " + document.getElementById('date2').value + " " + "on" + " " + document.getElementById('Activity2').value;
  // dispWin.document.write(Result);
  document.getElementById('result').innerHTML= Result;
  text.style.display = "block";
  // var myFrame = document.getElementById('secpart');
  // myFrame.contentDocument.body.innerHTML = 'Hello world!';
};




function collect2(){
  secone();
  unhide4(event);
  
};

// function display2() {
//   DispWin = window.open('','NewWin', 'toolbar=no,status=no,width=300,height=200')
//   message = "<ul><li><b>DATE: </b>" + document.form1.date2.value;
//   message += "<li><b>ACTIVITY: </b>" + document.form1.Activity2.value;
//   // message += "<li><b>PHONE: </b>" + document.form1.phone.value + "</ul>";
//   DispWin.document.write(message);
// }

// function senddata()
// {
//   var xhr = new XMLHttpRequest();
//   var url = "url";
//   var data = "email=hey@mail.com&password=101010";
//   xhr.open("POST", url, true);
//   xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//   xhr.onreadystatechange = function () {
//   if (xhr.readyState == 4 && xhr.status == 200) {
//       // do something with response
//       console.log(xhr.responseText);
//   }
//  };
//  xhr.send(data);
// }


function unhide3() {       //open second button
    var hid = document.getElementsByClassName("subWrapper1");
    var Button = document.getElementsByClassName("button3");
    // Emulates jQuery $(element).is(':hidden');
    if(hid[0].offsetWidth > 0 && hid[0].offsetHeight > 0) {
        hid[0].style.visibility = "visible";
        Button[0].style.display = "none";
    }

};


// function unhide4() {
//     var hid = document.getElementsByClassName("button3");
//     var subButton = document.getElementsByClassName("button4");
//     var content = document.getElementsByClassName("subWrapper1");
//     // Emulates jQuery $(element).is(':hidden');
//     if(hid[0].offsetWidth > 0 && hid[0].offsetHeight > 0) {
//         // hid[0].style.visibility = "visible";
//         // subButton[0].style.visibility = "hidden";
//         // content[0].style.visibility = "hidden";
//     }
//     else{
//         hid[0].style.display = "block";
//         subButton[0].style.display = "none";
//         content[0].style.display = "none";
//     }

// }




// cited from https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function Hide()
{

    var x = document.getElementById("button");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

function showhide()
{
    var button = document.getElementById('show_button')
    button.addEventListener('click',hideshow,false);

    function hideshow() {
        document.getElementById('hidden-div').style.display = 'block';
        this.style.display = 'none'
    }
};
