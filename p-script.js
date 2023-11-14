var input = document.getElementById('input');
var output = document.getElementById('output');

var IN;
var input_txt;
var loop;
function call() {
    input_txt=input.value;
     input_txt= input_txt.replaceAll("{",";");
     input_txt= input_txt.replaceAll("}",";");
    IN =  input_txt.split(";");
    
    output.value = "";
    console.log(IN);

    IN.forEach(element => {

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
        if (element.includes("=")) {
            if (loop != "for") {
                equal(element);
                return;
            }

        }

        if (element.includes("<") || element.includes("==") || element.includes(">") || element.includes("!")) {
            conditional(element);
            return;
        }
         


    });

}
var i;
function datatype(element) {
    output.value = output.value + "Declare ";
    element = element.trim();


    output.value = output.value + element + "\r\n";
}
function equal(element) {
     
    if (loop != "for") {
        output.value = output.value + "Set ";
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
