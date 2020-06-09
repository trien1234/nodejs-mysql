activeMenu()
let table = $('#table-posts').DataTable({
  "ajax": "/admin/list-posts",
  "columns": [
    { "data": "fullname" },
    { "data": "post" },
    { "data": "likeCount" },
    { "data": "likeCount" },
    { "data": "likeCount" },

    // { "data": "user.images" },
  ],
  "columnDefs": [
    {
      // The `data` parameter refers to the data for the cell (defined by the
      // `data` option, which defaults to the column being worked with, in
      // this case `data: 0`.
      "render": function (data, type, row) {
        if (row.images && row.images.length > 0) {
          return "<button type='button' class='btn btn-info btn-min-width mr-1 mb-1 view-images'>View</button>"
        } else {
          return ""
        }
      },
      "targets": 2
    },
  ]
});


const openPhotoSwipe = function (images) {
  let pswpElement = document.querySelectorAll('.pswp')[0];

  let items = images.map(e => {
    return {
      src: "/images/posts/" + e,
      w: 0,
      h: 0
    }
  })

  // define options (if needed)
  var options = {
    // history & focus options are disabled on CodePen        
    history: false,
    focus: false,

    showAnimationDuration: 0,
    hideAnimationDuration: 0

  };

  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.listen('imageLoadComplete', function (index, item) {
    if (item.h < 1 || item.w < 1) {
      let img = new Image()
      img.onload = () => {
        item.w = img.width
        item.h = img.height
        gallery.invalidateCurrItems()
        gallery.updateSize(true)
      }
      img.src = item.src
    }
  })
  gallery.init();
}

$('#table-posts tbody').on('click', '.view-images', function () {
  var data = table.row($(this).closest('tr')).data();
  openPhotoSwipe(data.images || [])
});

