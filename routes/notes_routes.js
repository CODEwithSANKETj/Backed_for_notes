const express = require('express')
const { Note_modle } = require('../modules/note_modle')
const { auth } = require('../middlewear/auth')
const noterouter = express.Router()
noterouter.post('/create',auth,async(req,res)=>{
    try{
        const note = new Note_modle(req.body)
        await note.save()
        res.send({msg:"Note created"})
    }
    catch(err){
        res.send({msg:err})
    }
})
noterouter.get('/',auth,async(req,res)=>{
    const userid = req.body.userID
    try{
        const note = await Note_modle.find({userID:userid})
       
        res.send({note})
    }
    catch(err){
        res.send({msg:err})
    }
})
// updateing
noterouter.patch('/update/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note_modle.findOne({ _id: id }); // Fixed typo here
  
      if (!note) {
        return res.send({ msg: 'No data found to update' });
      }
  
      if (req.body.userID === note.userID) {
        const updatedNote = await Note_modle.findByIdAndUpdate(id, req.body, { new: true });
  
        if (updatedNote) {
          res.send({ msg: 'Note updated', updatedNote });
        } else {
          res.send({ msg: 'Failed to update note' });
        }
      } else {
        res.send({ msg: 'You are not Authorized' });
      }
    } catch (err) {
      res.send({ msg: err });
    }
  });
  
noterouter.delete('/delete/:id',auth,async(req,res)=>{
    const {id} = req.params
    const note = await Note_modle.findOne({_id:id})
    try{
        if(req.body.userID== note.userID){
            const note = await Note_modle.findByIdAndDelete(_id=id)
            if(note)
             res.send({msg:"note deleted"})
             else{
                 res.send({msg:'No data found to delete'})
             }
        }
        else{
            res.send({msg:'You are not Authorized'})
        }
   
    }
    catch(err){
        res.send({msg:err})
    }
})
module.exports = {
    noterouter
}