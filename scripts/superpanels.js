var panels;
var offsets = [];

window.onload = function(e){
  
  panels = document.querySelectorAll('.superpanel');
  
  show_btns = document.querySelectorAll('.show');
  hide_btns = document.querySelectorAll('.hide');
  
  for (i = 0; i < show_btns.length; i ++){
    show_btns[i].addEventListener('click', show);
  }
  
  for (i = 0; i < hide_btns.length; i ++){
    hide_btns[i].addEventListener('click', hide);
  }
}

function show(e){
  for(i = 0; i < panels.length; i++){
    if (panels[i].contains(this)){
      toggleShow(panels[i + 1]);
      shiftLeft(panels[i], 10, i);
    } else {
      toggleShow(panels[0]);
    }
  }
}

function hide(e){
  for(i = 0; i < panels.length; i++){
    if (panels[i].contains(this)){
      for (j = i; j < panels.length; j++){
        toggleHide(panels[j]);
        if (j > 0){
          shiftright(panels[j-1]);
        }
      }
    }
  } 
}

function toggleHide(node){
  node.classList.add('hidden');
}

function toggleShow(node){
  node.classList.remove('hidden');
}

function shiftLeft(obj, spacing, index){
  var w = obj.getBoundingClientRect().width;

  var offset = (w * (index + 1)) + w/2 + (spacing * (index + 1));
  //var offset = (w) + w/2 + (spacing * (index + 1));
  offsets.push(offset);
  
  console.log(offset);
  console.log(offsets);
  obj.style.transform = "translateX(-" + offset + "px) rotate(0deg)";
  
  /*
  if (index == 0){
    var offset = (1.5 * w) + spacing + "px";
    panels[index].style.transform = "translateX(-" + offset + ") rotate(0deg)";
  }else{
    var offset = ((index + 1) * w) + (w/2) + spacing * (index + 1);
    for (i = 0; i <= index; i++){
      console.log(offset * i);
      panels[i].style.transform = "translateX(-" + offset + "px) rotateZ(0deg)";
    }
  }
  */
}

function shiftright(obj){
  var w = obj.getBoundingClientRect().width;
  var offset = -50 + "%";
  obj.style.transform = "translateX(" + offset + ") rotate(0deg)";
}