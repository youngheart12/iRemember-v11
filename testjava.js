var promise=new Promise(function (resolve,reject)
{
var x="hello world";
var y="hello world";
if(x===y)
{
resolve();
}else{
reject();
}
});
promise.then(function(){
console.log("success");
}).catch(function(){
console.log("failed");
})
