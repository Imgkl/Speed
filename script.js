let req;
let start = 0;
let count = 0;
let sum = 0;
let decimals = 0;

// control precision
function onKeyDown (ev) {
switch (ev.code) {
  case 'ArrowUp':
  case 'ArrowRight':
    decimals++;
    decimals = decimals > 3 ? 3 : decimals;
    break;

  case 'ArrowDown':
  case 'ArrowLeft':
    decimals--;
    decimals = decimals < 0 ? 0 : decimals;
    break;
}
}

document.addEventListener ('keydown', onKeyDown);

// store <button> tags in array
const btns = Array.from (document.querySelectorAll ('button'));

// add click handler to buttons
btns.forEach (btn => {
btn.addEventListener ('click', testDownload);
});


/**
* Round number to defined decimals
*
* @param   {number}  num   Number to round
* @param   {number}  deci  Number of decimals to round to
* @return  {string}        Rounded number with trailing zeros
*/

function dec (num, deci) {
let amount;
let result;
let missing;
let i;

// rounding
if (deci) {
  amount = Math.pow (10, deci || 1);
  result = Math.round (num * amount) / amount;
} else {
  result = Math.round (num);
}

// force trailing zeros
result = String (result);

if (!deci) {
  return result;
}

if (!~result.indexOf ('.')) {
  missing = deci;
  result += '.';
} else {
  missing = deci - result.split ('.')[1].length;
}

if (missing) {
  for (i = missing; i > 0; i--) {
    result += '0';
  }
}

// done
return result;
}


/**
* Test completed
*
* @return  {void}
*/

function testDone () {
const diff = (Date.now() - start) / 1000;

if (req.readyState !== 4) {
  return;
}

document.querySelector ('progress').style.visibility = 'hidden';
document.querySelector ('#result').className = 'resultDone';
document.querySelector ('#eta').innerHTML = dec (diff, 2) + ' sec to complete the download';
req = null;
}


/**
* Test progress handler
*
* @param   {Event}  ev  XMLHttpRequest.onprogress event
* @return  {void}
*/

function testRunning (ev) {
const now = Date.now ();

let percent = 0.0;
let Bps = 0;
let avg = 0;
let eta = 0;

if (ev.lengthComputable && ev.total > 0) {
  Bps = ev.loaded / ((now - start) / 1000);
  mbit = Bps / 1024 / 1024 * 8;
  count++;
  sum += mbit;
  avg = sum / count;
  percent = ev.loaded / ev.total * 100.0;
  eta = (ev.total - ev.loaded) / Bps;
}

document.querySelector ('progress').value = percent;
document.querySelector ('#result').innerHTML = dec (avg, decimals) + ' Mbit/s';
document.querySelector ('#eta').innerHTML = dec (eta, decimals) + ' sec';
}


/**
* Start new test
* and abort any running test
*
* @param   {Event}  ev  Click event
* @return  {void}
*/

function testDownload (ev) {
if (req) {
  req.abort ();
}

req = new XMLHttpRequest;

start = Date.now ();
count = 0;
sum = 0;

btns.forEach (btn => {
  btn.classList.remove('choice');
});

ev.target.classList.add('choice');
document.querySelector ('progress').value = 0;
document.querySelector ('progress').style.visibility = 'visible';

req.onprogress = testRunning;
req.onreadystatechange = testDone;

// load file avoiding the cache
req.open ('GET', ev.target.dataset.file + '?' + start, true);
req.send (null);
}
