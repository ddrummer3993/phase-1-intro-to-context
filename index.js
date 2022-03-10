// Your code here

function createEmployeeRecord(array) {
    const timeCard = {};
    timeCard.firstName = array[0];
    timeCard.familyName = array[1];
    timeCard.title = array[2];
    timeCard.payPerHour = array[3];
    timeCard.timeInEvents = [];
    timeCard.timeOutEvents = [];
    return timeCard;
};

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfObjects = [];
    arrayOfArrays.map(array => {
        let newEmployeeRecord = createEmployeeRecord(array);
        arrayOfObjects.push(newEmployeeRecord);
    });
    return arrayOfObjects;
};

function createTimeInEvent(employeeRecordObj, dateStamp) {
    let timeInObj = {};
    let dateArray = dateStamp.split(' ');

    timeInObj.type = 'TimeIn'
    timeInObj.hour = parseInt(dateArray[1], 10);
    timeInObj.date = dateArray[0]
    employeeRecordObj.timeInEvents.push(timeInObj);
    return employeeRecordObj;
};

function createTimeOutEvent(employeeRecordObj, dateStamp) {
    let timeOutObj = {};
    let dateArray = dateStamp.split(' ');

    timeOutObj.type = 'TimeOut'
    timeOutObj.hour = parseInt(dateArray[1], 10);
    timeOutObj.date = dateArray[0]
    employeeRecordObj.timeOutEvents.push(timeOutObj);
    return employeeRecordObj;
};

function hoursWorkedOnDate(employeeRecordObj, dateStamp) {
    let timeInObjArray = employeeRecordObj.timeInEvents;
    let timeOutObjArray = employeeRecordObj.timeOutEvents;
    for (let i = 0; i < timeInObjArray.length; i++) {
        if (timeInObjArray[i].date === dateStamp) {
            let hoursWorked = timeOutObjArray[i].hour - timeInObjArray[i].hour;
            hoursWorked *= .01;
            return hoursWorked;
        };
    };
};

function wagesEarnedOnDate(employeeRecordObj, dateStamp) {
    let hours = hoursWorkedOnDate(employeeRecordObj, dateStamp);
    let payOwed = hours * employeeRecordObj.payPerHour;
    return payOwed;
};

function allWagesFor(employeeRecordObj) {
    let dailyWagesArray = [];
    let timePunchesArray = employeeRecordObj.timeInEvents;
    timePunchesArray.map(obj => {
        let dateStamp = obj.date;
        let dailyWages = wagesEarnedOnDate(employeeRecordObj, dateStamp);
        dailyWagesArray.push(dailyWages);
    });
    let allWages = dailyWagesArray.reduce((prev, curr) => prev + curr, 0);
    return allWages;
};

function calculatePayroll(employeeRecordsArray) {
    let totalWagesArray = [];
    employeeRecordsArray.map(obj => {
        let dailyWages = allWagesFor(obj);
        totalWagesArray.push(dailyWages);
    });
    let totalWages = totalWagesArray.reduce((prev, curr) => prev + curr, 0);
    return totalWages;
};