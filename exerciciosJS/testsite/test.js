document.querySelector('button[name="calc"]').addEventListener('click', calculate);

function calculate(){
    let inputValue = document.getElementById('calc_input').value;
    console.log(inputValue);

    let operrators = [];

    let stupid_array = []; // 0 - inpuValue, 1 - operrators
    stupid_array = detect_operator(inputValue)
    
    
    inputValue = stupid_array[0]
    console.log(inputValue)

    operrators = stupid_array[1]
    console.log(operrators)

    op_poss = stupid_array[2]
    console.log(op_poss)

    
    let values = []
    values = get_values(inputValue)
    console.log(values)

    
    
}

function detect_operator(string){
    let operrators = [];
    let newString = "";
    let positions = [];
    for(let i=0; i<string.length; i++){
        if (string[i] == '+' || string[i] == '-' || string[i] == '/' || string[i] == '*' || string[i] == '(' || string[i] == ')'){
            positions.push(i+1)
            operrators.push(string[i]);
            newString+="_"
        }
        else{
            newString+=string[i];
        }
    }
    return [newString, operrators, positions];
}

function get_values(string){
    string+='_'
    let newString = [];
    let value = "";
    for(let i=0; i<=string.length; i++){
        if (string[i] == '_'){
            if (value == ""){
                continue;
            }
            newString.push(value);
            value="";
        }

        else{
            value+=string[i];
        }
    }

    return newString;

}



