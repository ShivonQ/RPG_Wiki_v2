/**
 * Created by School on 4/19/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NPC = require('./npc.js');
var Shop = require('./shop.js');

var citySchema= new Schema({
    city_name:[{type:String, maxLength:40}],
    allegience:[{type:String}],
    population:[{type:Number, maxLength:8}],
    lat:[{type:Number, maxLength: 16}],
    lng:[{type:Number, maxLength:16}],
    govtype:[{type:String}],
    gov_alignment:[{type:String, maxLength:18}],
    gov_npcs:[NPC],
    city_description:[{type:String, minlength: 100}],
    shops:{
        general_stores:[Shop],
        tavern_and_others:[Shop],
        weps_and_armor:[Shop],
        magic_shops:[Shop]
    },
    sherrif_or_captain:[NPC],
    casters:[NPC],
    major_exports:[{type:Array}],
    major_imports:[{type:Array}],
    maps:[{type:Image}]


})