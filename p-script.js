var input = document.getElementById('input');
var output = document.getElementById('output');

var IN;
var input_txt;
var loop;
document.getElementById('clear').addEventListener("click",()=>{
     
    input.value="";
})
     

function copy(){
    var copyText=output;
    
  copyText.setSelectionRange(0, 99999);

    
  navigator.clipboard.writeText(copyText.value);
  document.getElementById("copy_ms").style.display="block";
  setTimeout(() => {
    document.getElementById("copy_ms").style.display="none";
  },  2000);
}

function call() {
    if(input.value!="")
    {
    input_txt=input.value;
    if(input_txt.includes("switch")){
        alert("Sorry!😔 It seems your code contains switch case, Switch case to psuedo code is in under development.");
        return;
    }
     input_txt= input_txt.replaceAll("{",";");
     input_txt= input_txt.replaceAll("}",";");
     input_txt= input_txt.replaceAll("\n","");
     input_txt= input_txt.replaceAll("\t","");
    //  input_txt= input_txt.replaceAll("++)",";");
    //  input_txt= input_txt.replaceAll("--)",";");
    IN =  input_txt.split(";");
    
    output.value = "";
     
    
    IN.forEach(element => {
        element=element.replaceAll("\n","");
        element=element.replaceAll("\t","");
        if(element.length<=2){
            return;
        }
        if(((element.includes("void")&&element.includes("(")&&element.includes(")"))||(element.includes("void")&&element.includes("(")&&element.includes(")")))||(element.includes("int ")&&element.includes("(")&&element.includes(")"))||(element.includes("int ")&&element.includes("(")&&element.includes(")"))||(element.includes("char ")&&element.includes("(")&&element.includes(")"))||(element.includes("char ")&&element.includes("(")&&element.includes(")")))
        {

            output.value = output.value +"\r\nProcedure "+ element+"{\r\n";
            return;
        }
        if(element.includes("return"))
        {
         output.value = output.value +"\r\n"+ element+"\r\n";
         return;
        }
        if(element.includes("(")&&element.includes(")"))
        {
            if(element.includes("\"")||element.includes("<")||element.includes(">")||element.includes("!")||element.includes("==")||element.includes("="))
            {

            }
            else{ output.value = output.value +"\r\ncall "+ element+"\r\n";
            return;}
           
        }
        
        

        if(element.includes("if"))
        {
           
            If(element);
            return;
        }
        if(element.includes("else"))
        {
            Else(element);
            return;
        }

        if (element.includes("printf")) {
            printf(element);
            return;
        }
        if (element.includes("scanf")) {
            scanf(element);
            return;
        }
        if (element.includes("int")  || element.includes("float")  || element.includes("char") ) {
            datatype(element);
            return;
        }
         
        if (element.includes("for")) {
            For(element);
            loop = "for";
            return;
        }
        if (element.includes("while")) {
            
            
            output.value = output.value +"\r\n"+ element+"\r\n";
            return;
        }
         if(element.includes("do"))
         {
            output.value = output.value + element+"{\r\n";
         }
        if (element.includes("=")) {
            if (loop != "for"||loop !="while") {
                equal(element);
                return;
            }
        

        }

        if (element.includes("<") || element.includes("==") || element.includes(">") || element.includes("!")) {
            conditional(element);
            return;
        }
          
       

        
       output.value = output.value +"\r\n"+ element;
      
    });
    output.value = output.value +"\r\n}";
    }
}
var i;
function datatype(element) {

    output.value = output.value + "Declare ";
    element = element.trim();


    output.value = output.value + element + "\r\n";
}
function equal(element) {
     
    if (loop != "for") {
        output.value = output.value + "\r\nSet ";
        if (element.includes("\n"))
        element=element.replaceAll("\n","");
        element=element.trim();
            output.value = output.value + element.substring("0") + "\r\n";
    }
    if(loop=="for")
    {

        element=element.replaceAll("+","");
        element=element.replaceAll("\n","");
        element=element.replaceAll(")","");
        
        output.value = output.value + element.substring("1") + "\r\n";

    }
}
function printf(element) {
    output.value = output.value + "Display ";
    element = element.replaceAll("\n", "");
    if (!(element.includes("%"))) {
        output.value = output.value + "the string ";
        var line = element.trim();
         
        output.value = output.value + line.substring(7,line.length-1);
        // for (i = 7; i < element.length; i++) {
            
        //     if (line.charAt(i) != "(" && line.charAt(i) != ")" && line.charAt(i) != "\"") {
        //         output.value = output.value + line.charAt(i);
        //     }
        // };
    }
    else {
        output.value = output.value + "the value of ";
        element=element.replace("\"","");
        var line = element.trim();
        var ind=line.indexOf("\"");
        console.log(ind);
        output.value = output.value + line.substring(ind+2,line.length-1);
        // for (i = ind+2; i < element.length; i++) {
            
        //     console.log(line);
        //     if (line.charAt(i) != "(" || line.charAt(i) != ")" || line.charAt(i) != "\"") {
        //         output.value = output.value + line.charAt(i);
        //     }
        // };
    }

    output.value = output.value + "\r\n";
}
function scanf(element) {
    output.value = output.value + "Read ";
    var element = element.trim();
    element=element.replaceAll("%d","");
    var line = element.trim();
    var ind=line.indexOf("\"");
    console.log(ind);
    output.value = output.value + line.substring(ind+4,line.length-1);
    // for (i = 11; i < element.length; i++) {

    //     if (element.charAt(i) != "(" && element.charAt(i) != ")" && element.charAt(i) != "\"" && element.charAt(i) != "&") {
    //         output.value = output.value + element.charAt(i);
    //     }
    // };
    output.value = output.value + " from user ";
    output.value = output.value + "\r\n";

}


function For(element) {
    element = element.trim();
    element = element.replace(" ", "");
    element = element.replace("(", " ");
    element = element.replace("=", " from ");
    output.value = output.value + element + " to ";
}

function conditional(element) {
    if (loop == "for") {
        output.value = output.value + element;
    }
    
    output.value = output.value + "\r\n";
    loop="";
}

function If(element){
    element=element.trim();
    output.value = output.value + element + " Then,";
    output.value = output.value + "\r\n";
    
}
function Else(element){
    element=element.trim();
    output.value = output.value + element + " Then,";
    output.value = output.value + "\r\n";
}
