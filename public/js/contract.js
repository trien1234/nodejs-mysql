
$( document ).ready(function() {
    $.get('/cms/contractCreate',function(res){
      var optionHouse = '<option value="">-- Vui lòng chọn --</option>'
      $.each(res.house, function (index, value) {
          optionHouse += "<option value='"+value.Id+"'>"+value.Name+"</option>"
      });
      $('#HouseId').html(optionHouse)  

    })
    $('#HouseId').change(function(){ 
        let id = $(this).val();
        $.get('/cms/getAttribute/'+id,function(res){
            $("#WaterPrice").val(res.house.Building.WaterPrice);
            $("#CarParkPrice").val(res.house.Building.CarParkPrice);
            $("#ElectricBill").val(res.house.Building.ElectricBill);
            $("#MotobikeParkPrice").val(res.house.Building.MotobikeParkPrice);
            $("#BikeParkPrice").val(res.house.Building.BikeParkPrice);
            $("#ServicePrice").val(res.house.Building.ServicePrice);
            $("#BillDateRange").val(res.house.Building.BillDateRange);
            $("#RentalFee").val(res.house.RentalFee);
    
        })
    });
});

$('.btnSaveContract').click(function(){
    let HouseId = $('#HouseId').find(":selected").val()
    let RepresentativeName = $('#RepresentativeName').val()
    let RepresentativeTel = $('#RepresentativeTel').val()
    let CarParkPrice = $('#CarParkPrice').val()
    let ElectricBill = $('#ElectricBill').val()
    let MotobikeParkPrice = $('#MotobikeParkPrice').val()
    let BikeParkPrice = $('#BikeParkPrice').val()
    let ServicePrice = $('#ServicePrice').val()
    let BillDateRange = $('#BillDateRange').find(":selected").val()
    let CheckinDate = $('#CheckinDate').val()
    let CheckoutDate = $('#CheckoutDate').val()
    let Funiture = $('#Funiture').val()
    let DepositMoney = $('#DepositMoney').val()
    let WaterPriceType = $('#WaterPriceType').find(":selected").val()
    let RentalFee = $('#RentalFee').val()
    let FirstWarNum = $('#FirstWarNum').val()
    let FirstElNum = $('#FirstElNum').val()
    let data = {RepresentativeName,RepresentativeTel,HouseId,CarParkPrice,ElectricBill,MotobikeParkPrice,WaterPriceType,RentalFee,
                BikeParkPrice,ServicePrice,BillDateRange,CheckinDate,CheckoutDate,Funiture,DepositMoney,FirstWarNum,FirstElNum}
    $.post('/cms/createContract',data,function(res){
        if(res.data){
            showAlert('success',res.Message)
            setTimeout(function(){location.href = "/cms/listContract"},600)
        }
        else {
            showAlert('failed',res.Message)
        }
    })
})


let tableContract = $('#table-contract').DataTable({
    "ajax": "/cms/contractList",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "RepresentativeName" },
        { "data": "RepresentativeTel" },
        { "data": "HouseId" },
        { "data": "CheckinDate" },
        { "data": "CheckoutDate" },
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
          let RepresentativeName = row.RepresentativeName !== '' ? row.RepresentativeName : 'N/A'
          return RepresentativeName
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          let RepresentativeTel = row.RepresentativeTel !== '' ? row.RepresentativeTel : 'N/A'
          return RepresentativeTel
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          let House = row.House.Name !== '' ? row.House.Name : 'N/A'
          return House
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          let CheckinDate = row.CheckinDate !== '' ? row.CheckinDate : 'N/A'
          return CheckinDate
          
        },
        "targets": 4
      },

      {
        "render": function (data, type, row) {
          let CheckoutDate = row.CheckoutDate !== '' ? row.CheckoutDate : 'N/A'
          return CheckoutDate
          
        },
        "targets": 5
      },
      {
        "render": function (data, type, row) {
          return `
          <a href="/cms/accountingCreateBilling/${row.House.Id}?type=1"title="Tạo hoá đơn" class="btn btn-success btn-sm"><i class="ft-clipboard"></i></a>
          <a href="javascript:void(0)"title="Sửa" class="editContract btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
          <a href="/cms/detailContract/?idContract=${row.Id}" class="btn btn-sm btn-primary" title="Chi tiết"><i class="ft-eye"></i></a>
          <a class="deleteContract btn btn-sm btn-danger" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash"></i></a>
          `
        },
        "targets": 6
      }
    ]
  });

//editContract
  $('#table-contract tbody').on('click', '.editContract', function () {
    let _this = $(this)
    let data = tableContract.row(_this.closest('tr')).data();
    $('.modal #RepresentativeName').val(data.RepresentativeName)
    $('.modal #HouseId').html("<option value='"+data.HouseId+"'>"+data.House.Name+"</option>")
    $('.modal #RepresentativeTel').val(data.RepresentativeTel)
    $('.modal #CarParkPrice').val(data.CarParkPrice)
    $('.modal #MotobikeParkPrice').val(data.MotobikeParkPrice)
    $('.modal #BikeParkPrice').val(data.BikeParkPrice)
    $('.modal #ServicePrice').val(data.ServicePrice)
    if(data.BillDateRange == 1){
      $(".modal #BillDateRangeEditFirst").attr('selected','selected')
    }
    else{
      $(".modal #BillDateRangeEditSecond").attr('selected','selected')
    }
    $('.modal #ElectricBill').val(data.ElectricBill)
    $('.modal #WaterPrice').val(data.WaterPrice)
    $('.modal #RentalFee').val(data.RentalFee)
    $('.modal #DepositMoney').val(data.DepositMoney)
    $('.modal .save-contract-data').attr('id', data.Id)
    $('.modalEdit').modal('show')
  });

  $('.save-contract-data').click(function(){
    let HouseId  = $('.modal #HouseId ').find(":selected").val()
    let RepresentativeName  = $('.modal #RepresentativeName ').val()
    let RepresentativeTel = $('.modal #RepresentativeTel').val()
    let CarParkPrice = $('.modal #CarParkPrice').val()
    let MotobikeParkPrice = $('.modal #MotobikeParkPrice').val()
    let BikeParkPrice = $('.modal #BikeParkPrice').val()
    let ServicePrice  = $('.modal #ServicePrice ').val()
    let BillDateRange = $('#BillDateRangeContract').find(":selected").val()
    let ElectricBill = $('.modal #ElectricBill').val()
    let WaterPriceType = $('#WaterPriceType').find(":selected").val()
    let Id = $(this).attr('id')
    $.post('/cms/editContract', { HouseId, RepresentativeName,RepresentativeTel,CarParkPrice,MotobikeParkPrice,BikeParkPrice,ServicePrice,ElectricBill,WaterPriceType,BillDateRange,Id }, res =>{
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
//end edit contract
//delete contract
  $('#table-contract').on('click', '.deleteContract',function(){
    let __this = $(this)
    let data = tableContract.row(__this.closest('tr')).data();
    let houseId = data.HouseId
    let id = $(this).attr('id')
    let dataId = {'id':id,houseId:houseId}
    if(confirm("Bạn có chắc chắn muốn xóa")){
        $.post('/cms/deleteContract/',dataId, function(res){
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