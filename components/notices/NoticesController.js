const router = require('express').Router()

const Notice = require('./Notices')

router.get('/',(req,res)=>{
  res.send("Main Page")
})

router.get('/notices',(req,res)=>{
  res.send('All notices')
})

router.get('/notices/new',(req,res)=>{
  res.render('notices_form')
})

router.post('/notices/new', async (req,res)=>{
  const title = req.body.title
  const date = req.body.date
  const message = req.body.message

  const msg = await Notice.save({title, date, message})
  res.render('notices_form', {msg} )

})

module.exports = router
