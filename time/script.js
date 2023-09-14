function onUpdateTextArea() {
  let logs = document.querySelector('#logs').value.split("\n");
  console.log(logs);

  let totalTime = 0;

  for (let i = 0; i < logs.length - 1; i++) {
    let entryLog = logs[i].split(" - ");
    if (isLeave(entryLog)) continue;

    for (let j = i + 1; j < logs.length; j++) {
      let leaveLog = logs[j].split(" - ");

      if (isLeave(leaveLog)) {
        totalTime += diffMinutes(entryLog[0], leaveLog[0]);

        i = j;
        break;
      }
    }
  }

  let lastLog = logs[logs.length - 1].split(" - ");
  if (isEntry(lastLog)) {
    totalTime += diffMinutes(lastLog[0]);
  }

  let hours = Math.floor(totalTime / 60);
  let minutes = totalTime % 60;

  document.querySelector('#time').innerHTML = `TOTAL: ${hours} hours and ${minutes} minutes`;

  let neededMinutes = 8 * 60; // 8 hours

  if (neededMinutes < 0) {
    document.querySelector('#leave').innerHTML = `You can leave now :)`;
    return;
  }

  let leaveDate = dateAdd(new Date(), 'minute', neededMinutes - totalTime);

  let leaveHours = leaveDate.getHours();
  let leaveMinutes = leaveDate.getMinutes();
  
  if (leaveHours < 10) {
    leaveHours = "0" + leaveHours;
  }
  
  if (leaveMinutes < 10) {
    leaveMinutes = "0" + leaveMinutes;
  }

  document.querySelector('#leave').innerHTML = `You should leave at: ${leaveHours}:${leaveMinutes}:00`;
};

function isEntry(log) {
  return log[1].startsWith("Entry");
};

function isLeave(log) {
  return log[1].startsWith("Leave")
};

function diffMinutes(time1, time2=null) {
    let d1 = new Date();
    let d2 = new Date();

    let [hours1, minutes1, seconds1] = time1.split(':');
    let hours2, minutes2, seconds2;

    if (time2!==null) {
        [hours2, minutes2, seconds2] = time2.split(':');

        d2.setHours(+hours2);
        d2.setMinutes(minutes2);
        d2.setSeconds(seconds2);
    }

    d1.setHours(+hours1);
    d1.setMinutes(minutes1);
    d1.setSeconds(seconds1);

    console.log(time1);
    console.log(time2);
    console.log(d1);
    console.log(d2);

    return Math.round((d2.getTime() - d1.getTime()) / 60000);
};

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 * 
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
function dateAdd(date, interval, units) {
  if(!(date instanceof Date))
    return undefined;
  var ret = new Date(date); //don't change original date
  var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
  switch(String(interval).toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}
