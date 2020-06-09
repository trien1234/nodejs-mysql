// $(function() {

//     var countries = [
//         { Name: "", Id: 0 },
//         { Name: "United States", Id: 1 },
//         { Name: "Canada", Id: 2 },
//         { Name: "United Kingdom", Id: 3 },
//         { Name: "France", Id: 4 },
//         { Name: "Brazil", Id: 5 },
//         { Name: "China", Id: 6 },
//         { Name: "Russia", Id: 7 }
//     ];

//     $("#attend_1").jsGrid({
//         height: "70%",
//         width: "100%",
//         filtering: true,
//         sorting: true,
//         paging: true,
//         autoload: true,
//         pageSize: 10,
//         pageButtonCount: 5,
//         controller: {
//             loadData: function(filter) {
//                 return $.ajax({
//                     type: "GET",
//                     url: "/admin/get-attend-report-auto",
//                     data: filter
//                 });
//             },
//         },
//         fields: [
//             { name: "Lớp", type: "text", width: 150 },
//             { name: "Số HS", type: "number", width: 50, filtering: false },
//             { name: "HS lên xe tới trường", type: "number", width: 50 },
//             { name: "HS xuống xe tới trường", type: "number", width: 50 },
//             { name: "HS vào trường", type: "number", width: 50 },
//             { name: "HS ra khỏi trường", type: "number", width: 50 },
//             { name: "HS vào lớp", type: "number", width: 50 },
//             { name: "HS ra khỏi lớp", type: "number", width: 50 },
//             { name: "HS lên xe về nhà", type: "number", width: 50 },
//             { name: "HS xuống xe về nhà", type: "number", width: 50 },
//             { name: "Ngày", type: "select", items: days, valueField: "Id", textField: "Day" },
//         ]
//     });
    
// });

activeMenu()

// $.fn.DataTable.ext.pager.numbers_length = 5;
let tableReport = $('#table-report').DataTable({
  "ajax": "/admin/total-report",
  'serverSide': true,
  "processing": true,
  "pageLength": 100,
  "columns": [
    { "data": "student" },
    { "data": "time" },
    { "data": "type" },
    { "data": "status" }
  ],
  "columnDefs": [
    {
      "render": function (data, type, row) {
        let student = row.student !== '' ? row.student[0].fullname : 'N/A'
        return student
      },
      "targets": 0
    },
    {
      "render": function (data, type, row) {
        let time = row.time !== '' ? new Date(row.time) : 'N/A'
        return time.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      },
      "targets": 1
    },
    {
      "render": function (data, type, row) {
        let typeAtt = row.type !== '' ? row.type : 'N/A'
        return typeAtt
        
      },
      "targets": 2
    },
    {
      "render": function (data, type, row) {
        let status = row.status !== '' ? row.status : 'N/A'
        return status
        
      },
      "targets": 3
    },
    {
      "render": function (data, type, row) {
        return `
          <a href="http://165.22.108.71:8880/checkout?${row.student[0].cardid}" id="${row.student[0].cardid}" target="_blank" title="Checkout"><i class="fas fa-edit checkout"></i></a>
        `
        // <a href="javascript:void(0)" id="${row._id}" title="Xóa"><i class="fas fa-trash del-teacher"></i></a>
      },
      "targets": 4
    },
  ]
});

$('#classFilter').on('change', function(e) {
  let classId = $(this).val()
  tableReport.ajax.url( "/admin/total-report?classId=" + classId ).load();
})

$('#musterToday').on('change', function(e) {
  let checked = $(this).is(':checked')
  let classId = $('#classFilter').val()
  let date = ''
  if (checked) {
    date = moment().format('DD/MM/YYYY')
  }
  tableReport.ajax.url(`/admin/total-report?classId=${classId}&date=${date}`).load();
})

