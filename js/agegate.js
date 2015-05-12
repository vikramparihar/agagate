$(document).ready(function () {
    window.yearSelector = $('.year');
    window.years = {};
    var yearhtml = '<option value="" selected>YEAR</option>';
    var d = new Date();
    var n = d.getFullYear();
    for (var j = n; j >= n - 100; j--) {
        window.years[j] = true;
        yearhtml = yearhtml + ('<option value=' + j + '>' + j + '</option>');
    }
    window.yearSelector.append(yearhtml);


    window.monthSelector = $('.month');
    window.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    window.months = [];
    var monthhtml = '<option value="" selected>MONTH</option>';
    $.each(window.monthNames, function (index, value) {
        window.months.push(index);
        monthhtml = monthhtml + ('<option value=' + index + '>' + value + '</option>');
    });
    window.monthSelector.append(monthhtml);
    window.monthSelector.on("change", function () {
        var selected_day = $(".day").val();
        setDays(window.yearSelector.val(), $(this).val());
        $('.day').val(selected_day);



    });

    window.daySelector = $('.day');

    function defaultdays() {
        var def = new Date;
        var year = def.getFullYear();
        var month = def.getMonth();
        var date = def.getDate();
        window.yearSelector.val('');
        window.monthSelector.val('');
        setDays(year, month);
        window.daySelector.val('');
    }
    ;

    function setDays(year, month) {
        window.daySelector.html('');
        var dayhtml = '<option value="" selected>DAY</option>';
        var days = daysInMonth(year, month);
        for (var i = 0; i < days; i++) {
            dayhtml = dayhtml + ('<option value=' + i + '>' + (i + 1) + '</option>');
        }
        window.daySelector.html(dayhtml);
    }

    function daysInMonth(year, month) {
        var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1) {
            if (year % 4 == 0) {
                if (year % 100 == 0) {
                    if (year % 400 == 0)
                        return 28;
                } else {
                    return 28;
                }
            }
            return 29;
        }

        return months[month];
    }

    
    ;
    defaultdays();
});

function checkAge(){
        var year = $('.year').val();
        var month = $('.month').val();
        var day = $('.day').val();
        if (year && month && day) {
            var date = new Date(year, month, day);
            if (date.getTime() < eighteenYearsAgo().getTime()) {
                $("#modalAgeGate").modal('hide');
                $("#video")[0].src += "&autoplay=1";
            }
            else {
                alert('Sorry, you are ineligible to access this at the moment.');
            }
        } else {
            alert('Please enter all details');
        }
};




function eighteenYearsAgo() {
        var then = 864e5 * 365.25 * 13;
        var now = (new Date).getTime();
        return new Date(now - then);
    }

$(window).on('onbeforeunload',function (){
    localStorage.setItem('agegate', null);
    return 'Do you want to leave this page?';
    
});