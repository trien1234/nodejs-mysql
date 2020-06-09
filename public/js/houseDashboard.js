//thống kê căn hộ all(tròn) 
$(window).on("load", ()=>{
    $('#FloorDashboard').hide()
    $.get('/cms/getListBuilding',function(res){
        var optionBuiding = '<option value="undefined">-- Tất cả tòa nhà--</option>'
        $.each(res.listBuiding, function (index, value) {
            optionBuiding += `<option value='${value.Id}'>${value.Name}</option>`
          });
        $('#buildingDashboard').html(optionBuiding) 
    })
    $('#buildingDashboard').on('change',function(){
        $('#FloorDashboard').show()
        let BuildingId = $('#buildingDashboard').find(":selected").val()
        var optionFloor = '<option value="undefined">-- Tất cả tầng--</option>'
        $.get('/cms/getListFloor/?BuildingId='+BuildingId,function(res){
            res.listFloor.forEach(val=>{
                optionFloor += `<option value="${val.Id}">${val.Floor}</option>`
            })
            
            $('#floorDashboard').html(optionFloor) 
          })
    })

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
                '3 tháng trước': [moment().subtract(3, 'month'),moment()],
                '6 tháng trước': [moment().subtract(6, 'month'),moment()],
                '1 năm trước': [moment().subtract(12, 'month'),moment()],
                }
        }, cb).on('apply.daterangepicker', function(ev, picker) {
            let startDate = picker.startDate.format('YYYY-MM-DD')
            let endDate = picker.endDate.format('YYYY-MM-DD')
            let buildingId = $('#buildingDashboard').find(":selected").val()
            let floor = $('#floorDashboard').find(":selected").val()
            houseDashboard(startDate,endDate,buildingId,floor)
        });
        cb(start, end);    
    })
    
    
    function houseDashboard(startDate,endDate,buildingId,floor){
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
        $.get(`/cms/countHouseByStatus?startDate=${startDate}&endDate=${endDate}&buildingId=${buildingId}&floor=${floor}`,function(res){
            let data = res.dataHouse
            let dataHouseRevoke = res.dataHouseRevoke
            let sumHouse= res.sumHouse
            let sumAvgTimeRentHouse = res.sumAvgTimeRentHouse
            let sumTimeEmptyy = _.groupBy(res.sumTimeEmpty,'HouseId')
            let listHouseId = Object.keys(sumTimeEmptyy)
            let sumTimeEmpty = 0
            let sumCountEmpty = 0
            listHouseId.forEach(val=>{
                let house = sumTimeEmptyy[val]
                for(let i = 0; i < house.length-1; i++){
                    if(house[i].StatusId == 8 && house[i+1].StatusId != 8){
                        sumCountEmpty +=1
                        sumTimeEmpty += Math.abs(new Date(house[i+1].CreatedDate) -new Date(house[i].CreatedDate))/86400000
                    }
            }
            })  
            if(sumHouse.length > 0){
                $('#sumHouse').html(`${sumHouse[0].sumHouse}`)
            }   
            $('#sumAvgTimeRentHouse').html(`${sumAvgTimeRentHouse} ngày`)
            let sumAvgTimeEmpty = Math.ceil(sumTimeEmpty/sumCountEmpty)
            if(sumAvgTimeEmpty){
                $('#sumAvgTimeEmpty').html(`${sumAvgTimeEmpty} ngày`)
            }
            else{
                $('#sumAvgTimeEmpty').html(`0 ngày`)
            }
            
            require.config({
                paths: {
                    echarts: '../../public/app-assets/vendors/js/charts/echarts'
                }
            });
            let dataPie = []
            data.forEach(value=>{
                let nameStatusHouse
                switch (value.StatusId) {
                    case  8:
                        nameStatusHouse = "Trống"
                        break;
                    case  12:
                        nameStatusHouse = "Gia hạn"    
                        break;   
                    case  13:
                        nameStatusHouse = "Thanh lý"    
                        break;        
                    default:
                        break;
                }
                dataPie.push({value: value.CountStatus, name: nameStatusHouse})
            })
            if(dataHouseRevoke.length > 0){
                if(dataHouseRevoke[0].CountStatusRevoke){
                    dataPie.push({value: dataHouseRevoke[0].CountStatusRevoke, name: "Bỏ cọc"})
                }
            }    
            require(
                [
                    'echarts',
                    'echarts/chart/pie',
                    'echarts/chart/funnel'
                ], 
                function (ec) {
                    var myChart = ec.init(document.getElementById('basic-pie-house'));
                    chartOptions = {
                        title: {
                            text: 'Thống kê tình trạng nhà',
                            x: 'center'
                        },
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
                        // color: ['#00A5A8', '#626E82', '#FF7D4D','#FF4558', '#16D39A'],

                        toolbox: toolbox,
                        calculable: true,
                        series: [{
                            name: 'Tình trạng',
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '57.5%'],
                            data : dataPie
                        }]
                    };
                    myChart.setOption(chartOptions);
        
        })
        });
    }
    houseDashboard("","")
})
