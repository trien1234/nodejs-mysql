$(window).on("load", ()=>{
    var toolbox = {
        show: true,
        orient: 'vertical',
        feature: {
            dataView: {
                show: true,
                readOnly: false,
                title: 'View data',
                lang: ['View chart data', 'Close', 'Update']
            },
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
            countIncidentByType(startDate,endDate)
            countIncidentByStatus(startDate,endDate)
            countIncidentByTimeAvg(startDate,endDate)       
        });
        cb(start, end);    
    })
    //Thống kê sụ cố theo type and status
    function countIncidentByType(startDate,endDate){
        $.get(`/cms/countIncidentByType?startDate=${startDate}&endDate=${endDate}`,function(res){
            let data = res.dataIncident
            let sumIncident = 0
        // biểu đồ tròn
            require.config({
                paths: {
                    echarts: '../../public/app-assets/vendors/js/charts/echarts'
                }
            });
            let dataPie = []
            data.forEach(value=>{
                let nameIncidentType
                sumIncident += value.CountIncidentTypeId
                switch (value.IncidentTypeId) {
                    case  1:
                        nameIncidentType = "Điện"   
                        break;
                    case  2:
                        nameIncidentType = "Nước"
                        break;
                    case  3:
                        nameIncidentType = "Điện lạnh"    
                        break;  
                    case  4:
                        nameIncidentType = "Internet"  
                        break;  
                    case  5:
                        nameIncidentType = "Môi trường"    
                        break; 
                    case  6:
                        nameIncidentType = "Trang thiết bị"    
                        break;
                    case  7:
                        nameIncidentType = "Con người"    
                        break; 
                    case  8:
                        nameIncidentType = "Khác"    
                        break;          
                    default:
                        break;
                }
                dataPie.push({value: value.CountIncidentTypeId, name: nameIncidentType})
            })
            $('#sumIncident').html(sumIncident)    
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ], 
                // Charts setup
                function (ec) {
                    // Initialize chart
                    // ------------------------------
                    var myChart = ec.init(document.getElementById('basic-pie-byType'));
                    // Chart Options
                    // ------------------------------
                    chartOptions = {
        
                        // Add title
                        title: {
                            text: '',
                            x: 'center'
                        },
        
                        // Add tooltip
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
        
                        // Add legend
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            //hiển thị menu left
                            // data: ['Điện', 'Nước', 'Điện lạnh', 'Internet', 'Điện tử', 'Môi trường', 'Trang thiết bị', 'Con người',  'Khác']
                            data: []
                        },
        
                        // Add custom colors
                        // color: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#16D39A'],
        
                        // Display toolbox
                        toolbox: toolbox,
        
                        // Enable drag recalculate
                        calculable: true,
        
                        // Add series
                        series: [{
                            name: 'Sự cố',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '57.5%'],
                            data : dataPie
                        }]
                    };
                    // Apply options
                    // ------------------------------
        
                    myChart.setOption(chartOptions);
       
                })
            }
        );
    }
    countIncidentByType("","")
    
    function countIncidentByStatus(startDate,endDate){
        $.get(`/cms/countIncidentByStatus?startDate=${startDate}&endDate=${endDate}`,function(res){
            let data = res.dataIncidentStatus
            require.config({
                paths: {
                    echarts: '../../public/app-assets/vendors/js/charts/echarts'
                }
            });
            let dataPie = []
            data.forEach(value=>{
                let nameIncidentStatsus
                switch (value.Status) {
                    case  1:
                        nameIncidentStatsus = "Đã gửi"   
                        break;
                    case  2:
                        nameIncidentStatsus = "Đã nhận"
                        break;
                    case  3:
                        nameIncidentStatsus = "Đang báo giá"    
                        break;  
                    case  4:
                        nameIncidentStatsus = "Đang sửa chữa"  
                        break;  
                    case  5:
                        nameIncidentStatsus = "Hoàn thành"    
                        break;          
                    default:
                        break;
                }
                dataPie.push({value: value.CountIncidentStatus, name: nameIncidentStatsus},)
            })
            // Configuration
            // ------------------------------
        
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ],
        
        
                // Charts setup
                function (ec) {
                    // Initialize chart
                    // ------------------------------
                    var myChart = ec.init(document.getElementById('basic-pie-byStatus'));
        
                    // Chart Options
                    // ------------------------------
                    chartOptions = {
        
                        // Add title
                        title: {
                            text: '',
                            x: 'center'
                        },
        
                        // Add tooltip
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
        
                        // Add legend
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            // data: ['Điện', 'Nước', 'Điện lạnh', 'Internet', 'Điện tử', 'Môi trường', 'Trang thiết bị', 'Con người',  'Khác']
                            data: []
                        },
        
                        // Add custom colors
                        color: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#16D39A'],
        
                        // Display toolbox
                        toolbox: toolbox,
        
                        // Enable drag recalculate
                        calculable: true,
        
                        // Add series
                        series: [{
                            name: 'Trạng thái',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '57.5%'],
                            data : dataPie
                        }]
                    };
                    myChart.setOption(chartOptions);
        
        })
            }
        );
    }
    countIncidentByStatus("","")
    
    function countIncidentByTimeAvg(startDate,endDate){
        $.get(`/cms/countIncidentByTimeAvg?startDate=${startDate}&endDate=${endDate}`,function(res){
            let data = res.dataIncident
        // biểu đồ tròn
            require.config({
                paths: {
                    echarts: '../../public/app-assets/vendors/js/charts/echarts'
                }
            });
            let dataPie = []
            data.forEach(value=>{
                let nameIncidentType
                switch (value.IncidentTypeId) {
                    case  1:
                        nameIncidentType = "Điện"   
                        break;
                    case  2:
                        nameIncidentType = "Nước"
                        break;
                    case  3:
                        nameIncidentType = "Điện lạnh"    
                        break;  
                    case  4:
                        nameIncidentType = "Internet"  
                        break;  
                    case  5:
                        nameIncidentType = "Môi trường"    
                        break; 
                    case  6:
                        nameIncidentType = "Trang thiết bị"    
                        break;
                    case  7:
                        nameIncidentType = "Con người"    
                        break; 
                    case  8:
                        nameIncidentType = "Khác"    
                        break;          
                    default:
                        break;
                }
                dataPie.push({value: value.CountTimeAvg, name: nameIncidentType})
    
            })   
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ], 
                function (ec) {
                    var myChart = ec.init(document.getElementById('basic-pie-by-time'));
                    chartOptions = {
                        title: {
                            text: '',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },

                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: []
                        },
                        // color: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#16D39A'],
                        toolbox: toolbox,
                        calculable: true,
                        series: [{
                            name: 'Thời gian(ngày)',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '57.5%'],
                            data : dataPie
                        }]
                    };
                    myChart.setOption(chartOptions);
       
                })
            }
        );
    }

    countIncidentByTimeAvg("","")
    
    //biểu đồ cột
    function getDataIncidentBar(year_first){
        $.get('/cms/countIncidentByMonth?year='+year_first,function(res){ 
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
                    var myChart = ec.init(document.getElementById('basic-column'));
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
                                name: 'Số sự cố',
                                type: 'bar',
                                // data: res.listData,
                                data: res.listData,
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
        $.get('/cms/getCountIncidentByYear',function(res){
            let year_first = res.year[0].Year
            let option_incident_by_year = ''
            $.each(res.year, function (index, value) {
                option_incident_by_year += `<option value="${value.Year}">Năm ${value.Year}</option>`
            });
            $('#incident_by_year').html(option_incident_by_year) 
            getDataIncidentBar(year_first)
            
    
        })
        $('#incident_by_year').change(function(){
            let year = $(this).val();
            getDataIncidentBar(year)
        })
})