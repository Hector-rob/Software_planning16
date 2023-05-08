
var pendingCertifications = require('../models/pendingCertification');

var csv = require('csvtojson');

const CsvParser = require('json2csv').Parser;


const importPendingCertification = async(req,res) =>{
    try{

        var pendingCertificationData = [];
        csv()
        .fromFile(req.file.path)
        .then(async(response) =>{
            for(var x = 0; x < response.length; x++){
                pendingCertificationData.push({
                    uid: response[x].uid,
                    department: response[x].org,
                    work_location: response[x].work_location,
                    certification_name: response[x].certification,
                    issue_date: response[x].issue_date,
                    type: response[x].type
                });


            }
            await pendingCertifications.insertMany(pendingCertificationData)
            console.log(response);

        });
        res.send({status: 200, success:true, msg:'Csv imported' })


    } catch(error){
        res.send({status: 400, success:false, msg:error.message })

    }
}

const exportPendingCertification= async(req,res) =>{
    try{

        let pendingCertificationsArr = [];

        var pendingCertificationsData = await pendingCertifications.find({})

        pendingCertificationsData.forEach((pendingCertification => {
            const {id,uid, department,work_location, certification_name, issue_date, type} = pendingCertification;

            pendingCertificationsArr.push({uid, department,work_location, certification_name, issue_date, type});

        }));
        console.log(pendingCertificationsArr);
        res.send(pendingCertificationsArr)
        
        // const csvFields = ['uid', 'department','work_location','certification_name','issue_date','type'];
        // const csvParser = new CsvParser({ csvFields});
        // const csvData = csvParser.parse(pendingCertificationsArr);
        

        // res.setHeader("Content-Type","text/csv");
        // res.setHeader("Content-Disposition","text/attatchment: filename=pendingCertificationsData.csv");
        // res.status(200).end(csvData);



    } catch(error){
        res.send({status: 400, success:false, msg:error.message })


    }
}

module.exports = {
    importPendingCertification,
    exportPendingCertification

}