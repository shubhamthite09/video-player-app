const express = require("express")
const fs = require("fs")
const app = express()

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/video",(req,res)=>{
    const range = req.headers.range
    if(!range){
        res.status(400).send("headre need")
    }
    const videoPath = "./A1.mp4"
    const videoSize = fs.statSync(videoPath).size
    const Chunk = 10**6
    const start = Number(range.replace(/\D/g,""))
    const end = Math.min(start+Chunk,videoSize-1)
    const length = end-start+1
    const headers={
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": length,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206,headers)
    const videoStreem = fs.createReadStream(videoPath,{start,end})
    videoStreem.pipe(res)
})

app.listen(8900,()=>{console.log("8900")})