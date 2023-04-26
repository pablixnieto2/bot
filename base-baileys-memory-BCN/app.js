const express = require('express')
const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

//Apagar el bot
let GLOBAL = false

const flujoON =  addKeyword('bot OFF').addAction(async(ctx, {flowDynamic, endFlow}) => {
    GLOBAL = false
})

const flujoOFF =  addKeyword('bot ON').addAction(async(ctx, {flowDynamic, endFlow}) => {
    GLOBAL = true
})


// Flujo terminal

const flowTerminal = addKeyword('supercalifragilisticoespialidoso')
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })
    .addAnswer('👻👻👻👻')

// Otros flows

const flowTiempo = addKeyword(['cuanto tiempo antes','cuánto tiempo antes', 'cuantos meses antes', 'cuantas semanas antes','cuánto tiempo antes','cuanto tiempo antes','cuanta antelación','cuanta antelacion'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })     
    .addAnswer(['El tiempo dependerá:','- Para los modelos en *Venta*, dependiendo del modelo que elijas puede tardar desde 2 semanas hasta 6 meses.','- En *Alquiler* te recomendamos venir con 3 o 4 meses de antelación, de esta manera tendrás muchísima variedad para elegir'],{delay: 2000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 7000,})


 const flowNovias = addKeyword(['vestidos de novia','vestidos de novias'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    }) 
    .addAnswer('Disculpa, por el momento no tenemos disponibles vestidos de novia.',{delay: 2000,})
    .addAnswer('Constantemente sacamos nuevos productos','Siguenos en nuestras redes para ser la primera en enterarte:',{delay: 3000,})
    .addAnswer('www.instagram.com/vestidos15/',{delay: 1000,})
    .addAnswer('www.tiktok.com/@vestidos15/',{delay: 1000,})


