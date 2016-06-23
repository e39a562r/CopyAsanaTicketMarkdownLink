function bindGrid(dom) {
  if (dom.copyModified) return;
  dom.copyModified = true
  dom.addEventListener('copy', function(e) {
    var tickets = []
    var selected = document.getElementsByClassName('grid-row-selected')
    for (var i = 0; i < selected.length; i ++) {
      var d = selected[i]
      var id = d.id.split('_').pop()
      var url = location.href.toString().replace('list', id)
      var val = d.getElementsByTagName('textarea')[0].value
      tickets.push({url: url, value: val})
    }
    var str = tickets.map(function(item){return '- [' + item.value + '](' + item.url + ')'}).join("\n")
    e.clipboardData.setData("text/plain", str)
    e.preventDefault()
    e.stopPropagation()

    console.log("=== COPY ===\n", str)
  })
}

function waitGrid() {
  if(window.grid) {
    if ( grid.length) {
      for (var i = 0; i < grid.length; i ++) bindGrid(grid[i])
    } else {
      bindGrid(grid)
    }
  } 

  return setTimeout(waitGrid, 2000)
}

waitGrid()