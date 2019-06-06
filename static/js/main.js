
"use strict";
var store = new Vuex.Store({
    state: {
        entities: [],
        categories: [],
        csvdata: null,
        csvEntities: [],
        csvCategories: [],
        filename: null,

        columnsToExtract: [],
        idColumn: null,
        titleColumn: null,
        stripHTMLTag: true,


        csvfiles: [],
        extractsettings: [],
        // entities: [],
        categoryrules: [],
        results: [],
        fileserialno: 0,
        screenWidth: 0
    },
    mutations: {

        addEntity(state, entity) {
            state.entities.push({ name: entity, keywords: "" })
        },
        removeEntity(state, index) {
            state.entities.splice(index, 1)
        },


        addCategory(state, category) {
            state.categories.push({ name: category, rules: [] })
        },
        removeCategory(state, index) {
            state.categories.splice(index, 1)

        },
        addCategoryRule(state, param) {
            var cateIndex = param[0]
            var rule = param[1]
            state.categories[cateIndex].rules.push({
                name: rule,
                primaryobjects: [],
                secondaryobjects: [],
            })

        },
        removeCategoryRule(state, param) {
            var cateIndex = param[0]
            var index = param[1]
            state.categories[cateIndex].rules.splice(index, 1)

        },

        setCSVData(state, csvdata) {
            state.csvdata = csvdata
        },
        setCSVEntities(state, csvEntities) {
            state.csvEntities = csvEntities
        },
        setCSVCategories(state, csvCategories) {
            state.csvCategories = csvCategories
        },

        setFilename(state, filename) {
            state.filename = filename
        },


        addCSVFile(state, file) {
            state.csvfiles.push(file)
            state.extractsettings.push([])
            state.entities.push([])
            state.categoryrules.push([])
            state.results.push([])
            state.fileserialno++;
            file.serialno = state.fileserialno
        },
        removeCSVFile(state, idx) {
            state.csvfiles.splice(idx, 1)
            state.extractsettings.splice(idx, 1)
            state.entities.splice(idx, 1)
            state.categoryrules.splice(idx, 1)
            state.results.splice(idx, 1)
        },
        saveProject(state) {
            var project = {
                // csvfiles: state.csvfiles,
                // extractsettings: state.extractsettings,
                // entities: state.entities,
                // categoryrules: state.categoryrules,
                // results: state.results,
                // fileserialno: state.fileserialno
                entities: state.entities,
                categories: state.categories,

                csvdata: state.csvdata,
                csvEntities: state.csvEntities,
                csvCategories: state.csvCategories,

                columnsToExtract: state.columnsToExtract,
                idColumn: state.idColumn,
                titleColumn: state.titleColumn,
                stripHTMLTag: state.stripHTMLTag,

                filename: state.filename

            };
            var blob = new Blob([JSON.stringify(project)], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "project.json");
        },
        importProject(state) {

            openFile(function (fname, size, lastModifiedDate, contents) {
                var project = JSON.parse(contents)
                // state.csvfiles = project.csvfiles
                // state.extractsettings = project.extractsettings
                // state.entities = project.entities
                // state.categoryrules = project.categoryrules
                // state.results = project.results
                // state.fileserialno = project.fileserialno
                state.entities = project.entities || []
                state.categories = project.categories || []

                state.csvdata = project.csvdata || null
                state.csvEntities = project.csvEntities || []
                state.csvCategories = project.csvCategories || []

                state.columnsToExtract = project.columnsToExtract || []
                state.idColumn = project.idColumn || null
                state.titleColumn = project.titleColumn || null
                state.stripHTMLTag = project.stripHTMLTag || true
                state.filename = project.filename || ""
            })

        },
        clearEntity(state, param) {
            var fileserialno = param[0]
            var index = -1
            state.csvfiles.forEach(function (csvfile, idx) {
                if (csvfile.serialno == fileserialno) {
                    index = idx
                }
            })
            if (index != -1) {
                state.entities[index] = {}
            }
        },
        updateColumnsToExtract(state, param) {
            state.columnsToExtract = param
        },
        updateIdColumn(state, param) {
            state.idColumn = param
        },
        updateTitleColumn(state, param) {
            state.titleColumn = param
        },
        updateStripHTMLTag(state, param) {
            state.stripHTMLTag = param
        },

        setScreenWidth(state, width) {
            state.screenWidth = width
        }

        // addEntity(state, param) {
        //     var fileserialno = param[0]
        //     var entities = param[1]
        //     var keyPhrases = param[2]
        //     var index = -1
        //     state.csvfiles.forEach(function(csvfile, idx){
        //         if(csvfile.serialno == fileserialno) {
        //             index = idx
        //         }
        //     })
        //     if(index!=-1) {
        //         state.entities[index] = state.entities[index] || {}
        //         if(state.entities[index]['entities'] && state.entities[index]['entities'].documents && state.entities[index]['entities'].documents.length>0) {
        //             state.entities[index]['entities'].documents = state.entities[index]['entities'].documents.concat(entities.documents)
        //         } else {
        //             state.entities[index]['entities'] = entities
        //         }

        //         if(state.entities[index]['keyPhrases'] && state.entities[index]['keyPhrases'].documents && state.entities[index]['keyPhrases'].documents.length>0) {
        //             state.entities[index]['keyPhrases'].documents = state.entities[index]['keyPhrases'].documents.concat(keyPhrases.documents)
        //         } else {
        //             state.entities[index]['keyPhrases'] = keyPhrases
        //         }




        //     }

        // },

        // addCategory(state, param) {
        //     var fileserialno = param[0]
        //     var category = param[1]
        //     state.csvfiles.forEach(function(csvfile, idx){
        //         if(csvfile.serialno == fileserialno) {
        //             index = idx
        //         }
        //     })

        //     if(index!=-1) {
        //         state.categoryrules[index] = state.categoryrules[index] || []
        //         state.categoryrules[index].push({category:category, rules:[]})
        //     }

        // },
        // removeCategory(state, param) {
        //     var fileserialno = param[0]
        //     var index = param[1]
        //     state.csvfiles.forEach(function(csvfile, idx){
        //         if(csvfile.serialno == fileserialno) {
        //             index = idx
        //         }
        //     })

        //     if(index!=-1) {
        //         state.categoryrules[index].splice(index, 1)
        //     }

        // },
        // addCategoryRule(state, param) {
        //     var fileserialno = param[0]
        //     var category = param[1]
        //     var rule = param[2]
        //     state.csvfiles.forEach(function(csvfile, idx){
        //         if(csvfile.serialno == fileserialno) {
        //             index = idx
        //         }
        //     })

        //     if(index!=-1) {
        //         state.categoryrules[index] = state.categoryrules[index] || []
        //         state.categoryrules[index].forEach(function(cate){
        //             if(cate.category == category) {
        //                 cate.rules.push({
        //                     name:rule,
        //                     primarytype:"Contains Entity",
        //                     primaryobjects:[],
        //                     secondarycondition:"Or",
        //                     secondarytype:"Contains KeyPhrase",
        //                     secondaryobjects:[],
        //                 })
        //             }
        //         })
        //     }

        // },


    }
})
var routes = [
    { name: "entity-view", path: '/entity-view', component: { template: '<entity-view></entity-view>' } },
    { name: "category-view", path: '/category-view', component: { template: '<category-view></category-view>' } },
    { name: "data-view", path: '/data-view', component: { template: '<data-view></data-view>' } },
    { name: "analysis-view", path: '/analysis-view', component: { template: '<analysis-view></analysis-view>' } },
    { name: "dashboard-view", path: '/dashboard-view', component: { template: '<dashboard-view></dashboard-view>' } },

    { name: "import-csv", path: '/import-csv', component: { template: '<csv-view></csv-view>' } },
    { name: "entity-extraction", path: '/entity-extraction', component: { template: '<entity-extraction-view ></entity-extraction-view>' } },
    { name: "category-rule", path: '/category-rule', component: { template: '<category-rule-view ></category-rule-view>' } },
]
var router = new VueRouter({
    routes: routes
})
Vue.component("entity-view", {
    template: '#entity-template',
    store: store,
    data: function () {
        return {

        }
    },
    methods: {
        ...Vuex.mapMutations([
            'addEntity', 'removeEntity',
        ]),
    },
    computed: {
        ...Vuex.mapState([
            'entities'
        ]),
    },
});

