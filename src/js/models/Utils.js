export const logError = (err) => {
    console.log("Error Message => ", err);
}

export const buildStringFromArr = (arr) => {
    let result = "";
    let index = 0;
    if(arr.length === 0){
        result = "no info";
    } else {
        for (const item of arr) {
            result += item;
            if(index < 1 && arr.length >=2){
                result += ", ";
            }
            
            if(index > 2){
                result += "...";
                break;
            }
            
            ++index;
        }
    }
    return result;
}