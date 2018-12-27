import tinycolor2 from 'tinycolor2';

function getRandomHexColor(){
    return tinycolor2.random().toHexString();
}

function getComplimentaryHexColor(hexString){
    return tinycolor2(hexString).complement().toHexString();
}

export {
    getRandomHexColor,
    getComplimentaryHexColor
}