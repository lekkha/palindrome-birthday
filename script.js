//part 1 reverse a string 
function reverseStr(str){
    var charList = str.split(''); 
    var reverseList = charList.reverse(); 
    var reversedString = reverseList.join(''); 
    return reversedString; 
}

// part 2 check palindrome of the string
function isPalindrome(str){
    var reversedString = reverseStr(str);
    if(str === reversedString){
        return true;
    }
    return false; 
}

//part 3 convert date to string
function convertDateToString(date){
    var dateStr = {day:'', month:'',year:''}; 

    if(date.day<10){
        dateStr.day = '0'+date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = '0'+ date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    
    return dateStr;
}

// part 4 date in all different formats 
function getDateinAllFormats(date){
    var datenew = convertDateToString(date); 
    var ddmmyyyy = datenew.day + datenew.month + datenew.year; 
    var mmddyyyy = datenew.month + datenew.day + datenew.year; 
    var yyyymmdd = datenew.year + datenew.month + datenew.day; 
    var ddmmyy  = datenew.day + datenew.month + datenew.year.slice(-2); 
    var mmddyy = datenew.month + datenew.day + datenew.year.slice(-2);
    var yymmdd =  datenew.year.slice(-2) + datenew.month + datenew.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy,yymmdd]; 
}

// part 5 check palindrome on date of all formats -- if any is a palindrome return yes 
function checkAllFormatPalindrome(date){
    var dateList = getDateinAllFormats(date); 
    var palindromeList =[];

    for(var i=0; i<dateList.length; i++){
         var result = isPalindrome(dateList[i]);
         palindromeList.push(result);
    }
    return palindromeList;
}
//part 6 check for the next palindrome date 
//6.1 leapyear check == for console purpose give the year manually 

function isLeapYear(year) {
    if (year % 400 === 0) return true;
  
    if (year % 100 === 0) return false;
  
    if (year % 4 === 0) return true;
  
    return false;
  }


//6.2 create a function that gives next date  
function giveNextDate(date){
    var day = date.day + 1; 
    var month = date.month; 
    var year = date.year; 

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day =1; 
                month =3;
            }
        }
        else{
            if(day>28){
                day =1; 
                month = 3; 
            }

        }
    }
    else{
        if(day> daysInMonth[month-1]){
            day=1;
            month++;
        }

    }

    if(month>12){
        month=1; 
        year++; 
    }

    return {day: day, month: month, year: year }; 
}


//6.3 build the function where it tells the next palindoreome date 
function getNextPalindromeDate(date){
    var ctr=0; 
    var nextDate = giveNextDate(date); 

    while(1){
        ctr++; 
        var dateStr = convertDateToString(nextDate);
        var resultList = checkAllFormatPalindrome(dateStr); 

        for(let i=0; i<resultList.length;i++){
            if(resultList[i]){
                return [ctr, nextDate]; 
            }

        }
        
        nextDate = giveNextDate(nextDate);
    }
}


var bdayInput = document.querySelector('#bday-input');
var showButton = document.querySelector('#show-btn');
var ouputE = document.querySelector('#result'); 

//e event object
// function clickHandler(e){
//     var bdayStr = bdayInput.value; 

//     if(bdayStr !== ''){
//         var listOfDates = bdayStr.split('-'); 
//         var date = {
//             day: Number(listOfDates[2]),
//             month: Number(listOfDates[1]),
//             year: Number(listOfDates[0]),
//         };

//         var dateStr = convertDateToString(date); 
//         var list = checkAllFormatPalindrome(dateStr);
//         var ispalindrome = false;

//         for(let i=0; i<list.length; i++){
//             if(list[i]){
//                 ispalindrome = true; 
//                 break; 
//             }
//         }

//         if(!ispalindrome){
//             const [ctr, nextDate] = getNextPalindromeDate(date);

//             ouputE.innerText = `the next palindrome date is  ${nextDate.day} -${nextDate.month}-${nextDate.year} you missed by ${ctr} days.`;
//         }
//         else{
//             ouputE.innerText = 'is plaind'
//         }
//     }

    

// }

function clickHandler(e){
    //get input 
    var dateStr = bdayInput.value;


    if(dateStr !== ''){
        //JIS FORMAT MEIN DATE DALTE THEY US FORMAT MEIN LANE KI KOSHIS
        var dateList = dateStr.split('-');
        var date = {
            day: dateList[2],
            month: dateList[1],
            year: dateList[0],
        }

        //now check is palindrome on the date 
        //1 convert to string 
        // var dateStr = convertDateToString(date);
        //2 check all form palindrome 
        var list = checkAllFormatPalindrome(date);
        var ispalindrome = false; 

        for(let i=0; i<list.length;i++){
            var result = list[i]; 
            if(result){
                ispalindrome = true; 
                break; 
            }
        }

        if(ispalindrome){
            ouputE.innerText = 'your bday is a plaindrome'; 
        }
        else{
            const [ctr, nextDate] = getNextPalindromeDate(date); 
            ouputE.innerText =`the nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr}`; 
            
        }


    }
}

showButton.addEventListener('click', clickHandler);