Vue.component("category-view", {
    template: '#category-template',
    store: store,
    data: function () {
        return {

        }
    },
    methods: {
        ...Vuex.mapMutations([
            'addCategory', 'removeCategory',
            'addCategoryRule', 'removeCategoryRule'
        ]),
    },
    computed: {
        ...Vuex.mapState([
            'entities', 'categories'
        ]),
    },
});

Vue.component("data-view", {
    template: '#data-template',
    store: store,
    data: function () {
        return {

        }
    },
    methods: {
        ...Vuex.mapMutations([
            'setCSVData', 'setFilename'
        ]),
        opencsvfile() {
            var that = this;
            openFile(function (fname, size, lastModifiedDate, contents) {
                var csvdata = parseCSV(contents);
                that.setCSVData(csvdata)
                that.setFilename(fname)
                // that.headers = csvdata.headers;
                // that.rows = csvdata.rows ;
                // if (csvdata.length > 0) {
                //     for (var j = 0; j < csvdata[0].length; j++) {
                //         that.headers.push({ text: csvdata[0][j], value: csvdata[0][j] })
                //     }
                //     for (var i = 1; i < csvdata.length; i++) {
                //         var row = {}
                //         for (var j = 0; j < csvdata[0].length; j++) {
                //             row[csvdata[0][j]] = csvdata[i][j]
                //         }
                //         that.rows.push(row);
                //     }
                // }
            });
        },


    },
    computed: {
        ...Vuex.mapState([
            'entities', 'categories', 'csvdata', 'filename'
        ]),
        headers() {
            if (this.csvdata && this.csvdata.headers)
                return this.csvdata.headers
            else
                return []
        },
        rows() {
            if (this.csvdata && this.csvdata.rows)
                return this.csvdata.rows
            else
                return []

        }
    },
});

