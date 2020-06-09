
let tableBuilding = $('#table-buildings').DataTable({
    "ajax": "/cms/buildingListGet",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
      { "data": "Name" },
      { "data": "Manager" },
      { "data": "Code" },
      { "data": "Address" },
      { "data": "AllHouse"},
      { "data": "Status" },
    ],
    "columnDefs": [
      {
        "render": function (data, type, row,recordsTotal) {
          return recordsTotal.row
        },
        "targets": 0  
      },
      {
        "render": function (data, type, row) {
          // console.log("data",row) //giá trị của từng cột = row.FullName
          let Name = row.Name !== '' ? row.Name : 'N/A'
          return Name
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let NameManager = row.Manager !== null ? row.Manager.FullName : 'N/A'
          return NameManager
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          let Code = row.Code !== '' ? row.Code : 'N/A'
          return Code
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          let Address = row.Address !== '' ? row.Address : 'N/A'
          return Address
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          let allHouse = row.countHouse !== '' ? row.countHouse : 'N/A'
          return allHouse
          
        },
        "targets": 5
      },
      {
        "render": function (data, type, row) {
          let Status = row.Status !== '' ? row.Status : 'N/A'
          return Status
          
        },
        "targets": 6
      },
      {
        "render": function (data, type, row) {
          return `
            <a href="javascript:void(0)"title="Sửa" class="editBuilding"><i class="fas fa-edit"></i></a>
            <a class="deleteBuilding" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
          `
        },
        "targets": 7
      }
    ]
  });

  $('#table-buildings tbody').on('click', '.editBuilding', function () {
    let _this = $(this)
    let data = tableBuilding.row(_this.closest('tr')).data();
    $('.modal #Name').val(data.Name)
    $('.modal #Address').val(data.Address)
    $('.modal #Code').val(data.Code)
    $('.modal #Note').val(data.Note)
    $('.modal #BillDateRange').val(data.BillDateRange)
    $('.modal #ElectricBill').val(data.ElectricBill)
    $('.modal #WaterType').val(data.WaterType)
    $('.modal #WaterPrice').val(data.WaterPrice)
    $('.modal #CarParkPrice').val(data.CarParkPrice)
    $('.modal #MotobikeParkPrice').val(data.MotobikeParkPrice)
    $('.modal #ServicePrice').val(data.ServicePrice)
    $('.modal #BikeParkPrice').val(data.BikeParkPrice)
    $('.modal .save-building-data').attr('id', data.Id)
    $('.modal').modal('show')
  });
  
  $('.save-building-data').click(function(){
    let Name  = $('.modal #Name ').val()
    let Code = $('.modal #Code').val()
    let Note = $('.modal #Note').val()
    let Address = $('.modal #Address').val()
    let BillDateRange  = $('.modal #BillDateRange ').val()
    let ElectricBill = $('.modal #ElectricBill').val()
    let WaterType = $('.modal #WaterType').val()
    let WaterPrice = $('.modal #WaterPrice').val()
    let CarParkPrice  = $('.modal #CarParkPrice ').val()
    let MotobikeParkPrice = $('.modal #MotobikeParkPrice').val()
    let ServicePrice = $('.modal #ServicePrice').val()
    let BikeParkPrice = $('.modal #BikeParkPrice').val()
    let Id = $(this).attr('id')
    $.post('/cms/editBuilding', { Name, Code,Note,Address,BillDateRange,ElectricBill,WaterType,WaterPrice,CarParkPrice,MotobikeParkPrice,ServicePrice,BikeParkPrice,Id }, res =>{
      if (res.data){
        $('.modal').modal('hide')
        showAlert('success', res.Message)
        setTimeout(function(){location.reload()}, 300)
      }else {
        console.log(res.Message)
        showAlert('failed', res.Message)
      }
    })
  })



$('#table-buildings').on('click', '.deleteBuilding', function () {
  let id = $(this).attr('id')
  if (confirm("Bạn có chắc chắn muốn xóa?")) {
    $.post('/cms/deleteBuildingPost/'+id, function(res){
      if(res.data){
        showAlert('success', res.message)
        setTimeout(function(){location.reload()}, 300)
      }else{
        showAlert('failed', res.message)
      }
    })
  }
  return false;
});





$('.btnSaveBuilding').click(function(){
  let Name = $('#Name').val()
  let Code = $('#Code').val()
  let Address  = $('#Address').val()
  let Note  = $('#Note').val()
  let BillDateRange = $('#BillDateRange').find(":selected").val()
  console.log("BillDateRange",BillDateRange)
  let ElectricBill  = $('#ElectricBill').val()
  let WaterPrice  = $('#WaterPrice').val()
  let CarParkPrice  = $('#CarParkPrice').val()
  let MotobikeParkPrice  = $('#MotobikeParkPrice').val()
  let BikeParkPrice  = $('#BikeParkPrice').val()
  let Status  = $('#Status').val()
  let WaterType  = $('#WaterType').val()
  let ManagerId = $('#Manager').find(":selected").val()
  let ServicePrice  = $('#ServicePrice').val()

  $.post('/cms/createBuildingPost', { Name, Code, Address, Note, BillDateRange, ElectricBill, WaterPrice,CarParkPrice,MotobikeParkPrice,BikeParkPrice,Status,WaterType,ManagerId,ServicePrice }, function(res){
    if (res.data) {
      showAlert('success', res.Message)
      setTimeout(function(){location.href = "/cms/listBuildingGet"}, 600)
    } else {
      showAlert('failed', res.Message)
    }
  })
})

/**
  For manager
**/
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
let tableManagerBuilding = $('#table-managerBuilding').DataTable({
    "ajax": "/cms/listManagerBuilding",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
      { "data": "Code" },
      { "data": "Name" },
      { "data": "Address" },
      { "data": "ElectricBill" },
      { "data": "WaterType" },
      { "data": "WaterPrice" },
      { "data": "CarParkPrice" },
      { "data": "MotobikeParkPrice" }
    ],
    "columnDefs": [
      {
        "render": function (data, type, row) {
          return `<code>${row.Code !== '' ? row.Code : 'N/A'}</code>`
        },
        "targets": 0
      },
      {
        "render": function (data, type, row) {
          let Name = row.Name !== '' ? row.Name : 'N/A'
          return Name
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let Address = row.Address !== '' ? row.Address : 'N/A'
          return Address
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          let ElectricBill = row.ElectricBill !== null ? formatNumber(row.ElectricBill.toFixed(0)) : 'N/A'
          return ElectricBill
          
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          let WaterPrice = row.WaterPrice !== null ? formatNumber(row.WaterPrice.toFixed(0)) : 'N/A'
          return WaterPrice
          
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          let CarParkPrice = row.CarParkPrice !== null ? formatNumber(row.CarParkPrice.toFixed(0)) : 'N/A'
          return CarParkPrice
          
        },
        "targets": 5
      },
      {
        "render": function (data, type, row) {
          let MotobikeParkPrice = row.MotobikeParkPrice !== null ? formatNumber(row.MotobikeParkPrice.toFixed(0)) : 'N/A'
          return MotobikeParkPrice
          
        },
        "targets": 6
      },    
      {
        "render": function (data, type, row) {
          let BikeParkPrice = row.BikeParkPrice !== '' ? formatNumber(row.BikeParkPrice.toFixed(0)) : 'N/A'
          return BikeParkPrice
          
        },
        "targets": 7
      }
    ]
  });
/**
End
**/






