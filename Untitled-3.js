let rec, borde, efec, deco;
let player=[];
let fondos = [[]];
let efectos,flashes = [];
let time, carga = [], tuto = 0;
let boton=[] //Cada 5 espacion, seran de un boton. a = [centinela, x, y, w, h] 
// 1-5: Boton de Inicio     6-10: Boton de Creditos     11-15: Boton de Perdiste    
// 16-20: Boton de Ganar    21-25: Boton de Regresar (Back) 26-30 Boton de Skin    
const rel = 4/4
let durex = []
let bicho = [[],[],[]]  
let turnos 
// Parabola
let px,py
let h,k, f,j,vx,vy;
let active = false
//Sonido
let sound =  [[],[],[]]
//Libros (cuadros para las skins)
let block = [[],[],[],[],[],[],[],[],[]]
let sk 

function preload(){
    efec = loadImage("img/efec.png")
    borde = loadImage("img/borde.png")
    rec = loadImage("img/rec.gif")
    player[0] = loadImage("img/mouse.png")
    player[1] = loadImage("img/player.png")
    player[2] = loadImage("img/p2.png")
    player[3] = loadImage("img/p3.png")
    player[4] = loadImage("img/player.png")
    player[5] = loadImage("img/player.png")
    player[6] = loadImage("img/player.png")
    player[7] = loadImage("img/player.png")
    deco = loadImage("img/deco.png")
    fondos[0] = loadImage("img/menu.png")
    fondos[1] = loadImage("img/f1.jpg")
    for (var n1 = 1; n1 <= 4; n1++){
        fondos[1][n1] = loadImage(`img/f1.${n1}.png`)
    }
    for (var n2 = 1; n2 <= 3; n2++){
        flashes[n2] = loadImage(`img/flash${n2}.png`)
    }
    bicho[0][1] = loadImage("img/bat.gif")
    bicho[0][2] = loadImage("img/bat2.gif")
    bicho[0][3] = loadImage("img/ovni.gif")
    for (var n3 = 1; n3 <= 12; n3++){
        carga[n3] = loadImage(`img/bate${n3}.png`)
    }
    sound[0][1] = loadSound("sounds/ambiente2.mp3")
    sound[1][1] = loadSound("sounds/camara_flash.mp3")
    sound[2][1] = loadSound("sounds/murciélago-vuelo-chillido.mp3")
    sound[2][2] = loadSound("sounds/nave.mp3")
    sound[0][1].setVolume(10);
    sound[1][1].setVolume(0.10);
    sound[2][1].setVolume(0.50);
    sound[2][2].setVolume(1);
}
function setup() {
    createCanvas(600, 600);
    menu()
    stroke(0.5)
    textFont("Jersey 15",25)
    rectMode(CENTER);
    imageMode(CENTER);
    fill(0,0,0)
    // Centinelas
    efectos = 0
    turnos = Math.round(random(0.5,3.4))
    //Tiempos
    time = 0
    durex = {
        0: 0, 1: 0
    }
    //Botones
    boton = {
        1: 0, 2: 69, 3: 250, 4: 100, 5: 40,             //      Boton de Inicio
        6: 0, 7: 69, 8: 350, 9: 100, 10: 40,            //      Boton de Creditos 
        11: 0, 12: 300, 13: 300, 14: 100, 15: 40,       //      Boton de Perdiste
        16: 0, 17: 300, 18: 300, 19: 100, 20: 40,       //      Boton de Ganar
        21: 0, 22: 305, 23: 375, 24: 100, 25: 40,       //      Boton de Regresar (Back)
        26: 0, 27: 69, 28: 300, 29: 100, 30: 40         //      Boton de Skin
    }
    //Variables de Calculo
    py = height*0.95
    if (turnos == 1){
        px = width/18
        h = width/18
    }
    else if (turnos == 2){
        px = width*0.9
        h = width*0.9
    }
    f = height*0.95
    k = 200
    vy = height/2
    // PJ
    bicho[1][1]= px+285
    bicho[1][2]= py+270
    bicho[1][3]= px-265
    bicho[1][4]= py+270
    bicho[2][0] = random(380,530)
    bicho[2][1] = random(65,215) 
    bicho[2][2] = 0
    bicho[2][3] = random(65,215)
    bicho[2][4] = 0
    bicho[2][5] = 0
    // Skin
    sk = 1
    var ciclo = 15
    for (var num = 0; num<=8; num++){
        if (num < 4){
            block[num][1] = ciclo = ciclo +110
            block[num][2] = 125
            block[num][3] = 100
            block[num][4] = 100
        }
        else if (num >= 5){
            block[num][1] = ciclo = ciclo -110
            block[num][2] = 250
            block[num][3] = 100
            block[num][4] = 100
        }
        block[4][1] = 455
        block[4][2] = 250
        block[4][3] = 100
        block[4][4] = 100
    }
}
function draw() {
    fill(255)
    ambiente()
    durex[0] = Math.round(time/60)
    if (durex[0] == 60){
        durex[1] += Math.round(durex[0]/60)
        time = 0
    }
    drawRef()
    if (active){
        sonido(1)
        py = cal1(px,h);
        if((!onScreen(px,py) || !onScreen(bicho[2][4], bicho[2][5])) || (captur())){
            sonido(0)
            active = false
            px = h
            bicho[2][0] = random(380,530)
            bicho[2][1] = random(65,215) 
            bicho[2][2] = 0
            bicho[2][3] = random(65,215)
            bicho[2][4]= 0
            turnos = Math.round(random(1,3)) 
            aparicion()
        }
        if (turnos == 1){
            px+=3
          }
        else if (turnos == 2){
            px-=3
        }
        else if (turnos == 3){
            cal2() 
            bicho[2][4]+=6
        }
    }
    
    bicho[1][1]= px+285
    bicho[1][2]= py+270
    bicho[1][3]= px-265
    bicho[1][4]= py+270
}
function menu(){    
    fill(255,255,255,75)
    rect(70, 300,140,200)
    inicio()
    skin()
    creditos()
    p(0)
}
function ambiente(){
    if (boton[1] == 0 || boton[11] == 1 || boton[16] == 1){
        image(fondos[0],300,300,600,600)
        image(player[0],mouseX,mouseY,600,600)
    }
    else if (boton[1] == 1){
        if (turnos == 1){
            for (let n4 = 2; n4 <= 4; n4++){
                image(fondos[1][n4],300,300,600,600)
                objetivos()
                image(fondos[1][1],300,300,600,600)
            } 
        }
        else if (turnos == 2){
            for (let n5 = 3; n5 <= 4; n5++){
                image(fondos[1][n5],300,300,600,600)
                objetivos()
                image(fondos[1][1],300,300,600,600)
                image(fondos[1][2],300,300,600,600)
            }
        }
        else if (turnos == 3){
            for (let n6 = 1; n6 <= 4; n6++){
                image(fondos[1][n6],300,300,600,600)
                objetivos()
                image(fondos[1][4],300,300,600,600)
            }
        }
        if (!sound[0][1].isPlaying()) {
            sound[0][1].play()
        }
        times()
        nivel(1)
    }
    if (boton[6] == 1){
        creditost();
    }
    if(boton[11] == 1){
        nivel(-2)
    }
    if(boton[16] == 1){
        nivel(-1)
    }
    if(boton[21] == 0){
        nivel(0)
    }
    if (boton[26] == 1){
        librery();
    }
}
function nivel(valor){
    if (valor == -2){
        boton[11] = 1
        active = false
        perder()
        sonido(0)
    }
    else if (valor == -1){
        boton[16] = 1
        active = false
        ganar()
        sonido(0)
    }
    else if (valor == 0){
        menu()
    }
    else if (valor == 1){
        fill(255)
        text(durex[0], 306,585)
        text(":", 300,585)
        text(durex[1], 288,585)
        if (efectos > 0){
            text(100-efectos,540,305)
        }
        else{
            text(100+efectos*-1,540,305)
        }
        aparicion()
        d()
        p(sk)
        flash()
    }
}
function times(){
    if (time >= 0){
    time += 1
    }
    if (efectos >= 0 && efectos <= 20){
        image(carga[1],390,380,400,400)
    }
    if (efectos >= 20 && efectos <= 40){
        image(carga[2],390,380,400,400)
    }
    if (efectos >= 40 && efectos <= 60){
        image(carga[3],390,380,400,400)
    }
    if (efectos >= 60 && efectos <= 80){
        image(carga[4],390,380,400,400)
    }
    if (efectos >= 80 && efectos <= 100){
        image(carga[5],390,380,400,400)
    }
    if (efectos >= 100 && efectos <= 120){
        image(carga[6],390,380,400,400)
    }
    if (efectos >= -20 && efectos <= 0){
        image(carga[1],390,380,400,400)
        image(carga[12],390,380,400,400)

    }if (efectos >= -40 && efectos <= -20){
        image(carga[1],390,380,400,400)
        image(carga[11],390,380,400,400)

    }if (efectos >= -60 && efectos <= -40){
        image(carga[1],390,380,400,400)
        image(carga[10],390,380,400,400)

    }if (efectos >= -80 && efectos <= -60){
        image(carga[1],390,380,400,400)
        image(carga[9],390,380,400,400)

    }if (efectos >= -100 && efectos <= -80){
        image(carga[1],390,380,400,400)
        image(carga[8],390,380,400,400)

    }if (efectos >= -120 && efectos <= -100){
        image(carga[1],390,380,400,400)
        image(carga[7],390,380,400,400)

    }
    if (efectos > 100){
        boton[11] = 1
    }
    if (efectos <= -100 || durex == 1){
        boton[16] = 1
    }
}
function p(x){
    if (boton[1] == x && x == 0){
        image(player[0],mouseX,mouseY,600,600)
    }
    if (boton[1] == x && x == 1){
        image(player[1],mouseX,mouseY,300,300)
    }
    else if (boton[1] == x/2 && x == 2){
        image(player[2],mouseX,mouseY,300,300)
    }
    else if (boton[1] == x/3 && x == 3){
        image(player[3],mouseX,mouseY,300,300)
    }
}
function d(){
    image(borde,300,300,600,600)
    image(rec,300,300,600,600)
    image(deco,400,300,400,400)
}
function inicio(){
    if (boton[6] == 1){
        boton[1] = 2
    }
    else if(boton[1] == 0){
        fill(255)
        rect(boton[2],boton[3],boton[4],boton[5])
        fill(0)
        text("Iniciar",boton[2]-27,boton[3]+7)
    }
    var a = colix(mouseX,boton[2],boton[4])
    var b = coliy(mouseY,boton[3],boton[5])
    if (a && b && mouseIsPressed){
        boton[1] = 1
        boton[6] = 2
        boton[21] = 2
    }
}
function perder(){
    if (boton[11] == 1){
        fill(255)
        rect(boton[12],boton[13],boton[14],boton[15])
        fill(0)
        text("Perdiste",boton[12]-39,boton[13]+6)
    }
    var a = colix(mouseX,boton[12],boton[14])
    var b = coliy(mouseY,boton[13],boton[15])
    if (a && b && mouseIsPressed){
        boton[11] = 0
        efectos = 0
        time = 0
        boton[1] = 0
        boton[6] = 0
        boton[21] = 0
        bicho[2][0] = random(380,530)
        bicho[2][1] = random(65,215) 
        bicho[2][2] = 0
        bicho[2][3] = random(65,215)
        bicho[2][4]= 0
        ambiente()
    }
}
function ganar(){
    if (boton[16] == 1){
        fill(255)
        rect(boton[17],boton[18],boton[19],boton[20])
        fill(0)
        text("Ganaste",boton[17]-39,boton[18]+6)
    }
    var a = colix(mouseX,boton[17],boton[19])
    var b = coliy(mouseY,boton[18],boton[20])
    if (a && b && mouseIsPressed){
        boton[16] = 0
        efectos = 0
        time = 0
        boton[1] = 0
        boton[6] = 0
        boton[21] = 0
        bicho[2][0] = random(380,530)
        bicho[2][1] = random(65,215) 
        bicho[2][2] = 0
        bicho[2][3] = random(65,215)
        bicho[2][4]= 0
        ambiente()
    }  
}
function creditos(){
    if (boton[6] == 0){
        fill(255)
        rect(boton[7],boton[8],boton[9],boton[10])
        fill(0)
        text("Creditos",boton[7]-38,boton[8]+7)
    }
    var a = colix(mouseX,boton[7],boton[9])
    var b = coliy(mouseY,boton[8],boton[10])
    if (a && b && mouseIsPressed){
        boton[6] = 1
    }
}
function creditost(){
    rect(boton[22],boton[23]/1.28,boton[9]*3.8,boton[10]*2.25)
    fill(0)
    text("Desarrollado por      Francisco Guerra",135,275)
    text("        Artista               Francisco Guerra",131,325)
    boton[21] = 1
    back();
}
function back(){
    if (boton[21] == 1 ){
      fill(255)
      rect(boton[22],boton[23],boton[24]/1.2,boton[25]/1.2)
      fill(0)
      text("Volver",boton[22]-28,boton[23]+7)
      }
    var a = colix(mouseX,boton[22],boton[24])
    var b = coliy(mouseY,boton[23],boton[25])
    if (a && b && mouseIsPressed){
    boton[21] = 0
    boton[6] = 0
    boton[26] = 0
    }
}
function skin(){
    if (boton[26] == 0){
        fill(255)
        rect(boton[27],boton[28],boton[29],boton[30])
        fill(0)
        text("Skins",boton[27]-24,boton[28]+7)
    }
    var a = colix(mouseX,boton[27],boton[29])
    var b = coliy(mouseY,boton[28],boton[30])
    if (a && b && mouseIsPressed){
        boton[26] = 1
    }
}
function librery(){
    fill(255,75)
    rect(300,200,525,300)
    fill(100)
    for (var num1 = 0; num1<=7; num1++){
        rect(block[num1][1],block[num1][2],block[num1][3],block[num1][4])
        image(player[num1], block[num1][1],block[num1][2],block[num1][3]*4,block[num1][4]*4)
        if (mouseIsPressed && (colix(mouseX,block[num1][1],block[num1][3]) && coliy(mouseY,block[num1][2],block[num1][4]))){
            rect(block[num1][1],block[num1][2],block[num1][3],block[num1][4])
            sk = num1
        }
    } 
    boton[21] = 1
    back();
    p(0)
}
function flash(){
    var d = dist(mouseX,mouseY,width/2,height/2)
    if (efectos >= -100 && efectos <= 110){
        image(efec,300,300,600,600)
        if (keyIsPressed == true && colix(mouseX,width*0.5,width) && coliy(mouseY,height*0.5,height)){
            image(flashes[1],300,300,600,600)
            efectos +=2
            sonido(2) 
        }
    }
    else if ( efectos > 110 || durex == 1){
        if (keyIsPressed == true && colix(mouseX,width*0.5,width) && coliy(mouseY,height*0.5,height)){
            image(flashes[3],300,300,600,600)
            nivel(-2)
        }
    }
    else if ( efectos <= -110){
        nivel(-1)
    }
}
function objetivos(){
    fill(255,0)
    if (turnos == 1){
        rect(px+15,py, 600/12,600/20)
        image(bicho[0][1],bicho[1][1],bicho[1][2], 600,600)
        
    }
    else if (turnos == 2){
        rect(px+5,py, 600/12,600/20)
        image(bicho[0][2],bicho[1][3],bicho[1][4], 600,600)
    }
    else if (turnos == 3){
        rect(bicho[2][4],bicho[2][5], 300/6,300/6)
        image(bicho[0][3],bicho[2][4],bicho[2][5], 300,300)
    }
}
function aparicion(){
  if (!active){
    if (turnos == 1){
        px = width/18
        h = width/18
    }
    else if (turnos == 2){
        px = width*0.9
        h = width*0.9
    }
    k =int(random(width/4,width/1.75))
    if (turnos == 1){
        h = width/18
        j=parabolic(k)
    }
    else if (turnos == 2){
        h = width*0.9
        j=parabolic(k)
    }
    active= true
  }
}
function sonido(on){
    if (on == 0 || boton[11] == 1 || boton[16] == 1 || boton[21] == 0){
        if (boton[11] == 1 || boton[16] == 1 || boton[21] == 0){
            sound[0][1].stop()
        }
        sound[1][1].stop()
        sound[2][1].stop()
        sound[2][2].stop()
    }
    else if (on == 1){
        if (turnos == 1){
            if (!sound[2][1].isPlaying()) {
                sound[2][1].play()
            }
        }
        else if (turnos == 2){
            if (!sound[2][1].isPlaying()) {
                sound[2][1].play()
            }
        }
        else if (turnos == 3){
            if (!sound[2][2].isPlaying()) {
                sound[2][2].play()
            }    
        }
    }
    else if(on == 2){
        if (!sound[1][1].isPlaying()) {
            sound[1][1].play()
        }
    }
}
function parabolic(K){
    var resul
    vx = ((k - h)/2) + h
    resul = (vy-f)/((vx - h)*(vx - K))
    if (turnos == 1){
        return (vy-f)/((vx - h)*(vx - K))
    }
    else if (turnos == 2){
        if (resul >= 0.02 ){
            var k1 = int(random(255,300))
            k = k1
            vx = ((k1 - h)/2) + h
            return (vy-f)/((vx - h)*(vx - k1))
        }
        else if (resul >= 0.01 && resul <= 0.02){
            var k2 = int(random(210,260))
            k = k2
            vx = ((k2 - h)/2) + h
            return (vy-f)/((vx - h)*(vx - k2))
        }
        else if (resul >= 0.07 && resul <= 0.01){
            var k3 = int(random(150,210))
            k = k3
            vx = ((k3 - h)/2) + h
            return (vy-f)/((vx - h)*(vx - k3))
        }
        else{
            return (vy-f)/((vx - h)*(vx - K))
        }
    }
}
function cal1(X,H){
    return j* (X - H) *(X - k)+f
}
function cal2(){
    bicho[2][5] = (((bicho[2][3]-bicho[2][1])/(bicho[2][2]-bicho[2][0]))*(bicho[2][4]-bicho[2][2]))
    bicho[2][5] = (bicho[2][5]+bicho[2][3])
}
function captur(){
    if (turnos == 1){
        if (keyIsPressed && ((colix(mouseX,px+15,600/6)&&coliy(mouseY,py,600/10)) && (colix(px+15,mouseX,600/6)&&coliy(py,mouseY,600/6)))){
            efectos -=10
            return true
        }
    }
    else if (turnos == 2){
        if (keyIsPressed && ((colix(mouseX,px+5,600/6)&&coliy(mouseY,py,600/10)) && (colix(px+5,mouseX,600/6)&&coliy(py,mouseY,600/6)))){
            efectos -=10
            return true
        }
    }
    else if (turnos == 3){
        if (keyIsPressed && ((colix(mouseX,bicho[2][4],600/6)&&coliy(mouseY,bicho[2][5],600/10)) && (colix(bicho[2][4],mouseX,600/6)&&coliy(bicho[2][5],mouseY,600/6)))){
            efectos -=10
            return true
        }
    }
}
function colix(x,xc,xl){
    return (x < xc + xl/2 && x > xc - xl/2)
}
function coliy(y,yc,yl){
    return (y < yc + yl/2 && y > yc - yl/2)
}
function onScreen(x,y){
  if(x<0 ||x>width||y<0||y>height){
    efectos +=10
    return false
  }
  return true
}
function drawRef(){
    noStroke()
    fill(0,0,255,0)
    circle( k,height*0.95,10)
    rect(455,140,150)
    circle(bicho[2][0],bicho[2][1],10)
    circle(bicho[2][2],bicho[2][3],5)  
    text(efectos,200,400)
    text(j, 10,100)
    text(f, 310,100)
    text(k, 110,200)
    text(h, 310,200)
    text(turnos, 300,300)
    text(px, 310,300)
    text(sk,100,100)
    circle(px+10,py, 10)
    fill(255,0)
    rect(mouseX,mouseY, 300/6,300/6)
}