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