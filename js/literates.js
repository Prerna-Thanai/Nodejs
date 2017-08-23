    let count = 0;								//declaring the variables
    let agegroup=[], literates=[];    
    let temp='';
    let value=[0,0,0,0,0,0,0,0,0,0];
    let name=[];
    let male=[], female=[];
    let state=[];
    let namings=[];
    let Indian1 = [], Indian2 = [], Indian3 = [];
    const readline = require('readline')
    const fs = require('fs')
    const rl = readline.createInterface({
      input: fs.createReadStream('India2011.csv','utf-8')		//reading the csv file line by line
  })
    let myWriteStream = fs.createWriteStream('Literates.json')	//writing the data for Literates.json
    let myWriteStream3 = fs.createWriteStream('Graduate.json')	//writing the data for Graduate.json
    let myWriteStream2 = fs.createWriteStream('Education.json')	//writing the data for Education.json
    rl.on('line', (line) => {
        count++;
        line.split('\n')
        let array = line.split(',');		//spliting the line by , and line
        if(count==1){
            let i=0,j=0;
            for(i=15;i<=42;i+=3){  
                name[j]=array[i];
                j++;
            }
        }else if(temp != array[3] && array[4] === 'Total'){		//if condition to match state value and total value
            let j=0;                    
            for(i=15;i<=42;i+=3){
                value[j]+=parseInt(array[i]);
                temp=array[3];
                j++;                        
            }
        }
        if(array[5]!="All ages" && array[5]!="Age-group"){		//if condition to leave first 2 lines of the data
            let age=array[5];
            let value=parseInt(array[12]);    			//parsing the values of csv
            let a=literates.indexOf(age);				//finding the index of particular data
            if(a!=-1){
                agegroup[a]+=value;						//adding data in array
            }else{
                literates.push(age);
                agegroup.push(value);
            }
        }
        if(state.find(x=>x===array[3])===undefined && array[4] === 'Total'){	//if condition to filter states
            let k=0;
            male[k]=parseInt(array[40]);
            female[k]=parseInt(array[41]);
            state[k]=array[3];
            k++;
            for(k in state){
            Indian3.push({			//pushing data in array in for json
                "State" : state[k],
                "Male": male[k],
                "Female": female[k]
            });
        }                        
    }
});
rl.on('close', function(){                            //Close function to end the readstream of data.
    for(l in literates){   
        Indian1.push({
            "Agegroup" : literates[l],                             //Push values of properties in array
            "Literate" : agegroup[l]
        }) 
    }
    for(j in name){
        Indian2.push({
            "Level" : name[j],                                   //Push values in array
            "Population": value[j]
        }) ;
    }
        myWriteStream.write(JSON.stringify(Indian1,null,3));      //write the json file Literates using stringyfy
        myWriteStream2.write(JSON.stringify(Indian2,null,3));     //write the json file for Education using stringyfy
        myWriteStream3.write(JSON.stringify(Indian3,null,3));     //write the json file for Gradutes using stringyfy
    });