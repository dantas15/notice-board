const router = require('express').Router()

const Notices = require('./Notices')
const Notice = require('./Notices')

router.get('/',(req,res)=>{
  res.send("Main Page")
})

router.get('/notices', async(req,res)=>{
  // all notices array
  const notices = await Notices.selectAll()
  res.render('notices',{notices})
})
  
router.get("/notices/edit/:id", async(req,res)=>{
  //getting param from URL
  const id = req.params.id
  const notice = await Notices.selectNotice(id)
  res.render('notices_form',{notice})

})

router.get('/notices/new',(req,res)=>{
  res.render('notices_form')
})

router.post("/notices/edit/:id", async (req,res) =>{
  const id = req.body.id
  const title = req.body.title
  const date = req.body.date
  const message = req.body.message

  const msg = await Notice.edit({title, date, message}, id)

  if(msg.type === "success"){
    res.redirect('/notices')
  }else{
    res.render('notices_form', {msg})
  }
  res.render('notices_form', {msg})
})

router.post('/notices/new', async (req,res)=>{
  const title = req.body.title
  const date = req.body.date
  const message = req.body.message

  const msg = await Notice.save({title, date, message})
  res.render('notices_form', {msg} )

})

router.get( "/notices/delete/:id", async(req,res) => {
  const id = Number(req.params.id)
  await Notices.deletingNotice(id)
  res.redirect('/notices')
})

module.exports = router
