$('.btnSaveIncidentResident').click(function(){
    let IncidentTypeId = $('#Name').find(":selected").val()
    let BuildingId = $('#Building').find(":selected").val()
    let HouseId = $('#House').find(":selected").val()
    let Code = $('#Code').val()
    let data = {IncidentTypeId,Code,HouseId,BuildingId}
    $.post('/cms/createResidentIncident',data,function(res){
        if(res.data){
            showAlert('success',res.Message)
            setTimeout(function(){location.href = "/cms/listIncident"},600)
        }
        else {
            showAlert('failed',res.Message)
        }
    })
})

$( document ).ready(function() {
  $("#HouseIdSearch").hide()
  $.get('/cms/getBuiLding_House_Incident',function(res){
      let optionBuilding = `<option value="">-- Tìm kiếm theo tòa nhà --</option>`
      let optionStatus = `<option value="">-- Tìm kiếm theo loại sự cố--</option>`
      res.data.forEach(value =>{
        optionBuilding += `<option value="${value.Id}">${value.Name}</option>`
      })
      res.dataTypeIncident.forEach(value =>{
        optionStatus += `<option value="${value.Id}">${value.Name}</option>`
      })
      $('#BuildingIdSearchIncident').html(optionBuilding) 
      $('#TypeSearchIncident').html(optionStatus) 

  })
});
$('#BuildingIdSearchIncident').on('change', function(){
  let BuildingId = $('#BuildingIdSearchIncident').find(":selected").val()
  let TypeSearchIncident = $('#TypeSearchIncident').find(":selected").val()
  let StatusIncidentSearch = $('#StatusIncidentSearch').find(":selected").val()
  let HouseId = $('#HouseIdSearchIncident').find(":selected").val()
  if(BuildingId == ""){
    $("#HouseIdSearch").hide()
    HouseId = ""
  }
  else{
    $("#HouseIdSearch").show()
  }
  let optionHouse = `<option value="">-- Chọn căn hộ --</option>`
  $.get('/cms/getHousebyBuildingId?BuildingId='+BuildingId,function(res){
    res.data.forEach(value =>{
      optionHouse += `<option value="${value.Id}">${value.Name}</option>`
    })
    $('#HouseIdSearchIncident').html(optionHouse) 
  })
  tableIncident.ajax.url('/cms/incidentList?HouseId='+HouseId +'&BuildingId='+BuildingId+
  '&TypeSearchIncident='+TypeSearchIncident+'&StatusIncidentSearch='+StatusIncidentSearch).load()
})

