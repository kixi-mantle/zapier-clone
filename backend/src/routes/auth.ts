import {Router , Response, Request} from "express"
import {google_credts} from '../../google_auth.ts'
import { google } from "googleapis"



const router = Router()

const oauth2Client = new google.auth.OAuth2(

    google_credts.client_id,
    google_credts.client_secret,
    google_credts.redirect_uris[0]
)




router.get('/signin', (req : Request  , res : Response) =>{

    const url = oauth2Client.generateAuthUrl({
        access_type : 'offline',
        scope : ['openid','email' , 'profile'],
        prompt : 'consent',
    })
    res.redirect(url)

})

router.get('/callback' , async(req : Request , res : Response)=>{



    const oauth2Client = new google.auth.OAuth2(
 google_credts.client_id,
    google_credts.client_secret,
    google_credts.redirect_uris[0]
    );

    const {code}  = req.query
    if(!code) {
        console.log("no code")
        return res.status(400).send("no code found")
    }

    const {tokens} = await oauth2Client.getToken(code as string)
    oauth2Client.setCredentials({
        access_token : tokens.access_token,
        refresh_token : tokens.refresh_token
    })
    const oauth2 = google.oauth2({
        auth : oauth2Client,
        version : 'v2'
    })

    const userInfo = await oauth2.userinfo.get();
   res.status(200).json({
        name : userInfo.data.name,
        email : userInfo.data.email
   } )
})



export default router

