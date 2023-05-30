import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("loggedin");
    //const verify = window.localStorage.getItem("loggedIn");
    let url = req.url
    
    if(!verify && url.includes('/MainPage')){
        console.log(verify);
        return NextResponse.redirect("http://localhost:3000/Login");
    }

    // if (verify) {
    //    return NextResponse.redirect(url);
    // }

    if(!verify && url.includes('/Employee')){
        return NextResponse.redirect("http://localhost:3000/Login");
    }

    if(!verify && url.includes('/Database')){
        return NextResponse.redirect("http://localhost:3000/Login");
        
    }

    if(!verify && url.includes('/Certifications')){
        return NextResponse.redirect("http://localhost:3000/Login");
    }
    
    

    // if (verify && url === "http://localhost:3000/") {
    //   return NextResponse.redirect("http://localhost:3000/dashboard");
    // }


}