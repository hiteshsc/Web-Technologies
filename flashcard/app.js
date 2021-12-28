let btn = document.querySelector('#submit');
let addQue = document.querySelector('#addQue');
addQue.addEventListener('click', function(){
    this.style.setProperty('display', 'none');
    document.querySelector('#inp').style.setProperty('display', 'block', 'important');
})
let colors = ['primary', 'secondary', 'info', 'danger', 'dark'];
let i=0;
btn.addEventListener('click', function(){
   let que =  document.querySelector('#question').value;
   let ans =  document.querySelector('#answer').value;
   let card = `<div class="col-xl-3 col-md-4 col-sm-6">
                    <div class="card bg-${colors[i]} text-white" >
                        <div class="card-body" >
                            <h5 id="que-statement" class="card-title border-bottom pb-2 show">
                                ${que}
                            </h5>
                            <input id="editQue" type="text" class="form-control border-bottom mb-3 hide d-none">
                            <p id="ans-statement" class="card-text overflow-auto show" style="height:150px">
                                ${ans}
                            </p>
                            <textarea class="form-control mb-3 hide d-none" id="editAns" cols="30" rows="4"></textarea>
                            <div class="btns d-flex justify-content-between">
                                <button class="btn btn-warning col-5 show" id="edit" onclick="edit(this)">Edit</button>
                                <button class="btn btn-warning col-12 hide d-none" id="save" onclick="save(this)">Save Changes</button>
                                <button class="btn btn-warning col-5 show" id="delete" onclick="del(this)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>`
   document.querySelector('#flashcards').innerHTML += card;
  
   document.querySelector('#question').value = "";
   document.querySelector('#answer').value = "";
  
   i = (i+1)%5;

   addQue.style.setProperty('display', 'block');
   document.querySelector('#inp').style.setProperty('display', 'none', 'important');
})

function edit(param){
    let cardbody = param.parentElement.parentElement;
    let showed = cardbody.querySelectorAll('.show');   
    showed.forEach(element => {
        element.style.display = "none";
    });

    // let hidden = cardbody.querySelectorAll('.hide').style.setProperty('display', 'block', 'important');
    let hidden = cardbody.querySelectorAll('.hide');
    hidden.forEach(element => {
        element.style.setProperty('display', 'block', 'important');
    });
    cardbody.querySelector('#editQue').value = cardbody.querySelector("#que-statement").innerHTML.trim();
    cardbody.querySelector('#editAns').value = cardbody.querySelector("#ans-statement").innerHTML.trim();
}

function save(param){
    let cardbody = param.parentElement.parentElement;
    let showed = cardbody.querySelectorAll('.show');
    cardbody.querySelector('#que-statement').innerHTML = cardbody.querySelector("#editQue").value;
    cardbody.querySelector('#ans-statement').innerHTML = cardbody.querySelector("#editAns").value;
    showed.forEach(element => {
        element.style.display = "block";
    });
    let hidden = cardbody.querySelectorAll('.hide');
    hidden.forEach(element => {
        element.style.setProperty('display', 'none', 'important');
    });
}

function del(param){
    param.parentElement.parentElement.parentElement.parentElement.remove();
}
