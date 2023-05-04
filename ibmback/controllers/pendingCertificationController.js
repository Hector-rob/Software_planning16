
var pendingCertifications = require('../models/pendingCertification');

var csv = require('csvtojson');


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

module.exports = {
    importPendingCertification

}