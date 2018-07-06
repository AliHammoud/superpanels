var panels;

window.onload = function(e){
  
  panels = document.querySelectorAll('.superpanel');
  
  show_btns = document.querySelectorAll('.show');
  hide_btns = document.querySelectorAll('.hide');
  
  for (i = 0; i < panels.length; i ++){
    console.log(panels[i])
  }
  
  for (i = 0; i < show_btns.length; i ++){
    show_btns[i].addEventListener('click', show);
    console.log(show_btns[i]);
  }
  
  for (i = 0; i < hide_btns.length; i ++){
    hide_btns[i].addEventListener('click', hide);
    console.log(hide_btns[i]);
  }

  
}

function show(e){
  console.log('### show');
  for(i = 0; i < panels.length; i++){
    if (panels[i].contains(this)){
      panels[i + 1].classList.remove('hidden');
    } else {
      panels[0].classList.remove('hidden');
    }
  } 
}

function hide(e){
  console.log('## hide');
  for(i = 0; i < panels.length; i++){
    if (panels[i].contains(this)) panels[i].classList.add('hidden');
  } 
}