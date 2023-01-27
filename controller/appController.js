const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const {EMAIL,PASSWORD} = require('../env.js')

;
const getBill = (req,res)=>{

    const {userEmail} = req.body;

    let config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: "https://mailgen.js/"
        }
    })

    let response = {
        body: {
            name: "Prashant Pandey",
            intro: "Your bill has arrived!",
            table: {
                data : {
                    item : "N160 Spare Parts",
                    description: "A BackSide Kit..",
                    price: "$39.99"
                }
            },
            outro: "Looking forword to do Bussiness"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        from : EMAIL,
        to: userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error =>{
        return res.status(500).json({error})
    })
    //res.status(201).json("getbill Successfully");
}

module.exports = {
    //signup,
    getBill
}