Vue.component("analysis-view", {
    template: '#analysis-template',
    store: store,
    data: function () {
        return {

            showEntityColumn: false,
            showCategoryColumn: false,
            prepareProgress: 0,
            extractProgress: 0,
            running: false,
            filtercategory: 'ALL'
        }
    },
    computed: {
        ...Vuex.mapState([
            'csvdata', 'entities', 'categories', 'csvEntities', 'csvCategories', 'filename'
        ]),
        columnsToExtract: {
            get() {
                return this.$store.state.columnsToExtract;
            },
            set(value) {
                this.$store.commit('updateColumnsToExtract', value);
            }
        },
        idColumn: {
            get() {
                return this.$store.state.idColumn;
            },
            set(value) {
                this.$store.commit('updateIdColumn', value);
            }
        },
        titleColumn: {
            get() {
                return this.$store.state.titleColumn;
            },
            set(value) {
                this.$store.commit('updateTitleColumn', value);
            }
        },
        stripHTMLTag: {
            get() {
                return this.$store.state.stripHTMLTag;
            },
            set(value) {
                this.$store.commit('updateStripHTMLTag', value);
            },
        },

        csvColumns() {
            var that = this
            var headers = [];
            if (this.csvdata && this.csvdata.headers) {
                for (var j = 0; j < this.csvdata.headers.length; j++) {
                    headers.push(this.csvdata.headers[j].text)
                }
            }
            return headers;
        },

        headers() {
            var headers = []
            if (this.idColumn) {
                headers.push({ text: this.idColumn, value: this.idColumn })
            }

            if (this.titleColumn) {
                headers.push({ text: this.titleColumn, value: this.titleColumn })
            }
            if (this.columnsToExtract.length > 0)
                headers.push({ text: 'Raw Text', value: 'Raw Text' })
            if (this.showEntityColumn)
                headers.push({ text: 'Entity', value: 'Entity' })
            if (this.showCategoryColumn)
                headers.push({ text: 'Category', value: 'Category' })

            return headers;

        },
        rows() {
            var that = this
            var rows = []
            var count = 0;
            var entities = [];
            var entityrow = []

            if (this.showEntityColumn) {

            }

            count = 0;
            var keyPhrases = []
            var keyPhrasesRow = []

            if (this.showKeyPhraseColumn) {
                var myKeyPhrases = that.myKeyPhrases()
                if (myKeyPhrases && myKeyPhrases.documents) {
                    myKeyPhrases.documents.forEach(function (doc) {
                        if (doc.id.startsWith(count + ".")) {
                            keyPhrasesRow = keyPhrasesRow.concat(doc.keyPhrases);
                        } else {
                            count++;
                            keyPhrases.push(keyPhrasesRow);
                            keyPhrasesRow = (doc.keyPhrases);
                        }
                    })
                    keyPhrases.push(keyPhrasesRow);
                }
            }

            this.showEntityColumn = this.csvEntities.length > 0;
            this.showCategoryColumn = this.csvCategories.length > 0;

            if (this.csvdata != null) {
                this.csvdata.rows.forEach(function (row, idx) {
                    var content = []
                    var newrow = {}
                    that.columnsToExtract.forEach(function (column) {
                        if (that.stripHTMLTag) {
                            content.push(row[column].replace(/(<([^>]+)>)/ig, ""))
                        } else {
                            content.push(row[column])
                        }

                    })

                    newrow['Raw Text'] = content.join('\n')

                    if (that.idColumn) {
                        newrow[that.idColumn] = row[that.idColumn]
                    }

                    if (that.titleColumn) {
                        newrow[that.titleColumn] = row[that.titleColumn]
                    }




                    var entitiesArray = []
                    if (that.csvEntities.length > idx && that.csvEntities[idx]) {
                        that.csvEntities[idx].forEach(function (ent) {
                            if (that.entNames.indexOf(ent.entity) != -1 && entitiesArray.indexOf(ent.entity) == -1) {
                                entitiesArray.push(ent.entity)
                            }
                        })
                    }

                    var categoriesArray = []
                    if (that.csvCategories.length > idx && that.csvCategories[idx]) {
                        that.csvCategories[idx].forEach(function (cate) {
                            categoriesArray.push(cate)
                        })
                    }

                    newrow['Entity'] = entitiesArray.join(",")
                    newrow['Category'] = categoriesArray.join(",")

                    if (that.filtercategory == 'ALL') {
                        rows.push(newrow)
                    } else if (that.filtercategory == 'None' && categoriesArray.length == 0) {
                        rows.push(newrow)
                    } else if (that.filtercategory == 'ALL Category' && categoriesArray.length != 0) {
                        rows.push(newrow)
                    } else if (categoriesArray.indexOf(that.filtercategory) != -1) {
                        rows.push(newrow)
                    }

                })
            }
            return rows
        },
        allcategories() {
            var array = ['ALL', 'ALL Category', 'None']
            this.categories.forEach(function (cate) {
                array.push(cate.name)
            })
            return array
        },
        entNames() {
            var entNames = []
            this.entities.forEach(function (ent) {
                entNames.push(ent.name)
            })
            return entNames;
        }


    },
    methods: {
        ...Vuex.mapMutations([
            'setCSVData', 'setCSVEntities', 'setCSVCategories', 'setFilename'
        ]),

        opencsvfile() {
            var that = this;
            openFile(function (fname, size, lastModifiedDate, contents) {
                var csvdata = parseCSV(contents);
                that.setCSVData(csvdata)
                that.setFilename(fname)
                // that.headers = csvdata.headers;
                // that.rows = csvdata.rows ;
                // if (csvdata.length > 0) {
                //     for (var j = 0; j < csvdata[0].length; j++) {
                //         that.headers.push({ text: csvdata[0][j], value: csvdata[0][j] })
                //     }
                //     for (var i = 1; i < csvdata.length; i++) {
                //         var row = {}
                //         for (var j = 0; j < csvdata[0].length; j++) {
                //             row[csvdata[0][j]] = csvdata[i][j]
                //         }
                //         that.rows.push(row);
                //     }
                // }
            });
        },
        exportCSV() {
            var header = []
            var rows = []
            this.rows.forEach(function (item, idx) {
                if (idx == 0) {
                    Object.keys(item).forEach(function (key) {
                        if (key != "Raw Text") {
                            header.push(key)
                        }
                    })
                }
                var row = []
                Object.keys(item).forEach(function (key) {
                    if (key != "Raw Text") {
                        row.push(item[key])
                    }
                })
                rows.push(row)
            })
            encodeCSV(header, rows)
        },

        chunkSubstr(str, size) {
            if (str.length < size) {
                return [str]
            } else {
                var chunks = new Array()
                var i = 0;
                while (i < str.length) {

                    var end1 = str.lastIndexOf('.', i + size)
                    var end2 = str.lastIndexOf('\n', i + size)
                    var end = Math.max(end1, end2)
                    if (end1 < i && end2 < i) {
                        end = i + size
                    }

                    if (i + size > str.length) {
                        end = -1
                    }

                    var substring = ""
                    if (end == -1) {
                        substring = str.substring(i)
                        i = str.length
                    }
                    else {
                        substring = str.substring(i, end)
                        i = end + 1
                    }
                    chunks.push(substring)

                }

                return chunks
            }
        },
        extractEntityByWorker(strArray) {
            var that = this
            var textcount = 0
            var entitiesData = new Array(this.csvdata.rows.length)
            var bulksize = 8

           
            for (var j = 0; j < bulksize; j++) {
                // nlpmanagers[j] = new NLPJS.NerManager({ threshold: 0.8 })

                // that.entities.forEach(function (ent) {
                //     var keywords = ent.keywords.split("\n");
                //     for (var i = 0; i < keywords.length; i++) {
                //         keywords[i] = keywords[i].trim();
                //     }
                //     nlpmanagers[j].addNamedEntityText(
                //         ent.name,
                //         ent.name,
                //         ['en'],
                //         keywords
                //     );
                // })

                var blob = new Blob([
                    document.querySelector('#nlpworker').textContent
                ], 
                { type: "text/javascript" }
                )
                var worker = new Worker(window.URL.createObjectURL(blob), { type: "module" });
   
                worker.onmessage = function (e) {
                    var entities = e.data.entities;
                    var textidx = e.data.textidx;
                    var bulkid = e.data.bulkid;
                    var idx = strArray[textidx].rowid;

                    entitiesData[idx] = entitiesData[idx] || []
                    entitiesData[idx] = entitiesData[idx].concat(entities)
                    that.extractProgress = ((textcount + 1) / strArray.length) * 100
                    textcount = textcount + 1
                    if (textcount == strArray.length) {
                        that.extractProgress = 100
                        that.setCSVEntities(entitiesData)
                        that.showEntityColumn = true;
                        that.categorize()
                        that.running = false
                    } else if(textidx+bulksize<strArray.length) {
                        worker.postMessage({ text: strArray[textidx+bulksize].text, textidx:textidx+bulksize });
                    }
                }
                worker.postMessage({ modelEntities: that.entities, text: strArray[j].text, textidx:j });

            }

            



        },
        extractEntity(strArray) {
            var that = this
            var textcount = 0
            var entitiesData = new Array(this.csvdata.rows.length)
            var bulksize = 8
            for (var i = 0; i < strArray.length; i = i + bulksize) {
                for (var j = 0; j < bulksize; j++) {
                    var textidx = i + j
                    if (textidx < strArray.length) {
                        var text = strArray[textidx].text;
                        var idx = strArray[textidx].rowid;
                        (function (text, idx) {
                            setTimeout(function () {

                                ajaxExtractEntity(text, that.entities, function (entities) {
                                    entitiesData[idx] = entitiesData[idx] || []
                                    entitiesData[idx] = entitiesData[idx].concat(entities.entities)
                                    that.extractProgress = ((textcount + 1) / strArray.length) * 100
                                    textcount = textcount + 1
                                    if (textcount == strArray.length) {
                                        that.extractProgress = 100
                                        that.setCSVEntities(entitiesData)
                                        that.showEntityColumn = true;
                                        that.categorize()
                                        that.running = false
                                    }
                                }, function (err) {
                                    console.log(err)
                                })

                            }, i * 100)
                        }(text, idx))


                    }

                }
            }
        },
        startAnalysis() {
            if (!this.csvdata.rows) {
                return;
            }
            this.running = true


            // var entitiesData = new Array(this.csvdata.rows.length)

            var that = this
            that.showEntityColumn = false;
            that.showCategoryColumn = false;
            that.setCSVEntities([])
            that.setCSVCategories([])

            this.prepareProgress = 0;
            this.extractProgress = 0;

            // var count = 0;

            var strArray = []


            // function buildNLPModel() {
            //     var manager = new NLPJS.NerManager({ threshold: 0.8 })

            //     that.entities.forEach(function (ent) {
            //         var keywords = ent.keywords.split("\n");
            //         for (var i = 0; i < keywords.length; i++) {
            //             keywords[i] = keywords[i].trim();
            //         }
            //         manager.addNamedEntityText(
            //             ent.name,
            //             ent.name,
            //             ['en'],
            //             keywords
            //         );
            //     })
            //     return manager
            // }

            // var manager = buildNLPModel()
            // if (this.csvdata != null) {
            //     this.csvdata.rows.forEach(function (row, idx) {
            //         var content = []

            //         that.columnsToExtract.forEach(function (column) {
            //             if (that.stripHTMLTag) {
            //                 var str = row[column].replace(/(<([^>]+)>)/ig, "")
            //                 str = str.replace(/\&nbsp;/ig, " ")
            //                 content.push(str)
            //             } else {
            //                 content.push(row[column])
            //             }

            //         })
            //         var str = content.join('\n')
            //         var texts = that.chunkSubstr(str, 512)
            //         texts.forEach(function (text) {
            //             strArray.push({ rowid: idx, text: text })
            //         })
            //     })
            // }


            // var count = 0;

            // function findEntities(textidx) {
            //     var text = strArray[textidx].text
            //     var idx = strArray[textidx].rowid
            //     manager.findEntities(
            //         text,
            //         'en',
            //     ).then(entities => {
            //         entitiesData[idx] = entitiesData[idx] || []
            //         entitiesData[idx] = entitiesData[idx].concat(entities)
            //         // setTimeout(function () {
            //         //     that.extractProgress = ((count + 1) / strArray.length) * 100
            //         //     count = count + 1
            //         //     if (textidx < end)
            //         //         findEntities(manager, textidx + 1, end)
            //         // }, 50)

            //         // if (count == strArray.length - 1) {
            //         //     that.categorize()
            //         //     that.setCSVEntities(entitiesData)
            //         //     that.extractProgress = 100
            //         //     that.showEntityColumn = true;
            //         //     that.running = false

            //         // }

            //         if (count < strArray.length - 1) {
            //             setTimeout(function () {
            //                 that.extractProgress = ((count + 1) / strArray.length) * 100
            //                 count = count + 1
            //                 findEntities(count)
            //             }, 50)
            //         } else {
            //             that.extractProgress = 100

            //             that.setCSVEntities(entitiesData)
            //             that.showEntityColumn = true;

            //             that.categorize()

            //             that.running = false
            //             // this.setCSVCategories(categoriesData)
            //             // this.showCategoryColumn = true;
            //         }
            //     })
            // }

            function prepareText(idx) {
                var row = that.csvdata.rows[idx]
                var content = []

                that.columnsToExtract.forEach(function (column) {
                    if (that.stripHTMLTag) {
                        var str = row[column].replace(/(<([^>]+)>)/ig, "")
                        str = str.replace(/\&nbsp;/ig, " ")
                        content.push(str)
                    } else {
                        content.push(row[column])
                    }

                })
                var str = content.join('\n')
                var texts = that.chunkSubstr(str, 384)
                texts.forEach(function (text) {
                    strArray.push({ rowid: idx, text: text })
                })

                if (idx < that.csvdata.rows.length - 1) {
                    setTimeout(function () {
                        that.prepareProgress = ((idx + 1) / that.csvdata.rows.length) * 100

                        prepareText(idx + 1)
                    }, 5)
                } else {
                    that.prepareProgress = 100
                    setTimeout(function () {
                        // for (var i = 0; i < strArray.length; i = i + 100) {
                        //     findEntities(buildNLPModel(), i, Math.min(i + 100, strArray.length))
                        // }

                        // findEntities(0)

                        that.extractEntity(strArray)
                    }, 5)
                }
            }

            prepareText(0)
            // this.rows.forEach(function (row, idx) {
            //     var texts = that.chunkSubstr(row['Raw Text'], 512)
            //     texts.forEach(function (text) {
            //         strArray.push({ rowid: idx, text: text })
            //     })

            // })








        },
        categorize() {
            var that = this
            var categoriesData = new Array(this.csvEntities.length)

            this.csvEntities.forEach(function (entities, idx) {
                var categoryRow = [];
                that.categories.forEach(function (category) {

                    category.rules.forEach(function (rule) {
                        var primaryMatched = false;
                        if (rule.primaryobjects.length > 0) {
                            for (var j = 0; j < entities.length; j++) {
                                for (var k = 0; k < rule.primaryobjects.length; k++) {
                                    if (rule.primaryobjects[k].name == entities[j].entity) {
                                        primaryMatched = true
                                        break;
                                    }
                                }

                            }
                        }

                        if (primaryMatched && rule.secondaryobjects.length > 0) {
                            entities.forEach(function (ent) {
                                for (var k = 0; k < rule.secondaryobjects.length; k++) {
                                    if (rule.secondaryobjects[k].name == ent.entity) {
                                        if (categoryRow.indexOf(category.name) == -1)
                                            categoryRow.push(category.name)
                                        break;
                                    }
                                }

                            })
                        } else if (primaryMatched) {
                            if (categoryRow.indexOf(category.name) == -1)
                                categoryRow.push(category.name)
                        }
                    })
                })

                categoriesData[idx] = (categoryRow)
            })


            this.setCSVCategories(categoriesData)
            this.showCategoryColumn = true;
        }
    }
});

