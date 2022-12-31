const add=(a,b)=>{
    console.log(a+b);
}

const sub=(a,b)=>{
    console.log(a-b);
}

const mult=(a,b)=>{
    console.log(a*b);
}

const div=(a,b)=>{
    console.log(a/b);
}

const getCircleY=(radians, radius)=>{
    console.log(Math.sin(radians) * radius)
}
  
const getCircleX=(radians, radius)=>{
    console.log(Math.sin(radians) * radius)
}
  
const getTanFromDegrees=(degrees)=>{
    console.log(Math.tan(degrees * Math.PI / 180))
  }
  
const getRandom=(min, max)=>{
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(Math.floor(Math.random() * (max - min) + min))
}

module.exports={add,sub,mult,div,getCircleX,getCircleY,getTanFromDegrees,getRandom}