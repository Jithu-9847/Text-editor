const fileSelector=document.querySelector("input");
const btn=document.querySelector('button');
const img=document.querySelector('img');
const text=document.querySelector('textarea');

fileSelector.onchange = () => {
    var file = fileSelector.files[0]
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
    img.src = imgUrl
    img.style.display="block";
     
}

btn.onclick=()=>{

    const rec=new Tesseract.TesseractWorker();
    rec.recognize(fileSelector.files[0])
    .progress(function (response) {
        if(response.status == 'recognizing text'){
            text.innerText="recognizing text..."
        }else{
            
        }
    })
    .then(function (data) {
        text.innerHTML = data.text
         
    })
}