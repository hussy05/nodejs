const  nodemailer = require("nodemailer");

exports.sendEmail = async (emailTo,subject,name,id,password) =>  {
    //send email
    if(emailTo){
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'ask@ezpick.co', // generated ethereal user
                pass: 'rRBQE8npvUVWhMfb', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"EZPick" < ask@ezpick.co>', // sender address
            to: emailTo, // list of receivers
            subject: subject+" ✔", // Subject line
            html: `<style>
                      html,
                      body {
                        margin: 0 auto !important;
                        padding: 0 !important;
                        height: 100% !important;
                        width: 100% !important;
                        background: #f1f1f1;
                      }
                    
                      /* What it does: Stops Outlook from adding extra spacing to tables. */
                      table,
                      td {
                        mso-table-lspace: 0pt !important;
                        mso-table-rspace: 0pt !important;
                      }
                    
                      /* What it does: Fixes webkit padding issue. */
                      table {
                        border-spacing: 0 !important;
                        border-collapse: collapse !important;
                        table-layout: fixed !important;
                        margin: 0 auto !important;
                      }
                    
                    </style>
                    
                    <!-- CSS Reset : END -->
                    <div style="width: 100%;margin: 0 auto;background-color: #2f4d33;" align="center">
                      <div style="padding-top: 40px; padding-bottom: 40px;">
                        <div
                          style="width: 93%; margin: 0 auto; padding-top: 0px; background-color: #ffffff;border-radius: 10px;height: 90%;">
                      <!-- BEGIN BODY -->
                    
                      <table width="80%" style="background-color: #ffffff; " align="center">
                        <tr>
                          <td>
                            <!-- Nested table for background image -->
                            <table
                              align="center"
                            >
                              <tr style="">
                                <td align="center">
<!--                                   <img-->
<!--                                    src="https://ezpick.s3.us-east-1.amazonaws.com/schools/1681797724716.jpg"-->
<!--                                    alt=""-->
<!--                                    style="margin-top: 8%; width: 40%;display:block;"-->
<!--                                  />-->
                                  
                                  <!-- <img
                                    src=""
                                    alt=""
                                    width="700px"
                                    height="1px"
                                  /> -->
                                </td>
                                 
                              </tr>
                              <tr style="margin: 0 auto">
                              <td style="height: 30%; width: 100%" align="center">
                                <!-- <img
                                  src="https://ezpick.s3.us-east-1.amazonaws.com/schools/1689679900281.png"
                                  alt=""
                                  style="width: 50px;display: inline-block;margin-top:5%"
                                /> -->
                               
                               
                                <p
                                  style="
                                    color: #3e8048;
                                    font-family: Bebas Neue;
                                    font-size: 12px;
                                    font-style: normal;
                                    font-weight: 600;
                                    line-height: normal;
                                    letter-spacing: 1.56px;
                                    display: inline-block;
                                    vertical-align: top;
                                    margin: 0;
                                    margin-top:5%;
                                  "
                                >
                                  WE ARE GLAD YOU ARE HERE
                                  <br />
                                  <span
                                    style="
                                      color: #3e8048;
                                      text-align: center;
                                      font-family: Urbanist;
                                      font-size: 40px;
                                      font-style: normal;
                                      font-weight: 600;
                                      line-height: normal;
                                      margin: 0;
                                    "
                                  >
                                    Welcome to the
                                  </span>
                                  <br />
                                  <img
                                    src="https://ezpick.s3.us-east-1.amazonaws.com/schools/1689679808272.png"
                                    alt=""
                                    style="width: 50%; margin-top: 5%"
                                  />
                                </p>
                           
                               
                                <!-- <img
                                  src="https://ezpick.s3.us-east-1.amazonaws.com/schools/1689679900281.png"
                                  alt=""
                                  style="width: 50px; display: inline-block;margin-top:5%"
                                /> -->
                          
                       </tr>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #2a7936;
                                    font-family: Urbanist;
                                    font-size: 30px;
                                    font-style: normal;
                                    font-weight: 600;
                                    line-height: normal;
                                    letter-spacing: 1px;
                                    text-transform: capitalize;
                                  "
                                >
                                  hi (${name}),
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #000;
                                    font-family: Urbanist;
                                    font-size: 22px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                  "
                                >
                                  We’re excited to have you on board!
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #7f7f7f;
                                    text-align: center;
                                    font-family: Urbanist;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 400;
                                    line-height: 1.6em;
                                  "
                                  align="center"
                                >
                                  Children world and Ezpick with together to give parents <br />
                                  a hassle-free way to pick up their children.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #2f4d33;
                                    font-family: Urbanist;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: 700;
                                    line-height: normal;
                                    text-transform: uppercase;
                                  "
                                >
                                  here is your account detail
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                            <table style=" border-radius: 20px;border: 2px solid #2f4d33;width:35%">
                            
                            <tr>
                                <td>
                                <p  style="
                                    color: #000;
                                    text-align: center;
                                    font-family: Urbanist;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                    letter-spacing: 1.68px;
                                    padding: 1.1em;
                                    height: 0vh;
                                    margin-top: 0
                                  ">
                                  Username:
                                </p>
                                </td>
                                    <td >
                                    <p style="color: #000;
                                    text-align: center;
                                    font-family: Urbanist;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                    letter-spacing: 1.68px;
                                    margin-right:10px">
                                    ${id}
                                    </P>
                                    </td>
                            </tr>
                            <tr>
                                <td>
                              <p  style="
                                    color: #000;
                                    text-align: center;
                                    font-family: Urbanist;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                    letter-spacing: 1.68px;
                                    padding: 1.1em;
                                    height: 0vh;
                                    margin-top: 0
                                  ">
                                 Password:
                                </p>
                                </td>
                                    <td>
                                            <p style="color: #000;
                                  text-align: center;
                                  font-family: Urbanist;
                                  font-size: 18px;
                                  font-style: normal;
                                  font-weight: 500;
                                  line-height: normal; 
                                  letter-spacing: 1.68px;
                                  margin-right:10px">
                                    ${password}
                                    </P>
                                    </td>
                            </tr>
                            </table>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #353cf4;
                                    font-family: Urbanist;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: 600;
                                    line-height: normal;
                                    letter-spacing: 1.16px;
                                    text-decoration-line: underline;
                                  "
                                >
                                  support@ezpick.com
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #808080;
                                    font-family: Urbanist;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                    letter-spacing: 1.92px;
                                    text-transform: capitalize;
                                  "
                                >
                                  Thank you,
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <p
                                  style="
                                    color: #808080;
                                    font-family: Urbanist;
                                    font-size: 18px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: normal;
                                    letter-spacing: 1.92px;
                                    text-transform: capitalize;
                                  "
                                >
                                  The Ezpick Team
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <img
                                  src="https://ezpick.s3.us-east-1.amazonaws.com/schools/1689679808272.png"
                                  alt=""
                                  style="width: 30%; margin-bottom: 10%;margin-top:2%"
                                />
                            </td>
                        </tr>
                              </td>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </div>
                    </div>
                    </div>
`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    }


}
