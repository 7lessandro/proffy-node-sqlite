const proffys = [
    { 
     name: "Diego Fernandes",
     avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
     whatsapp: "999999999",
     biografy: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
     subject: "Química", 
     cost: "20",
     weekday: "[0]",
     time_from: "[720]",
     time_to: "[1220]" 
    },

    { 
     name: "Daniele Evangelista",
     avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
     whatsapp: "999999999",
     bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
     subject: "Química", 
     cost: "20",
     weekday: "[1]",
     time_from: "[720]",
     time_to: "[1220]" 
    },

    { 
        name: "Alessandro Ascencio",
        avatar: "https://avatars0.githubusercontent.com/u/67256775?s=400&u=582a06ca973237e0d3281a81b043da826af8f275&v=4",
        whatsapp: "15991986577",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química", 
        cost: "20",
        weekday: "[1]",
        time_from: "[720]",
        time_to: "[1220]" 
       }
]

const Database = require('./Database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

//funções para redirecionar no .get
function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    const filters = req.query

    if (!filters.subject|| !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes (filters.time)

    const query = `
          SELECT classes.*, proffys.*
          FROM proffys
          JOIN classes ON (classes.proffy_id = proffys.id)
          WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
          )
          AND classes.subject = '${filters.subject}'
        `

        //caso haja erro na consulta do banco de dados.
        try {
            const db = await Database
            const proffys = await db.all(query)

            return res.render("study.html", { proffys, subjects, filters, weekdays })
            
        } catch (error) {
            console.log(error)
        }
}

function pageGiveClasses(req, res){   

    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
        
        const createProffy = require('./database/createProffy')

        const proffyValue = {
            name: req.body.name,
            avatar: req.body.avatar,
            whatsapp: req.body.whatsapp,
            biografy: req.body.biografy
        }

        const classValue = {
            subject: req.body.subject,
            cost: req.body.cost
        }
        
        const classScheduleValues = req.body.weekday.map((weekday) => {

            return {
                weekday,
                time_from: convertHoursToMinutes (req.body.time_from[index]),
                time_to: convertHoursToMinutes (req.body.time_to[index])
            }

        })

        try {
            const db = await Database
            await createProffy(db, { proffyValue, classValue, classScheduleValues })
            
            let queryString = "?subject=" + req.body.subject
            queryString += "&weekday=" + req.body.weekday[0] 
            queryString += "&time=" + req.body.time_from[0] 

            return res.redirect("/study" + queryString)

        } catch (error) {
            console.log(error)
            
        }
        
}
 

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}