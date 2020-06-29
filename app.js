var fs = require("fs");
const { off } = require("process");
var customer = fs.readFileSync("customer.json");
var transaction = fs.readFileSync("transaction.json");
var offer = fs.readFileSync("offer.json");

var jsonoffer = JSON.parse(offer);
var jsontransaction= JSON.parse(transaction);
var jsoncustomer = JSON.parse(customer)

let isCodeApplicable  =()=>{
    if(jsontransaction.channel==jsonoffer.termsFilter.channel[0]||jsontransaction.channel==jsonoffer.termsFilter.channel[1]){
        console.log("Rule 1 paased ")
        if (jsonoffer.termsFilter.transTypeCode[0]||jsonoffer.termsFilter.transTypeCode[1]||jsonoffer.termsFilter.transTypeCode[2]||jsonoffer.termsFilter.transTypeCode[3]==jsontransaction.transTypeCode){
            console.log("Rule 2 passed")

            if (jsonoffer.termsFilter.customerCategory[0] || [1]==jsoncustomer.customerCategory){
                console.log("Rule 3 passed ")
                if (jsonoffer.termsFilter.currency[0].currCode||jsonoffer.termsFilter.currency[1].currCode||jsonoffer.termsFilter.currency[1].currCode||jsonoffer.termsFilter.currency[2].currCode==jsontransaction.currency){
                    console.log("Rule 4 passed")
                    if (jsonoffer.minMaxAmountType == "LCY"){
                        // if (jsontransaction.lcyAmount<=jsonoffer.maxnimumINRAmount  && jsontransaction.lcyAmount>=jsonoffer.minimumINRAmount){
                            // console.log('rule 5 passed') // (Ignored because there is no selectedOfferCode.minimumLCYAmount ) 
                            if (jsonoffer.minMaxAmountType=='FCY'){
                                if (jsonoffer.currency=='USD'){
                                    if (jsonoffer.termsFilter.currency[0].minAmount>=jsontransaction.lcyAmount<=jsonoffer.termsFilter.currency[0].maxAmount){
                                        console.log("Rule 6 passed")    
                                    }
                                }
                                else if (jsonoffer.currency=='EUR'){
                                    if (jsonoffer.termsFilter.currency[1].minAmount>=jsontransaction.lcyAmount<=jsonoffer.termsFilter.currency[1].maxAmount){
                                        console.log("Rule 6 passed")    
                                    }
                                }
                                else if (jsonoffer.currency=='GPB'){
                                    if (jsonoffer.termsFilter.currency[2].minAmount>=jsontransaction.lcyAmount<=jsonoffer.termsFilter.currency[2].maxAmount){
                                        console.log("Rule 6 passed") //Rule 6 cannot get passed as if there is not minmum and max amount the amount is blank  

                                    }
                                }
                                if (jsontransaction.transDate<=jsonoffer.endDateTime && jsontransaction.transDate <= jsonoffer.startDateTime){
                                    console.log("rule 7 passed")
                                    if(jsoncustomer.usedCodes[0].usedCount<=jsonoffer.maximumUsagePerCustomer){
                                        console.log("rule 8 passed")
                                      }


                                }

                                
                            }
                        // }

                    }



                }else{
                    console.log("Rule 4 Failed Availabe currency:"+jsonoffer.termsFilter.currency)
                }
            }
            else{
                console.log("Rule 3 Failed Availbe CustomerCategory :"+jsonoffer.termsFilter.customerCategory)
            }
        }else{
            console.log("rule 2 Available type Code :"+jsonoffer.termsFilter.transTypeCode)
        }
    }
    else{
        console.log("Rule 1 Failed  avaibale channel :"+jsonoffer.termsFilter.channel)
    }

}

isCodeApplicable()

var jsonData = '{"isCodeApplicable":[{"requestID":"1","codeType":"D","vaildFor":"RC","codeName":"STUDENT"}]}';
 
// parse json
var jsonObj = JSON.parse(jsonData);
//console.log(jsonObj);
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
//console.log(jsonContent);
 
fs.writeFile("output.json", jsonContent,  function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
