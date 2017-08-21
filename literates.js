let count = 0, count2=0;
    let agegroup=[], literates=[];    
    let temp='';
    let value=[0,0,0,0,0,0,0,0,0,0];
    let name=[], male=[], female=[], state=[];
    let employee1 = {}, employee2 = {}, employee3 = {};
    const readline = require('readline')
    const fs = require('fs')
    const rl = readline.createInterface({
      input: fs.createReadStream('India2011.csv','utf-8')
    })
    let myWriteStream = fs.createWriteStream('Literates.json')
    let myWriteStream3 = fs.createWriteStream('Graduate.json')
    let myWriteStream2 = fs.createWriteStream('Education.json')
    rl.on('line', (line) => {
        count++;
        count2++;
        if(count2==1){
        line
        .split('\n')
        let array = line.split(',');
            let i=0,j=0;
            for(i=15;i<=42;i+=3){  
                name[j]=array[i];
                j++;
            }
            }else{
                       line
        .split('\n')
        let array = line.split(',');
                if(temp != array[3] && array[4] === 'Total'){
                    let j=0;                    
                    for(i=15;i<=42;i+=3){
                        value[j]+=parseInt(array[i]);
                        temp=array[3];
                        j++;                        
                    }
                }
if(array[5]!="all ages"){
            let age=array[5];
            let value=parseInt(array[12]);
            let a=literates.indexOf(age);
            if(a!=-1){
                agegroup[a]+=value;
            }else{
                literates.push(age);
                agegroup.push(value);
            }
}
        if(state.find(x=>x===array[3])===undefined && array[4] === 'Total'){
                        let k=0;
                            male[k]=parseInt(array[40]);
                            female[k]=parseInt(array[41]);
                            state[k]=array[3];
                            k++;
                            employee3[state] = employee3[state] || [];
                employee3[state].push({
                    "Male Graduate": male,
                    "Female Graduate": female
                }) 
                        }                        
}
});
rl.on('close', function(){
for(l in literates){
        employee1[literates[l]] = employee1[literates[l]] || [];
                    employee1[literates[l]].push({
                        "Literate " : agegroup[l]
                        }) 
 }
myWriteStream.write(JSON.stringify(employee1,null,3));
for(j in name){
            employee2[name[j]] = employee2[name[j]] || [];
            employee2[name[j]].push({
                "Total population": value[j]
            }) ;
        }
        myWriteStream2.write(JSON.stringify(employee2,null,3));
        myWriteStream3.write(JSON.stringify(employee3,null,3));
    });