$('#HouseIdSearchIncident').on('change', function(){
  let HouseId = $('#HouseIdSearchIncident').find(":selected").val()
  let BuildingId = $('#BuildingIdSearchIncident').find(":selected").val()
  let TypeSearchIncident = $('#TypeSearchIncident').find(":selected").val()
  let StatusIncidentSearch = $('#StatusIncidentSearch').find(":selected").val()
  tableIncident.ajax.url('/cms/incidentList?HouseId='+HouseId +'&BuildingId='+BuildingId+
  '&TypeSearchIncident='+TypeSearchIncident+'&StatusIncidentSearch='+StatusIncidentSearch).load()
})
$('#TypeSearchIncident').on('change', function(){
  let HouseId = $('#HouseIdSearchIncident').find(":selected").val()
  let BuildingId = $('#BuildingIdSearchIncident').find(":selected").val()
  let TypeSearchIncident = $('#TypeSearchIncident').find(":selected").val()
  let StatusIncidentSearch = $('#StatusIncidentSearch').find(":selected").val()
  tableIncident.ajax.url('/cms/incidentList?HouseId='+HouseId +'&BuildingId='+BuildingId+
  '&TypeSearchIncident='+TypeSearchIncident+'&StatusIncidentSearch='+StatusIncidentSearch).load()
})
$('#StatusIncidentSearch').on('change', function(){
  let HouseId = $('#HouseIdSearchIncident').find(":selected").val()
  let BuildingId = $('#BuildingIdSearchIncident').find(":selected").val()
  let TypeSearchIncident = $('#TypeSearchIncident').find(":selected").val()
  let StatusIncidentSearch = $('#StatusIncidentSearch').find(":selected").val()
  tableIncident.ajax.url('/cms/incidentList?HouseId='+HouseId +'&BuildingId='+BuildingId+
  '&TypeSearchIncident='+TypeSearchIncident+'&StatusIncidentSearch='+StatusIncidentSearch).load()
})
let tableIncident = $('#table-incident').DataTable({
    "ajax": "/cms/incidentList",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "Code" },
        { "data": "Description" },
        { "data": "Type" },
        { "data": "House" },
        { "data": "Building" },
  
      ],
    "columnDefs": [
      {
        "render": function (data, type, row,recordsTotal) {
          return recordsTotal.row+1
        },
        "targets": 0  
      },
      {
        "render": function (data, type, row) {
          let Code = row.Code !== '' ? row.Code : 'N/A'
          return Code
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let Description = row.Description !== '' ? row.Description : 'N/A'
          if(Description.length > 200){
            return Description.substring(0,180)+"..."
          }
          else{
            return Description
          }
          
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          // console.log("data",row) //giá trị của từng cột = row.FullName
          let Name = row.Type.Name !== '' ? row.Type.Name : 'N/A'
          return Name
        },
        "targets": 3
      },
      
      {
        "render": function (data, type, row) {
          let House = row.House.Name !== '' ? row.House.Name : 'N/A'
          return House
          
        },
        "targets": 4
      },

      {
        "render": function (data, type, row) {
          let Building = row.Building.Name !== '' ? row.Building.Name : 'N/A'
          return Building
          
        },
        "targets": 5
      },
      {
        "render": function (data, type, row) {
          let status = ''
          switch(row.Status) {
            case 1:
              status = "Đã gửi"
              break;
            case 2:
              status = "Manager đã nhận"
              break;
            case 3:
              status = "Đang báo giá"
              break;
            case 4:
              status = "Đang sửa chữa"
              break;
            case 5:
              status = "Hoàn thành"
              break;
            default:
              status = "N/A"
          }
          console.log(status)
          return status
          
        },
        "targets": 6
      },
      {
        "render": function (data, type, row) {
          return `
            <a href="#" class="updateHouse" id="${row.Id}" title="Sửa" ></a>
            <a class="deleteIncident" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
            <a href="javascript:void(0)"title="xem" class="viewIncident"><i class="ft-eye"></i></a>
          `
        },
        "targets": 7
      }
    ]
  });

  $('#table-incident tbody').on('click', '.viewIncident',function () {
    let _this = $(this)
    let data = tableIncident.row(_this.closest('tr')).data();
    let typeIncident = data.Type != null ? data.Type.Name : "N/A"
    $('.modal #IncidentType').val(typeIncident)
    $('.modal #DescriptionIncident').val(data.Description) 
    if(data.Status == 1){
      $('.modal #StatusIncident option').removeAttr('selected').filter('[value=1]').attr('selected', true)
    }
    else if (data.Status == 2){
      $('.modal #StatusIncident option').removeAttr('selected').filter('[value=2]').attr('selected', true)
    } 
    else if (data.Status == 3){
      $('.modal #StatusIncident option').removeAttr('selected').filter('[value=3]').attr('selected', true)
      
    } 
    else if (data.Status == 4){
      $('.modal #StatusIncident option').removeAttr('selected').filter('[value=4]').attr('selected', true)
    } 
    else if (data.Status == 5){
      $('.modal #StatusIncident option').removeAttr('selected').filter('[value=5]').attr('selected', true)
    } 
    
    let listImage = data.Images.split(",")
    let slideFirt = `<div class="carousel-item active">
                      <img style="height: 350px;" class="d-block w-100" src="${listImage[0]}">
                    </div>`
    let slideSecond = ``
    for (let i = 1; i<listImage.length;i++){
      slideSecond += `<div class="carousel-item">
                        <img style="height: 350px;" class="d-block w-100" src="${listImage[i]}">
                      </div>`
    }
    $('.modal #slideShowIncident').html(slideFirt+slideSecond)
    $('.modal #HouseIncident').val(data.House != null ? data.House.Name : "N/A")
    $('.modal #BuildingIncident').val(data.Building != null ? data.Building.Name : "N/A")
    let date = moment(data.FixDate).format("DD/MM/YYYY");
    $('.modal #FixDateIncident').val(date)
    $('.modal #FixedByIncident').val(data.FixedBy)
    $('.modal .save-contract-data').attr('id', data.Id)
    $('.modalViewIncident').modal('show')
  });

  $('#table-incident').on('click', '.deleteIncident',function(){
    let id = $(this).attr('id')
    let data = {'id':id}
    if(confirm("Bạn có chắc chắn muốn xóa")){
        $.post('/cms/deleteIncident/',data, function(res){
            if(res.data){
                showAlert('success',res.Message)
                setTimeout(function(){location.reload()},300)
            }
            else{
                showAlert('failed',res.Message)
            }
        })
    }
    return false
})