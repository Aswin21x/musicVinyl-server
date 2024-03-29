const admindatas = require('../Model/adminDisplayModel')

//admin add data
exports.displayAdminData =  async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
//    res.status(200).json("hehehe")
    const { title, artist, description, category, price , tracklist, albumid} = req.body
    const images = req.file.filename 
    // console.log(title, artist, description, category, price, images);  
     try {
        const displayData = await admindatas.findOne({ albumid });
        if(displayData){
            res.status(405).json("ID Already Exists")
        }else{
            const newDisplayData = new admindatas({ title, artist, description, category, price , images , tracklist , albumid}) 
              await newDisplayData.save();
              res.status(201).json(newDisplayData);     
        }
    } catch (err) {
        console.log(err);
        res.status(403).json(err);
    }
}


//admin get display data

exports.getAdminDisplayData = async (req,res)=>{
    const searchKey = req.query.search
    const query = {
        $or:[
            {title:{$regex:searchKey,$options:"i"}},
            {artist:{$regex:searchKey,$options:"i"}}



        ]
    }
    try{

        const displayData = await admindatas.find(query,{ title: 1,artist:1, images:1, albumid:1, _id: 0 })
        res.status(200).json(displayData)

    }catch(err){
        res.status(401).json(err)
    }

}

//admin get Info Page 
exports.getAdminInfoData = async (req,res)=>{
    const {id} = req.params
    console.log(id);
    try{
        const infoData = await admindatas.findOne({albumid:id})

        res.status(200).json(infoData)

    }catch(err){
        res.status(401).json(err)
    }

}
