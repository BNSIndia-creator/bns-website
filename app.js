
document.addEventListener('contextmenu', e=>e.preventDefault());
document.onkeydown=function(e){
 if(e.ctrlKey && (e.key==='u'||e.key==='c'||e.key==='s')) return false;
}
