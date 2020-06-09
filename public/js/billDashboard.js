//thống kê hóa đơn all(tròn) 
$(window).on("load", ()=>{

//date range picker    
const start = moment().subtract(29, 'days');
const end = moment();
function cb(start, end) {
    $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
}    

$(function () {
    $('#reportrange').daterangepicker({
        // autoApply: true,
        startDate: start,
        endDate: end,
        locale: {
            format: 'DD/MM/YYYY',
            applyLabel: 'Áp dụng',
            cancelLabel: 'Hủy',
            customRangeLabel: 'Tùy Chỉnh',
        },
        alwaysShowCalendars:false,
        ranges: {
            'Ngày trước': [moment().subtract(1, 'days'), moment()],
            '1 tháng trước': [moment().subtract(30, 'days'), moment()],
            '3 tháng trước': [moment().subtract(3, 'month').startOf('month'), moment()],
            '6 tháng trước': [moment().subtract(6, 'month').startOf('month'), moment()],
            '1 năm trước': [moment().subtract(12, 'month').startOf('month'), moment()],
            }
    }, cb).on('apply.daterangepicker', function(ev, picker) {
        let startDate = picker.startDate.format('YYYY-MM-DD')
        let endDate = picker.endDate.format('YYYY-MM-DD')
        billPie(startDate,endDate)
    });
    cb(start, end);    
})

var toolbox = {
    show: true,
    orient: 'vertical',
    feature: {
        magicType: {
            show: true,
            title: {
                pie: 'Switch to pies',
                funnel: 'Switch to funnel',
            },
            type: ['pie', 'funnel'],
            option: {
                funnel: {
                    x: '25%',
                    y: '20%',
                    width: '50%',
                    height: '70%',
                    funnelAlign: 'left',
                    max: 1548
                }
            }
        },
        restore: {
            show: true,
            title: 'Restore'
        },
        saveAsImage: {
            show: true,
            title: 'Same as image',
            lang: ['Save']
        }
    }
}
//thống kê hóa đơn(tròn)
function billPie(startDate,endDate){
    $.get(`/cms/countBillByStatus?startDate=${startDate}&endDate=${endDate}`,function(res){
        let data = res.dataBill
        let dataMoney =  res.dataMoney
        dataMoney.forEach(val=>{
            if(val.name == "Tiền đã thu"){
                $('#SumResiMoney').html(`${val.value}`)
            }
            else{
                $('#SumResiMoney').html(`0 đ`)
            }
        })      
        let dataPie = []
        data.forEach(value=>{
            let nameStatusBill
            switch (value.Status) {
                case  3:
                    nameStatusBill = "Hóa đơn đã thu"   
                    break;
                case  2:
                    nameStatusBill = "Hóa đơn chưa thu"
                    break;
                case  6:
                    nameStatusBill = "Hóa đơn bỏ cọc"    
                    break;          
                default:
                    break;
            }
            dataPie.push({value: value.CountStatus, name: nameStatusBill},)
        })
        require.config({
            paths: {
                echarts: '../../public/app-assets/vendors/js/charts/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie',
                'echarts/chart/funnel'
            ],
        function (ec) {
            // Initialize chart
            // ------------------------------
            var myChart = ec.init(document.getElementById('nested-pie'));
    
            // Chart Options
            // ------------------------------
            chartOptions = {
    
                // Add tooltip
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // legend: {
                //     orient: 'vertical',
                //     x: 'left',
                //     data: ['Đã thu','Chưa thu','Bỏ cọc']
                // },
    
                // Add custom colors
                color: ['#FF7D4D','#00A5A8', '#FF4558'],
    
                // Display toolbox
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'View data',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        restore: {
                            show: true,
                            title: 'Restore'
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Same as image',
                            lang: ['Save']
                        }
                    }
                },
    
                // Enable drag recalculate
                calculable: false,
    
                // Add series
                series: [
    
                    // Inner
                    {
                        name: '',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '60%'],
    
                        // for funnel
                        x: '15%',
                        y: '7.5%',
                        width: '40%',
                        height: '85%',
                        funnelAlign: 'right',
                        max: 1548,
    
                        itemStyle: {
                            normal: {
                                label: {
                                    position: 'inner'
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
    
                        data: dataMoney
                    },
    
                    // Outer
                    {
                        name: '',
                        type: 'pie',
                        radius: ['80%', '100%'],
    
                        // for funnel
                        x: '55%',
                        y: '7.5%',
                        width: '35%',
                        height: '85%',
                        funnelAlign: 'left',
                        max: 1048,
    
                        data: dataPie 
                    }
                ]
            };
            myChart.setOption(chartOptions);
        }
    );

    })
}
billPie("","")

//thống kê hóa đơn theo tháng (cột)
function getDataBillBar(year_first){
    $.get(`/cms/countBillByMonth?year=${year_first}`,function(res){ 
        require.config({
            paths: {
                echarts: '../../public/app-assets/vendors/js/charts/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/bar',
                'echarts/chart/line'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById('basic-column-bill'));
                chartOptions = {
    
                    // Setup grid
                    grid: {
                        x: 40,
                        x2: 40,
                        y: 35,
                        y2: 25
                    },
    
                    // Add tooltip
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Hết hạn', 'Đã thanh toán','Bỏ cọc']
                    },
    
                    // Add custom colors
                    color: ['#00B5B8', '#FF7588','#626E82'],
                    calculable: true,
    
                    // Horizontal axis
                    xAxis: [{
                        type: 'category',
                        data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
                    }],
    
                    // Vertical axis
                    yAxis: [{
                        type: 'value'
                    }],
    
                    // Add series
                    series: [
                        {
                            name: 'Hết hạn',
                            type: 'bar',
                            // data: res.listData,
                            data: res.list_dataExpried,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{type: 'average', name: 'Average'}]
                            }
                        },
                        {
                            name: 'Đã thanh toán',
                            type: 'bar',
                            // data: res.listData,
                            data: res.list_dataPaid,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{type: 'average', name: 'Average'}]
                            }
                        },
                        {
                            name: 'Bỏ cọc',
                            type: 'bar',
                            // data: res.listData,
                            data: res.list_dataRevoke,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{type: 'average', name: 'Average'}]
                            }
                        }
                    ]
                };
                myChart.setOption(chartOptions);
            }
        );

    }) 
}
$.get('/cms/getCountBillByYear',function(res){
    let year_first = res.year[0].Year
    let option_bill_by_year = ''
    $.each(res.year, function (index, value) {
        option_bill_by_year += `<option value="${value.Year}">Năm ${value.Year}</option>`
    });
    $('#bill_by_year').html(option_bill_by_year) 
        getDataBillBar(year_first)  
})

$('#bill_by_year').change(function(){
    let year = $(this).val()
    getDataBillBar(year)
})
})