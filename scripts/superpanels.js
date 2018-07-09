var panels;
var offsets = [];

window.onload = function(e){
  
  panels = document.querySelectorAll('.superpanel');
  
  show_btns = document.querySelectorAll('.show');
  hide_btns = document.querySelectorAll('.hide');
  hideall_btns = document.querySelectorAll('.hideall');
  
  for (i = 0; i < show_btns.length; i ++){
    show_btns[i].addEventListener('click', show);
  }
  
  for (i = 0; i < hide_btns.length; i ++){
    hide_btns[i].addEventListener('click', hide);
  }
  
  for (i = 0; i < hideall_btns.length; i ++){
    hideall_btns[i].addEventListener('click', hideAll);
  }
  
  var im = document.getElementById('im');
  im.style.width = im.parentElement.style.width;
  im.style.height = im.style.width;
  
  var ctx = document.getElementById('myChart');
  ctx.style.width = ctx.parentElement.style.width;
  ctx.style.height = 300 + "px";
  
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['win', 'lose'],
      datasets: [{
        label: '% probability',
        data: [2.31, 97.69],
        backgroundColor: [
          'rgba(51, 153, 51, 0.5)',
          'rgba(255, 102, 102, 0.5)'
        ]
      }]
    }
  });
  
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

function hideAll(e){
  stackOutAll();
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
  var offset = window.innerHeight/1.75 + (spacing * (index + 1));
  
  obj.style.transform = "translate(-50%, " + offset + "px) rotate(0deg)";
  obj.classList.add("stack");
}

function stackOut(obj){
  var w = obj.getBoundingClientRect().width;
  var offset = -50 + "%";
  obj.style.transform = "translateX(" + offset + ") rotate(0deg)";
  obj.classList.remove("stack");
}

function stackOutAll(){
  var offset = -50 + "%";
  for (i = 0; i < panels.length; i++){
    panels[i].style.transform = "translateX(" + offset + ") rotate(0deg)";
    panels[i].classList.remove("stack");
    panels[i].classList.add("hidden");
  }
}