let isDailyView = true;

function updateHPBars() {
	updateDailyBar();
	updateWeeklyBar();
}

function updateDailyBar() {
	const now = new Date();
	const hoursLeft = 23 - now.getHours();
	const minutesLeft = 59 - now.getMinutes();
	const secondsLeft = 59 - now.getSeconds();
	const totalSecondsLeft = (hoursLeft * 3600) + (minutesLeft * 60) + secondsLeft;
	const percentageLeft = (totalSecondsLeft / 86400) * 100;

	const dailyBar = document.getElementById('dailyBar');
	const dailyText = document.getElementById('dailyText');

	dailyBar.style.width = `${percentageLeft}%`;

	if (percentageLeft > 50) {
		dailyBar.style.backgroundColor = '#33DF00';
	} else if (percentageLeft > 25) {
		dailyBar.style.backgroundColor = 'yellow';
	} else {
		dailyBar.style.backgroundColor = 'red';
	}

	dailyText.textContent = `${Math.round(percentageLeft)}%`;
}

function updateWeeklyBar() {
	const now = new Date();
	const dayOfWeek = now.getDay();
	const hoursLeftInDay = 23 - now.getHours();
	const minutesLeftInHour = 59 - now.getMinutes();
	const secondsLeftInMinute = 59 - now.getSeconds();
	const totalSecondsLeftToday = (hoursLeftInDay * 3600) + (minutesLeftInHour * 60) + secondsLeftInMinute;
	const totalSecondsPassedThisWeek = (dayOfWeek * 86400) + (86400 - totalSecondsLeftToday);
	const totalSecondsInWeek = 7 * 86400;
	const percentageLeft = ((totalSecondsInWeek - totalSecondsPassedThisWeek) / totalSecondsInWeek) * 100;

	const weeklyBar = document.getElementById('weeklyBar');
	const weeklyText = document.getElementById('weeklyText');

	weeklyBar.style.width = `${percentageLeft}%`;

	if (percentageLeft > 50) {
		weeklyBar.style.backgroundColor = '33DF00';
	} else if (percentageLeft > 25) {
		weeklyBar.style.backgroundColor = 'yellow';
	} else {
		weeklyBar.style.backgroundColor = 'red';
	}

	weeklyText.textContent = `${Math.round(percentageLeft)}%`;
}

function toggleView() {
	isDailyView = !isDailyView;

	document.getElementById('dailyContainer').style.display = isDailyView ? 'block' : 'none';
	document.getElementById('weeklyContainer').style.display = isDailyView ? 'none' : 'block';
	document.querySelector('.toggle-button').textContent = isDailyView ? 'Switch to Weekly View' : 'Switch to Daily View';
}

setInterval(updateHPBars, 1000);
updateHPBars();

