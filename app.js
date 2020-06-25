var fs = require("fs");
var customer = fs.readFileSync("customer.json");
var transaction = fs.readFileSync("transaction.json");
var offer = fs.readFileSync("offer.json");

var jsonoffer = JSON.parse(offer);
var jsontransaction= JSON.parse(transaction);
var jsoncustomer = JSON.parse(customer)

let isCodeApplicable  =()=>{
    if (jsonoffer.availableOfferCodes[0].startDateTime==jsontransaction.transDate){
      console.log('rule 1 passed')
      if (jsontransaction.transTypeCode=='SVC-R'){
        console.log("rule 2 passed ")
        if (jsonoffer.availableOfferCodes[0].termsFilter.customerCategory=='SENIOR CITIZEN'||'WEALTH CUSTOMER' ||'STUDENT'||'EMPLOYEE'){
          console.log('rule 3 passed')
          if (jsontransaction.currency== 'USD'||'EUR'||'GBP'){
            console.log("rule 4 passed")
            if (jsonoffer.availableOfferCodes[0].minMaxAmountType||jsonoffer.availableOfferCodes[1].minMaxAmountType||jsonoffer.availableOfferCodes[2].minMaxAmountType||jsonoffer.availableOfferCodes[3].minMaxAmountType=='LCY'){
              if (jsontransaction.lcyAmount>=jsonoffer.availableOfferCodes[0].minimumINRAmount||jsonoffer.availableOfferCodes[1].minimumINRAmount ||jsonoffer.availableOfferCodes[2].minimumINRAmount ||jsonoffer.availableOfferCodes[3].minimumINRAmount && jsontransaction.lcyAmount<=jsonoffer.availableOfferCodes[0].maximumINRAmount||jsonoffer.availableOfferCodes[1].maximumINRAmount||jsonoffer.availableOfferCodes[2].maximumINRAmount||jsonoffer.availableOfferCodes[3].maximumINRAmount){
                console.log('rule 5 passed')
              }
              else{
                return false;
              }
             

              if (jsonoffer.availableOfferCodes[0].minMaxAmountType=='FCY'){
                if (jsontransaction.lcyAmount >= jsonoffer.availableOfferCodes[0].termsFilter.currency[0].minAmount && jsontransaction.lcyAmount<= jsonoffer.availableOfferCodes[0].termsFilter.currency[0].maxAmount){
                  console.log("rule 6 passed")
                  if(jsoncustomer.usedCodes[0].usedCount<=jsonoffer.availableOfferCodes[0].maximumUsagePerCustomer){
                    console.log("rule 8 passed")
                  }
                  else{
                    console.log("offer already used by customer")
                  }


                }
                else{
                  console.log("rule 6 failed not in range")
                }
              
              }
            }
            else{
              console.log('rule 5 failed')
            }
          }
          else{
            console.log("rule 4 failed ")
          }
        }
        else{
          console.log("Rule 3 failed not in offer category")
        }
      }
      else{
        console.log('Rule 2 fail')
      }
    }
    else{
      console.log("rule 1 failed"+jsontransaction.transDate)
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
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});