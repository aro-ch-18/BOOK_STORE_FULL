require("dotenv").config();
// const nodemailer = require("nodemailer");
// let transporter=nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     auth:{
//         user:process.env.MAIL_USER,
//         pass:process.env.MAIL_PASS
//     }
// })
const transporter=require("../config/otp")
function generateOTP() {
   
    let otp = '';

 
    const otpLength = 4;

    const characters = '0123456789';
    for (let i = 0; i < otpLength; i++) {
        
        const randomIndex = Math.floor(Math.random() * characters.length);
        
       
        otp += characters[randomIndex];
    }

    
    return otp;
}
exports.otp= async (req, res) => {
    const data = req.body;
    let otp=generateOTP()
    if (data.email) {
        try {
            // Email message setup
            const mailOptions = {
                from: process.env.EMAIL_USERNAME, // Sender email address
                to: data.email, // Receiver email address
                subject: 'OTP', // Subject line
                html: `<h1>OTP: ${otp}</h1> ` 
            //     html:`<div class="m_-6913413236621582245container"> <img src="https://ci3.googleusercontent.com/meips/ADKq_Nb1ixSLaiqLRYHl78yhq7mAoIRgokHzCErgxwDMVtf_pY4ReOLeUodj6k6fDuNHdVfdkYPqzjHzsPAADj87ALy-qm8OFODIRzqCyTwdwufy55s8qIwBIYyJiihgQQ=s0-d-e1-ft#https://dz8fbjd9gwp2s.cloudfront.net/logos/62d540c30cf29665aa092a8d.png" alt="CodeHelp Logo" class="m_-6913413236621582245logo CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 278.667px; top: 204px;"><span data-is-tooltip-wrapper="true" class="a5q" jsaction="JIbuQc:.CLIENT"><button class="VYBDae-JX-I VYBDae-JX-I-ql-ay5-ays CgzRE" jscontroller="PIVayb" jsaction="click:h5M12e; clickmod:h5M12e;pointerdown:FEiYhc;pointerup:mF5Elf;pointerenter:EX0mI;pointerleave:vpvbp;pointercancel:xyn4sd;contextmenu:xexox;focus:h06R8; blur:zjh6rb;mlnRJb:fLiPzd;" data-idom-class="CgzRE" jsname="hRZeKc" aria-label="Download attachment " data-tooltip-enabled="true" data-tooltip-id="tt-c19" data-tooltip-classes="AZPksf" id="" jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc4OTQ0ODE1NDI1NDg2NjU4MyJd; 43:WyJpbWFnZS9qcGVnIl0."><span class="OiePBf-zPjgPe VYBDae-JX-UHGRz"></span><span class="bHC-Q" data-unbounded="false" jscontroller="LBaJxb" jsname="m9ZlFb" soy-skip="" ssk="6:RWVI5c"></span><span class="VYBDae-JX-ank-Rtc0Jf" jsname="S5tZuc" aria-hidden="true"><span class="bzc-ank" aria-hidden="true"><svg viewBox="0 -960 960 960" height="20" width="20" focusable="false" class=" aoH"><path d="M480-336L288-528l51-51L444-474V-816h72v342L621-579l51,51L480-336ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72H696v-72h72v72q0,29.7-21.16,50.85T695.96-192H263.72Z"></path></svg></span></span><div class="VYBDae-JX-ano"></div></button><div class="ne2Ple-oshW8e-J9" id="tt-c19" role="tooltip" aria-hidden="true">Download</div></span></div>
            //                 <h3>Hey <span>Learner</span>,</h3>
            //                 <p>Welcome to CodeHelp. Complete your email verification by using the following One-Time
            // Password (<span class="il">OTP</span>):</p>
            //                 <a class="m_-6913413236621582245cta-button">283869</a>
            //                 <p>If you find this email in your spam/promotion folder, please click on Report Not as Spam.</p>
            //                 <p>If you encounter any issues, please raise a support ticket <a href="https://pyzzjjrx.r.ap-south-1.awstrack.me/L0/https:%2F%2Fwww.thecodehelp.in%2Fcontact/1/0109018d5659d2fb-f5c31154-1db0-412d-ac36-be34164c19f9-000000/AG_59xkfMxfmI8mqfx6jPPS9niA=139" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://pyzzjjrx.r.ap-south-1.awstrack.me/L0/https:%252F%252Fwww.thecodehelp.in%252Fcontact/1/0109018d5659d2fb-f5c31154-1db0-412d-ac36-be34164c19f9-000000/AG_59xkfMxfmI8mqfx6jPPS9niA%3D139&amp;source=gmail&amp;ust=1722431340288000&amp;usg=AOvVaw0CXQggfXDqM0px2arCfsb0" fg_scanned="1">here</a>.
            //                 </p>
            //                 <p>This is a system-generated email; please do not reply to this message.</p>
            //                 <p><strong>Happy coding!</strong></p>
            //                 <p>CodeHelp</p>
            //             </div>`  
            };

            // Send email
            await transporter.sendMail(mailOptions);

            // Response
            res.json({
                message: "Email sent successfully",
                success: true,
                pass:otp
            });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({
                message: "Failed to send email",
                success: false,
            });
        }
    } else {
        res.status(400).json({
            message: "Receiver email id missing",
            success: false,
        });
    }
};
