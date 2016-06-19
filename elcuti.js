function handleKeyUp(e)
{
  // State: Standby
  if(stateId == 1)
  {
    if(e.keyCode == 32)
    {
      // Goto: Running
      stateId = 2

      startDate = new Date();
      timerInterval = window.setInterval(updateTimerDisplay, 1)

      document.getElementById('state').innerHTML = 'Running'
    }
  } else
  // State: Stop
  if(stateId == 3)
  {
    if(e.keyCode == 32)
    {
      // Goto: Resting
      stateId = 4

      document.getElementById('state').innerHTML = 'Resting'
    }
  } else
  // State: Reset
  if(stateId == 5)
  {
    if(e.keyCode == 32)
    {
      // Goto: Ready
      stateId = 0

      document.getElementById('state').innerHTML = 'Ready'
    }
  }
}

function handleKeyDown(e)
{
  // State: Reset
  if(stateId == 0)
  {
    if(e.keyCode == 32)
    {
      // Goto: Standby
      stateId = 1

      document.getElementById('state').innerHTML = 'Standby'
    }
  } else
  // State: Start
  if(stateId == 2)
  {
    if(e.keyCode == 32)
    {
      // Goto: Stop
      stateId = 3

      window.clearInterval(timerInterval)

      document.getElementById('state').innerHTML = 'Stop'
    }
  } else
  // State: Resting
  if(stateId == 4)
  {
    if(e.keyCode == 32)
    {
      // Goto: Reset
      stateId = 5

      window.clearInterval(timerInterval)
      resetTimerDisplay()

      document.getElementById('state').innerHTML = 'Reset'
    }
  }
}

function padZero(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function padSpace(num, size) {
    var s = "         " + num;
    return s.substr(s.length-size);
}

function updateTimerDisplay()
{
  var startTime = startDate.getTime()

  var newDate = new Date()
  var newTime = newDate.getTime()
  var elapsedTime = newTime - startTime

  var elapsedMilliseconds = elapsedTime
  var elapsedSeconds = Math.floor(elapsedTime / 1000)
  var elapsedMinutes = Math.floor(elapsedTime / (60 * 1000))

  var displayMilliseconds = elapsedMilliseconds % 1000
  var displaySeconds = elapsedSeconds % 60
  var displayMinutes = elapsedMinutes

  var timerMilliseconds = document.getElementById('timerMilliseconds')
  var timerSeconds = document.getElementById('timerSeconds')
  var timerMinutes = document.getElementById('timerMinutes')

  timerMilliseconds.innerHTML = padZero(displayMilliseconds, 3)

  if(elapsedSeconds < 60)
  {
    timerSeconds.innerHTML = padSpace(displaySeconds, 2) + '.'
  }
  else
  {
    timerSeconds.innerHTML = padZero(displaySeconds, 2) + '.'
    timerMinutes.innerHTML = padSpace(displayMinutes, 2) + ':'
  }
}

function resetTimerDisplay()
{
  var timerMilliseconds = document.getElementById('timerMilliseconds')
  var timerSeconds = document.getElementById('timerSeconds')
  var timerMinutes = document.getElementById('timerMinutes')

  timerMilliseconds.innerHTML = '000'
  timerSeconds.innerHTML = ' 0.'
  timerMinutes.innerHTML = '   '
}

var timerInterval
var startDate
var stateId = 0

resetTimerDisplay()

window.addEventListener("keyup", handleKeyUp)
window.addEventListener("keydown", handleKeyDown)
