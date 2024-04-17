const nodeMailer = require('nodemailer')

const sendEmail = async ({email , subject , message})=> {

    try{
        const transporter = nodeMailer.createTransport({
            host : process.env.EMAIL_HOST,
            port : process.env.EMAIL_PORT,
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASSWORD
            }

            
        })
    
        const mailOptions = {
            from : 'support<AVSECOMMERCE@AVS.com>',
            to : email,
            subject : subject,
            text : message
        }
    
       await transporter.sendMail(mailOptions)
        
    }

    catch(err) {
        console.log(err)
    }
    


}

module.exports = sendEmail