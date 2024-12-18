$(document).ready(function () {
  finDate = $('input[type="date"]').val(new moment().toISOString(true).substring(0, 10));
});

// if attendance is checked, change the date to yesterday
document.getElementById('legend').addEventListener('click', function () {
  if (document.getElementById('attendance').checked) {
    document.getElementById('date').value = moment().subtract(1, 'days').format('YYYY-MM-DD');
  } else {
    if (document.getElementById('nextdoor').checked) {
      document.getElementById('date').value = moment().add(7, 'days').format('YYYY-MM-DD');
    } else {
      document.getElementById('date').value = moment().format('YYYY-MM-DD');
    }
  }
});

function copy(that){
  // var inp = document.createElement('input');
  // document.body.appendChild(inp)
  // inp.value = that.innerHTML;
  // // inp.select();
  // const blob = new Blob([inp], {type: 'text/html'});
  // const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
  // navigator.clipboard.writeText([clipboardItem]).then(function() {
  //     console.log('Copying to clipboard was successful!');
  //     // flash text on copy
  //     $(that).css('color', '#fff');
  //     setTimeout(function(){
  //         $(that).css('color', '#000');
  //     }, 100);
  // }, function(err) {
  //   console.error('Could not copy text: ', err);
  // });
  // inp.remove();
}

function getPubl(selectedDate) {
  let publ = new moment(selectedDate);
  let days = 6;   // number of days to subtract
  while (days > 0) {
    publ.subtract(1, 'days');
    // Do not count weekends; we can't schedule our meetings on the weekend!
    if (publ.isoWeekday() !== 6 && publ.isoWeekday() !== 7) {
      days -= 1;
    }
  }
  return publ.format("dddd, MMMM Do");
};

