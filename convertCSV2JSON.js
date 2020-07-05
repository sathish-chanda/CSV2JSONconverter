const fs = require('fs')
const path = require('path')
const readline = require('readline')
const convertCSV2JSON = (CSVfilename = 'customer-data.csv') => {
      console.log('Starting the converstion ......')
      try
      {
         fs.unlinkSync('customer-data.json')
      }
      catch(error)
      {
        //file does not exist
      }
      var headings = null;
      var isFirstLine = true;
      var index;
      var counter = 0
      const lineWriter = fs.createWriteStream('customer-data.json', {
        flags : 'a'
      })

      const lineReader = readline.createInterface({
        input: fs.createReadStream(CSVfilename)
      })   
      lineReader.on('line',(line) => {
          if(isFirstLine){
            headings = line.split(',')
            isFirstLine = false;
            lineWriter.write('[\n')
          }
          else
          {
            var record = line.split(',')
            lineWriter.write('\t{\n')
            for(index = 0; index < record.length-1;index++)
            lineWriter.write("\t  \""+headings[index] +"\""+ ": " +"\""+record[index]+"\""+',\n')
            lineWriter.write("\t  \""+headings[index] +"\""+ ": " +"\""+record[index]+"\""+'\n')
            if(counter==1000)
            lineWriter.write('\t}\n')
            else  
            lineWriter.write('\t},\n')
          }
          counter++;
        })
      lineReader.on('close',()=>{
          lineWriter.write(']\n')
          //process.exit(0)
      })
}

convertCSV2JSON('customer-data.xls')