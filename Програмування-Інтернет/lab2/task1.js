updateClock(main_form.clock);

function updateClock(clock) {
    // year#moun#day-hour#min#sec

    const now = new Date();
    
    const dateString = `${now.getFullYear()}#${twoDigits(now.getMonth() + 1)}#${twoDigits(now.getDate())}`;
    const timeString = `${twoDigits(now.getHours())}#${twoDigits(now.getMinutes())}#${twoDigits(now.getSeconds())}`;

    const string = `${dateString}-${timeString}`;

    clock.value = string;

    setTimeout(updateClock.bind(null, ...arguments), 1000 - now.getMilliseconds());

    function twoDigits(number) {
        return `${number < 10 ? 0 : ""}${number}`;
    }
}