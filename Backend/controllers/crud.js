
const Job = require("../models/jobMode") ;
const Applic = require("../models/ApplyForJob") ;
const Users= require("../models/UsersModel") ;
const jwt =require('jsonwebtoken') ;
const Secret=process.env.JWT_SECRET



const GetMyPostedJobs = async (req,res)=>{

    try{


        const token = req.header("Authorization") ;
        let data =jwt.verify(token,Secret) ;

        if(data) {

        const jobs = await Job.find({IdOfCompany:data.id}, { CompanyPhoto:1 ,nameOfJob:1 ,Disc :1 ,Location:1}) ;
        res.status(200).json(jobs) ;  }
    }
    catch(error){
        res.status(500).send("error") ;
        console.log(error) ;
    }

}

const GetAllJobs = async (req,res)=>{

    try{

        const jobs = await Job.find({},{Applicants:0 ,IdOfCompany:0  ,__v:0 }) ;
        res.status(200).json(jobs) ;
    }
    catch(error){
        res.status(500).send("error") ;
        console.log(error) ;
    }

}


const GetApplicants = async (req,res)=>{

    try{

        const JobId=req.params.id ;
        const token = req.header("Authorization") ;

        let data =jwt.verify(token,Secret) ;
       

        if(data) {

        const job = await Applic.find({jobId:JobId})
        
    
            if(job){
         return res.status(200).json(job) ;  }


        res.status(404).json("no applicants");


    
    }

}

    catch(error){
        res.status(500).send("error ):") ;
        console.log(error) ;
    }

}



const Applications = async (req,res)=>{

    try{

        const token = req.header("Authorization") ;
        let data =jwt.verify(token,Secret) ;

        if(data){

        const AppliedJobs = await Applic.find({applicantId:data.id},{jobId:1 ,_id:0}).populate({

            path: 'jobId',
            select: 'nameOfJob Disc Location nameOfCompany CompanyPhoto',
        }) ;
        
        res.status(200).json(AppliedJobs) ; }
    }
    catch(error){
        res.status(500).send("error") ;
        console.log(error) ;
    }

}






module.exports ={GetAllJobs , GetMyPostedJobs, Applications , GetApplicants } ;