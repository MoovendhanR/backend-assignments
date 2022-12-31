const fs=require("fs")


fs.readFile("./text.txt",{encoding:"utf-8"},(err,data)=>{
if(err){
console.log("Cannot read the file")
console.log(err)
} else {
console.log(data)
}
})
console.log("Bye Guys!!")


// fs.unlink("text.txt", function (err) {
//     if (err) throw err;
//     // if no error, file has been deleted successfully
//     console.log('File deleted!');
// });

fs.appendFile("./new.txt", "\nThis is me third time wrinting in the file\n",(err)=>{
if(err){
console.log("Cannot be appended")
console.log(err)
} else {
console.log("Data has been appended in the file")
}
})

fs.writeFile("./test.txt", "This is me first time wrinting in the file", (err)=>{
    if(err){
    console.log("Cannot write in the file")
    console.log(err)
    } else {
    console.log("Data has been written in the file")
    }
    })
    

