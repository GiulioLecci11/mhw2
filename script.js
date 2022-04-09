function displayResult(){
    for (const div of divs){
    div.removeEventListener('click',marked);
    }
    const res= document.querySelector('.result');
    const title=res.querySelector('h1');
    const par=res.querySelector('p');
    let choice;
        if((selectedImages[0].dataset.choiceId==selectedImages[1].dataset.choiceId) || (selectedImages[0].dataset.choiceId==selectedImages[2].dataset.choiceId)){
            choice=selectedImages[0].dataset.choiceId;
        }
        else if(selectedImages[2].dataset.choiceId==selectedImages[1].dataset.choiceId){
            choice=selectedImages[2].dataset.choiceId;
        }
        else{
           for(const img of selectedImages){
                if(img.dataset.questionId=="one"){
                    choice= img.dataset.choiceId;
                }
            }
        }
    title.textContent=RESULTS_MAP[choice].title;
    par.textContent=RESULTS_MAP[choice].contents;
    res.classList.remove('hidden');
}
function reset(){
    for (const div of divs){
        div.addEventListener('click',marked);
        div.querySelector('.checkbox').src='images/unchecked.png';
        div.classList.remove('discarded');
        div.classList.remove('selected');
    }
    selectedImages.length=0;
    const res= document.querySelector('.result');
    const title=res.querySelector('h1');
    const par=res.querySelector('p');
    title.innerHTML="";
    par.innerHTML="";
    res.classList.add('hidden');
}
function demarked(img){
    img.classList.add('discarded');
    img.classList.remove('selected');
    img.querySelector('.checkbox').src='images/unchecked.png';
    let temp=selectedImages.indexOf(img);
    selectedImages.splice(temp,1);
}
function marked(event){
    let f_equal=0;
    const sel=event.currentTarget;
    for(const img of selectedImages){
        if ((img.dataset.questionId== sel.dataset.questionId) && (img.dataset.choiceId== sel.dataset.choiceId)){
            f_equal=1;
        }
        if((img.dataset.questionId== sel.dataset.questionId) && (img.dataset.choiceId!= sel.dataset.choiceId)){
            demarked(img);
        }
    }
    if(f_equal!=1){
        sel.classList.remove('discarded');
        sel.classList.add('selected');
        sel.querySelector('.checkbox').src='images/checked.png';
        selectedImages.push(sel);
        for(const div of divs){
            if((div.dataset.questionId== sel.dataset.questionId) && (div.dataset.choiceId!= sel.dataset.choiceId)){
                div.classList.add('discarded');
            }
        }
    }
    if(selectedImages.length==3)
        displayResult();
}

const selectedImages =[];
const divs= document.querySelectorAll('.choice-grid div');
for (const div of divs){
    div.addEventListener('click',marked);
}
document.querySelector('#reset').addEventListener('click',reset);