$('#submit').on('click', function OnClickEvent(event) {
  // set input values to variables
  let title = $('#NPU').val();

  // get datepicker input and convert to moment object
  dateControl = moment(document.querySelector('input[type="date"]').value);
  date = dateControl.format("MMMM Do, YYYY");
  day = dateControl.format("dddd");
  month = dateControl.format("MMMM");
  year = dateControl.format("YYYY");
  casual = dateControl.format("dddd, MMMM Do");
  short = dateControl.format("MMMM Do");
  formal = dateControl.format("dddd, MMMM D");

  // use getMeeting function to get meeting info
  function getMeeting(meetDetailProto) {
    switch (meetDetailProto) {
      case 'A':
        isHybrid = false;
        meet = `Meeting ID: 842 6707 3478
Dial In: +1 646 558 8656
Access Code: 842 6707 3478#`
        zURL = `https://us06web.zoom.us/meeting/register/tZAvce6oqTguHdzWCdDiyT-STa6XehkFeH9W`
        time = `7:00PM`
        chair = `Brinkley Dickerson`
        chairHon = `Mr. Dickerson`
        chairE = `wbdnatl@gmail.com`
        planner = `Redowan Kabir Kaushik`
        plannerE = `rkkaushik@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom1@atlantaga.gov'

        break;
      case 'B':
        isHybrid = false;
        meet = `Meeting ID: 832 4836 8602
Dial In: +1 646 558 8656
Access Code: 832 4836 8602#`
        zURL = `https://us06web.zoom.us/meeting/register/tZcvc-GrqDMsGtbvnnKzpDF2BbUXxQuxx_N9`
        time = `7:00PM`
        chair = `Rebecca King`
        chairHon = `Ms. King`
        chairE = `rlkintheatl@gmail.com`
        planner = `Punya Vats`
        plannerE = `pvats@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom8@atlantaga.gov'

        break;
      case 'C':
        isHybrid = false;
        meet = `Meeting ID: 934 4511 6340
Dial In: +1 646-558-8656
Access Code: 934 4511 6340#`
        zURL = `https://us06web.zoom.us/meeting/register/tJcpc-yprz0pHtRSCH0nTWazoXg72njNpQ5R`
        time = `6:45PM`
        chair = `Zack Gober`
        chairHon = `Mr. Gober`
        chairE = `zgober@lavista.com`
        planner = `Tatum Jordan-Madden`
        plannerE = `TJordan-Madden@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom4@atlantaga.gov'

        break;
      case 'D':
        isHybrid = true;
        meet = `Online:
Meeting ID: 953 5469 3520
Dial In: +1 646-558-8656
Access Code: 953 5469 3520#

In Person:
Agape Center
2210 Marietta Blvd NW
Atlanta, GA 30318`
        zURL = `https://us06web.zoom.us/meeting/register/tJEucu2upzgvGNRkuGmiYcE2akuYMkFc1av-`
        time = `7:30PM`
        chair = `James "Jim" Martin`
        chairHon = `Mr. Martin`
        chairE = `james.martin@me.gatech.edu`
        planner = `Nate Hoelzel`
        plannerE = `nhoelzel@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom2@atlantaga.gov'

        break;
      case 'E':
        isHybrid = false;
        meet = `Webinar ID: 920 3606 4688
Dial-In: +1 929-436-2866`
        zURL = `https://us06web.zoom.us/webinar/register/WN_TejPEO2GTDygUW6uq02yAg`
        time = `6:30PM`
        chair = `Courtney Smith`
        chairHon = `Ms. Smith`
        chairE = `chair@npueatlanta.org`
        planner = `Katherine Hernandez`
        plannerE = `khernandez@atlantaga.gov`
        note = ''
        zMail = '-'
        zCred = '-'
        break;
      case 'F':
        isHybrid = false;
        meet = `Meeting ID: 845 9824 9006
Dial In: +1 646-558-8656
Access Code: 845 9824 9006#`
        zURL = `https://us06web.zoom.us/meeting/register/tZAofuGqqjIqGtKNQJGsBnFvCjWJfdUvAKR6`
        time = `7:00PM`
        chair = `Debbie Skopczynski`
        chairHon = `Ms. Skopczynski`
        chairE = `chair@npufatlanta.org`
        planner = `Doug Young`
        plannerE = `dyoung@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom6@atlantaga.gov'

        break;
      case 'G':
        isHybrid = false;
        meet = `Meeting ID: 935 8093 0222
Dial In: +1 646-558-8656
Access Code: 935 8093 0222#`
        zURL = `https://us06web.zoom.us/meeting/register/tJcof-mhrTsoGNbC6XrB8Sr6HKX7E8hPLfjH`
        time = `7:00PM`
        chair = `Torrey Sumlin`
        chairHon = `Mr. Sumlin`
        chairE = `npugatlantachair@gmail.com`
        planner = `Louisa Tovar`
        plannerE = `ltovar@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom1@atlantaga.gov'

        break;
      case 'H':
        isHybrid = false;
        meet = `Meeting ID: 976 5253 7837
Dial In: +1 646-558-8656
Access Code: 976 5253 7837#`
        zURL = `https://us06web.zoom.us/meeting/register/tJMrcuutrTwiGdOe_aqA5xK3pYN0ZJ96KFdO`
        time = `7:00PM`
        chair = `Khalifa Lee`
        chairHon = `Mr. Lee`
        chairE = `npuhwestatlanta@gmail.com`
        planner = `Aaron Beattie`
        plannerE = `abeattie@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom1@atlantaga.gov'

        break;
      case 'I':
        isHybrid = false;
        meet = `Meeting ID: 926 1333 2610
Dial In: +1 646-558-8656
Access Code: 926 1333 2610#`
        zURL = `https://us06web.zoom.us/meeting/register/tJYrduqrrTksG9Q0zhO-fIWbSdULod3adqpH`
        time = `7:00PM`
        chair = `Eunice M. Glover`
        chairHon = `Ms. Glover`
        chairE = `chair.npui@gmail.com`
        planner = `Susan Coleman`
        plannerE = `sucoleman@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom3@atlantaga.gov'

        break;
      case 'J':
        isHybrid = false;
        meet = `Meeting ID: 914 9575 9127
Dial In: +1 646-558-8656
Access Code: 914 9575 9127#`
        zURL = `https://us06web.zoom.us/meeting/register/tJUpfuyvqzIrGNPisSUqavtB5wdLiJTeHVFD`
        time = `7:00PM`
        chair = `Anissa Ferrell`
        chairHon = `Ms. Ferrell`
        chairE = `chair@npujatlanta.com`
        planner = `Keyetta Holmes`
        plannerE = `kmholmes@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom3@atlantaga.gov'

        break;
      case 'K':
        isHybrid = true;
        meet = `Online:
Meeting ID: 994 9264 1610
Dial In: +1 646 558 8656
Access Code: 994 9264 1610#

And in person:
City of Refuge
Bistro Room
1300 Joseph E. Boone Blvd NW, 30314`
        zURL = `https://us06web.zoom.us/meeting/register/tJ0pfuuuqjosG9SFlf4neD6B5HLB18AX5zGe`
        time = `6:30PM`
        chair = `Dr. Jasmine Hope`
        chairHon = `Dr. Hope`
        chairE = `npukatlanta@gmail.com`
        planner = `Jack Staples`
        plannerE = `jstaples@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom5@atlantaga.gov'

        break;
      case 'L':
        isHybrid = false;
        meet = `Meeting ID: 961 2883 9632
Dial In: +1 646 558 8656
Access Code: 961 2883 9632#`
        zURL = `https://us06web.zoom.us/meeting/register/tJIsdeGgrTIsGda9TZkaUfsNakMmS0zxpVe4`
        time = `6:30PM`
        chair = `Yvonne "Shadé" Jones`
        chairHon = `Ms. Jones`
        chairE = `chair@npulatlanta.org`
        planner = `Nathan Gallentine`
        plannerE = `ngallentine@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom1@atlantaga.gov'

        break;
      case 'M':
        isHybrid = false;
        meet = `Meeting ID: 972 3364 7127
Dial In: +1 646 558 8656
Access Code: 972 3364 7127#`
        zURL = `https://us06web.zoom.us/meeting/register/tJMvdOquqjwrGNMzjeUO15u88PSooneRz2Fp`
        time = `6:15PM`
        chair = `Forrest Coley`
        chairHon = `Forrest`
        chairE = `chair@npumatlanta.org`
        planner = `Matt Adams`
        plannerE = `mdadams@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom5@atlantaga.gov'

        break;
      case 'N':
        isHybrid = false;
        meet = `Meeting ID: 970 8448 6658
Dial In: +1 646 558 8656
Access Code: 970 8448 6658#
Password: euclid`
        zURL = `https://us06web.zoom.us/meeting/register/tJMtf-2spj0sH9z2bFgZI2LX-Bna7OWVyoFq`
        time = `7:00PM`
        chair = `Amy Stout`
        chairHon = `Dr. Stout`
        chairE = `npunchair@gmail.com`
        planner = `Tamaria Letang`
        plannerE = `tletang@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom2@atlantaga.gov'

        break;
      case 'O':
        isHybrid = false;
        meet = `Meeting ID: 812 4045 1335
Dial In: +1 646 558 8656
Access Code: 812 4045 1335#`
        zURL = `https://us06web.zoom.us/meeting/register/tZUvc-msqzopGdHkG2UKue12pd08rkIAkpc_`
        time = `6:30PM`
        chair = `Joe Schleupner`
        chairHon = `Mr. Schleupner`
        chairE = `chair@atlantanpuo.org`
        planner = `Selena Xayavong`
        plannerE = `sxayavong@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom5@atlantaga.gov'

        break;
      case 'P':
        isHybrid = false;
        meet = `Meeting ID: 940 8702 7097
Dial In: +1 646 558 8656
Access Code: 940 8702 7097#`
        zURL = `https://us06web.zoom.us/meeting/register/tJAtf-6orDwqE9MQK1U4WkG2s0y9ZSsZj55C`
        time = `7:00PM`
        chair = `Reginald Rushin`
        chairHon = `Mr. Rushin`
        chairE = `Rushinr58@gmail.com`
        planner = `Kamilah Bakari`
        plannerE = `kbakari@AtlantaGa.Gov`
        note = ''
        zMail = 'npuzoomroom5@atlantaga.gov'

        break;
      case 'Q':
        isHybrid = false;
        meet = `Meeting ID: 985 5727 1692
Dial In: +1 646 558 8656
Access Code: 985 5727 1692#`
        zURL = `https://us06web.zoom.us/meeting/register/tJwocu6qqTosE9bW-XHCnSGMWaOAnKCKqrkS`
        time = `6:30PM`
        chair = `David Getachew-Smith`
        chairHon = `Mr. Getachew-Smith`
        chairE = `davget_smith@hotmail.com`
        planner = `Francis Rozier`
        plannerE = `franrozier@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom3@atlantaga.gov'

        break;
      case 'R':
        isHybrid = true;
        meet = `Meeting ID: 886 2169 6544
Dial In: +1 646 558 8656
Access Code: 886 2169 6544#`

// And in person:
// Adams Park Recreation Center
// 1620 Delowe Dr SW

        zURL = `https://us06web.zoom.us/meeting/register/tZwrdeiupz0vHtCSIPdEIa-N6avVbaNnGXlb`
        time = `7:00PM`
        chair = `Rita Harden`
        chairHon = `Ms. Harden`
        chairE = `npur.exc@gmail.com`
        planner = `Carolina Rodriguez`
        plannerE = `crodriguez@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom1@atlantaga.gov'

        break;
      case 'S':
        isHybrid = true;
        meet = `Online:
Meeting ID: 993 2987 4388
Dial In: +1 646 558 8656
Access Code: 993 2987 4388#

And in person:
VICARS Community Center
838 Cascade Ave SW`
        zURL = `https://us06web.zoom.us/meeting/register/tJ0udeCgqT8pEtycXQZ9s7Tk4_0J_73DZmQD`
        time = `7:00PM`
        chair = `Quadrus Black`
        chairHon = `Mr. Black`
        chairE = `chair@npu-s.org`
        planner = `Carlos Garcia`
        plannerE = `cmgarcia@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom7@atlantaga.gov'

        break;
      case 'T':
        isHybrid = false;
        meet = `Meeting ID: 973 7964 7582
Dial In: +1 646 558 8656
Access Code: 973 7964 7582#

And in person:
Lee + White
929 Lee Street SW
Suite A220`
        zURL = `https://us06web.zoom.us/meeting/register/tJMucOCuqjwvEtbo8Vddwe6J5Ykv5858FP9y`
        time = `7:00PM`
        chair = `Angela Clyde`
        chairHon = `Ms. Clyde`
        chairE = `chair@nputatlanta.com`
        planner = `Monique Forte`
        plannerE = `mbforte@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom2@atlantaga.gov'

        break;
      case 'U':
        isHybrid = false;
        meet = `Meeting ID: 123 4567 8901
Dial In: +1 555 555 5555
Access Code: 123 4567 8901#`
        zURL = `https://kipdunlap.me/`
        time = `10:24PM`
        chair = `Kip Dunlap`
        chairHon = `Mr. Dunlap`
        chairE = `Kip@KipDunlap.me`
        planner = `Simit`
        plannerE = `Simit@KipDunlap.me`
        note = 'This is not a real NPU. It is a test NPU.'
        break;
      case 'V':
        isHybrid = false;
        meet = `Meeting ID: 992 1132 0112
Dial In: +1 646 558 8656
Access Code: 992 1132 0112#`
        zURL = `https://us06web.zoom.us/meeting/register/tJ0vduirrDsrG9Zu7U9P7xTvxATCljNqAgyJ`
        time = `7:00PM`
        chair = `Stephanie Flowers`
        chairHon = `Ms. Flowers`
        chairE = `stephanieflowers@bellsouth.net`
        planner = `Nirav Gandhi`
        plannerE = `ngandhi@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom4@atlantaga.gov'

        break;
      case 'W':
        isHybrid = false;
        meet = `Meeting ID: 916 2580 5725
Dial In: +1 646 558 8656
Access Code: 916 2580 5725#`
        zURL = `https://us06web.zoom.us/meeting/register/tJUrdeygrj4tGNFBx8eTSLrBvv1Zy4uPsqgD`
        time = `7:00PM`
        chair = `Sky Hassan`
        chairHon = `Mr. Hassan`
        chairE = `npu.w.atl@gmail.com`
        planner = `Steven Aceto`
        plannerE = `saceto@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom4@atlantaga.gov'

        break;
      case 'X':
        isHybrid = false;
        meet = `Meeting ID: 940 6017 9815
Dial In: +1 646 558 8656
Access Code: 940 6017 9815#`
        zURL = `https://us06web.zoom.us/meeting/register/tJAtcempqTIiG9Gd_h-5Tcordb6gJXHz14r1`
        time = `7:00PM`
        chair = `Zachary Adriaenssens`
        chairHon = `Mr. Adriaenssens`
        chairE = `chair@npu-x.com`
        planner = `Anna Williams`
        plannerE = `aewilliams@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom3@atlantaga.gov'

        break;
      case 'Y':
        isHybrid = false;
        meet = `Online:
Meeting ID:  956 6564 6943
Dial In: +1 646 558 8656
Access Code:  956 6564 6943#`
        zURL = `https://us06web.zoom.us/meeting/register/tJErceyuqj0jHtfa2z98DbpK90NXM7EZk9Tk`
        time = `7:00PM`
        chair = `Nichole Weiswasser`
        chairHon = `Ms. Weiswasser`
        chairE = `secretarynpuy@gmail.com`
        planner = `Elizabeth Clappin`
        plannerE = `eaclappin@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom5@atlantaga.gov'

        break;
      case 'Z':
        isHybrid = false;
        meet = `Meeting ID: 929 8209 4616
Dial In: +1 646 558 8656
Access Code: 929 8209 4616#`
        zURL = `https://us06web.zoom.us/meeting/register/tJYkf-uopz8sG9J66kd94W5qRcrwP2Qb_jQ7`
        time = `7:00PM`
        chair = `Anne E. Phillips`
        chairHon = `Ms. Phillips`
        chairE = `anne.phillips@bellsouth.net`
        planner = `Thomas Otoo`
        plannerE = `totoo@atlantaga.gov`
        note = ''
        zMail = 'npuzoomroom1@atlantaga.gov'

        break;
    }
    let HybStatus = '';

    if (isHybrid === true) {
      HybStatus = `Hybrid`;
    } else {
      HybStatus = `Virtual`;
    };
    return { HybStatus: HybStatus, meet: meet, chair: chair, planner: planner, time: time, chairE: chairE, plannerE: plannerE, zURL: zURL, chairHon: chairHon, note: note, zMail: zMail };
  };

  // console.log(title);
  let meeting = getMeeting(title);

  // check which form boxes are selected
  if ($('#draft')[0].checked) {
    let publ = getPubl(dateControl);
    // console.log(publ);
    // console.log('Draft');
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="mailto:NPU-' + title + '?subject=NPU-' + title + ' ' + month + ' draft meeting agenda&cc=dvasquez@atlantaga.gov; kdunlap@atlantaga.gov&body=Good day ' + meeting.chairHon + ' and NPU-' + title + ',%0D%0DPlease see the attached draft version of the NPU-' + title + ' ' + month + ' meeting agenda. If you notice any items missing, mis-categorized, or would like to make other edits please let me know by EOB ' + publ + '.%0D%0DThank you,">DRAFT</a></h2>'
      + '<p id="draft" onclick="copy(this)"><strong>NPU-' + title + ' ' + month + ' draft meeting agenda</strong><br>Good day ' + meeting.chairHon + ' and NPU-' + title + ',<br><br>Please see the attached draft version of the NPU-' + title + ' ' + month + ' meeting agenda. If you notice any items missing, miscategorized, or would like to make other edits please let me know <u>by EOB ' + publ + '</u>.<br><br><strong>Effective January 1st, 2023, Daniel will be taking over the agenda-creation process.</strong><br><br>Thank you,</p ></div > ');
  };
  if ($('#final')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="mailto:NPU-' + title + '?subject=' + month + ' Final meeting agenda&cc=dvasquez@atlantaga.gov; kdunlap@atlantaga.gov; snjenkins@atlantaga.gov&body=Good day ' + meeting.chairHon + ' and NPU-' + title + ',%0D%0DPlease see the attached Final version of the NPU-' + title + ' ' + month + ' meeting agenda.%0D%0DEffective January 1st, 2023, Daniel will be taking over the agenda-creation process.%0D%0DThank you,">FINAL</a></h2>'
      + '<p onclick="copy(this)"><strong>' + month + ' Final meeting agenda</strong><br>Good day ' + meeting.chairHon + ' and NPU-' + title + ',<br><br>Please see the attached Final version of the NPU-' + title + ' ' + month + ' meeting agenda.<br><br>Thank you,</p></div>')
    // console.log('Final');
  };
  if ($('#distro')[0].checked) {
    $('#textZone').append('<div  class="y-2 calendar col-12"><h2><a href="mailto:npumail@atlantaga.gov?subject=NPU -' + title + ' Monthly Meeting Notification&subject=NPU – ' + title + ' Monthly Meeting Notification &body=Greetings!%0D%0A%0D%0AYou are receiving this e-mail because you opted in for monthly meeting notices for NPU-' + title + '.%0D%0A%0D%0AAgendas for monthly NPU meetings are posted on our website: https://www.atlantaga.gov/government/departments/city-planning/neighborhood-and-npu-contacts%0D%0A%0D%0ADATE: ' + date + '%0DTIME: ' + meeting.time + '%0DLOCATION: ' + meeting.HybStatus + '%0D%0A%0D%0ATo register in advance, go to:%0D' + meeting.zURL + '%0D' + meeting.meet + '%0D%0A%0D%0A ' + meeting.note + '%0D%0A%0D%0ACity of Atlanta residents are encouraged to attend their local Neighborhood Planning Unit (NPU) meetings to review proposed development, applications for alcohol licenses and special events, as well as amendments to the City’s Zoning Ordinance and Comprehensive Development Plan. Thanks again for your commitment to being actively involved in the City of Atlanta’s future!%0D%0A%0D%0AIf you desire additional information regarding NPU-' + title + ', please contact the following person(s):%0D%0A%0D%0ANPU Chair: ' + meeting.chair + ' (' + meeting.chairE + ')%0DNPU Planner: ' + meeting.planner + ' (' + meeting.plannerE + ')%0D%0A%0D%0AThank you,">DISTRO LIST</a></h2>'
      + '<p id="distro" onclick="copy(this)"><strong>NPU – ' + title + ' Monthly Meeting Notification </strong><br>Greetings!<br><br>You are receiving this e-mail because you opted in for monthly meeting notices for NPU-<strong>' + title + '</strong>.<br><br>Agendas for monthly NPU meetings are posted on our website: <a href="https://www.atlantaga.gov/government/departments/city-planning/neighborhood-and-npu-contacts">Directory and NPU Meeting Agendas | Atlanta, GA (AtlantaGA.gov)</a><br><br>DATE: ' + date + '<br>TIME: ' + meeting.time + '<br>LOCATION: ' + meeting.HybStatus + '<br>Register in advance by clicking <a href="' + meeting.zURL + '">HERE</a><br><pre>' + meeting.meet + '<br><br><strong>' + meeting.note + '</strong></pre><br>City of Atlanta residents are encouraged to attend their local Neighborhood Planning Unit (NPU) meetings to review proposed development, applications for alcohol licenses and special events, as well as amendments to the City’s Zoning Ordinance and Comprehensive Development Plan. Thanks again for your commitment to being actively involved in the City of Atlanta’s future!<br><br>If you desire additional information regarding NPU-' + title + ', please contact the following person(s):<br><br>NPU Chair: ' + meeting.chair + ' (<a href="mailto:' + (meeting.chairE) + '">' + meeting.chairE + '</a>)<br>NPU Planner: ' + meeting.planner + ' (<a href="mailto:' + (meeting.plannerE) + '">' + meeting.plannerE + '</a>)<br><br>Thank you,</p></div>')
    // console.log('Distro');
  };
  if ($('#special')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2>SPECIAL</h2><p id="special" onclick="copy(this)"><strong>NPU-' + title + ' | Special Called Meeting | ' + casual + ' ' + '</strong><br>Hey Neighbors!<br><br>NPU-' + title + ' will hold a special called meeting on ' + casual + ' to vote on 2023 Bylaws.<br><br>To register in advance go to:<br>' + meeting.zURL + '<pre>' + meeting.meet + '<br><br>If you desire additional information regarding NPU-' + title + ', please contact the following person(s):<br><br>NPU Chair: ' + meeting.chair + ' (<a href="mailto:' + (meeting.chairE) + '">' + meeting.chairE + '</a>)<br><br>Thank you,</p></div>')
    // console.log('Special');
  };
  if ($('#access')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2>MEETING ACCESS INFO</h2><p id="access" onclick="copy(this)"><strong>NPU-' + title + ' ' + month + ' ' + meeting.HybStatus + ' meeting access info: </strong><br>Hello,<br><br>The NPU-' + title + ' ' + month + ' meeting will be held in a ' + meeting.HybStatus + ' format.<br><br><strong>NPU-' + title + ' | ' + casual + ' ' + meeting.time + '</strong><br><br>Register in advance by clicking <a href="' + meeting.zURL + '">HERE</a><br><pre>' + meeting.meet + '<br><br></pre>Please continue to work with NPU-' + title + ' Chair ' + meeting.chair + ' (<a href="mailto:' + (meeting.chairE) + '">' + meeting.chairE + '</a>) to confirm details of your presentation.<br><br>Thank you,</p></div>')
    // console.log('Access');
  }
  if ($('#approved')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="mailto:?subject=APPROVED NPU-' + title + ' ' + month + ' presentation&cc=kdunlap@atlantaga.gov; dvasquez@atlantaga.gov&body=Hello,%0D%0DYour request to present at the NPU-' + title + ' ' + short + ' meeting has been approved.%0D%0A%0D%0APlease reach out to NPU-' + title + ' Chair ' + meeting.chair + ' (mailto:' + meeting.chairE + ') to iron out the details of the presentation.%0D%0A%0D%0AThank you,%0D%0A%0D%0A">PRESENTATION APPROVED</a></h2>'
      + '<p id="approved" onclick="copy(this)"><strong>[APPROVED] NPU-' + title + ' ' + month + ' presentation </strong><br>Hello,<br><br>Your request to present at the NPU-' + title + ' ' + short + ' meeting has been approved.<br><br>Please reach out to NPU-' + title + ' Chair ' + meeting.chair + ' (<a href="mailto:' + (meeting.chairE) + '">' + meeting.chairE + '</a>) to iron out the details of the presentation.<br><br>Thank you,</p></div>')
    // console.log('Approved');
  }
  if ($('#nextdoor')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="https://nextdoor.com/city/feed/?" target="_blank" noopener>NEXTDOOR</a></h2><pre id="nextdoor" onclick="copy(this)"><strong>NPU-' + title + ' | ' + casual + ' ' + meeting.time + '</strong><br>Hey Neighbors!<br><br>NPU-' + title + ' meets next ' + casual + ' at ' + meeting.time + '<br><br>To register in advance go to:<br>' + meeting.zURL + '<br>' + meeting.meet + '<br><br>Is your NPU working for you❓<br>Take the survey at www.bit.ly/NPU50<br><br>Thank you,</pre></div>')
    // console.log('Nextdoor');
  }
  if ($('#attendance')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="mailto:' + title + ' chair;' + '?subject=NPU-' + title + ' ' + month + ' GB Attendance&cc= kdunlap@atlantaga.gov; dvasquez@atlantaga.gov; ltempleton@atlantaga.gov;&body=Good day ' + meeting.chairHon + ',%0D%0DPlease see the attached NPU-' + title + ' ' + month + ' GB attendance report for your records.%0D%0DThank you,">Attendance</a> | <a href="https://survey123.arcgis.com/share/5cde6a1c6d834a7098b9998b8e1b2b58" target="_blank">Survey</a></h2>'
      + '<p onclick="copy(this)"><strong>NPU-' + title + ' ' + month + ' GB Attendance</strong><br>Good day ' + meeting.chairHon + ',<br><br>Please see the attached NPU-' + title + ' ' + month + ' GB attendance report for your records.<br><br>Thank you,</p></div>')
  }
  if ($('#pReport')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="/plannersScript' + title + '" target="_blank">Planners Script</a> | <a href="mailto:' + meeting.plannerE + '?subject=NPU-' + title + ' ' + month + ' Planner\'s Report&cc= kdunlap@atlantaga.gov;&body=Good day ' + meeting.planner.split(' ')[0] + ',%0D%0DPlease see the attached NPU-' + title + ' ' + month + ' Planner\'s report.%0D%0DThank you,">Email</a></h2>'
      + '<p onclick="copy(this)"><strong>NPU-' + title + ' ' + month + ' Planner\'s Report</strong><br>Good day ' + meeting.planner.split(' ')[0] + ',<br><br>Please see the attached NPU-' + title + ' ' + month + ' Planner\'s report.<br><br>Thank you,</p></div>')
  }
  if ($('#APAB')[0].checked) {
    $('#textZone').append('<div class="y-2 calendar col-12"><h2><a href="mailto:npumail@atlantaga.gov?subject=APAB | ' + formal + ' 10:00 AM&body=Greetings!%0D%0DThe Atlanta Planning Advisory Board (APAB) meets on the third (3rd) Saturday of every month.%0D%0DThe next meeting will be held on:%0D' + formal + ', 10:00 AM in the %22ATL Stat%22 room, Atlanta City Hall, 55 Trinity Avenue SW.%0D%0DAll APAB meetings, in compliance with the Georgia Open Meetings Act, are open to the public.%0D%0DFor more information please contact:%0DSagirah Jones, 2024 APAB President%0Dapabatlanta@gmail.com or (404) 791-1434%0D%0DLeah LaRue, Department of City Planning, Director of Neighborhood Planning Units%0Dllarue@atlantaga.gov or (404) 546-0159%0D%0DTo watch the meeting live on YouTube please click HERE%0DFor the agenda and other meeting materials please click HERE%0D%0DThank you, ">APAB ' + formal + '</a></h2>'
      + '<p onclick="copy(this)"><strong>APAB ' + formal + ' </strong><br>Greetings!<br><br>The Atlanta Planning Advisory Board (APAB) meets on the third (3rd) Saturday of every month<br><br>The next meeting will be held on:<br>' + formal + ', 10:00 AM in the \"ATL Stat\" room, Atlanta City Hall, 55 Trinity Avenue SW.<br><br>All APAB meetings, in compliance with the Georgia Open Meetings Act, are open to the public.<br><br>For more information please contact:<br>Sagirah Jones, 2024 APAB President<br>apabatlanta@gmail.com or (404) 791-1434<br><br>Leah LaRue, Department of City Planning, Director of Neighborhood Planning Units<br>llarue@atlantaga.gov or (404) 546-0159<br><br>To watch the meeting live on YouTube please click HERE<br>For the agenda and other meeting materials please click HERE<br><br>Thank you,</p></div>')
  }
});

function clearForm() {
  $('#textZone').empty();
  // console.log('cleared');
}

