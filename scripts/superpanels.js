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
      stackIn(panels[i], 10, i);
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
          stackOut(panels[j-1], 10, j);
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

function queueIn(obj, spacing, index){
  
  var w = obj.getBoundingClientRect().width;
  
  var offset = (window.innerWidth / 2) - ((w + spacing) * (index + 1));
  
  for(i = 0; i <= index; i++){
    panels[i].style.left = offset + ((w + spacing) * (i)) + "px";
  }
}

function queueOut(obj, spacing, index){
  var w = obj.getBoundingClientRect().width;
  ////var offset = (window.innerWidth / 2);
  ////obj.style.left = offset + "px";

  var offset = (window.innerWidth / 2) - ((w + spacing) * (index + 1));

  for(i = 0; i <= index; i++){
    panels[i].style.left = offset + ((w + spacing) * (i)) + "px";
  }
}

function stackIn(obj, spacing, index){
  var w = obj.getBoundingClientRect().width;

  //var offset = (w * (index + 1)) + w/2 + (spacing * (index + 1));
  var offset = 300 + (spacing * (index + 1));
  
  obj.style.transform = "translate(-50%, " + offset + "px) rotate(0deg)";
  obj.classList.add("stack");
}

function stackOut(obj){
  var w = obj.getBoundingClientRect().width;
  var offset = -50 + "%";
  obj.style.transform = "translateX(" + offset + ") rotate(0deg)";
  obj.classList.remove("stack");
}