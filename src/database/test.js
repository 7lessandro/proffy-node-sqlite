const Database = require('./db')
const createProffy = require('./createProffy')

Database.then( async (db) => {
    //Inserir dados
    proffyValue = {
        name: "Alessandro",
        avatar: "https://avatars0.githubusercontent.com/u/67256775?s=460&u=582a06ca973237e0d3281a81b043da826af8f275&v=4",
        whatsapp: "15991986577",
        biografy: "Programador fodão um dia, com certeza"
    }

    classValue = {  
        subject: "1",
        cost: "30",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }

    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar dados inseridos

    //todos os proffys

    const selectedProffys = await db.all("SELECT * FROM proffys")
    console.log(selectedProffys)

    //consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    //SELECT a tabela de informações "FROM" (de qual db) proffys e JOIN (juntou) ON com todas informações para dar o ID do proffy
    //e inseriu que a mesma é = 1 para  o numero ir sucessivamente 

    console.log(selectClassesAndProffys)

    //o  horário que a pessoa trabalha por exemplo, é das 8h - 18h
    //o horário do time_from é (8h), precisa ser menor ou igual  ao horário solicitado
    //o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

})