var D3Network = window['vue-d3-network']

Vue.component("dashboard-view", {
    template: '#dashboard-template',
    store: store,
    components: {
        D3Network
    },
    data: function () {
        return {
            nodes: [
                { id: 1, name: 'my awesome node 1', _color: 'orange' },
                { id: 2, name: 'my node 2' },
                // { id: 3, name: 'orange node', _color: 'orange' },
                // { id: 4, _color: '#4466ff' },
                // { id: 5 },
                // { id: 6 },
                // { id: 7 },
                // { id: 8 },
                // { id: 9 }
            ],
            links: [
                { sid: 1, tid: 2 },
            ],
            nodeSize: 20,
            canvas: false,
            entityGraphWidth: this.screenWidth,
            entityGraphHeight: 600,
            itemGraphWidth: this.screenWidth,
            itemGraphHeight: 600,
        }
    },
    methods: {
        ...Vuex.mapMutations([

        ]),
        onItemResize() {
            // this.itemGraphHeight = $("#itemgraph").height()
            // this.itemGraphWidth = $("#itemgraph").width()
            // console.log(this.itemGraphWidth+" "+this.itemGraphHeight);
        },
        onEntityResize() {
            // this.entityGraphHeight = $("#entitygraph").height()
            // this.entityGraphWidth = $("#entitygraph").width()
            // console.log(this.entityGraphWidth+" "+this.entityGraphHeight);

        }
    },
    mounted() {
        // this.itemGraphHeight = $("#itemgraph").height()
        this.itemGraphWidth = this.screenWidth
        // this.entityGraphHeight = $("#entitygraph").height()
        this.entityGraphWidth = this.screenWidth


        var chart = echarts.init(document.getElementById('wordcloud'));

        chart.setOption({
            series: [{
                type: 'wordCloud',

                // The shape of the "cloud" to draw. Can be any polar equation represented as a
                // callback function, or a keyword present. Available presents are circle (default),
                // cardioid (apple or heart shape curve, the most known polar equation), diamond (
                // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

                shape: 'circle',

                // A silhouette image which the white area will be excluded from drawing texts.
                // The shape option will continue to apply as the shape of the cloud to grow.

                // maskImage: maskImage,

                // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                // Default to be put in the center and has 75% x 80% size.

                left: 'center',
                top: 'center',
                width: '70%',
                height: '80%',
                right: null,
                bottom: null,

                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.

                sizeRange: [12, 60],

                // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

                rotationRange: [-90, 90],
                rotationStep: 45,

                // size of the grid in pixels for marking the availability of the canvas
                // the larger the grid size, the bigger the gap between words.

                gridSize: 8,

                // set to true to allow word being draw partly outside of the canvas.
                // Allow word bigger than the size of the canvas to be drawn
                drawOutOfBound: false,

                // Global text style
                textStyle: {
                    normal: {
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold',
                        // Color can be a callback function or a color string
                        color: function () {
                            // Random color
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },

                // Data is an array. Each array item must have name and value property.
                data: this.words
                // data: [{
                //     name: 'Farrah Abraham1',
                //     value: 2,
                //     // Style of single text
                //     textStyle: {
                //         normal: {},
                //         emphasis: {}
                //     }
                // },{
                //     name: 'Farrah Abraham2',
                //     value: 8,
                //     // Style of single text
                //     textStyle: {
                //         normal: {},
                //         emphasis: {}
                //     }
                // }]
            }]
        });
    },
    computed: {
        ...Vuex.mapState([
            'entities',
            'categories',
            'csvdata',
            'csvEntities',
            'csvCategories',
            'idColumn',
            'titleColumn',
            'screenWidth'

        ]),
        // labels() {
        //     var array = [];
        //     this.categories.forEach(function (cate) {
        //         array.push(cate.name)
        //     })
        //     array.push("")
        //     return array
        // },


        chartdata() {
            var that = this
            var array = [];
            this.categories.forEach(function (cate) {
                var count = 0;
                var item = [cate.name]
                that.csvCategories.forEach(function (csvcate) {
                    if (csvcate && csvcate.indexOf(cate.name) != -1) {
                        count++;
                    }
                })
                item.push(count)
                array.push(item)
            })

            return array
        },
        words() {
            var words = {}
            var that = this
            var entNames = []
            that.entities.forEach(function (ent) {
                entNames.push(ent.name)
            })

            this.csvEntities.forEach(function (ent) {
                if (ent) {
                    ent.forEach(function (item) {
                        if (entNames.indexOf(item.entity) != -1) {
                            words[item.sourceText] = words[item.sourceText] || 0
                            words[item.sourceText] = words[item.sourceText] + 1
                        }
                    });
                }

            })
            var array = []
            Object.keys(words).forEach(function (key) {
                array.push({ name: key, value: words[key] })
            })
            return array

        },
        entitynodes() {
            var that = this;
            var nodes = []
            var nodesArray = []

            if (this.csvEntities) {
                var entNames = []
                that.entities.forEach(function (ent) {
                    entNames.push(ent.name)
                })

                this.csvEntities.forEach(function (ent) {

                    if (ent) {
                        ent.forEach(function (item) {
                            if (nodesArray.indexOf(item.entity) == -1 && entNames.indexOf(item.entity) != -1) {
                                nodesArray.push(item.entity)
                                nodes.push({ id: nodes.length + 1, name: item.entity })
                            }

                        });
                    }

                })
            }
            console.log(nodes);

            return nodes;
        },
        entlinks() {
            var links = {};
            var linksArray = []
            var nodes = {}
            var nodesArray = []
            var that = this
            var entNames = []
            that.entities.forEach(function (ent) {
                entNames.push(ent.name)
            })
            for (var i = 0; i < this.csvEntities.length; i++) {
                if (this.csvEntities[i]) {
                    for (var j = 0; j < this.csvEntities[i].length; j++) {
                        var item = this.csvEntities[i][j]
                        if (nodesArray.indexOf(item.entity) == -1 && entNames.indexOf(item.entity) != -1) {
                            nodesArray.push(item.entity)
                            nodes[item.entity] = nodesArray.length
                        }

                        for (var k = j + 1; k < this.csvEntities[i].length; k++) {
                            if (entNames.indexOf(this.csvEntities[i][j].entity) != -1 &&
                                entNames.indexOf(this.csvEntities[i][k].entity) != -1
                            ) {
                                var sid = this.csvEntities[i][j].entity
                                var tid = this.csvEntities[i][k].entity
                                var key1 = sid + "\n" + tid
                                var key2 = tid + "\n" + sid
                                if (links[key1] && links[key1] > 0) {
                                    links[key1]++
                                } else if (links[key2] && links[key2] > 0) {
                                    links[key2]++
                                } else {
                                    links[key1] = 1
                                }
                            }
                        }
                    }
                }
            }
            Object.keys(links).forEach(function (key) {
                var ids = key.split("\n")
                linksArray.push({ sid: nodes[ids[0]], tid: nodes[ids[1]], _svgAttrs: { 'stroke-width': 1/*links[key]*/, opacity: 1 } })
            })
            console.log(linksArray);

            return linksArray;
        },
        itemnodes() {
            var nodes = []
            var nodesArray = []
            var that = this
            if (this.csvdata) {
                this.csvdata.rows.forEach(function (row, idx) {
                    if (that.csvEntities[idx] && that.csvEntities[idx].length > 0) {
                        if (nodesArray.indexOf(row[that.titleColumn]) == -1) {
                            nodesArray.push(row[that.titleColumn])
                            nodes.push({ id: row[that.idColumn], name: row[that.titleColumn] })
                        }
                    }

                })
            }
            return nodes;
        },
        ent2item() {

            var nodesArray = {}

            if (this.csvEntities) {
                this.csvEntities.forEach(function (ent, idx) {
                    if (ent) {
                        ent.forEach(function (item) {
                            nodesArray[item.entity] = nodesArray[item.entity] || []
                            if (nodesArray[item.entity]) {
                                nodesArray[item.entity].push(idx)
                            }
                        });
                    }

                })
            }
            return nodesArray;
        },
        itemmlinks() {
            var links = {}
            var linksArray = []
            var that = this
            var ent2item = this.ent2item;
            Object.keys(ent2item).forEach(function (ent) {
                if (ent) {
                    var rowids = ent2item[ent];
                    for (var i = 0; i < rowids.length; i++) {
                        for (var j = i + 1; j < rowids.length; j++) {
                            var sid = that.csvdata.rows[rowids[i]][that.idColumn]
                            var tid = that.csvdata.rows[rowids[j]][that.idColumn]
                            var key1 = sid + "\n" + tid
                            var key2 = tid + "\n" + sid
                            if (links[key1] && links[key1] > 0) {
                                links[key1]++
                            } else if (links[key2] && links[key2] > 0) {
                                links[key2]++
                            } else {
                                links[key1] = 1
                            }
                        }
                    }
                }
            })
            Object.keys(links).forEach(function (key) {
                var ids = key.split("\n")
                linksArray.push({ sid: ids[0], tid: ids[1], _svgAttrs: { 'stroke-width': links[key], opacity: 1 } })
            })
            return linksArray;
        },
        itemoptions() {
            return {
                force: 3000,
                size: { w: this.screenWidth, h: this.itemGraphHeight },
                nodeSize: this.nodeSize,
                nodeLabels: true,
                linkLabels: true,
                canvas: this.canvas
            }
        },
        entityoptions() {
            return {
                force: 3000,
                size: { w: this.screenWidth, h: this.entityGraphHeight },
                nodeSize: this.nodeSize,
                nodeLabels: true,
                linkLabels: true,
                canvas: this.canvas
            }
        }
    },
});

// Vue.component('bar-chart', {
//     extends: VueChartJs.Bar,
//     store: store,
//     mounted() {
//         var that = this
//         this.renderChart({
//             labels: that.labels,
//             datasets: [
//                 {
//                     label: 'Category',
//                     backgroundColor: '#00ffff',
//                     data: that.chartdata
//                 }
//             ]
//         }, { responsive: true, maintainAspectRatio: false })
//     },
//     computed: {
//         ...Vuex.mapState([
//             'entities:',
//             'categories',
//             'csvdata',
//             'csvEntities',
//             'csvCategories'
//         ]),
//         labels() {
//             var array = [];
//             this.categories.forEach(function (cate) {
//                 array.push(cate.name)
//             })
//             array.push("")
//             return array
//         },
//         chartdata() {
//             var that = this
//             var array = [];
//             this.categories.forEach(function (cate) {
//                 var count = 0;
//                 that.csvCategories.forEach(function (csvcate) {
//                     if(csvcate.indexOf(cate.name)!=-1) {
//                         count++;
//                     }
//                 })
//                 array.push(count)
//             })
//             array.push(0)
//             return array
//         }
//     }
// })

Vue.component("csv-view", {
    template: '#csv-template',
    store: store,
    data: function () {
        return {
            files: [],
            rows: [],
            dialog: false,
            selected: [],
            headers: [],
            rows: [],

        }
    },
    computed: {
        ...Vuex.mapState([
            'csvfiles',
            'extractsettings',
            'entities',
            'categoryrules',
            'results'

        ]),
    },
    methods: {
        ...Vuex.mapMutations([
            'addCSVFile', 'removeCSVFile',
            'saveProject', 'importProject'
        ]),
        openfile() {

            var that = this
            openFile(function (fname, size, lastModifiedDate, contents) {
                that.addCSVFile({
                    selected: false,
                    fname: fname,
                    size: size,
                    lastModifiedDate: lastModifiedDate,
                    contents: contents
                })
                // that.files.push({
                //     selected: false,
                //     fname: fname,
                //     size: size,
                //     lastModifiedDate: lastModifiedDate,
                //     contents: contents
                // })
            })
        },
        delfile() {
            var that = this;
            function findSelected() {
                for (var i = 0; i < that.csvfiles.length; i++) {
                    if (that.csvfiles[i].selected)
                        return i
                }
                return -1
            }
            while (true) {
                var j = findSelected()
                if (j == -1)
                    return
                that.removeCSVFile(j)
            }

        },
        viewfile(file) {
            var csvdata = CSV.parse(file.contents);
            this.headers = [];
            if (csvdata.length > 0) {
                for (var j = 0; j < csvdata[0].length; j++) {
                    this.headers.push({ text: csvdata[0][j], value: csvdata[0][j] })
                }
                for (var i = 1; i < csvdata.length; i++) {
                    var row = {}
                    for (var j = 0; j < csvdata[0].length; j++) {
                        row[csvdata[0][j]] = csvdata[i][j]
                    }
                    this.rows.push(row);
                }
            }
        }
    },
    mounted: function () {

    }
});

Vue.component("entity-extraction-view", {
    template: '#entity-extraction-template',
    store: store,
    data: function () {
        return {
            selectedFile: null,
            columnsToExtract: [],
            titleColumns: [],
            stripHTMLTag: true,
            showEntityColumn: false,
            showKeyPhraseColumn: false,
        }
    },
    computed: {
        ...Vuex.mapState([
            'csvfiles',
            'extractsettings',
            'entities',
            'categoryrules',
            'results'

        ]),
        csvColumns() {
            var that = this
            var headers = [];
            this.csvfiles.forEach(function (item) {
                if (item.serialno == that.selectedFile) {
                    var csvdata = CSV.parse(item.contents);

                    for (var j = 0; j < csvdata[0].length; j++) {
                        headers.push(csvdata[0][j])
                    }
                }
            })
            return headers;
        },
        csvdata() {
            var csvdata = null
            var that = this
            this.csvfiles.forEach(function (item) {
                if (item.serialno == that.selectedFile) {
                    csvdata = parseCSV(item.contents)
                }
            })
            return csvdata
        },
        headers() {
            var headers = []
            this.titleColumns.forEach(function (header) {
                headers.push({ text: header, value: header })
            })
            if (this.columnsToExtract.length > 0)
                headers.push({ text: 'Raw Text', value: 'Raw Text' })
            if (this.showEntityColumn)
                headers.push({ text: 'Entity', value: 'Entity' })
            if (this.showKeyPhraseColumn)
                headers.push({ text: 'Phrase', value: 'Phrase' })

            return headers;

        },
        rows() {
            var that = this
            var rows = []

            var count = 0;
            var entities = [];
            var entityrow = []

            if (this.showEntityColumn) {
                var myEntities = that.myEntities()
                if (myEntities && myEntities.documents) {
                    myEntities.documents.forEach(function (doc) {
                        if (doc.id.startsWith(count + ".")) {
                            entityrow = entityrow.concat(doc.entities);

                        } else {
                            count++;
                            entities.push(entityrow);
                            entityrow = (doc.entities);

                        }
                    })
                    entities.push(entityrow);
                }
            }

            count = 0;
            var keyPhrases = []
            var keyPhrasesRow = []

            if (this.showKeyPhraseColumn) {
                var myKeyPhrases = that.myKeyPhrases()
                if (myKeyPhrases && myKeyPhrases.documents) {
                    myKeyPhrases.documents.forEach(function (doc) {
                        if (doc.id.startsWith(count + ".")) {
                            keyPhrasesRow = keyPhrasesRow.concat(doc.keyPhrases);
                        } else {
                            count++;
                            keyPhrases.push(keyPhrasesRow);
                            keyPhrasesRow = (doc.keyPhrases);
                        }
                    })
                    keyPhrases.push(keyPhrasesRow);
                }
            }


            if (this.csvdata != null) {
                this.csvdata.rows.forEach(function (row, idx) {
                    var content = []
                    var newrow = {}
                    that.columnsToExtract.forEach(function (column) {
                        if (that.stripHTMLTag) {
                            content.push(row[column].replace(/(<([^>]+)>)/ig, ""))
                        } else {
                            content.push(row[column])
                        }

                    })

                    newrow['Raw Text'] = content.join('\n')
                    that.titleColumns.forEach(function (column) {
                        newrow[column] = row[column]
                    })

                    var entitiesArray = []
                    if (entities.length > idx) {
                        entities[idx].forEach(function (ent) {
                            entitiesArray.push(ent.name)
                        })
                    }
                    var keyPhrasesArray = []
                    if (keyPhrases.length > idx) {
                        keyPhrases[idx].forEach(function (phrase) {
                            keyPhrasesArray.push(phrase)
                        })
                    }
                    newrow['Entity'] = entitiesArray.join(",")
                    newrow['Phrase'] = keyPhrasesArray.join(",")
                    rows.push(newrow)
                })
            }
            return rows
        },

    },
    methods: {
        ...Vuex.mapMutations([
            'addEntity', 'clearEntity'
        ]),
        chunkSubstr(str, size) {
            if (str.length < size) {
                return [str]
            } else {
                var chunks = new Array()
                var i = 0;
                while (i < str.length) {

                    var end1 = str.lastIndexOf('.', i + size)
                    var end2 = str.lastIndexOf('\n', i + size)
                    var end = Math.max(end1, end2)
                    if (i + size > str.length) {
                        end = -1
                    }
                    var substring = ""
                    if (end == -1) {
                        substring = str.substring(i)
                        i = str.length
                    }
                    else {
                        substring = str.substring(i, end)
                        i = end + 1
                    }
                    chunks.push(substring)

                }

                return chunks
            }
        },
        prepareDocuments(size) {
            var results = []
            var documents = {
                'documents': []
            }
            var extra = false;
            for (var i = 0; i < this.rows.length; i++) {
                var rawText = this.rows[i]['Raw Text']
                var chunked = this.chunkSubstr(rawText, 4096)
                chunked.forEach(function (doc, docidx) {
                    documents.documents.push({ 'id': i + "." + docidx, 'language': 'en', 'text': doc })
                    extra = true
                    if (documents.documents.length == size) {
                        results.push(documents)
                        documents = {
                            'documents': []
                        }
                        extra = false
                    }
                })
            }
            if (extra) {
                results.push(documents)
            }
            return results;
        },
        extract() {
            // var that = this
            // this.csvfiles.forEach(function (item) {
            //     if (item.serialno == that.selectedFile) {
            //         var csvdata = parseCSV(item.contents)
            //         that.rows = []
            //         that.headers = []
            //         that.headers.push({ text: csvdata[0][j], value: csvdata[0][j] })
            //         csvdata.headers.forEach(function(header){
            //             that.headers.push(header)
            //         })
            //         that.headers.push({ text: 'Raw Text', value: 'Raw Text' })
            //         that.headers.push({ text: 'Entity', value: 'Entity' })
            //         that.headers.push({ text: 'Phrase', value: 'Phrase' })

            //         csvdata.rows.forEach(function(row){
            //             var content = []
            //             var newrow = {}
            //             that.columnsToExtract.forEach(function(colum){
            //                 content.push(row[column])
            //             })
            //             newrow['Raw Text'] = content
            //             that.titleColumns.forEach(function(column){
            //                 newrow[column] = row[column]
            //             })
            //             that.rows.push(newrow)
            //         })
            //     }
            // })
            var that = this;
            // var documents = { 'documents': [
            //     { 'id': '1.0', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
            //     { 'id': '2.0', 'language': 'es', 'text': 'Si usted quiere comunicarse con Carlos, usted debe de llamarlo a su telefono movil. Carlos es muy responsable, pero necesita recibir una notificacion si hay algun problema.' },
            //     { 'id': '3.0', 'language': 'en', 'text': 'The Grand Hotel is a new hotel in the center of Seattle. It earned 5 stars in my review, and has the classiest decor I\'ve ever seen.' }
            // ]};
            // textanalysis(documents, function(result){

            //     that.addEntity([that.selectedFile, result.entities, result.key_phrases])

            //     that.showEntityColumns()


            // }, function(err){
            //     console.log(err.Error)
            // })

            that.clearEntity([that.selectedFile])
            var documents = this.prepareDocuments(100)
            console.log(documents);


            function mytextanalysis(idx) {
                console.log(idx + "/" + documents.length);

                textanalysis(documents[idx], function (result) {

                    that.addEntity([that.selectedFile, result.entities, result.key_phrases])
                    if (idx == documents.length - 1)
                        that.showEntityColumns()
                    else
                        mytextanalysis(idx + 1)



                }, function (err) {
                    console.log(err.Error)
                    alert("Error: " + err.Error)
                })
            }
            mytextanalysis(0)
            // documents.forEach(function(doc, idx){
            //     textanalysis(doc, function(result){

            //             that.addEntity([that.selectedFile, result.entities, result.key_phrases])
            //             countobj.val++;
            //             if(countobj.val == documents.length-1)
            //                 that.showEntityColumns()


            //         }, function(err){
            //             console.log(err.Error)
            //     })
            // })


        },
        showEntityColumns() {
            this.showEntityColumn = true
            this.showKeyPhraseColumn = true
        },
        myEntities() {
            var that = this
            var entities = []
            var index = -1
            this.csvfiles.forEach(function (item, idx) {
                if (item.serialno == that.selectedFile) {
                    index = idx
                }
            })
            if (index != -1) {
                entities = this.entities[index].entities
            }
            return entities;

        },
        myKeyPhrases() {
            var that = this
            var keyPhrases = []
            var index = -1
            this.csvfiles.forEach(function (item, idx) {
                if (item.serialno == that.selectedFile) {
                    index = idx
                }
            })
            if (index != -1) {
                keyPhrases = this.entities[index].keyPhrases
            }
            return keyPhrases;

        },
        clear() {
            this.selectedFile = null
            this.columnsToExtract = []
            this.titleColumns = []
        }
    },
    mounted: function () {
        window.extractvm = this;
    }
});

Vue.component("category-rule-view", {
    template: '#category-rule-template',
    store: store,
    data: function () {
        return {
            selectedFile: null,
        }
    },
    methods: {
        ...Vuex.mapMutations([
            'addCategory', 'removeCategory', 'addCategoryRule'
        ]),
        addCate() {
            this.addCategory([this.selectedFile, "Category"])
        },
        addRule(category) {
            this.addCategoryRule([this.selectedFile, category, "Rule"])
        }
    },
    computed: {
        ...Vuex.mapState([
            'csvfiles',
            'extractsettings',
            'entities',
            'categoryrules',
            'results'
        ]),
        categories() {
            var that = this
            var categories = []
            this.csvfiles.forEach(function (item, idx) {
                if (item.serialno == that.selectedFile) {
                    categories = that.categoryrules[idx]
                }
            })
            return categories
        },
        myEntities() {
            var that = this
            var entities = []
            var index = -1
            this.csvfiles.forEach(function (item, idx) {
                if (item.serialno == that.selectedFile) {
                    index = idx
                }
            })
            if (index != -1) {
                var resultEntities = []
                entities = this.entities[index].entities
                this.entities[index].entities.documents.forEach(function (doc) {
                    doc.entities.forEach(function (docEnt) {
                        if (resultEntities.indexOf(docEnt.name) == -1)
                            resultEntities.push(docEnt.name)
                    })
                })
                return resultEntities
            }
            return [];

        },
        myKeyPhrases() {
            var that = this
            var keyPhrases = []
            var index = -1
            this.csvfiles.forEach(function (item, idx) {
                if (item.serialno == that.selectedFile) {
                    index = idx
                }
            })
            if (index != -1) {
                var resultPhrases = []
                this.entities[index].keyPhrases.documents.forEach(function (doc) {
                    doc.keyPhrases.forEach(function (docPhrase) {
                        if (resultPhrases.indexOf(docPhrase) == -1)
                            resultPhrases.push(docPhrase)
                    })
                })
                return resultPhrases
            }
            return keyPhrases;

        },
    }
});


var vm = new Vue({
    el: '#app',
    router: router,
    store: store,
    data: {
        drawer: null

    },
    methods: {
        ...Vuex.mapMutations([
            'saveProject', 'importProject', 'setScreenWidth'
        ]),
        exportCSV() {

        },
        onResize() {
            this.setScreenWidth($("#container").width())
        }
    },
    mounted: function () {
        router.push({ name: 'analysis-view' })
        findEntities()
    }
})


function clickElem(elem) {
    // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
    var eventMouse = document.createEvent("MouseEvents")
    eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    elem.dispatchEvent(eventMouse)
}
function openFile(func) {
    var readFile = function (e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.fileName = file.name
        reader.lastModifiedDate = file.lastModifiedDate
        reader.size = file.size
        reader.onload = function (e) {
            var contents = e.target.result;
            var fname = e.target.fileName;
            var size = e.target.size;
            var lastModifiedDate = e.target.lastModifiedDate;
            fileInput.func(fname, size, lastModifiedDate, contents)
            document.body.removeChild(fileInput)
        }
        reader.readAsText(file)
    }
    var fileInput = document.createElement("input")
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.onchange = readFile
    fileInput.func = func
    document.body.appendChild(fileInput)
    clickElem(fileInput)
}

function parseCSV(csvcontent) {

    // var csvdata = new CSV(csvcontent, { header: true }).parse();
    var csvdata = CSV.parse(csvcontent);
    var rows = [];
    var headers = [];
    if (csvdata.length > 0) {
        for (var j = 0; j < csvdata[0].length; j++) {
            headers.push({ text: csvdata[0][j], value: csvdata[0][j] })
        }
        for (var i = 1; i < csvdata.length; i++) {
            var row = {}
            for (var j = 0; j < csvdata[0].length; j++) {
                row[csvdata[0][j]] = csvdata[i][j]
            }
            rows.push(row);
        }
    }
    return { headers: headers, rows: rows }
}

function encodeCSV(header, data) {
    var csv = new CSV(data, { header: header }).encode();
    var blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "data.csv");
}

function textanalysis(documents, succ, err) {


    $.ajax({
        type: "POST",
        url: '/textanalysis',
        data: JSON.stringify({ documents: documents }),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            succ(result)

        },
        error: function (xhr, ajaxOptions, thrownError) {
            err(xhr);
        }
    });
}

