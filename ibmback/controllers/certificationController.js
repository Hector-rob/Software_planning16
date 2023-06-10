
var Certifications = require('../models/certification');

var csv = require('csvtojson');

const CsvParser = require('json2csv').Parser;

const importCertification = async(req,res) =>{
    try{

        var certificationData = [];
        csv()
        .fromFile(req.file.path)
        .then(async(response) =>{
            for(var x = 0; x < response.length; x++){
                certificationData.push({
                    uid: response[x].uid,
                    department: response[x].org,
                    work_location: response[x].work_location,
                    certification_name: response[x].certification,
                    issue_date: response[x].issue_date,
                    type: response[x].type
                });


            }
            await Certifications.insertMany(certificationData)
            console.log(response);

        });
        res.send({status: 200, success:true, msg:'Csv imported' })


    } catch(error){
        res.send({status: 400, success:false, msg:error.message })

    }
}


const exportCertification= async(req,res) =>{
    try{

        let certificationsArr = [];

        var certificationsData = await Certifications.find({})

        certificationsData.forEach((certification => {
            const {id,uid, department,work_location, certification_name, issue_date, type} = certification;

            certificationsArr.push({uid, department,work_location, certification_name, issue_date, type});

        }));
        console.log(certificationsArr);
        res.send(certificationsArr)
        
        // const csvFields = ['uid', 'department','work_location','certification_name','issue_date','type'];
        // const csvParser = new CsvParser({ csvFields});
        // const csvData = csvParser.parse(certificationsArr);
        

        // res.setHeader("Content-Type","text/csv");
        // res.setHeader("Content-Disposition","text/attatchment: filename=certificationsData.csv");
        // res.status(200).end(csvData);



    } catch(error){
        res.send({status: 400, success:false, msg:error.message })


    }
}

module.exports = {
    importCertification,
    exportCertification
}