    let count = 0;
    let agegroup=[], literates=[];    
    let temp='';
    let value=[0,0,0,0,0,0,0,0,0,0];
    let name=[];
    let male=[], female=[];
    let state=[];
    let namings=[];
    let employee1 = [], employee2 = [], employee3 = [];
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
        line.split('\n')
        let array = line.split(',');
        if(count==1){
            let i=0,j=0;
            for(i=15;i<=42;i+=3){  
                name[j]=array[i];
                j++;
            }
        }else if(temp != array[3] && array[4] === 'Total'){
            let j=0;                    
            for(i=15;i<=42;i+=3){
                value[j]+=parseInt(array[i]);
                temp=array[3];
                j++;                        
            }
        }
        if(array[5]!="All ages" && array[5]!="Age-group"){
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
for(k in state){
            employee3.push({
                "State" : state[k],
                "Male Graduate": male[k],
                "Female Graduate": female[k]
            });
        }                        
    }
    });
rl.on('close', function(){                            //Close function to end the readstream of data.
        for(l in literates){   //Create object for Literates.json
            employee1.push({
            "Age-group" : literates[l],                             //Push values of properties in object
                "Literate " : agegroup[l]
            }) 
        }
        for(j in name){
            employee2.push({
            "Education Level" : name[j],                                   //Push properties in object
                "Total population": value[j]
            }) ;
        }
        myWriteStream.write(JSON.stringify(employee1,null,3));      //write the json file Literates using stringyfy
        myWriteStream2.write(JSON.stringify(employee2,null,3));     //write the json file for Education using stringyfy
        myWriteStream3.write(JSON.stringify(employee3,null,3));     //write the json file for Gradutes using stringyfy
    });