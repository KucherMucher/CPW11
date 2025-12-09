document.querySelector('button[name="calc"]').addEventListener('click', calculate);

function calculate(){
    let inputValue = document.getElementById('calc_input').value;
    console.log(inputValue);

    let operrators = [];

    let stupid_array = []; // 0 - inpuValue, 1 - operrators
    stupid_array = detect_operator(inputValue) //gets the list
    
    //distribuate the valles
    inputValue = stupid_array[0] 
    console.log(inputValue)

    operrators = stupid_array[1]
    console.log(operrators)

    op_poss = stupid_array[2]
    console.log(op_poss)

    
    let values = []
    values = get_values(inputValue) //get the vallues
    console.log(values)

    let calc1 = 0
    let calc2 = 0
    let calc3 = 0
    if (operrators.includes("(")){ //calculate first importance values
        let calc_array = calculate_1stvalues(values, opperators, op_poss)
    }

    else if (operrators.includes("*") || operrators.includes("/")){ //calculcate second importance values
        let calc_array = calculate_2ndvalues(values, opperators, op_poss)
    }

    else{
        calc3 = calculate_3rdvalues(values, operrators, op_poss)
    }

    finalCalc = calc3;

    return alert(finalCalc);
    
}

function detect_operator(string){ //returns opperators strings in one string array adn deletes them from the main string
    let operrators = [];
    let newString = "";
    let positions = [];
    for(let i=0; i<string.length; i++){
        if (string[i] == '+' || string[i] == '-' || string[i] == '/' || string[i] == '*' || string[i] == '(' || string[i] == ')'){ //detection
            positions.push(i+1) //saves positions of opperators (because of paranteces)
            operrators.push(string[i]); //saves opperators
            newString+="_" //you cant modify string in sertain positions in js, so create a new string to switch to
        }
        else{
            newString+=string[i]; //saves the numeric references
        }
    }
    return [newString, operrators, positions]; //returns in a list of arrays 
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

function calculate_1stvalues(values, opperators, op_poss){
    let startPos, endPos;
    let sum = 0;
    for(let i=0; i<=string.length; i++){
        if (opperators[i] == '('){startPos = i}
        else if (opperators[i] == ')'){endPos = i}
    }

    if (operrators.includes("*") || operrators.includes("/")){ //calculcate second importance values
        let auxcalc = calculate_2ndvalues(values, opperators, op_poss)

        for (let i=startPos; i<=endPos; i++){ // modify
            if (opperators[i]=='+'){
                sum = sum + (values[i-1]+values[i+1])
            }

            else if (opperators[i]=='-'){
                sum = sum + (values[i-1]-values[i+1])
            }
        }
    }

    else{
        sum = calculate_3rdvalues(values, opperators, op_poss, startPos, endPos)
    }
    values[starPos] = sum // save the sum in the parenteces position

    opperators.splice(startPos, 1)
    opperatros.splice(endPos, 1)
    //                                              
    opperators.splice(startPos+1, endPos-startPos) 
    console.log(values, "removed rest parenteces values")
    return [values, opperators, op_poss, calc]

}

function calculate_2ndvalues(values, opperators, op_poss){

}

function calculate_3rdvalues(values, operators, op_poss, startPos = 0, endPos = opperators.length) { //bug : 1+1+1 gives 4, and so on
    let sum = Number(values[0]); // Start with the first value
    
        for (let i = startPos; i <= endPos; i++) {
            if (operators[i] == '+') {
                sum += Number(values[i+1]);
            } else if (operators[i] == '-') { // 3 + (7 + 7)
                sum -= Number(values[i+1]);   // 0    1   2
            }//                                  3 +  14
        }//                                      0    1
    
    
    return sum;
}

/*
if(values.length == 2){

}
    else if(values.lenght == 2){
        alert("só único número")
    }*/


