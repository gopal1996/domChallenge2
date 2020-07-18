var activeColor = "#5170ff";
function GeneratePixelArt(row, col, enableDrag = true) {
  this.row = row;
  this.col = col;
  this.enableDrag = enableDrag;
  this.generategrid(this.row,this.col)
  this.generateColorGrid(this.row)
  this.bindEvent();
  if(this.enableDrag) {
    this.dragPixel();
  }
}

GeneratePixelArt.prototype.generateColorGrid = function(row) {
  let parentElement = document.querySelector('.parent')
  let frag = document.createElement('div');
  frag.classList.add('color')
  
  for(let i=0; i< row;i++) {
    let rowbox = document.createElement('div');
    let colorcode = this.getRandomColor()
    let att = document.createAttribute("data-val");
    att.value = `${colorcode}`;
    rowbox.setAttributeNode(att);
    rowbox.setAttribute("style", `background-color:${colorcode}; padding: 2rem;`);
    frag.appendChild(rowbox)
  }
  parentElement.appendChild(frag)
}

GeneratePixelArt.prototype.generategrid= function(row, col) {
  let parentElement = document.querySelector('.parent')
  let frag = document.createDocumentFragment();
  for(let i=0;i< row;i++) {
    let rowbox = document.createElement('div')
    rowbox.classList.add('row')
    for(let j=0;j<col;j++) {
      let colBox = document.createElement('div');
      let att = document.createAttribute("data-val");
      att.value = `col-${i}:${j}`;
      colBox.setAttributeNode(att)
      colBox.classList.add(`col-${i}:${j}`)
      rowbox.appendChild(colBox)
    }
    frag.appendChild(rowbox)
  }
  parentElement.appendChild(frag)
}

GeneratePixelArt.prototype.bindEvent= function() {
  document.querySelector('.parent').addEventListener('click', function(event){
    let selectedElement = event.target.dataset['val']
    if(selectedElement !== undefined) {
      console.log(selectedElement)
      if(selectedElement.slice(0,1) === "#") {
        activeColor = selectedElement;
      } else {
        document.querySelector(`[data-val='${selectedElement}']`).style.backgroundColor = `${activeColor}`;
      }
    }
  })
}

GeneratePixelArt.prototype.getRandomColor= function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

GeneratePixelArt.prototype.dragPixel= function() { 
  document.querySelector('.parent').addEventListener('mouseover', function(event){
    let selectedElement = event.target.dataset['val']
    if(selectedElement !== undefined) {
      console.log(selectedElement)
      if(selectedElement.slice(0,1) === "#") {
        activeColor = selectedElement;
      } else {
        document.querySelector(`[data-val='${selectedElement}']`).style.backgroundColor = `${activeColor}`;
      }
    }
  })
}
/*
param:
row - number of row
col - number of col
enableDrag - if you want drag feature pass true..By default true
*/

new GeneratePixelArt(5,5,false)