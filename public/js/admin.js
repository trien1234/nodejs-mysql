
SUCCESS = 200
FAILED = 400
const REVIEW_TYPE = {
  ARTICLES: 1,
  PHOTOS: 2,
  VIDEOS: 3,
  ARTICLES_WEBVIEW: 4
}

MAX_DESC = 100

function showAlert(type, msg) {
  let bgColor
  if (type == 'success') bgColor = '#16D39A'
  if (type == 'warning') bgColor = '#FFA87D'
  if (type == 'failed') bgColor = '#FF7588'

  $.toast({
    text: msg,
    showHideTransition: 'slide',  // It can be plain, fade or slide
    bgColor,              // Background color for toast
    textColor: '#fff',            // text color
    allowToastClose: true,       // Show the close button or not
    hideAfter: 3000,              // `false` to make it sticky or time in miliseconds to hide after
    stack: 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
    textAlign: 'left',            // Alignment of text i.e. left, right, center
    position: 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
  })
}

$('.dropdown-languages a').on("click", function (e) {
  let langCode = $(this).attr('data-code')
  let parent = $(this).closest('.dropdown-language')
  parent.find('i').removeAttr('class')
  parent.find('i').attr('class', 'flag-icon flag-icon-' + langCode)
  $.post('/admin/change-langCode', { langCode }, res => location.reload())
});

function activeMenu() {
  let url = window.location.href;
  let link = url.substring(url.lastIndexOf('/') + 1);
  link = link.replace('#', '')

  $("." + link).addClass("active");
}

function ellipsis(str = '', max = 30) {
  return (str.length > max) ? str.substring(0, max) + '... <a href="#" class=""> <span class="fa fa-thumbs-o-up"></span>see more</a>' : str
}

const Charts = {
  pie: function (el, seriesData) {
    el.highcharts({
      chart: {
        styledMode: true
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 10,
        itemMarginBottom: 10
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            inside: true
          }
        }
      },
      tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: "<div class='chart-tooltip'>",
        pointFormat: "<div class='chart-tooltip-name'>{point.name}</div>" +
          "<div class='chart-tooltip-value'><i class='far fa-dot-circle'></i>{point.y}</div>",
        footerFormat: '</div>',
        valueDecimals: 2
      },
      series: [{
        type: 'pie',
        allowPointSelect: true,
        data: seriesData,
        showInLegend: true,
        ignoreHiddenSeries: false
      }]
    });
  }
}

const VideoMimeType = {
  flv: 'video/x-flv',
  mp4: 'video/mp4',
  m3u8: 'application/x-mpegURL',
  ts: 'video/MP2T',
  "3gp": 'video/3gpp',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  wmv: 'video/x-ms-wmv'
}

const StringFromLastCharacter = (str, char) => str.substring(str.lastIndexOf(char) + 1)



