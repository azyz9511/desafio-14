
// process.send('listo');
// process.on('mensaje',(cant)=>{
//     if(cant === 'start'){
//     const data = generarRandom(cant);
//     process.send(data);
//     }
// })

// function generarRandom(cantidad){
//     let cant = 0;
//     const nums = [];
//     const objNum = {};

//     cantidad ? cant = parseInt(cantidad) : cant = 100000000;

//     for (let i = 0; i < cant; i++) {
//         let num = Math.floor(Math.random() * (1001 - 1)+1);
//         nums.push(num);
//         objNum[num] ? objNum[num]++ : objNum[num] = 1;
//     }
//     // console.log(nums);
//     // console.log(objNum);
//     return objNum;
// }


// process.on('cantidad',(cant)=>{
//     const random = new Random();
//     const data = random.generarRandom(cant);
//     process.send(data);
// })








class Random{

    constructor(){
    }
    
    generarRandom(cantidad){
        let cant = 0;
        const nums = [];
        const objNum = {};

        cantidad ? cant = parseInt(cantidad) : cant = 100000000;

        for (let i = 0; i < cant; i++) {
            let num = Math.floor(Math.random() * (1001 - 1)+1);
            nums.push(num);
            objNum[num] ? objNum[num]++ : objNum[num] = 1;
        }
        // console.log(nums);
        // console.log(objNum);
        return objNum;
    }

}

module.exports = Random;