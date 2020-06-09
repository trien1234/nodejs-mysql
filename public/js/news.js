// $('.btnSaveNews').click(function(){
//     let Image = $('#Image').val()
//     let Title = $('#Title').val()
//     // let Content = $('#Content').val()
//     var Content = CKEDITOR.instances['Content'].getData();
//     // console.log("value",value)
//     let News = {}
//     Object.assign(News,
//         {
//             Title:Title,
//             Content:Content,
//             Image:Image
//         }
//       )
//     console.log("News",News)
//     $.post('/news/add',News,function(res){
//         if(res.data){
//             showAlert('success',res.Message)
//             // setTimeout(function(){location.href = "/cms/listHouse"},600)
//         }
//         else {
//             showAlert('failed',res.Message)
//         }
//     })
// })

// $( document ).ready(function() {
//   $('#Content').append("quote"); 
// });

let tableNews = $('#table-news').DataTable({
    "ajax": "/cms/newsList",
    'serverSide': true,
    "processing": true,
    "searching": true,
    "columns": [
        { "data": "Title" },
        { "data": "Image" },
        { "data": "IsFeatured" }
  
      ],
    "columnDefs": [
      {
        "render": function (data, type, row,recordsTotal) {
          return recordsTotal.row +1
        },
        "targets": 0  
      },
      {
        "render": function (data, type, row) {
          let Image = row.Image !== '' ? row.Image : 'N/A'
          return `<img style="width: 150px;height: auto;" src="${Image}" alt="" />`
          
        },
        "targets": 1
      },
      {
        "render": function (data, type, row) {
          // console.log("data",row) //giá trị của từng cột = row.FullName
          let Title = row.Title !== '' ? row.Title : 'N/A'
          return `<code class="text-bold">${Title}</code>`
        },
        "targets": 2
      },
      {
        "render": function (data, type, row) {
          let IsFeatured = row.IsFeatured !== '' ? row.IsFeatured : 'N/A'
          if(IsFeatured == 1){
            return `<div class="badge badge-success">Nổi bật</div>`
          }else{
            return `<div class="badge badge-danger">Tin thường</div>`
          }
          
        },
        "targets": 3
      },
      {
        "render": function (data, type, row) {
          if(row.CreatedDate != ""){
            let date = moment(row.CreatedDate).format("DD/MM/YYYY");
            return date
          } 
          else{
            return  "N/A"
          }            
        },
        "targets": 4
      },
      {
        "render": function (data, type, row) {
          return `
            <a href="javascript:void(0)"title="Sửa" id="${row.Id}" class="editNews"><i class="fas fa-edit"></i></a>
            <a class="deleteNews" href="#" id="${row.Id}" title="Xóa"><i class="fas fa-trash text-danger"></i></a>
          `
        },
        "targets": 5
      }
    ]
})

$('#table-news tbody').on('click', '.editNews', function () {
  let Id = $(this).attr('id')
  let _this = $(this)
  let data = tableNews.row(_this.closest('tr')).data();
  $('.modal #Title').val(data.Title)
  $('.modal #imgEdit').attr("src",data.Image);
  CKEDITOR.instances.ContentEdit.setData( data.Content);
  if(data.IsFeatured == 1){$("#IsFeaturedY").attr("selected","selected")}
  else {$("#IsFeaturedN").attr("selected","selected")}
  $("#form_news").attr('action', `/cms/editNews/${Id}`);
  $('.modal').modal('show')
});

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#imgEdit').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}

$('.modal #Image').change(function(){
  readURL(this);
});


// $('.save-building-data').click(function(){
//   let Title  = $('.modal #Title ').val()
//   let Image = $('.modal #Image').val()
//   let IsFeatured = $('#IsFeatured').find(":selected").val()
//   let ContentEdit = CKEDITOR.instances['ContentEdit'].getData()
//   let Id = $(this).attr('id')
//   $.post('/cms/editNews', {Title,Image,IsFeatured,ContentEdit}, res =>{
//     if (res.data){
//       $('.modal').modal('hide')
//       showAlert('success', res.Message)
//       setTimeout(function(){location.reload()}, 300)
//     }else {
//       console.log(res.Message)
//       showAlert('failed', res.Message)
//     }
//   })
// })


$('#table-news').on('click', '.deleteNews',function(){
  let id = $(this).attr('id')
  let data = {'id':id}
    if(confirm("Bạn có chắc chắn muốn xóa")){
        $.post('/cms/deleteNews/',data, function(res){
            if(res.data){
                showAlert('success',res.Message)
                setTimeout(function(){location.reload(  )},300)
            }
            else{
                showAlert('failed',res.Message)
            }
        })
    }
    return false
})