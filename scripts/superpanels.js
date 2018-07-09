var panels;

window.onload = function(e){
  
  panels = document.querySelectorAll('.superpanel');
  
  show_btns = document.querySelectorAll('.show');
  hide_btns = document.querySelectorAll('.hide');
  hideall_btns = document.querySelectorAll('.hideall');
  
  for (var i = 0; i < show_btns.length; i ++){
    show_btns[i].addEventListener('click', show);
  }
  
  for (var i = 0; i < hide_btns.length; i ++){
    hide_btns[i].addEventListener('click', hide);
  }
  
  for (var i = 0; i < hideall_btns.length; i ++){
    hideall_btns[i].addEventListener('click', hideAll);
  }
  
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
  for (var i = 0; i < panels.length; i++){
    if (panels[i].contains(this)){
      toggleShow(panels[i + 1], i + 1);
      stackIn(panels[i], 10, i);
    } else {
      toggleShow(panels[0]);
      toggleSection('visible');
    }
  }
}

function hide(e){
  for (var i = 0; i < panels.length; i++){
    if (panels[i].contains(this)){
      toggleHide(panels[i]);
      stackOut(panels[i], 10, i);
    }
  }
}

function hideAll(e){
  stackOutAll();
}

function toggleHide(node){
  node.classList.add('hidden');
}

function toggleShow(node, index){
  node.classList.remove('hidden');
}

function queueIn(obj, spacing, index){
  
  var w = obj.getBoundingClientRect().width;
  
  var offset = (window.innerWidth / 2) - ((w + spacing) * (index + 1));
  for (var i = 0; i <= index; i++){
    panels[i].style.left = offset + ((w + spacing) * (i)) + "px";
  }
}

function queueOut(obj, spacing, index){
  var w = obj.getBoundingClientRect().width;
  ////var offset = (window.innerWidth / 2);
  ////obj.style.left = offset + "px";

  var offset = (window.innerWidth / 2) - ((w + spacing) * (index + 1));

  for (var i = 0; i <= index; i++){
    panels[i].style.left = offset + ((w + spacing) * (i)) + "px";
  }
}

function stackIn(obj, spacing, index){
  var w = obj.getBoundingClientRect().width;
  
  var offset = window.innerHeight - (w/4 - (spacing * (index + 1)));
  
  panels[index].style.top = offset + "px";
  panels[index].style.transform = "translate(-50%, 0) rotate(0deg)";

  obj.classList.add("stack");
}

function stackOut(obj, spacing, index){
  var w = obj.getBoundingClientRect().width;
  
  obj.style.top = "50%";
  obj.style.transform = "translate(-50%, -50%) rotate(0deg)";

  obj.classList.remove("stack");
  
  if (index > 0){
    panels[index - 1].style.top = "50%";
    panels[index - 1].style.transform = "translate(-50%, -50%) rotate(0deg)";
  }
  
}

function stackOutAll(){
  for (var i = 0; i < panels.length; i++){
    panels[i].classList.add('hidden');
    stackOut(panels[i], 10, i);
    toggleSection('hidden');
  }
}

function toggleSection (state){
  var section = document.querySelector('.supersection');
  section.style.visibility = state;
}