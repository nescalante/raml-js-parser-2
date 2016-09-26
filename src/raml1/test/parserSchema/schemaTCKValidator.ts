/// <reference path="../../../../typings/main.d.ts" />
var fs = require("fs");
var ZSchema=require("z-schema");

import testUtil = require("../test-utils")

var jsonSchemaPath: string = "../parserSchema/schema.json";
var jsonSchema:string;

validateDir(testUtil.data("TCK/RAML10"));

function validateDir(path: string){
    if (fs.statSync(path).isDirectory()){
        fs.readdirSync(path).forEach(file=>{
            validateDir(path+"/"+file);
        });
    }else if (fs.statSync(path).isFile()){
        if (path.lastIndexOf("-tck.json")>-1 && path.lastIndexOf("Invalid-tck.json")==-1)
            validateJSON(path);
    }
}

function validateJSON(path: string){

    var validator = new ZSchema();
    var content = fs.readFileSync(path).toString();
    if (!jsonSchema)
         jsonSchema = fs.readFileSync(testUtil.data(jsonSchemaPath)).toString();

    //validator.setRemoteReference("parserSchema", JSON.parse(jsonSchema) || {})
    var valid = validator.validate(JSON.parse(content), JSON.parse(jsonSchema));

    var errors = validator.getLastErrors();
    if ( valid !== true) {
        console.log(" errors: " + path);
    } else
        console.log("ok: " + path);

}