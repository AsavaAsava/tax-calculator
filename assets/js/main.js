const basicSal = document.querySelector("#salary")
const benefits = document.querySelector("#benefits")
let period 
let pensionDeduct 
let pensionRate
let nhifDeduct
let taxRelief
let totalIncome

let getData = () => {
    period = document.querySelector('input[name="period"]:checked')
    pensionDeduct = document.querySelector('input[name="pension"]:checked')
    pensionRate = document.querySelector('input[name="rates"]:checked')
    nhifDeduct = document.querySelector('input[name="insurance"]:checked')   
}


let calculatePension = (val,scheme) => {
    let pensionAmt
    if(scheme === "new"){
        if(val < 18000){
            pensionAmt = 0.06*val
        }else{
            pensionAmt = 18000*0.06
        }
    }
    else{
        pensionAmt = 200
        
    }
    return pensionAmt
    
}

let calculateInsurance = (val) => {
    let nhifAmt = 0
    if(val>1000 && val<6000){
        nhifAmt =150
    }else if(val<8000){
        nhifAmt =300
    }else if(val<12000){
        nhifAmt =400
    }else if(val<15000){
        nhifAmt =500
    }else if(val<20000){
        nhifAmt =600
    }else if(val<25000){
        nhifAmt =750
    }else if(val<30000){
        nhifAmt =850
    }else if(val<35000){
        nhifAmt =900
    }else if(val<40000){
        nhifAmt =950
    }else if(val<45000){
        nhifAmt =1000
    }else if(val<50000){
        nhifAmt =1100   
    }else if(val<60000){
        nhifAmt =1200
    }else if(val<70000){
        nhifAmt =1300
    }else if(val<80000){
        nhifAmt =1400
    }else if(val<90000){
        nhifAmt =1500
    }else if(val<100000){
        nhifAmt =1600
    }else{
        nhifAmt =1700
    }

    return nhifAmt
}

let calculateTax = (taxPeriod,taxableAmount) => {
    let tax =0
    let taxed =0
    if(taxPeriod === "month"){
        if(taxableAmount<12999){
            tax += (0.1*(parseFloat(taxableAmount)-taxed))
        }else if((taxableAmount-taxed)>0){
            tax += (0.1*12998)
            taxed += 12998
        }
        if((taxableAmount-taxed)<=11587){
            tax += (0.2*(taxableAmount-taxed))
        }else if((taxableAmount-taxed)>0){
            tax += (0.2*11587)
            taxed += 11587
        }
        if((taxableAmount-taxed)<=11587){
            tax += (0.25*(taxableAmount-taxed))
        }else if((taxableAmount-taxed)>0){
            tax += (0.25*11587)
            taxed += 11587
        }
        if((taxableAmount-taxed)>0){
            tax += (0.3*(taxableAmount-taxed))
        }

        taxRelief = 24000
    }else{
        if(taxableAmount<147581){
            tax += (0.1*(parseFloat(taxableAmount)-taxed))
        }else if((taxableAmount-taxed)>0){
            tax += (0.1*147580)
            taxed += 147580
        }
        if((taxableAmount-taxed)<=139043){
            tax += (0.2*(taxableAmount-taxed))
        }else if((taxableAmount-taxed)>0){
            tax += (0.2*139043)
            taxed += 139043
        }
        if((taxableAmount-taxed)<=139043){
            tax += (0.25*(taxableAmount-taxed))
        }else if((taxableAmount-taxed)>0){
            tax += (0.25*139043)
            taxed += 139043
        }
        if((taxableAmount-taxed)>0){
            tax += (0.3*(taxableAmount-taxed))
        }

        taxRelief = 28800
     }
    return tax
}


document.querySelector("#calculateBtn").addEventListener("click",()=>{
    getData();
    console.log(pensionDeduct.value)
    document.querySelector("#totalIncome").textContent = "KSH. "+basicSal.value
    let totalPension = 0
    if(pensionDeduct.value === "yes"){
        totalPension=(calculatePension(parseFloat(basicSal.value),pensionRate.value))
    }
    document.querySelector("#nssf").textContent = "KSH. "+totalPension.toFixed(2)
    document.querySelector("#sal-pension").textContent = "KSH. "+(parseFloat(basicSal.value)-totalPension).toFixed(2)
    document.querySelector("#benefitAmt").textContent = "KSH. "+(parseFloat(benefits.value)).toFixed(2)
    totalIncome = (parseFloat(basicSal.value) + parseFloat(benefits.value)- totalPension)
    document.querySelector("#tax-income").textContent = "KSH. "+totalIncome.toFixed(2)
    let grossPAYE = calculateTax(period.value,totalIncome)
    document.querySelector("#total-tax").textContent = "KSH. "+grossPAYE.toFixed(2)
    document.querySelector("#tax-relief").textContent = "KSH. "+taxRelief.toFixed(2)
    let netPaye = grossPAYE-taxRelief
    if(netPaye<0){netPaye=0}
    document.querySelector("#tax-min-relief").textContent = "KSH. "+netPaye.toFixed(2)
    document.querySelector("#net-paye").textContent = "KSH. "+netPaye.toFixed(2)
    let sal =totalIncome-netPaye
    document.querySelector("#pay-tax").textContent = "KSH. "+sal.toFixed(2)
    let insuranceAmt = 0
    if(nhifDeduct.value === "yes"){
        insuranceAmt = calculateInsurance(sal)
    }
    document.querySelector("#nhif-contribution").textContent = "KSH. "+insuranceAmt.toFixed(2)
    let finalResult = sal-insuranceAmt
    document.querySelector("#net-pay-final").textContent = "KSH. "+finalResult.toFixed(2)
})

basicSal.addEventListener("click",()=> {
    basicSal.value = ""
})
benefits.addEventListener("click",()=> {
    benefits.value = ""
})