const flowTallas = addKeyword(['r su talla','r la talla','e talla le queda','si le queda el vestido','le quedara el vestido','o las medidas'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    }) 
    .addAnswer(['Tenemos vestidos en todas las tallas, pero igualmente todos los vestidos tienen corset ajustable'],{delay: 3000,})
    .addAnswer(['Si no sabes cual es la talla puedes usar nuestra guía de tallas:','guiadetallas.vestidos15.es'],{delay: 3000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más tallas para escoger*:','www.citas.vestidos15.es'],{delay: 5000,})


const flowProbar = addKeyword(['puede probar','pueden probar','quiero probar'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })      
    .addAnswer(['Sí, los vestidos se pueden probar 🙂'],{delay: 3000,})
    .addAnswer('*¿Dónde prefieres ver nuestros vestidos?*',
     {
             buttons: [
                 { body: '👉 En Madrid' },
                 { body: '👉 En Barcelona' },
                 { body: '📱 Por Videollamada' },
         ],
     }
     )

const flowAccesorios = addKeyword(['precio de la tiara','precio del cojin','precio de las invitaciones','precio del ramo','precio tienen las invitaciones'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })      
    .addAnswer(['Puedes ver los accesorios, invitaciones y complementos en nuestra web:','www.vestidos15.es'],{delay: 3000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos y accesorios para escoger*:','www.citas.vestidos15.es'],{delay: 5000,})

const flowAlquiler = addKeyword(['funciona el alquiler','explicar el alquiler','funciona el alkiler','explicar el alkiler'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })       
    .addAnswer(['*Vestido:*','Para alquilar es necesario un documento de identidad y 100€ de fianza que se devuelven al entregar el vestido.','El alquiler del vestido es por 4 días, se entrega el viernes y la devolución es el lunes.','*Envio:*','Si el alquiler necesitas que te lo enviemos son aproximadamente +€30 del envío (Incluye ida y regreso), si lo recoges y lo entregas en tienda no tiene coste.','*Entrega:*','Las entregas se hacen los viernes de 5 a 7 de la tarde','*Devolución:*','Las devoluciones se deben hacer el lunes, entre las 5 y la 7 de la tarde'],{delay: 3000,})
    .addAnswer(['Pide ya tu cita aquí para tener más opciones de vestidos:','www.citas.vestidos15.es'],{delay: 7000,})


const flowDamas = addKeyword(['n vestidos de dama'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Te mando algunos de nuestros modelos de Dama'])
    .addAnswer('https://quinceaños.es/producto/vestido-corto-blanco-dama-acompanantes/',{delay: 5000,})
    .addAnswer(['https://quinceaños.es/producto/vestido-corto-vivi-rojo-2/'],{delay: 2000,})
    .addAnswer(['https://quinceaños.es/producto/vestido-corto-vivi-rosa-2/'],{delay: 2000,})
    .addAnswer(['https://quinceaños.es/producto/vestido-corto-vivi-vino-2/'],{delay: 2000,})
    .addAnswer(['https://quinceaños.es/producto/vestido-corto-vivi-azul-2/'],{delay: 2000,})
    .addAnswer(['https://quinceaños.es/producto/vestido-corto-vivi-fucsia-2/'],{delay: 2000,})
    .addAnswer(['Dependiendo del modelo de estos vestidos que te he enviado, el Alquiler ronda los 20€ y en venta unos 75€'],{delay: 4000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 7000,})

const flowCortos = addKeyword(['n vestidos corto','n vestido en corto'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Disponemos de vestidos cortos','algunos de los vestidos largos los tenemos también en su versión corta.'],{delay: 4000,})
    .addAnswer(['Puedes ver algunos modelos en nuestra web:','www.vestidos15.es'],{delay: 3000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 7000,})

const flowRecoger = addKeyword(['r buscar el vestido'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['*Entrega:*','Las entregas se hacen los viernes de 5 a 7 de la tarde','*Devolución:*','Las devoluciones se deben hacer el lunes, entre las 5 y la 7 de la tarde'],{delay: 3000,})

const flowPagoaplazos = addKeyword(['pagando poco a poco', 'pago a plazos', 'pago aplazado'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Sí, puedes pagar en tantos plazos como necesites para tu vestido de Alquiler o de Venta.','Ahora bien, el vestido solamente se te entregará o se te enviará cuando hayas abonado el importe total.'],{delay: 2000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 7000,})

 const flowDecoracion = addKeyword(['n decoracion'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer('Nosotros no hacemos decoración para fiestas, pero podemos recomendarte muy buenas decoradoras cuando vengas a tu cita.',{delay: 2000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 5000,})

 const flowRecuerdos = addKeyword(['n recuerdos'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer('Algunos recuerdos que tenemos disponibles son:')
    .addAnswer(['*Las muñecas* son de 13 de alto * 6 ancho, vienen con cinta  y una tarjeta pequeña que se combina según el color del vestido o decoración de la fiesta y viene escrito el Nombre de la Quinceañera y la fecha de su cumpleaños','*Precio:* €2.50/unidad'],{media:'https://xn--quinceaos-r6a.es/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-18-at-12.06.02.jpeg'},{delay: 2000,})
    .addAnswer(['*Los llaveros*, vienen contramarcados con el Nombre de la quinceañera y la fecha de su cumpleaños','*Precio:* €2.50/unidad'],{media:'https://xn--quinceaos-r6a.es/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-18-at-12.06.04.jpeg'},{delay: 5000,})
    .addAnswer(['Disponemos de más recuerdos que te encantarán 😍','Pide tu cita para venir a ver todos nuestros recuerdos disponibles:','www.citas.vestidos15.es'],{delay: 12000,})

 const flowPrecioenvio = addKeyword(['cuesta el envio a','con el envio'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['El precio del envío dependerá del tamaño del paquete, no solamente del destino.','Ten en cuenta que nosotros no ganamos nada por el envío y buscamos siempre la alternativa más adecuada y económica para que tengas tu vestido a tiempo.','Por ejemplo: el envío de un vestido ida/vuelta de alquiler dentro de España ronda los 35€'],{delay: 2000,})
    .addAnswer('Ofrecemos un servicio online por *videollamada*, donde te enseñaremos nuestra colección de vestidos.',{delay: 5000,})
    .addAnswer('El servicio de Videollamada está pensado para aquellas personas que por cualquier motivo no pueden desplazarse hasta nuestras tiendas de Madrid y Barcelona.','¿Desde dónde nos escribes?',
     {
             buttons: [
                 { body: 'España 🌹' },
                 { body: 'Fuera de España 📦🌍' },
         ],
     }
     )


 const flowCatalogo = addKeyword(['r el catálogo','r el catalogo','n catálogo','n catalogo'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Puedes ver nuestros muchos modelos en instagram o en nuestra web:'],{delay: 2000,})
    .addAnswer('📷 www.instagram.com/vestidos15/',{delay: 2000,})
    .addAnswer('🌐 www.vestidos15.es',{delay: 2000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 5000,})


 const flowSeguimiento = addKeyword(['seguimiento','numero de envio','tracking','seguir el envio'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['⚠️ Lo reviso y te digo'],{delay: 2000,})

// Flow Fotos

 const flowLugarmadrid = addKeyword(['📷 En Madrid','fotos en madrid'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['🌳🏰 El lugar lo escoge usted, nosotros les damos  algunas opciones donde las fotos quedan muy lindas, pero si quieres otro lugar no hay ningún problema.'],{delay: 3000,})
    .addAnswer(['Sugerencias de lugares para fotos:','- Parque Europa','- Parque Retiro','- Puerta de Alcalá','- Parque Capricho','- Parque Juan Carlos','- Palacio Real'],{delay: 2000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 7000,})

 const flowLugarbarcelona = addKeyword(['📷 En Barcelona','fotos en barcelona'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['🌳🏰 El lugar lo escoge usted, nosotros les damos  algunas opciones donde las fotos quedan muy lindas, pero si quieres otro lugar no hay ningún problema.'],{delay: 3000,})
    .addAnswer(['Sugerencias de lugares para fotos:','- Sagrada Familia y alrededores','- Parc de la Ciutadella','- Playa de la Barceloneta','- Plaza España y Montjuic','- Catedral de Barcelona','- Port Vell'],{delay: 2000,})
    .addAnswer(['Pide tu cita *cuanto antes* para tener *más vestidos para escoger*:','www.citas.vestidos15.es'],{delay: 10000,})

 const flowLugares = addKeyword(['lugar para fotos','donde hacer fotos','donde haser fotos','lugares de fotos','lugar de fotos','lugares para fotos','donde puedo hacer fotos'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['🌳🏰 El lugar para las fotos lo escoge usted, nosotros les damos  algunas opciones donde las fotos quedan muy lindas, pero si quieres otro lugar no hay ningún problema.'])
    .addAnswer('*Sugerencias de lugares para fotos:*',
     {
         buttons: [
                 { body: '📷 En Madrid' },
                 { body: '📷 En Barcelona' },
         ],
     }
     )

 const flowFotos = addKeyword(['paquete de fotos','paquete fotos','session de fotos','secion de fotos','sesion de fotos','sesión de fotos','cesion de fot','cesión de fot','secciones de fotos','necesito fot','quiero fot','busco fot','tienen fot'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Disponemos de paquete de fotos, este *Incluye:*','👗Alquiler de Vestido con cancan * 4 días','📷 De 30 /40 fotos digitales','📙 + 1 álbum físico de 26 fotos','💃🏽 1 hora y media con el fotógrafo','🌅 Se realiza en exterior','💶 Precio 330 €','🚫El paquete no incluye maquillaje ni accesorios'],{delay: 10000,})
    .addAnswer('Te doy *algunas sugerencias* de lugares para fotos:',
     {
         buttons: [
                 { body: '📷 En Madrid' },
                 { body: '📷 En Barcelona' },
         ],
     }
     )

//Flow ubicación

 const flowMadrid = addKeyword(['👉 En Madrid','estoy en madrid','vivo en madrid','soy de madrid','la tienda en madrid','En Madrid'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Estamos ubicados en','Calle Hernani 1, 1ª Planta','🚃 Metro Cuatro Caminos','*Horario*', 'De Lunes a Viernes de 4:00 a 8:00 pm','Sábados de 10:00 am a 2:00 pm'])
    .addAnswer('🗓️🕒 Atendemos *solo con cita previa*!',{delay: 6000,})
    .addAnswer(['Puedes pedir una cita aquí:','www.citas.vestidos15.es'],{delay: 7000,})

 const flowBarcelona = addKeyword(['👉 En Barcelona','estoy en barcelona','vivo en barcelona','soy de barcelona','la tienda en Barcelona','En Barcelona'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Estamos ubicados en','Carrer dels Rajolers, 8','Junto a la estación de Sants','*Horario*', 'De lunes a viernes de 5:00 a 8:00 pm','Sábados de 4:00 a 7:00 pm'])
    .addAnswer('🗓️🕒 Atendemos *solo con cita previa*!',{delay: 6000,})
    .addAnswer(['Puedes pedir una cita aquí:','www.citas.vestidos15.es'],{delay: 7000,})


const flowVideollamada = addKeyword(['📱 Por Videollamada'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Ofrecemos un servicio online por *videollamada*, donde te enseñaremos nuestra colección de vestidos y te explicaremos cómo funcionan los envios en caso de que lo necesites.'],{delay: 2000,})
    .addAnswer('¿Desde dónde nos escribes?',
     {
             buttons: [
                 { body: 'España 🌹' },
                 { body: 'Fuera de España 📦🌍' },
         ],
     }
     )

 const flowUbicacion = addKeyword(['ubica','uvica','hubica','n de la tienda','de donde son','queda la tienda','esta la tienda','está la tienda','tienen tienda','tienda fisica','tienda física','madrid o barcelona','barcelona o madrid','donde estan','donde están','donde son','dónde son','donde esta la tienda','dónde está la tienda'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer('Tenemos tiendas en *Barcelona* y en *Madrid*, también hacemos envíos a toda Europa 📦🌍',{delay: 7000,})
    .addAnswer('*¿Dónde prefieres ver nuestros vestidos?*',
     {
             buttons: [
                 { body: '👉 En Madrid' },
                 { body: '👉 En Barcelona' },
                 { body: '📱 Por Videollamada' },
         ],
     }
     )


//Flow cita
const flowCita = addKeyword(['r una cita','r una sita','o una cita','o una sita','r cita','r sita','r la cita'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer('*¿Dónde prefieres tener *tu cita*?*',
    {
        buttons: [
            { body: '👉 En Madrid' },
            { body: '👉 En Barcelona' },
            { body: '📱 Por Videollamada' },
        ],
    })

// Flujos fuera de Madrid y Barcelona

 const flowFuera = addKeyword(['Fuera de España 📦🌍','fuera de España','extranjero','en colombia','en Venezuela','en Uruguay', 'en Ecuador', 'en Bolivia','en Peru','en argentina','en puerto rico','en panama','en republica dominicana','e colombia','e Venezuela','e Uruguay', 'e Ecuador', 'e Bolivia','e Peru','e argentina','e puerto rico','e panama','e republica dominicana'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Genial! Los vestidos *en Venta* los enviamos *a todo el mundo*!! ✈️📦','En cuanto a los vestidos de alquiler, de momento no hacemos envios al extranjero'],{delay: 4000,})
    .addAnswer(['Puedes *comprar nuestros vestidos* y calcular el precio de envío directamente en nuestra web','www.vestidos15.es'],{delay: 6000,})

const flowEspana = addKeyword(['España 🌹','soy de','estoy en','fuera de madrid','fuera de barcelona'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer('Los vestidos en *Alquiler y Venta* los enviamos *a toda España*',{delay: 2000,})
    .addAnswer(['Te envío nuestro catálogo de vestidos disponibles para *Alquiler y Venta*:','www.envios.vestidos15.es'],{delay: 8000,})
    .addAnswer(['Puedes pedir una Cita 📱 Por Videollamada aquí:','www.citas.vestidos15.es'],{delay: 7000,})

// Flow precios

 const flowPrecios = addKeyword(['Cuanto cuestan los vestidos','precio de los vestidos','cuestan los vestidos   ','precio tienen','cuánto cuestan los vestidos','cuanto vale este','que vale este','qué vale este','cuanto valen los vestidos','cuánto valen los vestidos','precio de los vestidos','precio alquiler','precio de este enventa','cual es el valor','precio alquiler','precio alkiler','precio del alquiler','precio del alkiler','precio en alquiler','precio en alkiler','queria cotizar','queria kotizar','el costo','cuanto sale','cuánto sale'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Tenemos muchísimas opciones de vestidos que te encantarán 😍','En *Alquiler* desde 80€ a 160€','En *Venta* desde 199€ a 999€'])
    .addAnswer('*Los accesorios* tienen *descuentos* reservando tu vestido.',{delay: 8000,})
    .addAnswer('Cuanto *antes vengas* más opciones de vestidos tendrás para elegir ',{delay: 5000,})
    .addAnswer(['Pide tu cita aquí:','www.citas.vestidos15.es'],{delay: 3000,})

 // Flow Servicios
 const flowServicios = addKeyword(['o informacion','ia informac','estoy buscando un vestido','fb.me','https://fb','busco bestido','busco vestido','Cumplo quince años','s información', 's informacion']) 
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })      
    .addAnswer(['Te cuento, en Vestidos 15 te ofrecemos Vestidos en *Alquiler* o en *Venta* para tu fiesta de 15 años.','También tenemos vestidos para Damas, Invitaciones, y accesorios para la quinceañera como Tiaras y coronas, cojines para la Sandalia, collares, etc'],{delay: 5000,})
    .addAnswer('Si también quieres *fotos en tu fiesta* o *en un parque*, disponemos de *Paquetes de Fotos con vestido incluido.*',{delay: 3000,})
    .addAnswer('*¿Dónde prefieres ver nuestros vestidos?*',
     {
             buttons: [
                 { body: '👉 En Madrid' },
                 { body: '👉 En Barcelona' },
                 { body: '📱 Por Videollamada' },
         ],
     }
     )

// Flows Programas y Desfiles

 const flowEmbajadoras = addKeyword(['Embajadoras','Programa de embajadoras'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Por el momento no tenemos disponible el programa de embajadoras, pero no te preocupes, constantemente sacamos nuevas convocatorias.','Siguenos en nuestras redes para ser la primera en enterarte:'],{delay: 2000,})
    .addAnswer('www.instagram.com/vestidos15/',{delay: 1000,})
    .addAnswer(['www.tiktok.com/@vestidos15/'],{delay: 1000,})

 const flowModelaje = addKeyword(['Clases de modelaje'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['Por el momento no tenemos disponibles clases de modelaje, pero no te preocupes, constantemente sacamos nuevas actividades.','Siguenos en nuestras redes para ser la primera en enterarte:'],{delay: 2000,})
    .addAnswer('www.instagram.com/vestidos15/',{delay: 1000,})
    .addAnswer('www.tiktok.com/@vestidos15/',{delay: 1000,})

 const flowDesfile = addKeyword(['el desfile'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })         
    .addAnswer(['En *Madrid* y *Barcelona* pronto haremos también un desfile','Siguenos en nuestras redes para ser la primera en enterarte:'],{delay: 4000,})
    .addAnswer('www.instagram.com/vestidos15/',{delay: 1000,})
    .addAnswer('www.tiktok.com/@vestidos15/',{delay: 1000,})

// Flows de satisfacción

const flowExcelentebcn = addKeyword(['🤩 Excelente!'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Nos alegra mucho que tu experiencia haya sido positiva!'])
    .addAnswer(['Ayudanos dejandonos un review en Google 🙏, sólo te llevará un minuto','https://g.page/r/CV5Hso0Yqd-CEAg/review'],{ capture: true },null,[flowTerminal])

const flowExcelentemad = addKeyword(['🤩 Excelente!!'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Nos alegra mucho que tu experiencia haya sido positiva!'])
    .addAnswer(['Ayudanos dejandonos un review en Google 🙏, sólo te llevará un minuto','https://g.page/r/CajU9L_dQ3FBEAg/review'],{ capture: true },null,[flowTerminal])

const flowExcelentevideo = addKeyword(['Excelente!! 🤩🤩'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })           
    .addAnswer(['Nos alegra mucho que tu experiencia haya sido positiva!'])
    .addAnswer(['Ayudanos dejandonos un review en Google 🙏, sólo te llevará un minuto','https://g.page/r/Cev6L-i4YcuqEB0/review'],{ capture: true },null,[flowTerminal])

const flowNormalmala = addKeyword(['🙂 Normal 🙂','😮‍💨 Mala 😮‍💨'])
    .addAction(async(ctx, {flowDynamic, endFlow}) => {
    if(!GLOBAL) return endFlow()
    })          
    .addAnswer(['Nos encantaría saber en qué podemos mejorar'],{ capture: true },null,[flowTerminal])

const app = express()
const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([
        flowTiempo,
        flowNovias,
        flowTallas,
        flowProbar,
        flowAccesorios,
        flowAlquiler,
        flowDamas,
        flowCortos,
        flowRecoger,
        flowPagoaplazos,
        flowDecoracion,
        flowRecuerdos,
        flowPrecioenvio,
        flowCatalogo,
        flowSeguimiento,
        flowLugarmadrid,
        flowLugarbarcelona,
        flowLugares,
        flowFotos,
        flowMadrid,
        flowBarcelona,
        flowVideollamada,
        flowUbicacion,
        flowCita,
        flowEspana,
        flowPrecios,
        flowServicios,
        flowEmbajadoras,
        flowModelaje,
        flowDesfile,
        flowExcelentebcn,
        flowExcelentemad,
        flowExcelentevideo,
        flowNormalmala,
        flujoON,
        flujoOFF])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
 /**
     * Enviar mensaje con metodos propios del provider del bot
     */
app.use(express.json());
app.post('/send-message', async (req, res) => {
    const { to, message } = req.body;
    await adapterProvider.sendText(to, message);
    res.send({ data: 'enviado!' });
  });   // json format: {"to": "34XXXXXXXXX@c.us", "message": "Hola tia buena"}

app.post('/send-file', async (req, res) => {
    const { to, media } = req.body;
    await adapterProvider.sendFile(to, media);
    res.send({ data: 'enviado!' });
});     // json format: {"to": "34XXXXXXXXX@c.us", "media": "https://arenaweb.net/wp-content/uploads/2023/01/Bebidas-Demo.pdf","answer": "Este es un pdf"}

app.post('/send-button-bcn', async (req, res) => {
    const { to } = req.body;
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: '🤩 Excelente!'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: '🙂 Normal 🙂'}, type: 1},
        {buttonId: 'id3', buttonText: {displayText: '😮‍💨 Mala 😮‍💨'}, type: 1}
      ]

      const buttonMessage = {
        text: "Muchas gracias por tu compra en Vestidos15. ¿Cómo calificarías tu experiencia de compra en Vestidos 15?",
        footer: 'Mensaje generado automáticamente',
        buttons: buttons
    }
    

    const abc = await adapterProvider.getInstance()
    await abc.sendMessage(to, buttonMessage)

    res.send({ data: 'enviado!' });
});    // Json format: {    "to": "34XXXXXXXXXX@c.us" }
  
app.post('/send-button-mad', async (req, res) => {
    const { to } = req.body;
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: '🤩 Excelente!!'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: '🙂 Normal'}, type: 1},
        {buttonId: 'id3', buttonText: {displayText: '😮‍💨 Mala'}, type: 1}
      ]

      const buttonMessage = {
        text: "Muchas gracias por tu compra en Vestidos15. ¿Cómo calificarías tu experiencia de compra en Vestidos 15?",
        footer: 'Mensaje generado automáticamente',
        buttons: buttons
    }
    

    const abc = await adapterProvider.getInstance()
    await abc.sendMessage(to, buttonMessage)

    res.send({ data: 'enviado!' });
});    // Json format: {    "to": "34XXXXXXXXXX@c.us" }

app.post('/send-button-video', async (req, res) => {
    const { to } = req.body;
    const buttons = [
        {buttonId: 'id1', buttonText: {displayText: 'Excelente!! 🤩🤩'}, type: 1},
        {buttonId: 'id2', buttonText: {displayText: 'Normal 🙂🙂'}, type: 1},
        {buttonId: 'id3', buttonText: {displayText: 'Mala 😮‍💨😮‍💨'}, type: 1}
      ]

      const buttonMessage = {
        text: "Muchas gracias por tu compra en Vestidos15. ¿Cómo calificarías tu experiencia de compra en Vestidos 15?",
        footer: 'Mensaje generado automáticamente',
        buttons: buttons
    }
    
    const abc = await adapterProvider.getInstance()
    await abc.sendMessage(to, buttonMessage)

    res.send({ data: 'enviado!' });
});    // Json format: {    "to": "34XXXXXXXXXX@c.us" }

    QRPortalWeb()
    
    const PORT = 5001
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

}

main()