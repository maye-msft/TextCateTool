
function startWebApp() {
    const express = require("express");
    // const textanalysis = require("./srv/textanalysis");
    const bodyParser = require('body-parser');
    const { NerManager } = require('node-nlp');

    const app = express();
    app.use('/public', express.static(__dirname +'/static'))
    app.use('/node_modules', express.static(__dirname +'/node_modules'))
    app.use(bodyParser.json());
    app.get('/get', function(req, res){
        res.send('get')
    });

    app.post('/post', function(req, res){
        res.send('post')
    });

    // app.post('/textanalysis', function(req, res){
    //     console.log(req.body);
        
    //     if(req.body.documents) {
    //         var entities = {}
    //         var key_phrases = {}
    //         textanalysis.get_entities(req.body.documents, (result1)=>{
    //             entities = JSON.parse(result1);
    //             textanalysis.get_key_phrases(req.body.documents, (result2)=>{
    //                 key_phrases = JSON.parse(result2)
    //                 res.json({
    //                     entities:entities,
    //                     key_phrases:key_phrases
    //                 })
    //             },(error)=>{
    //                 res.json(error)
    //             })
    //         },(error)=>{
    //             res.json(error)
    //         })

            
    //     } else {
    //         res.json({
    //             entities:{},
    //             key_phrases:{}
    //         })
    //     }
    // });


    app.post('/extractentity', function(req, res){
        if(manager==null) {
            manager = buildNLPModel(req.body.entities)
        }
        
        if(req.body.text) {
            manager.findEntities(
                req.body.text,
                'en',
            ).then(entities => {
                res.json({
                    entities:entities,
                })
            })
        } else {
            res.json({
                entities:[]
            })
        }
    });
    let manager = null;
    app.post('/build', function(req, res){
        if(req.body.entities) {
            manager = buildNLPModel(req.body.entities)
            res.json({status:0})
        } else {
            res.json({status:1})
        }
    });

    function buildNLPModel(entities, size) {
        var manager = new NerManager({ threshold: 0.8 })

            entities.forEach(function (ent) {
                var keywords = ent.keywords.split("\n");
                for (var i = 0; i < keywords.length; i++) {
                    keywords[i] = keywords[i].trim();
                }
                manager.addNamedEntityText(
                    ent.name,
                    ent.name,
                    ['en'],
                    keywords
                );
            })
           
        
        return manager
    }



    app.listen(3000)
}
module.exports = startWebApp