function ajaxBuildModel(entities, succ, err) {


    $.ajax({
        type: "POST",
        url: '/build',
        data: JSON.stringify({ entities: entities }),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            succ(result)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            err(xhr);
        }
    });
}

function ajaxExtractEntity(text, entities, succ, err) {


    $.ajax({
        type: "POST",
        url: '/extractentity',
        data: JSON.stringify({ text: text, entities: entities }),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            succ(result)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            err(xhr);
        }
    });
}

function findEntities() {
    var manager = new NLPJS.NerManager({ threshold: 0.8 })
    manager.addNamedEntityText(
        'hero',
        'spiderman',
        ['en'],
        ['Spiderman', 'Spider-man'],
    );
    manager.addNamedEntityText(
        'hero',
        'iron man',
        ['en'],
        ['iron man', 'iron-man'],
    );
    manager.addNamedEntityText('hero', 'thor', ['en'], ['Thor']);
    manager.addNamedEntityText(
        'food',
        'burguer',
        ['en'],
        ['Burguer', 'Hamburguer'],
    );
    manager.addNamedEntityText('food', 'pizza', ['en'], ['pizza']);
    manager.addNamedEntityText('food', 'pasta', ['en'], ['Pasta', 'spaghetti']);
    manager.findEntities(
        'I saw spederman eating speghetti in the city',
        'en',
    ).then(entities => {
        console.log(entities)
    })
}