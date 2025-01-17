const { patientChartLogger } = require('../../../Logger/ChartLogger'); 
const Script_Error = require('../../../Script_Error/Script_Error');

const patientRequired=async(page,document_type,browser,req,res)=>{

    
    const documentFirstLetter = document_type.charAt(0);

    const fileSelected=await page.waitForSelector('.textnode')
    if(!fileSelected){
        patientChartLogger.error('PatientRequired Selected Error Acquired...');
    }else {
        try {
            const errorMsg = await Script_Error(page);
            if (errorMsg) {
                patientChartLogger.error(`PatientRequired Page: ${errorMsg}`);
                await browser.close();
                return res.status(404).json({ message: "PatientRequired error found", data: errorMsg });

            }
            patientChartLogger.info('Selecting PatientRequired...');
        } catch (error) {
            console.log("Error:",error)
            return res.status(500).json({ message: "Error in PatientRequired function" });

        }
    }
    await page.keyboard.type(documentFirstLetter, { delay: 3000 });
    patientChartLogger.info(`PatientRequired: ${documentFirstLetter} Selected Successfully...`);
}

module.exports=patientRequired